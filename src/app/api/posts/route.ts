import { NextResponse } from "next/server";
import { listPosts, createPost } from "@/server/data";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const posts = await listPosts(user);
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { body, tag, scheduledFor } = await request.json();
    if (!body || typeof body !== "string" || !body.trim()) {
      return NextResponse.json({ error: "Post body is required" }, { status: 400 });
    }
    if (scheduledFor != null && Number.isNaN(new Date(scheduledFor).getTime())) {
      return NextResponse.json({ error: "Invalid schedule time" }, { status: 400 });
    }

    // Persists a status='Scheduled' row with scheduled_for; the Vercel Cron
    // dispatcher (/api/cron/dispatch) picks it up at runtime.
    const post = await createPost(user, { body, tag, scheduledFor });
    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
