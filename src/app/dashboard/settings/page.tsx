"use client";

import { useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import { PageHeader, Card } from "@/components/dashboard/ui";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";

function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function Toggle({
  on,
  onClick,
}: {
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        on ? "bg-[linear-gradient(95deg,#ff2d55,#ff8a00)]" : "bg-ink-200"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    autoSchedule: true,
    whatsappApproval: true,
    hashtags: true,
    weeklyReport: false,
  });
  const [activeDays, setActiveDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  const toggleDay = (d: string) =>
    setActiveDays((arr) => (arr.includes(d) ? arr.filter((x) => x !== d) : [...arr, d]));

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" subtitle="Account, connections and posting preferences." />

      {/* Profile */}
      <Card>
        <h2 className="text-lg font-bold text-ink-900">Profile</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Full name" value="Jane Doe" />
          <Field label="Email" value="jane@company.com" />
          <Field label="Headline" value="Founder · DevTools" />
          <Field label="Timezone" value="GMT+5 (PKT)" />
        </div>
        <button className="mt-5 rounded-full bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] px-5 py-2.5 text-sm font-bold text-white">
          Save changes
        </button>
      </Card>

      {/* Appearance */}
      <Card>
        <h2 className="text-lg font-bold text-ink-900">Appearance</h2>
        <p className="mt-1 text-sm text-muted">Pick the look that fits your audience.</p>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </Card>

      {/* Connections */}
      <Card>
        <h2 className="text-lg font-bold text-ink-900">Connections</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-ink-100">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0a66c2] text-white">
              <LinkedInGlyph className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-ink-900">LinkedIn</div>
              <div className="text-xs text-muted">Connected as Jane Doe</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <Check className="h-3.5 w-3.5" /> Connected
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-ink-100">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25d366] text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-ink-900">WhatsApp</div>
              <div className="text-xs text-muted">+1 555 ··· 0000</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <Check className="h-3.5 w-3.5" /> Connected
            </span>
          </div>
        </div>
      </Card>

      {/* Posting preferences */}
      <Card>
        <h2 className="text-lg font-bold text-ink-900">Posting preferences</h2>

        <div className="mt-4 divide-y divide-ink-100">
          {[
            { k: "autoSchedule" as const, label: "Auto-schedule at optimal times", desc: "Let Postpilot pick the best slot for reach." },
            { k: "whatsappApproval" as const, label: "Require WhatsApp approval", desc: "Nothing publishes until you reply YES." },
            { k: "hashtags" as const, label: "Suggest hashtags", desc: "Add relevant hashtags to every post." },
            { k: "weeklyReport" as const, label: "Weekly performance email", desc: "A Monday summary of how your posts did." },
          ].map((row) => (
            <div key={row.k} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-ink-900">{row.label}</div>
                <div className="text-sm text-muted">{row.desc}</div>
              </div>
              <Toggle on={prefs[row.k]} onClick={() => toggle(row.k)} />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-sm font-semibold text-ink-900">Posting days</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DAYS.map((d) => {
              const on = activeDays.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    on
                      ? "bg-[linear-gradient(95deg,#7c3aed,#a855f7)] text-white"
                      : "bg-white/80 text-ink-700 ring-1 ring-ink-100"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-900">{label}</span>
      <input
        defaultValue={value}
        className="w-full rounded-2xl bg-white/80 px-4 py-2.5 text-sm text-ink-900 outline-none ring-1 ring-ink-100 focus:ring-2 focus:ring-brand-300"
      />
    </label>
  );
}
