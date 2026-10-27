import { NextResponse } from "next/server";
import { env, adminConfigured } from "@/lib/env";
import { dispatchDuePosts } from "@/server/scheduler";

/**
 * Vercel Cron target (see vercel.json). Runs every minute, sends WhatsApp
 * approvals for posts whose scheduled time has arrived. Protected by CRON_SECRET:
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` when the env var is set.
 * Fails closed once the service role is configured, so a missing secret in
 * production never leaves the dispatcher open to the internet.
 */
export async function GET(request: Request) {
  if (env.CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (adminConfigured()) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 503 });
  }
  try {
    const result = await dispatchDuePosts();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[cron] dispatch failed", error);
    return NextResponse.json({ error: "Dispatch failed" }, { status: 500 });
  }
}
