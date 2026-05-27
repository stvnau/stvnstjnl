export const siteConfig = {
  name: "STVN ST Journal",
  tagline: "Your Daily Briefing for Growth & Opportunity",
  model: "claude-sonnet-4-6-20250514",
  refreshCadence: "daily",
  articlesPerCategory: 2,
  maxSearchesPerArticle: 5,
};

export interface InterestArea {
  slug: string;
  name: string;
  description: string;
  searchPrompt: string;
}

export const interestAreas: InterestArea[] = [
  {
    slug: "fitness",
    name: "Fitness",
    description: "Losing body fat, building lean muscle",
    searchPrompt:
      "Find the latest news, research, or developments related to fitness, body recomposition, fat loss, and building lean muscle. Focus on actionable science-backed findings, new training methodologies, or nutrition research.",
  },
  {
    slug: "ai",
    name: "AI & Anthropic",
    description: "AI applications, especially Anthropic tools (Claude, Claude Code, the API)",
    searchPrompt:
      "Find the latest news about AI applications, especially Anthropic's tools including Claude, Claude Code, and the Claude API. Include product launches, capability updates, developer tools, and practical AI applications.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description: "Hotels and improving guest experience",
    searchPrompt:
      "Find the latest news and trends in the hospitality industry, focusing on hotels, guest experience innovation, service excellence, and technology improving the hotel guest journey.",
  },
  {
    slug: "print",
    name: "Print Production",
    description: "Physical print production of written materials",
    searchPrompt:
      "Find the latest news about physical print production, publishing, bookmaking, print technology, paper manufacturing, or the print industry for written materials like books, magazines, and journals.",
  },
  {
    slug: "charisma",
    name: "Charisma & Confidence",
    description: "Building charisma and confidence",
    searchPrompt:
      "Find the latest research, articles, or expert insights on building charisma, confidence, executive presence, social skills, and personal magnetism. Include psychology research, leadership communication, and practical frameworks.",
  },
];

export const editorialTone = `You are a senior editor at a distinguished broadsheet newspaper. Your reporting is:
- Factually rigorous: never invent, embellish, or alter facts
- Authoritative yet accessible: clear, precise language without jargon
- Opportunity-focused: after presenting the facts, you add a clearly separated editorial section that reframes the story through the lens of personal agency and growth
- The editorial reframing must be labeled "What This Means for You" and must not change any facts
- Include real source URLs for every claim
- Write in a style reminiscent of the Wall Street Journal: professional, measured, insightful`;
