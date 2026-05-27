interface ArticleCardProps {
  headline: string;
  summary: string;
  sourceUrl: string;
  sourceTitle: string;
  reframing: string;
  isLead?: boolean;
}

export function ArticleCard({
  headline,
  summary,
  sourceUrl,
  sourceTitle,
  reframing,
  isLead = false,
}: ArticleCardProps) {
  return (
    <article className={isLead ? "mb-8" : "mb-6"}>
      <h3
        className={`font-playfair font-bold leading-tight ${
          isLead ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
        }`}
      >
        {headline}
      </h3>
      <p
        className={`mt-2 font-lora leading-relaxed text-neutral-800 ${
          isLead ? "text-lg" : "text-base"
        }`}
      >
        {summary}
      </p>
      <p className="mt-2 font-source-sans text-xs text-neutral-500">
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-800"
        >
          {sourceTitle}
        </a>
      </p>
      <div className="mt-3 border-l-2 border-amber-700 bg-amber-50/50 py-2 pl-4">
        <p className="font-source-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-800">
          What This Means for You
        </p>
        <p className="mt-1 font-lora text-sm leading-relaxed text-neutral-700">
          {reframing}
        </p>
      </div>
    </article>
  );
}
