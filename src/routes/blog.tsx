import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Beauty Journal — Kaashvi Beauty Studio" },
      { name: "description", content: "Bridal beauty tips, skincare routines and behind-the-scenes from Odisha's premium makeup studio." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  { title: "The 30-Day Pre-Bridal Skincare Ritual", excerpt: "What every bride should be doing in the month leading up to her wedding for that lit-from-within glow.", date: "Apr 12, 2026", img: g1, cat: "Skincare" },
  { title: "Choosing Between HD and Airbrush Makeup", excerpt: "A side-by-side guide to help you understand which finish will suit your wedding day, lighting, and photography style.", date: "Mar 28, 2026", img: g2, cat: "Makeup 101" },
  { title: "Traditional Odia Bridal Looks, Reimagined", excerpt: "How we're updating heritage bridal aesthetics for the modern bride — without losing the soul of tradition.", date: "Mar 15, 2026", img: g3, cat: "Heritage" },
];

function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Beauty Journal" title={<>Notes on <span className="italic">artistry & care</span></>} subtitle="Tips, tutorials, and reflections from behind the brush." />
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {POSTS.map(p => (
            <article key={p.title} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-blush mb-6">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans-ui mb-3">{p.cat} · {p.date}</p>
              <h2 className="font-display text-2xl text-ink mb-3 leading-snug group-hover:text-gold-dark transition-colors">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              <span className="inline-block mt-4 font-sans-ui uppercase tracking-[0.2em] text-[10px] text-gold border-b border-gold/40 pb-1">Read more</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
