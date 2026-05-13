export default function Footer({ portfolioId, generatedAt, uid }) {
  const generated = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <footer className="mt-12">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="section-divider mb-12" />
        
        <div className="space-y-6">
          <div>
            <span className="text-sm font-semibold text-stone-700 tracking-tight">PDGMS</span>
            <span className="text-stone-200 mx-2">·</span>
            <span className="text-xs text-stone-400">Performance Delivery & Growth Management System</span>
          </div>
          
          <p className="text-xs text-stone-300 leading-relaxed max-w-lg">
            This portfolio is auto-generated, read-only, and permanently archived. 
            All metrics are verified, auditable, and deterministic — sourced from 
            organizational systems, not self-reported data.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300">
            <span className="font-mono">{portfolioId}</span>
            <span className="text-stone-150">·</span>
            <span className="font-mono">{uid}</span>
            <span className="text-stone-150">·</span>
            <span>Generated {generated}</span>
          </div>

          <p className="text-[11px] text-stone-200 pt-4">
            Powered by Aavahana
          </p>
        </div>
      </div>
    </footer>
  );
}
