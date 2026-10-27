import { Eye, Heart, UserPlus, MousePointerClick } from "lucide-react";
import { PageHeader, Card, StatCard } from "@/components/dashboard/ui";

const REACH = [42, 55, 38, 67, 80, 62, 90, 74, 58, 96, 70, 88];
const MONTHS = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];

const TOP = [
  { body: "The fastest way to lose trust in a product…", impressions: "48.2K", rate: "6.1%" },
  { body: "We deleted 40% of our onboarding docs…", impressions: "39.7K", rate: "5.4%" },
  { body: "Most early-stage founders track burn…", impressions: "31.0K", rate: "4.8%" },
  { body: "Everyone's shipping agents. Almost nobody…", impressions: "28.5K", rate: "4.2%" },
];

export default function AnalyticsPage() {
  const max = Math.max(...REACH);

  return (
    <div className="space-y-8">
      <PageHeader title="Analytics" subtitle="Last 12 months of performance." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Eye className="h-6 w-6" />} label="Impressions" value="1.2M" delta="+22%" color="blue" />
        <StatCard icon={<Heart className="h-6 w-6" />} label="Reactions" value="48.3K" delta="+15%" color="pink" />
        <StatCard icon={<UserPlus className="h-6 w-6" />} label="New followers" value="6,910" delta="+31%" color="lime" />
        <StatCard icon={<MousePointerClick className="h-6 w-6" />} label="Profile clicks" value="22.4K" delta="+9%" color="sun" />
      </div>

      <Card>
        <h2 className="text-lg font-bold text-ink-900">Reach over time</h2>
        <div className="mt-6 flex h-56 items-end gap-2 sm:gap-3">
          {REACH.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className="w-full rounded-t-xl bg-[linear-gradient(180deg,#ff7a8a,#ff2d55)] transition-all"
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="text-[10px] font-semibold text-muted">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-bold text-ink-900">Top performing posts</h2>
          <div className="mt-4 divide-y divide-ink-100">
            {TOP.map((p, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                  {i + 1}
                </span>
                <p className="min-w-0 flex-1 truncate text-sm text-ink-900">{p.body}</p>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold text-ink-900">{p.impressions}</div>
                  <div className="text-xs text-muted">{p.rate} eng.</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-ink-900">Audience</h2>
          <div className="mt-5 space-y-4">
            {[
              { label: "Founders & execs", pct: 42, color: "#ff2d55" },
              { label: "Engineers", pct: 28, color: "#7c3aed" },
              { label: "Marketers", pct: 18, color: "#0a66c2" },
              { label: "Other", pct: 12, color: "#18c964" },
            ].map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{s.label}</span>
                  <span className="font-bold text-ink-900">{s.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
