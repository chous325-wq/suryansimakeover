import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import about from "@/assets/about-artist.jpg";
import { Award, Heart, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Artist — Suryanshi Makeover" },
      { name: "description", content: "Meet Suryanshi — celebrated bridal makeup artist in Odisha with over 12 years of artistry experience." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const s = useSiteSettings();
  return (
    <>
      <PageHero eyebrow="The Artist" title={<>A decade of <span className="italic">heritage artistry</span></>} subtitle="From the temples of Puri to brides across India — a journey rooted in tradition, refined by modern luxury." />
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-blush p-3">
            <img src={about} alt={`Makeup artist ${s.brand_short} at work`} loading="lazy" width={900} height={1200} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="ornament mb-6">Founder · Lead Artist</span>
            <h2 className="font-display text-4xl md:text-5xl mb-6">{s.brand_name}</h2>
            <div className="space-y-5 text-ink/80 leading-relaxed">
              <p>Born in Bhubaneswar and trained in Mumbai under some of India's most respected celebrity artists, {s.brand_short} blends classical Odia bridal aesthetics with international techniques.</p>
              <p>Her studio has had the privilege of styling over 500 brides, fashion editorials, and pre-wedding campaigns across Odisha. Each look is approached as a personal heirloom — never repeated, always remembered.</p>
              <p>"Beauty is not transformation. It's translation — of who you are, on the most important day of your life."</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gold/20">
              {[{n:"500+", l:"Brides"}, {n:"12+", l:"Years"}, {n:"50+", l:"Awards"}].map(s => (
                <div key={s.l}>
                  <p className="font-display text-4xl text-gold-dark">{s.n}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-sans-ui">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 lg:px-12 bg-blush/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { Icon: Award, title: "Certified Excellence", text: "Trained at MAC Pro India & professional certifications from international academies." },
            { Icon: Heart, title: "Heritage Inspired", text: "Deeply rooted in Odia traditions with a contemporary editorial sensibility." },
            { Icon: Sparkles, title: "Luxury Approach", text: "From skin prep to final mist — every step uses premium imported products." },
          ].map(({Icon, title, text}) => (
            <div key={title}>
              <Icon className="w-8 h-8 text-gold mx-auto mb-5" />
              <h3 className="font-display text-2xl mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
