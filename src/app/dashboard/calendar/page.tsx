import { Sparkles } from "lucide-react";
import { PageHeader, Card, PrimaryButton } from "@/components/dashboard/ui";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Posts keyed by day-of-month for a sample month starting on a Monday.
const POSTS: Record<number, { tag: string; color: string }[]> = {
  3: [{ tag: "Engineering", color: "bg-sky-100 text-sky-700" }],
  5: [{ tag: "AI", color: "bg-violet-100 text-violet-700" }],
  6: [{ tag: "SaaS", color: "bg-emerald-100 text-emerald-700" }],
  10: [{ tag: "Consulting", color: "bg-amber-100 text-amber-700" }],
  12: [
    { tag: "AI", color: "bg-violet-100 text-violet-700" },
    { tag: "Design", color: "bg-rose-100 text-rose-700" },
  ],
  17: [{ tag: "Engineering", color: "bg-sky-100 text-sky-700" }],
  19: [{ tag: "Finance", color: "bg-emerald-100 text-emerald-700" }],
  24: [{ tag: "SaaS", color: "bg-emerald-100 text-emerald-700" }],
  26: [{ tag: "AI", color: "bg-violet-100 text-violet-700" }],
};

export default function CalendarPage() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = 12;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Content calendar"
        subtitle="May 2026 · 9 posts scheduled"
        action={
          <PrimaryButton href="/dashboard/composer">
            <Sparkles className="h-4 w-4" />
            New post
          </PrimaryButton>
        }
      />

      <Card>
        <h2 className="mb-5 text-lg font-bold text-ink-900">May 2026</h2>

        <div className="grid grid-cols-7 gap-2">
          {DOW.map((d) => (
            <div key={d} className="pb-2 text-center text-xs font-bold uppercase tracking-wide text-muted">
              {d}
            </div>
          ))}
          {days.map((day) => {
            const posts = POSTS[day] ?? [];
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`min-h-[96px] rounded-2xl p-2 ring-1 transition-colors ${
                  isToday ? "bg-brand-50 ring-brand-200" : "bg-white/70 ring-ink-100 hover:bg-white"
                }`}
              >
                <div className={`text-xs font-bold ${isToday ? "text-brand-600" : "text-ink-700"}`}>
                  {day}
                </div>
                <div className="mt-1 space-y-1">
                  {posts.map((p, i) => (
                    <div key={i} className={`truncate rounded-lg px-2 py-1 text-[11px] font-semibold ${p.color}`}>
                      9:10 · {p.tag}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
