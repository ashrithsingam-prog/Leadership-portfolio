import { useRef, useEffect, useState } from 'react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function CareerTrajectory({ section }) {
  const { data, narrative } = section;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const currentIndex = data.milestones.findIndex(m => m.level === data.currentLevel);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="career-trajectory" className="section-gap">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title="Career Trajectory" />
        </AnimatedSection>

        {/* Big aspirational callout */}
        <AnimatedSection delay={100}>
          <div className="max-w-3xl mb-20">
            <p className="pull-quote mb-8">
              Projected to reach V3 by {formatDate(data.projectedDate)} — nearly three months ahead of the planned {formatDate(data.milestones.find(m => m.level === 'V3')?.targetDate)} target.
            </p>
            <p className="narrative">
              {narrative}
            </p>
          </div>
        </AnimatedSection>

        {/* Elegant inline timeline */}
        <AnimatedSection delay={200}>
          <div ref={ref} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-300 mb-10 block">
              Growth Ladder
            </span>
            
            <div className="relative flex items-center justify-between py-4">
              {/* Track line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-100 -translate-y-1/2">
                <div 
                  className="h-full bg-stone-300 transition-all duration-[1500ms] ease-out"
                  style={{ 
                    width: isVisible 
                      ? `${(currentIndex / (data.milestones.length - 1)) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>

              {data.milestones.map((m, i) => {
                const isCurrent = m.level === data.currentLevel;
                const isPast = i < currentIndex;
                const isProjected = m.level === data.projectedNextLevel;

                return (
                  <div key={m.level} className="relative flex flex-col items-center z-10">
                    {/* Projected label */}
                    {isProjected && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-[10px] font-semibold text-accent">
                          {formatDate(data.projectedDate)}
                        </span>
                      </div>
                    )}
                    
                    {/* Node */}
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                      isCurrent 
                        ? 'bg-stone-900 text-white' 
                        : isPast
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-stone-50 text-stone-300 border border-stone-100'
                    }`}>
                      {m.level}
                    </div>

                    {/* Date label */}
                    <span className={`mt-3 text-xs ${isCurrent ? 'text-stone-600 font-medium' : 'text-stone-300'}`}>
                      {formatDate(m.targetDate)}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] text-stone-400 mt-0.5">Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Growth gaps — understated */}
        <AnimatedSection delay={300}>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-300 mb-5 block">
              Growth Areas for V3 Readiness
            </span>
            {data.gapDrivers.map((gap, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
                <span className="text-xs text-warm/60 mt-0.5">●</span>
                <p className="text-sm text-stone-500 leading-relaxed">{gap}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
