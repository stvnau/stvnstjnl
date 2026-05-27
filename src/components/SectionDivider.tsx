interface SectionDividerProps {
  title: string;
  description?: string;
}

export function SectionDivider({ title, description }: SectionDividerProps) {
  return (
    <div className="mb-5 mt-8 border-b border-t-2 border-t-black border-b-rule pb-1 pt-2 first:mt-0">
      <div className="flex items-baseline justify-between">
        <h2 className="font-playfair text-lg font-bold uppercase tracking-wide">
          {title}
        </h2>
        {description && (
          <p className="font-source-sans text-xs text-neutral-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
