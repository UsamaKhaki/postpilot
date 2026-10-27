import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds and cancellations work on Postpilot.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      updated="January 1, 2026"
      intro="How cancellations and refunds work for paid Postpilot plans."
      sections={[
        {
          heading: "Free trial",
          body: [
            "Paid plans may include a trial period. You will not be charged until the trial ends, and you can cancel before then at no cost.",
          ],
        },
        {
          heading: "Cancellations",
          body: [
            "You can cancel your subscription at any time from your account settings. Your plan remains active until the end of the current billing period, after which it will not renew.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "If you believe you were charged in error, contact us within 14 days of the charge and we will review your request. Approved refunds are issued to the original payment method.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any billing questions, reach out through our contact page and we will help resolve the issue.",
          ],
        },
      ]}
    />
  );
}
