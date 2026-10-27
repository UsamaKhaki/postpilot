import { env, whatsappConfigured } from "@/lib/env";

/**
 * WhatsApp approval messaging via Twilio.
 *
 * Live sending requires a Twilio account with the WhatsApp Business sender
 * approved. Without credentials this no-ops and logs, so the rest of the
 * approval flow still works locally.
 */
export async function sendApprovalRequest(opts: {
  to: string;
  postBody: string;
  approveUrl: string;
}): Promise<{ sent: boolean }> {
  if (!whatsappConfigured()) {
    console.info("[whatsapp] not configured — skipping send", opts.to);
    return { sent: false };
  }

  const sid = env.TWILIO_ACCOUNT_SID!;
  const body = new URLSearchParams({
    From: `whatsapp:${env.TWILIO_WHATSAPP_FROM}`,
    To: `whatsapp:${opts.to}`,
    Body: `Your next post is ready 👇\n\n${opts.postBody}\n\nReply YES to publish, or open ${opts.approveUrl} to edit.`,
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${sid}:${env.TWILIO_AUTH_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );
  return { sent: res.ok };
}
