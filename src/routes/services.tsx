import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SERVICES } from "@/data/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bridal, HD & Airbrush Makeup | Kaashvi Beauty" },
      { name: "description", content: "Bridal, party, HD, airbrush makeup, hairstyling, pre-wedding shoots and saree draping by Odisha's most trusted makeup artist." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Signature Services" title={<>The full <span className="italic">repertoire</span></>} subtitle="From heritage bridal looks to camera-ready glamour — every service crafted with the same artistry and care." />
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          {SERVICES.map((s, i) => (
            <div key={s.slug} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="relative aspect-[4/5] bg-blush p-3 [direction:ltr]">
                <img src={s.image} alt={s.name} loading="lazy" width={800} height={1000} className="w-full h-full object-cover" />
              </div>
              <div className="[direction:ltr]">
                <span className="ornament mb-5">{`0${i+1} · ${s.tagline}`}</span>
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">{s.name}</h2>
                <p className="text-base text-ink/75 leading-relaxed mb-8 max-w-md">{s.description}</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-sans-ui">From</span>
                  <span className="font-display text-3xl text-gold-dark">₹{s.priceFrom.toLocaleString("en-IN")}</span>
                </div>
                <Link to="/booking" className="btn-gold">Book This Service</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
