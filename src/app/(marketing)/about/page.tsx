import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built Postpilot: helping busy professionals stay visible on LinkedIn without it eating their week.",
};

const VALUES = [
  {
    icon: Target,
    title: "Consistency beats intensity",
    body: "Showing up a little every day compounds. We make that the default instead of the exception.",
  },
  {
    icon: HeartHandshake,
    title: "Your voice, not ours",
    body: "We never want a post to read like AI wrote it. Authenticity is the whole point.",
  },
  {
    icon: ShieldCheck,
    title: "Control by design",
    body: "Nothing is published without your approval. You're always the editor-in-chief.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        color="grass"
        title="We help good people stay visible"
        subtitle="Postpilot started from a simple frustration: the people with the most to share are usually the ones with the least time to post."
        primary={{ label: "Try Postpilot", href: "/login" }}
        secondary={{ label: "See features", href: "/features" }}
        betweenLabel="or"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="prose-base space-y-5 text-muted">
            <p>
              Great ideas don&rsquo;t spread on their own. On LinkedIn, the
              people who win attention aren&rsquo;t always the smartest in the
              room — they&rsquo;re the ones who show up consistently. But staying
              consistent is hard when you&rsquo;re running a company, serving
              clients, or shipping product.
            </p>
            <p>
              We built Postpilot to remove that tradeoff. It learns how you
              think and write, drafts posts you&rsquo;d actually publish, and
              handles the scheduling and posting — all behind a quick WhatsApp
              approval so you stay in control. The result is a steady presence
              that sounds like you, without the daily blank page.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Try Postpilot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
