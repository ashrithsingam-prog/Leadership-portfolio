import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

function KpiLine({ kpi }) {
  const isHit = kpi.status === 'hit';
  const actual = kpi.unit === 'percent' ? `${kpi.actual}%` : kpi.actual;
  const target = kpi.unit === 'percent' ? `${kpi.target}%` : kpi.target;

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-stone-50 last:border-0">
      <div className="flex items-center gap-2.5">
        <div className={`w-1 h-1 rounded-full flex-shrink-0 ${isHit ? 'bg-accent' : 'bg-stone-200'}`} />
        <span className="text-[13px] text-stone-500">{kpi.label}</span>
      </div>
      <div className="flex items-center gap-5 text-right">
        <span className="text-[11px] text-stone-300 tabular-nums">{target}</span>
        <span className={`text-[13px] font-semibold tabular-nums ${isHit ? 'text-stone-800' : 'text-stone-400'}`}>
          {actual}
        </span>
      </div>
    </div>
  );
}

export default function KpiImpact({ section }) {
  const { data, narrative } = section;
  const hitCount = data.details.filter(k => k.status === 'hit').length;

  return (
    <section id="kpi-impact" className="section-gap">
      <div className="max-w-[56rem] mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title="KPI Impact" />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-[44rem] mb-14">
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="text-4xl font-semibold text-stone-900 tabular-nums">{hitCount}</span>
              <span className="text-sm text-stone-400">of {data.details.length} targets hit</span>
            </div>
            <p className="narrative">{narrative}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-[36rem]">
            {data.details.map((kpi) => (
              <KpiLine key={kpi.kpiId} kpi={kpi} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
