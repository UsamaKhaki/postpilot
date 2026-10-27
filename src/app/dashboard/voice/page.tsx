"use client";

import { useState } from "react";
import { Plus, Check, Mic, Trash2 } from "lucide-react";
import { PageHeader, Card } from "@/components/dashboard/ui";

const PERSONAS = [
  { name: "The Analyst", tone: "Data-driven, sharp" },
  { name: "The Storyteller", tone: "Warm, narrative" },
  { name: "The Contrarian", tone: "Bold, opinionated" },
  { name: "The Mentor", tone: "Helpful, practical" },
];

const INITIAL_SAMPLES = [
  "We deleted 40% of our onboarding docs and activation went up.",
  "The fastest way to lose trust in a product: a loading spinner that lies.",
  "Most early-stage founders track burn. The sharp ones track runway in weeks.",
];

export default function VoicePage() {
  const [selected, setSelected] = useState(1);
  const [samples, setSamples] = useState(INITIAL_SAMPLES);
  const [draft, setDraft] = useState("");

  function addSample() {
    if (!draft.trim()) return;
    setSamples((s) => [draft.trim(), ...s]);
    setDraft("");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your voice"
        subtitle="Train Postpilot on how you write so every draft sounds like you."
      />

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900">Voice strength</h2>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
            Strong
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full w-[78%] rounded-full bg-[linear-gradient(95deg,#18c964,#0d9488)]" />
        </div>
        <p className="mt-2 text-sm text-muted">
          78% — add a few more samples to sharpen your tone even further.
        </p>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-bold text-ink-900">Writing persona</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelected(i)}
              className={`relative rounded-[var(--radius-card)] p-5 text-left transition-transform hover:-translate-y-1 ${
                selected === i
                  ? "bg-white shadow-[var(--shadow-soft)] ring-2 ring-brand-300"
                  : "bg-white/70 ring-1 ring-ink-100"
              }`}
            >
              {selected === i && (
                <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                <Mic className="h-5 w-5" />
              </span>
              <div className="mt-3 text-base font-bold text-ink-900">{p.name}</div>
              <div className="text-sm text-muted">{p.tone}</div>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-bold text-ink-900">Writing samples</h2>
        <p className="mt-1 text-sm text-muted">
          Paste posts you've written or admire. The more, the better.
        </p>

        <div className="mt-4 flex gap-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSample()}
            placeholder="Paste a sample line or post…"
            className="flex-1 rounded-2xl bg-white/80 px-4 py-3 text-sm text-ink-900 outline-none ring-1 ring-ink-100 placeholder:text-muted/70 focus:ring-2 focus:ring-brand-300"
          />
          <button
            onClick={addSample}
            className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] px-5 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {samples.map((s, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-ink-100">
              <p className="min-w-0 flex-1 text-sm text-ink-900">{s}</p>
              <button
                onClick={() => setSamples((arr) => arr.filter((_, idx) => idx !== i))}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-white hover:text-rose-500"
                aria-label="Remove sample"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
