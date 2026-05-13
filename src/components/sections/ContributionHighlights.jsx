import { useState } from 'react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

function AchievementItem({ commit, index }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(commit.createdAt);
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const parts = commit.description.split(' — ');
  const title = parts[0];
  const detail = parts.length > 1 ? parts.slice(1).join(' — ') : null;

  return (
    <div
      className="group py-5 border-b border-stone-50 last:border-0 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h4 className="text-[15px] font-medium text-stone-700 group-hover:text-stone-900 transition-colors leading-snug">
            {title}
          </h4>
          {detail && (
            <p className={`text-sm text-stone-400 mt-2 leading-relaxed transition-all duration-500 ease-out ${
              expanded ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
            }`}>
              {detail}
            </p>
          )}
        </div>
        <span className="flex-shrink-0 text-[11px] text-stone-300 font-mono mt-1">
          {formatted}
        </span>
      </div>
    </div>
  );
}

export default function ContributionHighlights({ section }) {
  const { data, narrative } = section;

  return (
    <section id="contribution-highlights" className="section-gap">
      <div className="max-w-[56rem] mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title="Contribution Highlights" />
        </AnimatedSection>

        {/* Narrative first */}
        <AnimatedSection delay={100}>
          <p className="narrative max-w-[44rem] mb-14">
            {narrative}
          </p>
        </AnimatedSection>

        {/* Key figures — editorial inline */}
        <AnimatedSection delay={180}>
          <div className="mb-16">
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5">
              <div>
                <span className="text-[3.25rem] md:text-[3.75rem] font-semibold text-stone-900 tracking-tight tabular-nums leading-none">
                  {data.completed}
                </span>
                <span className="text-sm text-stone-400 ml-2">deliverables</span>
              </div>
              <div>
                <span className="text-[3.25rem] md:text-[3.75rem] font-semibold text-stone-900 tracking-tight tabular-nums leading-none">
                  {data.ipCommitCount}
                </span>
                <span className="text-sm text-stone-400 ml-2">original work</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-[13px] text-stone-300">
              <span>{data.pendingQa} awaiting review</span>
              <span>·</span>
              <span>{data.inProgress} in progress</span>
              <span>·</span>
              <span>{data.totalDeliverables} total assigned</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Featured work — clean typographic list */}
        <AnimatedSection delay={260}>
          <div className="max-w-[44rem]">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-300 mb-5">
              Featured Original Work
            </p>
            <div>
              {data.recentCommits.slice(0, 5).map((commit, i) => (
                <AchievementItem key={commit.id} commit={commit} index={i} />
              ))}
            </div>
            {data.recentCommits.length > 5 && (
              <p className="text-[13px] text-stone-300 mt-5">
                + {data.recentCommits.length - 5} more contributions
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
