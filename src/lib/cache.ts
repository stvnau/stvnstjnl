import type { Article, LeaderLesson, DailyContent } from "@/types";

let cachedContent: DailyContent | null = null;

export function getCachedContent(): DailyContent | null {
  return cachedContent;
}

export function setCachedContent(content: DailyContent): void {
  cachedContent = content;
}

export function isCacheStale(): boolean {
  if (!cachedContent) return true;
  const today = new Date().toISOString().split("T")[0];
  return cachedContent.date !== today;
}

export function buildDailyContent(
  articles: Article[],
  leaderLesson: LeaderLesson | null
): DailyContent {
  return {
    date: new Date().toISOString().split("T")[0],
    articles,
    leaderLesson,
    lastUpdated: new Date().toISOString(),
  };
}
