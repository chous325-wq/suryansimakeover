export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <section className="pt-40 pb-16 px-6 lg:px-12 bg-gradient-to-b from-blush/40 to-surface">
      <div className="max-w-5xl mx-auto text-center">
        <span className="ornament mb-6 justify-center">{eyebrow}</span>
        <h1 className="font-display text-5xl md:text-7xl text-ink leading-[1.05] tracking-tight text-balance">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
