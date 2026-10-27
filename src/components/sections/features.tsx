import {
  Mic,
  Clock4,
  Hash,
  ShieldCheck,
  LineChart,
  Repeat,
} from "lucide-react";
import { Aurora, SectionHeading } from "@/components/ui-kit";
import { Floaty } from "@/components/floaty";

const FEATURES = [
  {
    icon: Mic,
    title: "Voice learning",
    body: "Postpilot studies how you write — sentence rhythm, the words you use, the takes you have — so drafts feel authentic, not robotic.",
  },
  {
    icon: Clock4,
    title: "Optimal timing",
    body: "We analyze when your audience is active and schedule each post for the slot most likely to land.",
  },
  {
    icon: Hash,
    title: "Smart hashtags",
    body: "Relevant, non-spammy hashtags chosen per post — enough to extend reach without diluting the message.",
  },
  {
    icon: LineChart,
    title: "Performance insights",
    body: "See what's working across reach, reactions and comments, and let the model lean into your best-performing angles.",
  },
  {
    icon: Repeat,
    title: "Always consistent",
    body: "Never miss a week. A full content calendar is generated ahead of time so there's always something in the queue.",
  },
  {
    icon: ShieldCheck,
    title: "You stay in control",
    body: "Nothing publishes without your approval. Edit, regenerate or skip any post straight from WhatsApp.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-28">
      <Aurora />
      <Floaty kind="thumb" color="blue" size={54} left="5%" top="18%" dur="7.5s" tilt="-8deg" />
      <Floaty kind="chat" color="sky" size={50} right="6%" top="24%" dur="8.5s" delay="0.6s" tilt="6deg" />
      <Floaty kind="squiggle" color="grape" size={48} left="10%" bottom="10%" dur="7s" delay="0.3s" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          color="magenta"
          title="Automation that doesn't sound automated"
          subtitle="Everything is tuned to protect the one thing that matters on LinkedIn — your credibility."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
