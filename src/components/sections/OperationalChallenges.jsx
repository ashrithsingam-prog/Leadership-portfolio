import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

function ChallengeItem({ constraint }) {
  const isResolved = constraint.status === 'resolved';
  const resolvedDate = constraint.resolvedAt 
    ? new Date(constraint.resolvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="py-5 border-b border-stone-50 last:border-0">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2.5 ${
          isResolved ? 'bg-accent' : 'bg-stone-300'
        }`} />
        <div>
          <p className="text-sm text-stone-600 leading-relaxed">
            {constraint.label}
          </p>
          <span className={`text-xs mt-2 inline-block ${isResolved ? 'text-accent/70' : 'text-stone-300'}`}>
            {isResolved ? `Resolved ${resolvedDate}` : 'In progress'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function OperationalChallenges({ section }) {
  const { data, narrative } = section;

  return (
    <section id="operational-challenges" className="section-gap">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title="Operational Challenges Navigated" />
        </AnimatedSection>

        {/* Summary + Narrative */}
        <AnimatedSection delay={100}>
          <div className="max-w-3xl mb-16">
            <div className="flex items-baseline gap-6 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-stone-900 tabular-nums">{data.totalConstraints}</span>
                <span className="text-base text-stone-400">raised</span>
              </div>
              <span className="text-stone-200 text-xl">·</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-accent tabular-nums">{data.resolved}</span>
                <span className="text-base text-stone-400">resolved</span>
              </div>
            </div>
            <p className="narrative">
              {narrative}
            </p>
          </div>
        </AnimatedSection>

        {/* Challenge list — clean, no cards */}
        <AnimatedSection delay={200}>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-300 mb-4 block">
              Key Challenges
            </span>
            {data.topConstraints.map((constraint) => (
              <ChallengeItem key={constraint.ticketId} constraint={constraint} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
