import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for staying consistent on LinkedIn. Start free, upgrade to Pro for unlimited posts, or scale a team. Cancel anytime.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        color="magenta"
        title="Pricing that scales with your consistency"
        link={{ label: "Compare all features", href: "/features" }}
        subtitle="Start free and only pay once showing up every day starts paying off. No contracts, cancel anytime."
        primary={{ label: "Start free", href: "/login" }}
        secondary={{ label: "Contact sales", href: "/contact" }}
        betweenLabel="or"
      />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
