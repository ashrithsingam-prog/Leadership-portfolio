export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-stone-900 tracking-[-0.02em] leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-stone-400 max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
