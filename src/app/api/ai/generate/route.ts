import { NextResponse } from "next/server";
import { generatePost, parseGenerateInput } from "@/server/ai";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = parseGenerateInput(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await generatePost(parsed.value);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[ai] generate route failed", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
