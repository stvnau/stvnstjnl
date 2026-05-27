import { researchWithWebSearch } from "./anthropic";
import { interestAreas, editorialTone } from "./config";
import type { LeaderLesson } from "@/types";

function buildLeaderPrompt(): string {
  const areaNames = interestAreas.map((a) => a.name).join(", ");

  return `You are a senior editor at the STVN ST Journal. Generate today's "Lesson from a Great Leader" feature.

Choose a historical leader — someone widely respected for their achievements, character, or influence. Vary across eras, cultures, and domains (military, political, scientific, artistic, philosophical, business). Do NOT repeat common choices like Marcus Aurelius, Lincoln, or Churchill every time — dig deeper.

Provide:
1. **Leader name**: Full name
2. **Era**: Brief descriptor (e.g., "Roman Emperor, 161–180 AD" or "Civil Rights Leader, 1950s–1960s")
3. **Lesson**: A 3-4 sentence narrative about a specific moment, decision, or practice from this leader's life that demonstrates a powerful principle. Include a real quote if one exists. Be factually accurate.
4. **Application**: A 2-3 sentence concrete, actionable way to apply this lesson today. Tie it to one of these interest areas where natural: ${areaNames}.
5. **Related category**: If the lesson naturally connects to one of [${interestAreas.map((a) => a.slug).join(", ")}], include that slug. Otherwise null.

${editorialTone}

Return ONLY valid JSON matching this schema:
{
  "leaderName": "string",
  "era": "string",
  "lesson": "string",
  "application": "string",
  "relatedCategory": "string | null"
}

No markdown fences, no additional text.`;
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();

  const braceStart = text.indexOf("{");
  const braceEnd = text.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd !== -1) {
    return text.slice(braceStart, braceEnd + 1);
  }

  return text.trim();
}

export async function fetchLeaderLesson(): Promise<LeaderLesson> {
  const prompt = buildLeaderPrompt();
  const { text } = await researchWithWebSearch(prompt, 3);

  const jsonStr = extractJson(text);
  const parsed = JSON.parse(jsonStr) as {
    leaderName: string;
    era: string;
    lesson: string;
    application: string;
    relatedCategory: string | null;
  };

  const today = new Date().toISOString().split("T")[0];

  return {
    id: `leader-${today}`,
    date: today,
    leaderName: parsed.leaderName,
    era: parsed.era,
    lesson: parsed.lesson,
    application: parsed.application,
    relatedCategory: parsed.relatedCategory,
    createdAt: new Date(),
  };
}
