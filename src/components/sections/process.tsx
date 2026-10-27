import {
  Link2,
  SlidersHorizontal,
  CalendarClock,
  Wand2,
  MessageSquareText,
  Rocket,
} from "lucide-react";
import { Aurora, SectionHeading } from "@/components/ui-kit";
import { Floaty } from "@/components/floaty";

const STEPS = [
  {
    icon: Link2,
    title: "Connect LinkedIn",
    body: "Sign in with secure OAuth 2.0. We never see your password and you can disconnect anytime.",
  },
  {
    icon: SlidersHorizontal,
    title: "Set your preferences",
    body: "Pick topics, tone, post length and how often you want to show up. Postpilot learns your voice from a few samples.",
  },
  {
    icon: CalendarClock,
    title: "Plan your calendar",
    body: "Choose the days and times — or let us pick the slots most likely to get reach for your audience.",
  },
  {
    icon: Wand2,
    title: "AI drafts the posts",
    body: "Each post is written in your voice with relevant hooks and hashtags, ready well before it goes live.",
  },
  {
    icon: MessageSquareText,
    title: "Approve on WhatsApp",
    body: "Get a preview on WhatsApp. Reply to approve, tweak, or regenerate — no app needed.",
  },
  {
    icon: Rocket,
    title: "Auto-publish",
    body: "Approved posts publish automatically at the perfect time. You stay consistent without lifting a finger.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28">
      <Aurora />
      <Floaty kind="star" color="butter" size={54} left="4%" top="16%" dur="7.5s" tilt="-10deg" />
      <Floaty kind="heart" color="pink" size={50} right="5%" top="22%" dur="8s" delay="0.5s" tilt="8deg" />
      <Floaty kind="ball" color="grape" size={18} right="12%" bottom="14%" dur="10s" motion="drift" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          color="grass"
          title="From idea to published in six steps"
          subtitle="Set it up once. After that, the whole loop runs on autopilot with you in control."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="group relative rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <span className="absolute right-6 top-6 text-5xl font-bold tracking-tight text-ink-100 transition-colors group-hover:text-brand-100">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
