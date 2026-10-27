import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { dispatchDuePosts } from "@/server/scheduler";

/**
 * Vercel Cron target (see vercel.json). Runs every minute, sends WhatsApp
 * approvals for posts whose scheduled time has arrived. Protected by CRON_SECRET:
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` when the env var is set.
 */
export async function GET(request: Request) {
  if (env.CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  try {
    const result = await dispatchDuePosts();
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json({ error: "Dispatch failed" }, { status: 500 });
  }
}
