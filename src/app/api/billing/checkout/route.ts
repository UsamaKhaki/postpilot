import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createCheckoutSession } from "@/server/billing";
import { env } from "@/lib/env";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const base = env.APP_URL.replace(/\/$/, "");
  const { url } = await createCheckoutSession({
    userId: user.id,
    email: user.email,
    successUrl: `${base}/dashboard/billing?status=success`,
    cancelUrl: `${base}/dashboard/billing`,
  });
  return NextResponse.json({ url });
}
