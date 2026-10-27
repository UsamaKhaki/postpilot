import { env, aiConfigured } from "@/lib/env";

export type GenerateInput = {
  idea: string;
  tone?: string;
  samples?: string[];
};

const MAX_IDEA_LENGTH = 2000;
const MAX_SAMPLES = 5;

/** Validates an untrusted request body for `generatePost`. */
export function parseGenerateInput(
  raw: unknown,
): { ok: true; value: GenerateInput } | { ok: false; error: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Expected a JSON object" };
  }
  const { idea, tone, samples } = raw as Record<string, unknown>;

  if (typeof idea !== "string" || !idea.trim()) {
    return { ok: false, error: "An idea is required" };
  }
  if (idea.length > MAX_IDEA_LENGTH) {
    return { ok: false, error: `Idea must be at most ${MAX_IDEA_LENGTH} characters` };
  }
  if (tone != null && typeof tone !== "string") {
    return { ok: false, error: "Tone must be a string" };
  }
  if (samples != null && !(Array.isArray(samples) && samples.every((s) => typeof s === "string"))) {
    return { ok: false, error: "Samples must be an array of strings" };
  }

  return {
    ok: true,
    value: {
      idea,
      tone: tone ?? undefined,
      samples: samples?.slice(0, MAX_SAMPLES),
    },
  };
}

const SYSTEM = `You are Postpilot, a ghostwriter for LinkedIn. Write a single LinkedIn post in the user's voice.
Rules: strong first-line hook, short punchy lines, one clear takeaway, no hashtags inside the body, no emojis unless natural. Keep it under 120 words.`;

function buildPrompt({ idea, tone, samples }: GenerateInput) {
  const voice = samples?.length
    ? `\n\nMatch the voice of these samples:\n${samples.slice(0, MAX_SAMPLES).map((s) => `- ${s}`).join("\n")}`
    : "";
  return `Tone: ${tone ?? "Punchy"}.\nIdea: ${idea}${voice}`;
}

async function withOpenAI(input: GenerateInput): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: buildPrompt(input) },
      ],
      temperature: 0.8,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function withAnthropic(input: GenerateInput): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: "user", content: buildPrompt(input) }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}

/** Deterministic local draft so the composer works with no API key. */
function fallbackDraft({ idea, tone }: GenerateInput): string {
  const topic = idea.trim() || "what we learned this quarter";
  const hook =
    tone === "Contrarian"
      ? "Unpopular opinion:"
      : tone === "Story-driven"
        ? "A quick story 👇"
        : tone === "Analytical"
          ? "The data surprised us."
          : "Here's something most teams miss.";
  return `${hook}\n\n${topic[0].toUpperCase() + topic.slice(1)}.\n\nThree things that actually moved the needle:\n\n1. We shipped smaller and shipped sooner.\n2. We measured the one number that mattered.\n3. We wrote down what we learned — in plain words.\n\nConsistency beat intensity. Every time.`;
}

export async function generatePost(input: GenerateInput): Promise<{
  text: string;
  source: "openai" | "anthropic" | "fallback";
}> {
  if (aiConfigured()) {
    const source = env.OPENAI_API_KEY ? "openai" : "anthropic";
    try {
      const text = source === "openai" ? await withOpenAI(input) : await withAnthropic(input);
      if (text) return { text, source };
      console.warn(`[ai] ${source} returned an empty draft, using local fallback`);
    } catch (error) {
      // Keep the composer usable when the provider is down, but leave a trace.
      console.error(`[ai] ${source} generation failed, using local fallback`, error);
    }
  }
  return { text: fallbackDraft(input), source: "fallback" };
}
