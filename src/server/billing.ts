import crypto from "node:crypto";
import { env, billingConfigured, adminConfigured } from "@/lib/env";

/**
 * Stripe billing (interface).
 *
 * Live checkout requires a Stripe account, a Price for the Pro plan, and a
 * webhook to sync subscription status into Supabase. Without keys, this
 * returns the pricing page so local clicks don't dead-end.
 */
export async function createCheckoutSession(opts: {
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string }> {
  if (!billingConfigured() || !env.STRIPE_PRICE_PRO) {
    return { url: opts.cancelUrl };
  }

  const body = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": env.STRIPE_PRICE_PRO,
    "line_items[0][quantity]": "1",
    customer_email: opts.email,
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    client_reference_id: opts.userId,
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  return { url: data.url ?? opts.cancelUrl };
}

/**
 * Verifies a Stripe webhook signature without the Stripe SDK.
 * Reimplements Stripe's scheme: HMAC-SHA256 over `${t}.${rawBody}` compared to
 * the `v1` signature in the `Stripe-Signature` header, with a timestamp window.
 */
export function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
  toleranceSec = 300,
): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=", 2) as [string, string]),
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  // Reject stale signatures to blunt replay attacks.
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  return Number.isFinite(age) && age >= 0 && age <= toleranceSec;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Syncs subscription state from a verified Stripe event into the
 * `subscriptions` table. Uses the service-role client (no user session on a
 * webhook). No-ops when Supabase admin isn't configured.
 */
export async function syncSubscriptionFromEvent(event: any): Promise<void> {
  if (!adminConfigured()) {
    console.info("[billing] admin not configured — skipping sync", event?.type);
    return;
  }
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const db = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object;
      const userId = s.client_reference_id;
      if (!userId) return;
      await db.from("subscriptions").upsert({
        user_id: userId,
        plan: "pro",
        status: "active",
        stripe_customer_id: s.customer ?? null,
      });
      return;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const active = sub.status === "active" || sub.status === "trialing";
      await db
        .from("subscriptions")
        .update({
          status: sub.status,
          plan: active ? "pro" : "free",
          current_period_end: sub.current_period_end
            ? new Date(sub.current_period_end * 1000).toISOString()
            : null,
        })
        .eq("stripe_customer_id", sub.customer);
      return;
    }
    default:
      // Ignore events we don't act on.
      return;
  }
}
