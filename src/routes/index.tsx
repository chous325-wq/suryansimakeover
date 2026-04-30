import { createFileRoute, Link } from "@tanstack/react-router";
import heroBride from "@/assets/hero-bride.jpg";
import { SERVICES, TESTIMONIALS, BRANDS, WHY_US, GALLERY } from "@/data/site-data";
import { SectionHeading } from "@/components/section-heading";
import { Sparkles, Award, ShieldCheck, Clock, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaashvi Beauty Studio — Best Bridal Makeup Artist in Odisha" },
      { name: "description", content: "Award-winning bridal & HD makeup artist in Bhubaneswar, Odisha. Heirloom artistry for the modern royal bride. Book your trial today." },
    ],
  }),
  component: HomePage,
});

const ICONS = [Sparkles, Award, ShieldCheck, Clock];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-20 pb-16 px-4 md:px-8 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blush/50 via-surface to-nude/30 -z-10" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-2 border-gold/30 bg-surface/40 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-16 py-16 lg:py-20">
              <div className="animate-fade-up">
                <span className="ornament mb-8">Bhubaneswar · Odisha</span>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] tracking-tight text-balance mb-8">
                  Heirloom Elegance <span className="italic font-light text-gold-dark">for the</span> Royal Bride.
                </h1>
                <p className="font-body text-lg text-ink/75 leading-relaxed max-w-[42ch] mb-10">
                  Timeless bridal artistry rooted in the opulent traditions of Odisha. For the woman who carries history in her grace.
                </p>
                <div className="flex flex-wrap gap-5 items-center">
                  <Link to="/booking" className="btn-gold">Book Consultation</Link>
                  <Link to="/portfolio" className="font-sans-ui uppercase tracking-[0.2em] text-[11px] text-ink border-b border-gold/40 pb-1 hover:border-gold transition-colors">
                    View the Archives →
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-surface bg-gradient-to-br from-blush to-nude" />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 text-gold">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                    <p className="text-xs text-muted-foreground mt-1">500+ brides styled</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-blush p-3 lg:p-4 shadow-elegant">
                  <div className="absolute inset-3 lg:inset-4 border border-gold/40 z-10 pointer-events-none" style={{outline:"1px solid rgba(192,154,83,0.2)", outlineOffset:"-12px"}} />
                  <img src={heroBride} alt="Royal Indian bride styled by Kaashvi Beauty Studio" width={1024} height={1280} className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:block absolute -bottom-6 -left-6 bg-surface p-5 shadow-soft max-w-[220px] border border-gold/20">
                  <p className="font-display italic text-base text-ink leading-snug">"She made me feel like royalty."</p>
                  <p className="text-xs text-gold mt-2 font-sans-ui uppercase tracking-widest">— Ananya, Bride</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-ink text-surface py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-6 text-xs font-sans-ui uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Limited Bridal Offer · 15% off all 2026 wedding packages</span>
          <Link to="/packages" className="text-gold hover:underline hidden sm:inline">View Packages →</Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Our Offerings" title={<>Rituals of <span className="italic">Beauty</span></>} subtitle="Curated experiences crafted to honour your most cherished moments." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SERVICES.slice(0,6).map((s, i) => (
              <Link to="/services" key={s.slug} className={`group block ${i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-24" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-blush mb-6">
                  <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/50 transition-all duration-700 z-10 pointer-events-none" />
                  <img src={s.image} alt={s.name} loading="lazy" width={800} height={1000} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-sans-ui uppercase tracking-[0.25em] text-gold mb-2">{s.tagline}</p>
                  <h3 className="font-display text-2xl text-ink mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground max-w-[32ch] mx-auto">From ₹{s.priceFrom.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/services" className="btn-outline-gold">All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-32 px-6 lg:px-12 bg-blush/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="The Kaashvi Difference" title={<>Why brides choose <span className="italic">us</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {WHY_US.map((w, i) => {
              const Icon = ICONS[i];
              return (
                <div key={w.title} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 border border-gold/40 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-ink mb-3">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="The Archives" title={<>Recent <span className="italic">brides</span></>} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.slice(0,6).map((g, i) => (
              <div key={i} className={`overflow-hidden bg-blush ${i === 0 || i === 4 ? "md:row-span-2 aspect-[3/5]" : "aspect-square"}`}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline-gold">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-12 bg-ink text-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="ornament justify-center mb-5" style={{color:"var(--gold)"}}>Words from Brides</span>
            <h2 className="font-display text-4xl md:text-5xl text-surface text-balance">Cherished, in their own words</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="text-center">
                <div className="flex justify-center gap-0.5 text-gold mb-5">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                <p className="font-display italic text-xl text-surface/90 leading-relaxed mb-6">"{t.text}"</p>
                <div className="h-px w-10 bg-gold/40 mx-auto mb-4" />
                <p className="font-display text-lg text-surface">{t.name}</p>
                <p className="text-xs font-sans-ui uppercase tracking-widest text-gold mt-1">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/reviews" className="font-sans-ui uppercase tracking-[0.2em] text-[11px] text-gold border-b border-gold/40 pb-1">Read all reviews</Link>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 px-6 lg:px-12 border-t border-gold/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="ornament justify-center mb-8">Curated with the finest</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-5">
            {BRANDS.map(b => (
              <span key={b} className="font-display text-xl md:text-2xl text-ink/40 hover:text-gold transition-colors">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto border-2 border-gold/30 p-12 md:p-20 text-center bg-gradient-to-br from-surface to-blush/40">
          <span className="ornament justify-center mb-6">Reserve your date</span>
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.1] mb-6 text-balance">
            Begin your <span className="italic">bridal story</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">Bookings open up to 12 months in advance. Secure your date with a personal consultation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold">Book a Consultation <ArrowRight className="w-3.5 h-3.5 ml-3" /></Link>
            <Link to="/contact" className="btn-outline-gold">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
