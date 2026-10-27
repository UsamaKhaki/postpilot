/**
 * Data-access layer.
 *
 * Today this returns seeded data so the app runs with no backend. Each function
 * is the single place to swap in a Supabase query — e.g.
 *
 *   const supabase = await createClient();
 *   const { data } = await supabase.from("posts").select("*").order("created_at");
 *   return data ?? [];
 *
 * The SQL schema lives in supabase/schema.sql.
 */

export type PostStatus =
  | "Published"
  | "Scheduled"
  | "Awaiting approval"
  | "Draft";

export type Post = {
  id: string;
  body: string;
  tag: string;
  status: PostStatus;
  when: string;
  likes?: number;
  comments?: number;
};

export type OverviewStats = {
  published: number;
  scheduled: number;
  reach: string;
  engagement: string;
};

/** Identifies the caller so we can persist for real users and keep the demo in-memory. */
export type Caller = { id: string; provider: "linkedin" | "demo" } | null;

const SEED: Post[] = [
  { id: "p1", body: "We deleted 40% of our onboarding docs and activation went up. Turns out nobody reads the manual — they copy the example.", tag: "Engineering", status: "Awaiting approval", when: "Tomorrow 9:10 AM" },
  { id: "p2", body: "Everyone's shipping agents. Almost nobody's measuring them. The teams winning right now obsess over one number: task success rate per dollar.", tag: "AI", status: "Scheduled", when: "Wed 8:45 AM" },
  { id: "p3", body: "Our best growth lever this year wasn't a channel. It was writing down why customers churned — in their words — and reading it out loud every Monday.", tag: "SaaS", status: "Scheduled", when: "Thu 12:30 PM" },
  { id: "p4", body: "Raised my rate 3x in 18 months. The unlock wasn't confidence. It was niching down so hard that referrals described me in one sentence.", tag: "Consulting", status: "Draft", when: "—" },
  { id: "p5", body: "The fastest way to lose trust in a product: a loading spinner that lies. Show real progress, or show nothing. Never fake it.", tag: "Design", status: "Published", when: "2h ago", likes: 367, comments: 42 },
  { id: "p6", body: "Most early-stage founders track burn. The sharp ones track runway in weeks, not months. It changes every hiring decision you make.", tag: "Finance", status: "Published", when: "Yesterday", likes: 198, comments: 26 },
];

// Mutable in-memory store so the demo (no real Supabase user) persists across
// requests within a server session — writes show up immediately in the UI.
const memPosts: Post[] = [...SEED];

// Simulate latency so loading states are real during local dev.
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** A real, Supabase-authenticated user whose writes hit Postgres (and RLS). */
async function persistsToDb(user: Caller): Promise<boolean> {
  if (user?.provider !== "linkedin") return false;
  const { supabaseConfigured } = await import("@/lib/env");
  return supabaseConfigured();
}

function formatWhen(scheduledFor?: string | null): string {
  if (!scheduledFor) return "—";
  const d = new Date(scheduledFor);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRow(row: any): Post {
  const when =
    row.published_at
      ? new Date(row.published_at).toLocaleString()
      : row.scheduled_for
        ? new Date(row.scheduled_for).toLocaleString()
        : "—";
  return {
    id: row.id,
    body: row.body,
    tag: row.tag ?? "General",
    status: row.status,
    when,
    likes: row.likes ?? undefined,
    comments: row.comments ?? undefined,
  };
}

export async function listPosts(user: Caller = null): Promise<Post[]> {
  if (await persistsToDb(user)) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    // Real account: surface the error so failures don't silently show seed data.
    if (error) throw error;
    return (data ?? []).map(mapRow);
  }
  await delay(250);
  return memPosts;
}

export type CreatePostInput = {
  body: string;
  tag?: string;
  /** ISO timestamp — when set, the post is Scheduled; otherwise saved as a Draft. */
  scheduledFor?: string | null;
};

/** LinkedIn rejects posts longer than this. */
export const MAX_POST_LENGTH = 3000;

export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** Validates an untrusted request body for `createPost`. */
export function parseCreatePostInput(raw: unknown): ParseResult<CreatePostInput> {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Expected a JSON object" };
  }
  const { body, tag, scheduledFor } = raw as Record<string, unknown>;

  if (typeof body !== "string" || !body.trim()) {
    return { ok: false, error: "Post body is required" };
  }
  if (body.length > MAX_POST_LENGTH) {
    return { ok: false, error: `Post body must be at most ${MAX_POST_LENGTH} characters` };
  }
  if (tag != null && typeof tag !== "string") {
    return { ok: false, error: "Tag must be a string" };
  }
  if (
    scheduledFor != null &&
    (typeof scheduledFor !== "string" || Number.isNaN(new Date(scheduledFor).getTime()))
  ) {
    return { ok: false, error: "Invalid schedule time" };
  }

  return {
    ok: true,
    value: {
      body,
      tag: tag ?? undefined,
      scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : null,
    },
  };
}

export async function createPost(
  user: Caller,
  input: CreatePostInput,
): Promise<Post> {
  const status: PostStatus = input.scheduledFor ? "Scheduled" : "Draft";
  const tag = input.tag?.trim() || "General";

  if (await persistsToDb(user)) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user!.id,
        body: input.body,
        tag,
        status,
        scheduled_for: input.scheduledFor ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapRow(data);
  }

  // Demo / local: prepend to the in-memory store.
  const post: Post = {
    id: crypto.randomUUID(),
    body: input.body,
    tag,
    status,
    when: formatWhen(input.scheduledFor),
  };
  memPosts.unshift(post);
  return post;
}

export async function getPostById(user: Caller, id: string): Promise<Post | null> {
  if (await persistsToDb(user)) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? mapRow(data) : null;
  }
  return memPosts.find((p) => p.id === id) ?? null;
}

/** Mark a post Published (used after the user approves it). */
export async function markPostPublished(user: Caller, id: string): Promise<void> {
  const publishedAt = new Date().toISOString();
  if (await persistsToDb(user)) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase
      .from("posts")
      .update({ status: "Published", published_at: publishedAt })
      .eq("id", id);
    if (error) throw error;
    return;
  }
  const post = memPosts.find((p) => p.id === id);
  if (post) {
    post.status = "Published";
    post.when = formatWhen(publishedAt);
  }
}

export async function getOverviewStats(user: Caller = null): Promise<OverviewStats> {
  const posts = await listPosts(user);
  const published = posts.filter((p) => p.status === "Published");
  const scheduled = posts.filter((p) => p.status === "Scheduled");
  const totalLikes = published.reduce((n, p) => n + (p.likes ?? 0), 0);
  const totalComments = published.reduce((n, p) => n + (p.comments ?? 0), 0);
  const totalImpressions = published.length * 1800; // rough per-post reach estimate
  const engagement = totalImpressions
    ? `${(((totalLikes + totalComments) / totalImpressions) * 100).toFixed(1)}%`
    : "—";
  const reach =
    totalImpressions >= 1000
      ? `${(totalImpressions / 1000).toFixed(0)}K`
      : String(totalImpressions);
  return { published: published.length, scheduled: scheduled.length, reach, engagement };
}
