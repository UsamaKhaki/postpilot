import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Wand2,
  Image as ImageIcon,
  BellRing,
  MessageSquareText,
  CalendarClock,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Features — Postpilot",
  description:
    "Everything Postpilot does to keep you posting on LinkedIn: voice learning, zero manual posting, custom AI images, WhatsApp approval and more.",
};

const BLOCK_GRADS = [
  "linear-gradient(150deg,#ff7a8a,#ff2d55)",
  "linear-gradient(150deg,#c79bff,#7c3aed)",
  "linear-gradient(150deg,#5eb0ff,#0a66c2)",
  "linear-gradient(150deg,#7ef0b6,#18c964)",
  "linear-gradient(150deg,#ffc06a,#ff7a00)",
  "linear-gradient(150deg,#ff8ec2,#ec0e7b)",
  "linear-gradient(150deg,#7ce7ff,#18b6e6)",
];

function FeatureVisual({
  icon,
  grad,
}: {
  icon: React.ReactNode;
  grad: string;
}) {
  return (
    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-ink-50 to-white">
      {/* soft color wash */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ backgroundImage: grad }}
      />
      <div
        className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: grad }}
      />
      {/* big glossy icon */}
      <span
        className="glossy animate-float-slow grid h-24 w-24 place-items-center rounded-[28%] text-white"
        style={{ ["--g" as string]: grad }}
      >
        {icon}
      </span>
      {/* small floating accents */}
      <span
        className="glossy animate-float-bob absolute right-8 top-8 h-6 w-6 rounded-full"
        style={{ ["--g" as string]: grad, ["--dur" as string]: "6s" }}
      />
      <span
        className="glossy animate-float-bob absolute bottom-8 left-10 h-4 w-4 rounded-full"
        style={{ ["--g" as string]: grad, ["--dur" as string]: "7.5s", ["--delay" as string]: "0.5s" }}
      />
    </div>
  );
}

const BLOCKS = [
  {
    icon: ShieldCheck,
    title: "Account safety first",
    body: "Postpilot connects through official LinkedIn OAuth 2.0 with 256-bit encryption. We never store your password, mimic risky behaviour, or post anything you haven't approved — so your account stays in good standing.",
  },
  {
    icon: Rocket,
    title: "Zero manual posting",
    body: "Once your calendar is set, you never open a scheduler again. Drafts are written ahead of time and published automatically at the slots most likely to perform.",
  },
  {
    icon: Wand2,
    title: "AI-powered content in your voice",
    body: "Trained on your samples and the posts you approve, Postpilot writes hooks, body and CTAs that sound like you — not like a template everyone else is using.",
  },
  {
    icon: ImageIcon,
    title: "Custom AI images",
    body: "Generate on-brand visuals for any post in a click. Pick a style once and every graphic stays consistent with your look and feel.",
  },
  {
    icon: BellRing,
    title: "Real-time alerts",
    body: "Get notified the moment a post is drafted, approved, or published. No surprises — you always know exactly what's going out and when.",
  },
  {
    icon: MessageSquareText,
    title: "WhatsApp approval",
    body: "Review tomorrow's post right in WhatsApp. Reply to approve, ask for a new angle, or edit a line — no dashboard, no app to install.",
  },
  {
    icon: CalendarClock,
    title: "Smart scheduling",
    body: "We learn when your audience is online and place each post in the window that earns the most reach for your specific followers.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        color="flame"
        title="Everything you need, in one workspace"
        link={{ label: "See how it works", href: "/#process" }}
        subtitle="One workspace that plans, writes, approves and publishes — while keeping you fully in control."
        primary={{ label: "Start free", href: "/login" }}
        secondary={{ label: "View pricing", href: "/pricing" }}
        betweenLabel="or"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="space-y-8">
            {BLOCKS.map((b, i) => (
              <div
                key={b.title}
                className={`grid items-center gap-8 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:p-10 ${
                  i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span
                    className="glossy grid h-14 w-14 place-items-center rounded-[28%] text-white"
                    style={{ ["--g" as string]: BLOCK_GRADS[i % BLOCK_GRADS.length] }}
                  >
                    <b.icon className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900">
                    {b.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
                </div>
                <FeatureVisual
                  icon={<b.icon className="h-12 w-12" />}
                  grad={BLOCK_GRADS[i % BLOCK_GRADS.length]}
                />
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Start automating
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
