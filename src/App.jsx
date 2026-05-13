import portfolioData from "./data/portfolio.json";
import ExecutiveHero from './components/sections/ExecutiveHero';
import ContributionHighlights from './components/sections/ContributionHighlights';
import CapabilityGrowth from './components/sections/CapabilityGrowth';
import KpiImpact from './components/sections/KpiImpact';
import OperationalChallenges from './components/sections/OperationalChallenges';
import CareerTrajectory from './components/sections/CareerTrajectory';
import Footer from './components/Footer';

function getSectionByType(type) {
  return portfolioData.sections.find(s => s.type === type);
}

export default function App() {
  const { employee, monthId, uid, portfolioId, generatedAt } = portfolioData;
  const executiveSummary = getSectionByType('executive_summary');
  const contributions = getSectionByType('contribution_highlights');
  const capability = getSectionByType('capability_growth');
  const kpi = getSectionByType('kpi_impact');
  const constraints = getSectionByType('constraint_patterns');
  const trajectory = getSectionByType('career_trajectory');

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal top bar — barely there */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-800 tracking-[0.05em]">PDGMS</span>
          <span className="text-xs text-stone-300">{employee.name}</span>
        </div>
      </nav>

      <main className="pt-12">
        <ExecutiveHero
          employee={employee}
          summary={executiveSummary}
          monthId={monthId}
          uid={uid}
        />

        <div className="max-w-5xl mx-auto px-6"><div className="section-divider" /></div>

        <ContributionHighlights section={contributions} />

        <div className="max-w-5xl mx-auto px-6"><div className="section-divider" /></div>

        <CapabilityGrowth section={capability} />

        <div className="max-w-5xl mx-auto px-6"><div className="section-divider" /></div>

        <KpiImpact section={kpi} />

        <div className="max-w-5xl mx-auto px-6"><div className="section-divider" /></div>

        <OperationalChallenges section={constraints} />

        <div className="max-w-5xl mx-auto px-6"><div className="section-divider" /></div>

        <CareerTrajectory section={trajectory} />
      </main>

      <Footer
        portfolioId={portfolioId}
        generatedAt={generatedAt}
        uid={uid}
      />
    </div>
  );
}
