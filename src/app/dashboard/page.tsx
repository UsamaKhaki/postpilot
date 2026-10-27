import {
  FileCheck2,
  CalendarClock,
  Eye,
  Heart,
  Sparkles,
  Check,
  ArrowUpRight,
} from "lucide-react";
import {
  PageHeader,
  Card,
  StatCard,
  StatusBadge,
  PrimaryButton,
  GhostButton,
} from "@/components/dashboard/ui";

const UPCOMING = [
  { time: "Tomorrow · 9:10 AM", title: "We deleted 40% of our onboarding docs…", tag: "Engineering", status: "Awaiting approval" as const },
  { time: "Wed · 8:45 AM", title: "Everyone's shipping agents. Almost nobody…", tag: "AI", status: "Scheduled" as const },
  { time: "Thu · 12:30 PM", title: "Our best growth lever this year wasn't a channel…", tag: "SaaS", status: "Scheduled" as const },
  { time: "Fri · 9:00 AM", title: "Raised my rate 3x in 18 months. The unlock…", tag: "Consulting", status: "Draft" as const },
];

const ACTIVITY = [
  { who: "Post published", what: "“Most teams treat code review as a gate…”", when: "2h ago" },
  { who: "Approved on WhatsApp", what: "“The fastest way to lose trust in a product…”", when: "Yesterday" },
  { who: "Draft generated", what: "5 new posts added to your queue", when: "Yesterday" },
  { who: "Reach milestone", what: "You crossed 9.5M total impressions", when: "2 days ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Jane"
        subtitle="Here's what Postpilot has lined up for you."
        action={
          <PrimaryButton href="/dashboard/composer">
            <Sparkles className="h-4 w-4" />
            New post
          </PrimaryButton>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<FileCheck2 className="h-6 w-6" />} label="Posts published" value="184" delta="+12 this month" color="flame" />
        <StatCard icon={<CalendarClock className="h-6 w-6" />} label="Scheduled" value="9" delta="next 2 weeks" color="grape" />
        <StatCard icon={<Eye className="h-6 w-6" />} label="Reach (30d)" value="312K" delta="+38%" color="blue" />
        <StatCard icon={<Heart className="h-6 w-6" />} label="Engagement rate" value="4.7%" delta="+0.6%" color="pink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next approval */}
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-2 text-sm font-bold text-brand-600">
            <Sparkles className="h-4 w-4" />
            Next up for approval
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-900">
            “We deleted 40% of our onboarding docs and activation went up. Turns
            out nobody reads the manual — they copy the example. Here&rsquo;s what we
            kept.”
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["#engineering", "#saas", "#buildinpublic"].map((h) => (
              <span key={h} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                {h}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <GhostButton href="/dashboard/posts">Review in Posts</GhostButton>
          </div>
        </Card>

        {/* Upcoming queue */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink-900">Upcoming queue</h2>
            <GhostButton href="/dashboard/calendar">
              View calendar <ArrowUpRight className="h-4 w-4" />
            </GhostButton>
          </div>
          <div className="mt-4 divide-y divide-ink-100">
            {UPCOMING.map((p) => (
              <div key={p.title} className="flex items-center gap-4 py-3">
                <div className="w-32 shrink-0 text-xs font-semibold text-muted">{p.time}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink-900">{p.title}</div>
                  <div className="text-xs text-muted">{p.tag}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity */}
      <Card>
        <h2 className="text-lg font-bold text-ink-900">Recent activity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ACTIVITY.map((a) => (
            <div key={a.what} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink-900">{a.who}</div>
                <div className="truncate text-sm text-muted">{a.what}</div>
                <div className="mt-0.5 text-xs text-muted">{a.when}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
