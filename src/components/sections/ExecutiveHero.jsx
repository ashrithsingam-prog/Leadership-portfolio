import AnimatedSection from '../shared/AnimatedSection';

function formatMonth(monthId) {
  const [year, month] = monthId.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function ExecutiveHero({ employee, summary, monthId, uid }) {
  const { data, narrative } = summary;
  const delta = data.compositeScore - data.previousMonthScore;

  return (
    <section id="executive-hero" className="relative">
      <div className="max-w-[56rem] mx-auto px-6 pt-14 pb-16 md:pt-24 md:pb-28">
        {/* Top meta line — documentary provenance */}
        <AnimatedSection>
          <div className="flex items-center gap-2.5 mb-14 md:mb-20 text-[11px] tracking-[0.08em] uppercase text-stone-300">
            <span>Leadership Portfolio</span>
            <span className="text-stone-150">·</span>
            <span className="font-mono tracking-normal normal-case">{uid}</span>
            <span className="text-stone-150">·</span>
            <span>{formatMonth(monthId)}</span>
          </div>
        </AnimatedSection>

        {/* Identity — compact, understated */}
        <AnimatedSection delay={80}>
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <div className="w-11 h-11 rounded-xl bg-stone-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold tracking-tight">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-[15px] font-medium text-stone-800 leading-tight">
                {employee.name}
              </p>
              <p className="text-[13px] text-stone-400 mt-0.5 leading-tight">
                {employee.role} · {employee.program}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Hero Headline */}
        <AnimatedSection delay={160}>
          <h2 className="font-serif text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-normal text-stone-900 leading-[1.1] tracking-[-0.03em] max-w-[48rem]">
            Strongest month since joining — driven by breakthrough operational execution in Facility&nbsp;3.
          </h2>
        </AnimatedSection>

        {/* Score line — inline with narrative rhythm */}
        <AnimatedSection delay={260}>
          <div className="mt-10 md:mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <span className="text-[3.25rem] md:text-[3.75rem] font-semibold text-stone-900 tracking-tight tabular-nums leading-none">
              {data.compositeScore}
            </span>
            <span className="text-sm text-stone-400">composite score</span>
            <span className="hidden md:inline text-stone-150 text-lg">|</span>
            <span className="text-sm text-accent font-medium">↑ {delta} from {data.previousMonthScore}</span>
            <span className="hidden md:inline text-stone-150 text-lg">|</span>
            <span className="text-xs font-medium text-accent bg-accent-subtle px-3 py-1.5 rounded-full">
              Ahead of Plan
            </span>
            <span className="text-xs font-medium text-stone-500 bg-stone-50 px-3 py-1.5 rounded-full">
              {data.currentLevel} → V3
            </span>
          </div>
        </AnimatedSection>

        {/* Narrative */}
        <AnimatedSection delay={350}>
          <p className="narrative mt-10 md:mt-14 max-w-[44rem]">
            {narrative}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
