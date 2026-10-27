import type { Metadata } from "next";
import { Wand2, CalendarClock, Users, LineChart } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Postpilot",
  description:
    "Get in touch with the Postpilot team. Share a few details and we'll reach out with next steps within 24 hours.",
};

const HIGHLIGHTS = [
  { icon: Wand2, title: "AI content studio", body: "Posts written in your voice." },
  { icon: CalendarClock, title: "Smart scheduling", body: "Published at the right time." },
  { icon: Users, title: "Multi-seat publishing", body: "Keep a whole team consistent." },
  { icon: LineChart, title: "Performance analytics", body: "See what resonates and double down." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        color="sky"
        title="Let's talk"
        subtitle="Share a few details and we'll reach out with next steps within 24 hours."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
              About Postpilot
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Postpilot is an AI-powered LinkedIn platform that helps founders,
              operators and creators show up consistently — without spending
              hours writing. We handle the drafting, scheduling and publishing;
              you stay in control through quick WhatsApp approvals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-ink-200 bg-white p-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink-900">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
