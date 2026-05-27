import { Masthead } from "@/components/Masthead";
import { ArticleCard } from "@/components/ArticleCard";
import { LeaderLesson } from "@/components/LeaderLesson";
import { SectionDivider } from "@/components/SectionDivider";
import { interestAreas } from "@/lib/config";

const dummyArticles: Record<
  string,
  { headline: string; summary: string; sourceUrl: string; sourceTitle: string; reframing: string }[]
> = {
  fitness: [
    {
      headline:
        "New Meta-Analysis Confirms High-Protein Diets Preserve Muscle During Fat Loss",
      summary:
        "A comprehensive review of 74 randomized controlled trials, published in the British Journal of Sports Medicine, found that consuming 1.6g of protein per kilogram of body weight daily significantly reduces muscle loss during caloric deficits. The effect was most pronounced in individuals who combined dietary protein with resistance training at least three times per week.",
      sourceUrl: "https://example.com/protein-study",
      sourceTitle: "British Journal of Sports Medicine",
      reframing:
        "This reinforces that your body recomposition goal is scientifically backed — you don't have to choose between losing fat and keeping muscle. The actionable threshold is clear: hit 1.6g/kg protein daily and keep lifting. Track your protein for one week to see where you stand against this benchmark.",
    },
    {
      headline:
        "Time-Restricted Eating Shows No Advantage Over Standard Calorie Reduction",
      summary:
        "A year-long clinical trial at Southern Medical University found that restricting eating to an 8-hour window produced the same fat loss results as conventional calorie counting, suggesting the timing of meals matters less than total intake for body composition.",
      sourceUrl: "https://example.com/fasting-study",
      sourceTitle: "New England Journal of Medicine",
      reframing:
        "This is liberating — it means you can structure your eating window however fits your lifestyle and social schedule. The constraint that matters is total calories and protein, not when you eat. Design your meal timing around your energy and training, not arbitrary rules.",
    },
  ],
  ai: [
    {
      headline:
        "Anthropic Launches Claude Code for Enterprise Teams with Shared Memory",
      summary:
        "Anthropic announced a new enterprise tier for Claude Code that enables teams to share project context, coding conventions, and institutional knowledge across developers. The feature uses persistent memory to maintain awareness of codebases, style guides, and architecture decisions across sessions.",
      sourceUrl: "https://example.com/claude-code-enterprise",
      sourceTitle: "Anthropic Blog",
      reframing:
        "If you're building tools or services for teams, this signals where the market is heading: AI that understands organizational context, not just code. Consider how your own projects could benefit from documenting conventions in a way that AI assistants can leverage — the payoff compounds over time.",
    },
    {
      headline:
        "Claude API Web Search Tool Enables Real-Time Research Agents",
      summary:
        "Developers are building autonomous research agents using Claude's web search tool, which allows the API to search the internet and cite sources in real-time. Early applications range from competitive intelligence dashboards to personalized news curation systems.",
      sourceUrl: "https://example.com/claude-web-search",
      sourceTitle: "TechCrunch",
      reframing:
        "You're already building exactly this kind of application with the STVN ST Journal. You're ahead of the curve — most developers haven't realized that Claude's web search turns a simple API call into a full research pipeline. Document what you learn and share the patterns.",
    },
  ],
  hospitality: [
    {
      headline:
        "Marriott Invests $500M in AI-Powered Guest Personalization Platform",
      summary:
        "Marriott International announced a half-billion-dollar investment in an AI system that will personalize every touchpoint of the guest journey, from pre-arrival preferences to in-room environment settings. The system uses historical stay data to anticipate guest needs before they're expressed.",
      sourceUrl: "https://example.com/marriott-ai",
      sourceTitle: "Hotel Management Magazine",
      reframing:
        "The hospitality giants are betting that anticipatory service — knowing what a guest wants before they ask — is the future differentiator. You don't need $500M to apply this principle: even small operations can track repeat guest preferences in a simple system. Start by identifying the three most common requests at your property and proactively addressing them.",
    },
  ],
  print: [
    {
      headline:
        "Risograph Printing Sees 40% Growth as Creators Seek Tactile Media",
      summary:
        "The niche risograph printing market has grown 40% year-over-year, driven by independent publishers, zine makers, and artists seeking the distinctive textured look that digital printing can't replicate. Studios report waitlists of 3-6 months for new clients.",
      sourceUrl: "https://example.com/riso-growth",
      sourceTitle: "Print Magazine",
      reframing:
        "The demand for physical, tactile media is surging precisely because everything else is digital. If you're producing written materials, the medium itself becomes part of the message. Explore risograph or letterpress for limited-run pieces — the constraints of physical production force creative clarity that digital never demands.",
    },
  ],
  charisma: [
    {
      headline:
        "Harvard Study: Active Listening Increases Perceived Charisma by 32%",
      summary:
        "Researchers at Harvard Business School found that individuals who practiced structured active listening — paraphrasing, asking follow-up questions, and maintaining appropriate eye contact — were rated 32% more charismatic by conversation partners. The effect was strongest in professional settings.",
      sourceUrl: "https://example.com/charisma-study",
      sourceTitle: "Harvard Business Review",
      reframing:
        "Charisma isn't an innate trait — it's a set of learnable behaviors, and listening is the highest-leverage one. In your next three conversations today, practice the paraphrase technique: before responding, briefly restate what the other person said. It costs nothing and the research says the impact is immediate.",
    },
  ],
};

const dummyLeaderLesson = {
  leaderName: "Marcus Aurelius",
  era: "Roman Emperor, 161–180 AD",
  lesson:
    "\"The impediment to action advances action. What stands in the way becomes the way.\" Marcus Aurelius governed Rome through plague, war, and political betrayal — yet his private journals reveal a man who treated every obstacle as raw material for growth. When the Antonine Plague killed millions, he didn't retreat; he reformed public health policy and personally funded relief efforts. His Meditations weren't written for publication — they were a daily practice of reframing hardship as opportunity.",
  application:
    "Identify the one thing you're currently avoiding because it feels like an obstacle. Reframe it: what skill would you build by tackling it directly? The obstacle isn't blocking your path — it is your path. Write down one concrete action you can take today to move toward it rather than around it.",
};

export default function Home() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const leadArticle = dummyArticles.ai[0];

  return (
    <div className="min-h-screen bg-cream">
      <Masthead date={today} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Lead Story */}
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

        {/* Two-column body: articles left, leader lesson right */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left column: all sections */}
          <div>
            {interestAreas.map((area) => {
              const articles = dummyArticles[area.slug];
              if (!articles || articles.length === 0) return null;

              const isFirstAreaArticleSameAsLead =
                area.slug === "ai" &&
                articles[0].headline === leadArticle.headline;

              const displayArticles = isFirstAreaArticleSameAsLead
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
                    {displayArticles.map((article, i) => (
                      <ArticleCard
                        key={i}
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

          {/* Right column: leader lesson (sticky) */}
          <aside className="lg:mt-0">
            <div className="lg:sticky lg:top-6">
              <LeaderLesson
                leaderName={dummyLeaderLesson.leaderName}
                era={dummyLeaderLesson.era}
                lesson={dummyLeaderLesson.lesson}
                application={dummyLeaderLesson.application}
              />
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
          Last updated: {today}
        </p>
      </footer>
    </div>
  );
}
