interface MastheadProps {
  date: string;
}

export function Masthead({ date }: MastheadProps) {
  return (
    <header className="border-b-[3px] border-double border-black">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between border-b border-rule py-1">
          <p className="font-source-sans text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Your Daily Briefing for Growth &amp; Opportunity
          </p>
          <p className="font-source-sans text-[11px] text-neutral-500">
            {date}
          </p>
        </div>
        <div className="py-3 text-center">
          <h1 className="font-playfair text-[3.5rem] font-black leading-none tracking-tight md:text-[4.5rem]">
            STVN ST Journal
          </h1>
        </div>
      </div>
    </header>
  );
}
