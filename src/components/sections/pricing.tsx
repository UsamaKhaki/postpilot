import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/mo",
    tagline: "Try the full loop, free.",
    features: [
      "4 AI-written posts / month",
      "Voice learning from samples",
      "WhatsApp approval",
      "Basic scheduling",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "/mo",
    tagline: "For people serious about showing up.",
    features: [
      "Unlimited AI-written posts",
      "Optimal-time scheduling",
      "Smart hashtags & hooks",
      "Performance insights",
      "Priority generation",
    ],
    cta: "Start 7-day trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$79",
    cadence: "/mo",
    tagline: "Keep a whole team consistent.",
    features: [
      "Everything in Pro",
      "Up to 5 connected profiles",
      "Shared content calendar",
      "Brand voice guardrails",
      "Dedicated support",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Pricing
          </span>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Simple plans, cancel anytime
          </h2>
          <p className="mt-3 text-muted">
            Start free. Upgrade when consistency starts compounding.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[var(--radius-card)] border p-7 ${
                plan.featured
                  ? "border-brand-300 bg-white shadow-[var(--shadow-lift)] lg:-translate-y-3"
                  : "border-ink-200 bg-white shadow-[var(--shadow-soft)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-ink-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink-900">
                  {plan.price}
                </span>
                <span className="text-sm text-muted">{plan.cadence}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#start"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-brand-600 text-white shadow-[var(--shadow-lift)]"
                    : "border border-ink-200 bg-white text-ink-900 hover:border-brand-300"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
