import { NextRequest, NextResponse } from "next/server";
import { fetchAllNews } from "@/lib/news-service";
import { fetchLeaderLesson } from "@/lib/leader-service";
import { setCachedContent, buildDailyContent } from "@/lib/cache";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.REFRESH_SECRET;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "REFRESH_SECRET not configured" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  try {
    const [articles, leaderLesson] = await Promise.all([
      fetchAllNews(),
      fetchLeaderLesson(),
    ]);

    const content = buildDailyContent(articles, leaderLesson);
    setCachedContent(content);

    const duration = Date.now() - start;

    return NextResponse.json({
      status: "ok",
      date: content.date,
      articleCount: articles.length,
      hasLeaderLesson: !!leaderLesson,
      duration: `${duration}ms`,
    });
  } catch (err) {
    const duration = Date.now() - start;
    console.error("Refresh failed:", err);

    return NextResponse.json(
      {
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}
