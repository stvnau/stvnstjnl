import { researchWithWebSearch } from "./anthropic";
import { interestAreas, editorialTone, siteConfig } from "./config";
import type { Article } from "@/types";

interface RawArticle {
  headline: string;
  summary: string;
  sourceUrl: string;
  sourceTitle: string;
  reframing: string;
}

function buildNewsPrompt(
  areaName: string,
  areaDescription: string,
  searchPrompt: string,
  count: number
): string {
  return `You are a senior editor at the STVN ST Journal, a distinguished broadsheet newspaper focused on personal growth and opportunity.

Research the following topic by searching the web for the most recent, noteworthy developments:

**Topic:** ${areaName} — ${areaDescription}

${searchPrompt}

Find ${count} distinct, recent news stories. For each story, provide:

1. **Headline**: A compelling, WSJ-style headline (concise, authoritative)
2. **Summary**: A factual 2-3 sentence summary that accurately reports the key findings or developments. Never invent or alter facts.
3. **Source URL**: The actual URL of the article you found
4. **Source Title**: The name of the publication
5. **Reframing**: A 2-3 sentence "What This Means for You" editorial interpretation that reframes this development through the lens of personal agency, growth, and opportunity. This must be clearly editorial — not factual claims.

${editorialTone}

Return your response as valid JSON matching this exact schema:
{
  "articles": [
    {
      "headline": "string",
      "summary": "string",
      "sourceUrl": "string",
      "sourceTitle": "string",
      "reframing": "string"
    }
  ]
}

Return ONLY the JSON object, no markdown fences, no additional text.`;
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

export async function fetchNewsForCategory(
  categorySlug: string
): Promise<Article[]> {
  const area = interestAreas.find((a) => a.slug === categorySlug);
  if (!area) throw new Error(`Unknown category: ${categorySlug}`);

  const prompt = buildNewsPrompt(
    area.name,
    area.description,
    area.searchPrompt,
    siteConfig.articlesPerCategory
  );

  const { text } = await researchWithWebSearch(
    prompt,
    siteConfig.maxSearchesPerArticle
  );

  const jsonStr = extractJson(text);
  const parsed = JSON.parse(jsonStr) as { articles: RawArticle[] };

  const today = new Date().toISOString().split("T")[0];

  return parsed.articles.map((raw, i) => ({
    id: `${categorySlug}-${today}-${i}`,
    date: today,
    category: categorySlug,
    headline: raw.headline,
    summary: raw.summary,
    sourceUrl: raw.sourceUrl,
    sourceTitle: raw.sourceTitle,
    reframing: raw.reframing,
    createdAt: new Date(),
  }));
}

export async function fetchAllNews(): Promise<Article[]> {
  const results: Article[] = [];

  for (const area of interestAreas) {
    try {
      const articles = await fetchNewsForCategory(area.slug);
      results.push(...articles);
    } catch (err) {
      console.error(`Failed to fetch news for ${area.name}:`, err);
    }
  }

  return results;
}
