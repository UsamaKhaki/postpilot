import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/env";
import { getPostById, markPostPublished } from "@/server/data";
import { publishNow, type PublishMode } from "@/server/scheduler";

/**
 * Approve a scheduled/awaiting post. Returns the LinkedIn composer deep-link
 * for the user's 1-tap publish (manual mode), then marks the post Published.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const post = await getPostById(user, id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Resolve the user's publish mode (RLS-scoped); default to compliant manual.
    let mode: PublishMode = "manual";
    if (user.provider === "linkedin" && supabaseConfigured()) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase
        .from("profiles")
        .select("publish_mode")
        .eq("id", user.id)
        .maybeSingle();
      if (data?.publish_mode === "auto") mode = "auto";
    }

    const { shareUrl } = await publishNow({ postId: id, body: post.body, mode });
    await markPostPublished(user, id);

    return NextResponse.json({ ok: true, shareUrl, mode });
  } catch {
    return NextResponse.json({ error: "Approval failed" }, { status: 500 });
  }
}
