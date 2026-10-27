import { env, adminConfigured } from "@/lib/env";
import { sendApprovalRequest } from "@/server/whatsapp";

/**
 * Scheduling engine — Vercel Cron + Supabase.
 *
 * A scheduled post is just a `posts` row with status='Scheduled' and a
 * `scheduled_for` timestamp (written by `createPost`). The durable queue IS
 * the table; no separate job store is needed.
 *
 * `dispatchDuePosts()` is the worker invoked every minute by the Vercel Cron
 * at `/api/cron/dispatch`. For each post whose time has arrived it sends the
 * WhatsApp approval and flips the status to 'Awaiting approval'. The user then
 * approves from the dashboard (or a future WhatsApp reply webhook), which calls
 * `publishNow()`.
 *
 * publishMode reflects the LinkedIn compliance pivot (see LINKEDIN_COMPLIANCE.md):
 *   - "manual": we prepare + notify; the user taps publish (compliant default).
 *   - "auto":   opt-in auto-publish, only via an approved LinkedIn API path.
 */
export type PublishMode = "manual" | "auto";

/** LinkedIn share composer deep-link with the post text prefilled. */
export function linkedInShareUrl(text: string): string {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
}

export type DispatchResult = { processed: number; notified: number };

export async function dispatchDuePosts(): Promise<DispatchResult> {
  if (!adminConfigured()) {
    // No Supabase service role → nothing durable to poll (local/demo).
    console.info("[scheduler] admin not configured — skipping dispatch");
    return { processed: 0, notified: 0 };
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const db = createAdminClient();
  const nowIso = new Date().toISOString();

  const { data: due, error } = await db
    .from("posts")
    .select("id, user_id, body")
    .eq("status", "Scheduled")
    .lte("scheduled_for", nowIso);
  if (error) throw error;

  const base = env.APP_URL.replace(/\/$/, "");
  let notified = 0;

  for (const post of due ?? []) {
    const { data: profile } = await db
      .from("profiles")
      .select("whatsapp_number")
      .eq("id", post.user_id)
      .maybeSingle();

    if (profile?.whatsapp_number) {
      const { sent } = await sendApprovalRequest({
        to: profile.whatsapp_number,
        postBody: post.body,
        approveUrl: `${base}/dashboard/posts?approve=${post.id}`,
      });
      if (sent) notified++;
    }

    // Advance the post so it isn't dispatched again next minute.
    await db.from("posts").update({ status: "Awaiting approval" }).eq("id", post.id);
  }

  return { processed: due?.length ?? 0, notified };
}

/**
 * Publish on approval. For "manual" mode we return the LinkedIn composer
 * deep-link for the user's 1-tap publish (compliant). "auto" mode is where an
 * approved LinkedIn Posts API call would go once partner access is granted.
 */
export async function publishNow(opts: {
  postId: string;
  body: string;
  mode: PublishMode;
}): Promise<{ ok: boolean; shareUrl: string; auto: boolean }> {
  const shareUrl = linkedInShareUrl(opts.body);
  if (opts.mode === "auto") {
    // TODO: POST to the approved LinkedIn UGC/Posts API for this user.
    console.info("[scheduler] auto-publish requested (API path pending approval)", opts.postId);
  }
  return { ok: true, shareUrl, auto: opts.mode === "auto" };
}
