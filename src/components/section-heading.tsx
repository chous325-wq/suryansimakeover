export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start"} mb-16`}>
      {eyebrow && <span className="ornament mb-5">{eyebrow}</span>}
      <h2 className="font-display text-4xl md:text-5xl text-ink tracking-tight text-balance leading-[1.1]">{title}</h2>
      {subtitle && <p className="mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
      {center && <div className="h-px w-16 bg-gold/40 mt-7" />}
    </div>
  );
}
