"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  CalendarClock,
  Heart,
  MessageCircle,
  Repeat2,
  Loader2,
} from "lucide-react";
import { PageHeader, Card } from "@/components/dashboard/ui";

const TONES = ["Punchy", "Story-driven", "Analytical", "Contrarian", "Friendly"];

/** Default schedule: tomorrow at 9:00 AM local time. */
function defaultRunAt(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}

export default function ComposerPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("Punchy");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState<null | "draft" | "schedule">(null);

  async function generate() {
    if (!idea.trim()) {
      setError("Add an idea first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, tone }),
      });
      const data: { text?: string; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.text) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDraft(data.text);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function save(mode: "draft" | "schedule") {
    if (!draft.trim() || saving) return;
    setSaving(mode);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: draft,
          tag: tone,
          scheduledFor: mode === "schedule" ? defaultRunAt() : null,
        }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setError(data.error ?? "Couldn't save the post. Please try again.");
        setSaving(null);
        return;
      }
      router.push("/dashboard/posts");
    } catch {
      setError("Couldn't save the post. Please try again.");
      setSaving(null);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Composer"
        subtitle="Describe an idea — Postpilot drafts it in your voice."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <label htmlFor="composer-idea" className="text-sm font-bold text-ink-900">
            What&rsquo;s on your mind?
          </label>
          <textarea
            id="composer-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            placeholder="e.g. how we cut code review time in half this quarter"
            className="mt-2 w-full resize-y rounded-2xl bg-white/80 p-4 text-sm text-ink-900 outline-none ring-1 ring-ink-100 placeholder:text-muted/70 focus:ring-2 focus:ring-brand-300"
          />

          <div id="composer-tone" className="mt-5 text-sm font-bold text-ink-900">Tone</div>
          <div role="group" aria-labelledby="composer-tone" className="mt-2 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tone === t}
                onClick={() => setTone(t)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  tone === t
                    ? "bg-[linear-gradient(95deg,#7c3aed,#a855f7)] text-white"
                    : "bg-white/80 text-ink-700 ring-1 ring-ink-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] px-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(255,45,85,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
            {loading ? "Writing in your voice…" : "Generate draft"}
          </button>
          {error && (
            <p role="alert" className="mt-3 text-center text-sm font-medium text-rose-600">
              {error}
            </p>
          )}
        </Card>

        {/* Preview */}
        <Card>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-600">
              <Sparkles className="h-4 w-4" />
              Preview
            </span>
            {draft && (
              <button
                type="button"
                onClick={generate}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 disabled:opacity-60"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Regenerate
              </button>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-sm font-bold text-white">
                JD
              </span>
              <div>
                <div className="text-sm font-bold text-ink-900">Jane Doe</div>
                <div className="text-xs text-muted">Founder · 1st</div>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-900">
              {draft || (
                <span className="text-muted">
                  Your generated post will appear here. Add an idea and hit
                  Generate.
                </span>
              )}
            </p>
            {draft && (
              <div className="mt-5 flex items-center gap-5 border-t border-ink-100 pt-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4" /> 0</span>
                <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> 0</span>
                <span className="inline-flex items-center gap-1.5"><Repeat2 className="h-4 w-4" /> Repost</span>
              </div>
            )}
          </div>

          {draft && (
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => save("schedule")}
                disabled={saving !== null}
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(95deg,#18c964,#0d9488)] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-70"
              >
                {saving === "schedule" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CalendarClock className="h-4 w-4" />
                )}
                {saving === "schedule" ? "Scheduling…" : "Schedule post"}
              </button>
              <button
                type="button"
                onClick={() => save("draft")}
                disabled={saving !== null}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 disabled:opacity-70"
              >
                {saving === "draft" && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving === "draft" ? "Saving…" : "Save as draft"}
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
