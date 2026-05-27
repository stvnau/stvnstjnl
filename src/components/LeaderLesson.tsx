interface LeaderLessonProps {
  leaderName: string;
  era: string;
  lesson: string;
  application: string;
}

export function LeaderLesson({
  leaderName,
  era,
  lesson,
  application,
}: LeaderLessonProps) {
  return (
    <aside className="border-2 border-black bg-white px-6 py-5">
      <p className="font-source-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Today&rsquo;s Lesson from a Great Leader
      </p>
      <h3 className="mt-2 font-playfair text-2xl font-bold leading-tight">
        {leaderName}
      </h3>
      <p className="mt-0.5 font-source-sans text-sm italic text-neutral-500">
        {era}
      </p>
      <div className="mt-3 border-t border-rule pt-3">
        <p className="font-lora text-base leading-relaxed text-neutral-800">
          {lesson}
        </p>
      </div>
      <div className="mt-3 border-l-2 border-neutral-800 bg-neutral-50 py-2 pl-4">
        <p className="font-source-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
          Apply This Today
        </p>
        <p className="mt-1 font-lora text-sm leading-relaxed text-neutral-700">
          {application}
        </p>
      </div>
    </aside>
  );
}
