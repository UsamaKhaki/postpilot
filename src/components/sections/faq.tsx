"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Will the posts actually sound like me?",
    a: "Yes. Postpilot learns from writing samples you provide and from the posts you approve over time, so drafts pick up your phrasing and point of view rather than generic AI tone.",
  },
  {
    q: "Does anything publish without my approval?",
    a: "Never. Every post is sent to you on WhatsApp first. Nothing goes live until you reply to approve it. You can edit, regenerate, reschedule, or skip any draft.",
  },
  {
    q: "Is my LinkedIn account safe?",
    a: "We connect through official LinkedIn OAuth 2.0 with 256-bit encryption. We never see or store your password, and you can disconnect access at any time.",
  },
  {
    q: "How many posts can I generate?",
    a: "The free Starter plan includes 4 posts per month. Pro and Team plans include unlimited generation with priority processing.",
  },
  {
    q: "Can I use it for more than one account?",
    a: "The Team plan supports up to 5 connected profiles with a shared calendar and brand-voice guardrails — ideal for founders managing multiple brands or small teams.",
  },
  {
    q: "What if I want to cancel?",
    a: "You can cancel anytime from your settings. Your scheduled posts stay intact through the end of your billing period and nothing is published after you disconnect.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            FAQ
          </span>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 divide-y divide-ink-100 overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-ink-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
