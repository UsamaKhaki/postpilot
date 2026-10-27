import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { verifyStripeSignature, syncSubscriptionFromEvent } from "@/server/billing";

/**
 * Stripe webhook → keeps the `subscriptions` table in sync.
 * Configure the endpoint URL + signing secret in the Stripe dashboard and set
 * STRIPE_WEBHOOK_SECRET. The raw request body is required for signature checks.
 */
export async function POST(request: Request) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: unknown;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await syncSubscriptionFromEvent(event);
  } catch (error) {
    console.error("[billing] webhook handler failed", error);
    // 500 so Stripe retries the delivery.
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
