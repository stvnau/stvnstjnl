export default function Home() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b-2 border-black pt-4 pb-3 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-source-sans text-xs uppercase tracking-[0.3em] text-neutral-500">
            Your Daily Briefing for Growth &amp; Opportunity
          </p>
          <h1 className="font-playfair text-5xl font-black tracking-tight md:text-6xl">
            STVN ST Journal
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4 border-t border-neutral-300 pt-2">
            <time className="font-source-sans text-sm text-neutral-600">
              {today}
            </time>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <p className="font-lora text-xl text-neutral-700">
            First edition loading&hellip;
          </p>
          <p className="mt-2 font-source-sans text-sm text-neutral-500">
            Content will appear after the first daily refresh.
          </p>
        </div>
      </main>

      <footer className="border-t border-neutral-300 py-6 text-center">
        <p className="font-source-sans text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} STVN ST Journal. Powered by Claude.
        </p>
      </footer>
    </div>
  );
}
