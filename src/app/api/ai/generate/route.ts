import { NextResponse } from "next/server";
import { generatePost } from "@/server/ai";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { idea, tone, samples } = await request.json();
    if (!idea || typeof idea !== "string") {
      return NextResponse.json({ error: "An idea is required" }, { status: 400 });
    }
    const result = await generatePost({ idea, tone, samples });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
