import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { GALLERY } from "@/data/site-data";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Suryanshi Makeover" },
      { name: "description", content: "Explore our gallery of bridal, party and fashion makeup work across Odisha." },
    ],
  }),
  component: PortfolioPage,
});

type Item = { src: string; category: string; alt: string };

function PortfolioPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [data, setData] = useState<Item[]>(GALLERY);

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("title, category, image_url")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data: rows }) => {
        if (!rows || !rows.length) return;
        setData(
          rows.map((r) => ({
            src: r.image_url,
            category: r.category ? r.category.charAt(0).toUpperCase() + r.category.slice(1) : "Other",
            alt: r.title || "Portfolio image",
          }))
        );
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(data.map((d) => d.category)))];
  const items = data.filter((g) => filter === "All" || g.category === filter);
  const display = items.length < 6 ? [...items, ...items] : items;

  return (
    <>
      <PageHero eyebrow="The Archives" title={<>Portfolio of <span className="italic">artistry</span></>} />
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-2 md:gap-6 mb-12 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-sans-ui uppercase tracking-[0.2em] text-[11px] px-5 py-2.5 transition-all ${
                  filter === c ? "bg-ink text-surface" : "text-ink/60 hover:text-gold border-b border-transparent hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {display.map((g, i) => (
              <button
                key={i}
                onClick={() => setLightbox(g.src)}
                className="block w-full mb-5 overflow-hidden bg-blush group cursor-zoom-in"
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-6 animate-fade-in cursor-zoom-out">
          <button aria-label="Close" className="absolute top-6 right-6 text-surface" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="Portfolio detail" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </>
  );
}
