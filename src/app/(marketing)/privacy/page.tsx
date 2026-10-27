import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Postpilot",
  description: "How Postpilot collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="January 1, 2026"
      intro="How we collect, use, and protect your information when you use Postpilot."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect the information you provide when you create an account and connect your LinkedIn profile, including your name, email, and profile details made available through LinkedIn's authorization flow.",
            "We also collect the writing samples and post approvals you share so we can generate content in your voice.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use your information to generate, schedule, and publish content on your behalf, to send approval requests over WhatsApp, and to improve the quality of drafts we produce for you.",
          ],
        },
        {
          heading: "Data security",
          body: [
            "We connect to LinkedIn using OAuth 2.0 and never store your LinkedIn password. Data in transit is encrypted, and access to your content is limited to the operations you authorize.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can disconnect your LinkedIn account, export your data, or delete your account at any time from your settings.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "If you have questions about this policy, reach out through our contact page and we will respond within a reasonable timeframe.",
          ],
        },
      ]}
    />
  );
}
