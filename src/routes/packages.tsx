import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { PACKAGES } from "@/data/site-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Bridal Packages — Suryanshi Makeover" },
      { name: "description", content: "Curated bridal packages for engagement, wedding day and full trousseau coverage." },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <>
      <PageHero eyebrow="Bridal Packages" title={<>Curated <span className="italic">collections</span></>} subtitle="Three signature packages, designed around the rhythm of Indian weddings. Custom plans available on request." />
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {PACKAGES.map(p => (
            <div key={p.name} className={`relative bg-surface border-2 p-10 flex flex-col ${p.popular ? "border-gold shadow-elegant md:scale-[1.03]" : "border-border"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-surface text-[10px] tracking-widest font-sans-ui uppercase px-4 py-1">Most Loved</span>
              )}
              <h3 className="font-display text-3xl text-ink mb-3">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-5xl text-gold-dark">₹{(p.price/1000).toFixed(0)}k</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans-ui mb-8">Starting from</p>
              <div className="h-px bg-gold/30 mb-8" />
              <ul className="space-y-4 mb-10 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex gap-3 text-sm text-ink/80">
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking" className={p.popular ? "btn-gold" : "btn-outline-gold"}>Reserve Package</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-12 max-w-xl mx-auto">All packages include a personal consultation, trial session and travel within 50km of Bhubaneswar. Custom packages available for destination weddings.</p>
      </section>
    </>
  );
}
