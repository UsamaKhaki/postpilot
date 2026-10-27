import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Postpilot.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="January 1, 2026"
      intro="The terms and conditions that govern your use of Postpilot."
      sections={[
        {
          heading: "Acceptance of terms",
          body: [
            "By creating an account or using Postpilot, you agree to these terms. If you do not agree, please do not use the service.",
          ],
        },
        {
          heading: "Your account",
          body: [
            "You are responsible for the activity on your account and for keeping your credentials secure. You must comply with LinkedIn's own terms when using Postpilot to publish content.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to use Postpilot to publish unlawful, misleading, or abusive content, or to attempt to circumvent platform limits and protections.",
          ],
        },
        {
          heading: "Subscriptions and billing",
          body: [
            "Paid plans renew automatically until cancelled. You can cancel at any time and access continues through the end of your billing period.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "Postpilot is provided on an 'as is' basis. To the extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the service.",
          ],
        },
      ]}
    />
  );
}
