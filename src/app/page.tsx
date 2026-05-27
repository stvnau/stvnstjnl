import { Masthead } from "@/components/Masthead";
import { ArticleCard } from "@/components/ArticleCard";
import { LeaderLesson } from "@/components/LeaderLesson";
import { SectionDivider } from "@/components/SectionDivider";
import { interestAreas } from "@/lib/config";
import { getCachedContent } from "@/lib/cache";
import type { Article, DailyContent } from "@/types";

export const dynamic = "force-dynamic";

const dummyContent: DailyContent = {
  date: new Date().toISOString().split("T")[0],
  lastUpdated: new Date().toISOString(),
  leaderLesson: {
    id: "leader-dummy",
    date: new Date().toISOString().split("T")[0],
    leaderName: "Marcus Aurelius",
    era: "Roman Emperor, 161–180 AD",
    lesson:
      '"The impediment to action advances action. What stands in the way becomes the way." Marcus Aurelius governed Rome through plague, war, and political betrayal — yet his private journals reveal a man who treated every obstacle as raw material for growth. When the Antonine Plague killed millions, he didn\'t retreat; he reformed public health policy and personally funded relief efforts. His Meditations weren\'t written for publication — they were a daily practice of reframing hardship as opportunity.',
    application:
      "Identify the one thing you're currently avoiding because it feels like an obstacle. Reframe it: what skill would you build by tackling it directly? The obstacle isn't blocking your path — it is your path. Write down one concrete action you can take today to move toward it rather than around it.",
    relatedCategory: "charisma",
    createdAt: new Date(),
  },
  articles: [
    {
      id: "ai-dummy-0",
      date: new Date().toISOString().split("T")[0],
      category: "ai",
      headline:
        "Anthropic Launches Claude Code for Enterprise Teams with Shared Memory",
      summary:
        "Anthropic announced a new enterprise tier for Claude Code that enables teams to share project context, coding conventions, and institutional knowledge across developers. The feature uses persistent memory to maintain awareness of codebases, style guides, and architecture decisions across sessions.",
      sourceUrl: "https://example.com",
      sourceTitle: "Anthropic Blog",
      reframing:
        "If you're building tools or services for teams, this signals where the market is heading: AI that understands organizational context, not just code. Consider how your own projects could benefit from documenting conventions in a way that AI assistants can leverage — the payoff compounds over time.",
      createdAt: new Date(),
    },
    {
      id: "fitness-dummy-0",
      date: new Date().toISOString().split("T")[0],
      category: "fitness",
      headline:
        "New Meta-Analysis Confirms High-Protein Diets Preserve Muscle During Fat Loss",
      summary:
        "A comprehensive review of 74 randomized controlled trials found that consuming 1.6g of protein per kilogram of body weight daily significantly reduces muscle loss during caloric deficits. The effect was most pronounced in individuals who combined dietary protein with resistance training at least three times per week.",
      sourceUrl: "https://example.com",
      sourceTitle: "British Journal of Sports Medicine",
      reframing:
        "Your body recomposition goal is scientifically backed — you don't have to choose between losing fat and keeping muscle. The actionable threshold is clear: hit 1.6g/kg protein daily and keep lifting. Track your protein for one week to see where you stand against this benchmark.",
      createdAt: new Date(),
    },
    {
      id: "hospitality-dummy-0",
      date: new Date().toISOString().split("T")[0],
      category: "hospitality",
      headline:
        "Marriott Invests $500M in AI-Powered Guest Personalization Platform",
      summary:
        "Marriott International announced a half-billion-dollar investment in an AI system that will personalize every touchpoint of the guest journey, from pre-arrival preferences to in-room environment settings.",
      sourceUrl: "https://example.com",
      sourceTitle: "Hotel Management Magazine",
      reframing:
        "The hospitality giants are betting that anticipatory service is the future differentiator. You don't need $500M to apply this principle: even small operations can track repeat guest preferences in a simple system.",
      createdAt: new Date(),
    },
    {
      id: "print-dummy-0",
      date: new Date().toISOString().split("T")[0],
      category: "print",
      headline:
        "Risograph Printing Sees 40% Growth as Creators Seek Tactile Media",
      summary:
        "The niche risograph printing market has grown 40% year-over-year, driven by independent publishers and artists seeking the distinctive textured look that digital printing can't replicate.",
      sourceUrl: "https://example.com",
      sourceTitle: "Print Magazine",
      reframing:
        "The demand for physical, tactile media is surging precisely because everything else is digital. The medium itself becomes part of the message. Explore risograph or letterpress for limited-run pieces.",
      createdAt: new Date(),
    },
    {
      id: "charisma-dummy-0",
      date: new Date().toISOString().split("T")[0],
      category: "charisma",
      headline:
        "Harvard Study: Active Listening Increases Perceived Charisma by 32%",
      summary:
        "Researchers at Harvard Business School found that individuals who practiced structured active listening were rated 32% more charismatic by conversation partners. The effect was strongest in professional settings.",
      sourceUrl: "https://example.com",
      sourceTitle: "Harvard Business Review",
      reframing:
        "Charisma isn't an innate trait — it's a set of learnable behaviors, and listening is the highest-leverage one. In your next three conversations today, practice the paraphrase technique before responding.",
      createdAt: new Date(),
    },
  ],
};

export default function Home() {
  const cached = getCachedContent();
  const content = cached ?? dummyContent;
  const isPlaceholder = !cached;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articlesByCategory = new Map<string, Article[]>();
  for (const article of content.articles) {
    const existing = articlesByCategory.get(article.category) ?? [];
    existing.push(article);
    articlesByCategory.set(article.category, existing);
  }

  const leadArticle = content.articles[0] ?? null;

  return (
    <div className="min-h-screen bg-cream">
      <Masthead date={today} />

      {isPlaceholder && (
        <div className="border-b border-rule bg-amber-50 py-2 text-center">
          <p className="font-source-sans text-xs text-amber-800">
            Displaying placeholder content — real articles will appear after the
            first daily refresh.
          </p>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Lead Story */}
        {leadArticle && (
          <div className="border-b border-rule pb-6">
            <ArticleCard
              headline={leadArticle.headline}
              summary={leadArticle.summary}
              sourceUrl={leadArticle.sourceUrl}
              sourceTitle={leadArticle.sourceTitle}
              reframing={leadArticle.reframing}
              isLead
            />
          </div>
        )}

        {/* Two-column body */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left column: all sections */}
          <div>
            {interestAreas.map((area) => {
              const articles = articlesByCategory.get(area.slug);
              if (!articles || articles.length === 0) return null;

              const displayArticles =
                leadArticle && articles[0]?.id === leadArticle.id
                  ? articles.slice(1)
                  : articles;

              if (displayArticles.length === 0) return null;

              return (
                <section key={area.slug}>
                  <SectionDivider
                    title={area.name}
                    description={area.description}
                  />
                  <div className="space-y-6">
                    {displayArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        headline={article.headline}
                        summary={article.summary}
                        sourceUrl={article.sourceUrl}
                        sourceTitle={article.sourceTitle}
                        reframing={article.reframing}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Right column: leader lesson */}
          <aside>
            <div className="lg:sticky lg:top-6">
              {content.leaderLesson && (
                <LeaderLesson
                  leaderName={content.leaderLesson.leaderName}
                  era={content.leaderLesson.era}
                  lesson={content.leaderLesson.lesson}
                  application={content.leaderLesson.application}
                />
              )}
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t-2 border-black py-6 text-center">
        <p className="font-source-sans text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} STVN ST Journal &mdash; Powered by
          Claude. All facts sourced from original reporting.
        </p>
        <p className="mt-1 font-source-sans text-[10px] text-neutral-400">
          Last updated:{" "}
          {new Date(content.lastUpdated).toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
      </footer>
    </div>
  );
}
