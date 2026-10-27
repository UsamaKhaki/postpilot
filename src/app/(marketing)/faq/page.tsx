import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "FAQ — Postpilot",
  description:
    "Answers to common questions about Postpilot: voice accuracy, approvals, account safety, limits, multiple accounts and cancellation.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        color="grape"
        title="Frequently asked questions"
        link={{ label: "Still stuck? Contact us", href: "/contact" }}
        subtitle="Everything you might want to know before you connect your account."
        primary={{ label: "Start free", href: "/login" }}
        secondary={{ label: "View pricing", href: "/pricing" }}
        betweenLabel="or"
      />
      <Faq />
      <Cta />
    </>
  );
}
