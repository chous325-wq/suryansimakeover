import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SERVICES } from "@/data/site-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bridal, HD & Airbrush Makeup | Suryanshi Beauty" },
      { name: "description", content: "Bridal, party, HD, airbrush makeup, hairstyling, pre-wedding shoots and saree draping by Odisha's most trusted makeup artist." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [items, setItems] = useState(SERVICES);
  useEffect(() => {
    supabase
      .from("services")
      .select("slug, name, tagline, description, price_from, image_url")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (!data || !data.length) return;
        const fallback = Object.fromEntries(SERVICES.map((s) => [s.slug, s.image]));
        setItems(
          data.map((d) => ({
            slug: d.slug,
            name: d.name,
            tagline: d.tagline ?? "",
            description: d.description ?? "",
            priceFrom: d.price_from ?? 0,
            image: d.image_url || fallback[d.slug] || SERVICES[0].image,
          }))
        );
      });
  }, []);
  return (
    <>
      <PageHero eyebrow="Signature Services" title={<>The full <span className="italic">repertoire</span></>} subtitle="From heritage bridal looks to camera-ready glamour — every service crafted with the same artistry and care." />
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          {items.map((s, i) => (
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
