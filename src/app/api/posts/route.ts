import { NextResponse } from "next/server";
import { listPosts, createPost, parseCreatePostInput } from "@/server/data";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const posts = await listPosts(user);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[posts] list failed", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = parseCreatePostInput(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    // Persists a status='Scheduled' row with scheduled_for; the Vercel Cron
    // dispatcher (/api/cron/dispatch) picks it up at runtime.
    const post = await createPost(user, parsed.value);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("[posts] create failed", error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
