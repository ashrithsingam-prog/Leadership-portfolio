import { useRef, useEffect, useState } from 'react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

function CapabilityRow({ label, score, threshold = 60, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isBelowThreshold = score < threshold;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="group py-4">
      <div className="flex items-baseline justify-between mb-2.5">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-stone-600">{label}</span>
          {isBelowThreshold && (
            <span className="text-[10px] text-warm/70">
              below threshold
            </span>
          )}
        </div>
        <span className={`text-base font-semibold tabular-nums ${isBelowThreshold ? 'text-warm/80' : 'text-stone-800'}`}>
          {score}
        </span>
      </div>
      
      <div className="relative h-[2px] bg-stone-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 bottom-0 w-px bg-stone-200 z-10"
          style={{ left: `${threshold}%` }}
        />
        <div
          className={`h-full rounded-full transition-all duration-[1400ms] ease-out ${
            isBelowThreshold 
              ? 'bg-amber-300/60' 
              : 'bg-stone-400/70'
          }`}
          style={{ width: isVisible ? `${score}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function CapabilityGrowth({ section }) {
  const { data, narrative } = section;

  const capabilities = [
    { label: 'Engagement', score: data.ritualScore },
    { label: 'Delivery Consistency', score: data.deliveryRate },
    { label: 'Original Work', score: data.ipScore },
    { label: 'KPI Performance', score: data.kpiScore },
    { label: 'Operational Discipline', score: data.processScore },
    { label: 'Structured Thinking', score: data.frameworkScore },
  ];

  capabilities.sort((a, b) => b.score - a.score);

  return (
    <section id="capability-growth" className="section-gap">
      <div className="max-w-[56rem] mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title="Capability Growth" />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <p className="narrative max-w-[44rem] mb-14">
            {narrative}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-[44rem]">
            <div className="flex items-center justify-between mb-6 text-[10px] tracking-[0.1em] uppercase text-stone-300">
              <span>Capability Scores</span>
              <span className="tracking-normal normal-case">V3 threshold at 60</span>
            </div>
            
            {capabilities.map((cap, i) => (
              <CapabilityRow
                key={cap.label}
                label={cap.label}
                score={cap.score}
                threshold={60}
                delay={i * 80}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
