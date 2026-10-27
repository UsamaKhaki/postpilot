import { Check } from "lucide-react";

const AVATARS = [
  { initials: "AK", name: "The Analyst", tone: "Data-driven, sharp" },
  { initials: "RS", name: "The Storyteller", tone: "Warm, narrative" },
  { initials: "MJ", name: "The Contrarian", tone: "Bold, opinionated" },
  { initials: "LP", name: "The Mentor", tone: "Helpful, practical" },
];

export function Avatars() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Pick a persona
          </span>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Choose the voice that fits you
          </h2>
          <p className="mt-3 text-muted">
            Start from a writing persona, then fine-tune it with your own
            samples. Switch any time.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AVATARS.map((a, i) => (
            <div
              key={a.name}
              className={`group relative overflow-hidden rounded-[var(--radius-card)] border p-6 text-center transition-transform hover:-translate-y-1 ${
                i === 1
                  ? "border-brand-300 bg-gradient-to-b from-brand-50 to-white shadow-[var(--shadow-soft)]"
                  : "border-ink-200 bg-white"
              }`}
            >
              {i === 1 && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  <Check className="h-3 w-3" /> Selected
                </span>
              )}
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-xl font-semibold text-white">
                {a.initials}
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">
                {a.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{a.tone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
