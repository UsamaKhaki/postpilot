"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Heart,
  MessageCircle,
  MoreHorizontal,
  FileX2,
  AlertCircle,
} from "lucide-react";
import { PageHeader, Card, StatusBadge, PrimaryButton } from "@/components/dashboard/ui";
import type { Post } from "@/server/data";

async function requestPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error(`GET /api/posts failed with ${res.status}`);
  const data: { posts: Post[] } = await res.json();
  return data.posts;
}

const TABS = ["All", "Awaiting approval", "Scheduled", "Published", "Draft"] as const;

export default function PostsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  async function fetchPosts() {
    try {
      setPosts(await requestPosts());
      setState("ready");
    } catch {
      setState("error");
    }
  }

  function retry() {
    setState("loading");
    void fetchPosts();
  }

  useEffect(() => {
    let cancelled = false;
    requestPosts().then(
      (loaded) => {
        if (cancelled) return;
        setPosts(loaded);
        setState("ready");
      },
      () => {
        if (!cancelled) setState("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const [approving, setApproving] = useState<string | null>(null);

  async function approve(id: string) {
    if (approving) return;
    setApproving(id);
    try {
      const res = await fetch(`/api/posts/${id}/approve`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      // Open LinkedIn's composer with the post prefilled for a 1-tap publish.
      if (data.shareUrl) window.open(data.shareUrl, "_blank", "noopener");
      await fetchPosts();
    } catch {
      setState("error");
    } finally {
      setApproving(null);
    }
  }

  const filtered = tab === "All" ? posts : posts.filter((p) => p.status === tab);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Posts"
        subtitle="Every draft, scheduled and published post in one place."
        action={
          <PrimaryButton href="/dashboard/composer">
            <Sparkles className="h-4 w-4" />
            New post
          </PrimaryButton>
        }
      />

      <div role="group" aria-label="Filter posts by status" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] text-white shadow-[0_10px_22px_-12px_rgba(255,45,85,0.7)]"
                : "bg-white/80 text-ink-700 ring-1 ring-ink-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {state === "loading" && (
        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} className="p-5">
              <div className="h-5 w-24 animate-pulse rounded-full bg-ink-100" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-ink-100" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-ink-100" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-ink-100" />
              </div>
            </Card>
          ))}
          <span className="sr-only" role="status">Loading posts…</span>
        </div>
      )}

      {state === "error" && (
        <Card className="flex flex-col items-center py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-rose-600">
            <AlertCircle className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink-900">Couldn&rsquo;t load posts</h3>
          <p className="mt-1 text-sm text-muted">Something went wrong on our end.</p>
          <button
            onClick={retry}
            className="mt-5 rounded-full bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] px-5 py-2.5 text-sm font-bold text-white"
          >
            Try again
          </button>
        </Card>
      )}

      {state === "ready" && filtered.length === 0 && (
        <Card className="flex flex-col items-center py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-100 text-muted">
            <FileX2 className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink-900">No posts here yet</h3>
          <p className="mt-1 text-sm text-muted">
            Nothing in &ldquo;{tab}&rdquo;. Generate your first one.
          </p>
          <PrimaryButton href="/dashboard/composer">
            <Sparkles className="h-4 w-4" /> New post
          </PrimaryButton>
        </Card>
      )}

      {state === "ready" && filtered.length > 0 && (
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                {p.tag}
              </span>
              <div className="flex items-center gap-2">
                <StatusBadge status={p.status} />
                <button className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-white" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-900">{p.body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-muted">
              <span className="font-medium">{p.when}</span>
              {p.status === "Published" ? (
                <span className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4" /> {p.likes}</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {p.comments}</span>
                </span>
              ) : (
                <span className="flex gap-3">
                  <button className="font-semibold text-brand-600 hover:underline">Edit</button>
                  {p.status === "Awaiting approval" && (
                    <button
                      onClick={() => approve(p.id)}
                      disabled={approving !== null}
                      className="font-semibold text-emerald-600 hover:underline disabled:opacity-60"
                    >
                      {approving === p.id ? "Approving…" : "Approve"}
                    </button>
                  )}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
}
