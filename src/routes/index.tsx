import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-suryanshi.jpg";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import bridal from "@/assets/service-bridal.jpg";
import party from "@/assets/service-party.jpg";
import hd from "@/assets/service-hd.jpg";
import airbrush from "@/assets/service-prewed.jpg";
import hair from "@/assets/service-hair.jpg";
import { useSiteSettings, whatsappLinkFor } from "@/hooks/use-site-settings";
import { Sparkles, Award, ShieldCheck, Clock, ArrowRight, Star, Instagram, MapPin, Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suryanshi Makeover — Best Bridal & HD Makeup Artist in Odisha" },
      { name: "description", content: "Premium bridal, HD, airbrush & party makeup in Bhubaneswar, Odisha. Flawless makeup for your most special moments. Book on WhatsApp +91 81446 02025." },
      { property: "og:image", content: new URL(heroImg, "https://suryansimakeover.lovable.app").href },
    ],
  }),
  component: HomePage,
});

type Tile = { src: string; cat: "Bridal" | "Party" | "Natural"; alt: string };
const PORTFOLIO: Tile[] = [
  { src: g1, cat: "Bridal", alt: "Bridal portrait" },
  { src: g2, cat: "Bridal", alt: "Pink lehenga bride" },
  { src: g3, cat: "Party", alt: "Party glam look" },
  { src: g4, cat: "Natural", alt: "Soft natural makeup" },
  { src: g5, cat: "Bridal", alt: "Haldi look" },
  { src: g6, cat: "Party", alt: "Reception look" },
];

const SERVICES_PREVIEW_DEFAULT = [
  { name: "Bridal Makeup", price: "From ₹25,000", img: bridal, slug: "bridal" },
  { name: "Party Makeup", price: "From ₹5,500", img: party, slug: "party" },
  { name: "HD Makeup", price: "From ₹7,500", img: hd, slug: "hd" },
  { name: "Airbrush Makeup", price: "From ₹9,500", img: airbrush, slug: "airbrush" },
  { name: "Hairstyling", price: "From ₹3,500", img: hair, slug: "hair" },
];

const WHY = [
  { Icon: Award, title: "Certified Artist" },
  { Icon: Sparkles, title: "Premium Products" },
  { Icon: ShieldCheck, title: "Hygiene & Safety" },
  { Icon: Clock, title: "Long-lasting Finish" },
];

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [servicesPreview, setServicesPreview] = useState(SERVICES_PREVIEW_DEFAULT);
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(heroVideoAsset.url);
  const s = useSiteSettings();
  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "hero_video_url")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setHeroVideoUrl(data.value);
      });
  }, []);
  useEffect(() => {
    supabase
      .from("services")
      .select("slug, name, price_from, image_url")
      .eq("is_active", true)
      .order("sort_order")
      .limit(6)
      .then(({ data }) => {
        if (!data || !data.length) return;
        const fallback = Object.fromEntries(SERVICES_PREVIEW_DEFAULT.map((s) => [s.slug, s.img]));
        setServicesPreview(
          data.map((d) => ({
            name: d.name,
            price: d.price_from ? `From ₹${d.price_from.toLocaleString("en-IN")}` : "",
            img: d.image_url || fallback[d.slug] || bridal,
            slug: d.slug,
          }))
        );
      });
  }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HERO — Full-screen with parallax */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
        >
          <video
            src={heroVideoUrl}
            poster={heroImg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* OFFER BANNER */}
      <OfferBanner />

      {/* PORTFOLIO — 3D feel grid */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-gradient-to-b from-surface to-blush/30">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="Visual Portfolio" title={<>The art of <span className="italic">transformation</span></>} subtitle="Bridal · Party · Natural" />
          <PortfolioGrid />
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline-gold">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* SERVICES — Card depth */}
      <section className="py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="Signature Services" title={<>Crafted <span className="italic">looks</span></>} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesPreview.map((s, i) => (
              <div
                key={s.slug}
                className="group relative bg-surface overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-700 hover:-translate-y-2"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-blush relative">
                  <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-90" />
                  <div className="absolute bottom-0 inset-x-0 p-6 text-surface">
                    <h3 className="font-display text-2xl mb-1">{s.name}</h3>
                    <p className="text-xs font-sans-ui uppercase tracking-[0.2em] text-gold mb-4">{s.price}</p>
                    <Link to="/booking" className="inline-flex items-center text-[11px] font-sans-ui uppercase tracking-[0.2em] text-surface border-b border-gold/60 pb-1 hover:text-gold transition-colors">
                      Book Now <ArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline-gold">All Services</Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        className="relative py-24 md:py-32 px-6 lg:px-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--blush), var(--surface) 50%, var(--nude))" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Why Choose Us" title={<>The Suryanshi <span className="italic">promise</span></>} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {WHY.map(({ Icon, title }, i) => (
              <div
                key={title}
                className="bg-surface/60 backdrop-blur-md border border-gold/20 p-8 text-center hover:border-gold/60 hover:-translate-y-1 transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-5 border border-gold/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg text-ink">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM static feed */}
      {s.instagram_url && (<section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="ornament justify-center mb-5">Follow on Instagram</span>
            <a href={s.instagram_url} target="_blank" rel="noopener noreferrer" className="font-display text-3xl md:text-4xl text-ink hover:text-gold transition-colors inline-flex items-center gap-3">
              <Instagram className="w-7 h-7" /> {s.instagram_handle}
            </a>
          </div>
          <ReelsRow />
        </div>
      </section>)}

      {/* TESTIMONIALS slider */}
      <TestimonialsSlider />

      {/* CONTACT + MAP */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-blush/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead align="left" eyebrow="Visit Us" title={<>Let's create <span className="italic">magic</span></>} />
            <div className="space-y-5 mb-10">
              {s.address && <Row Icon={MapPin} label="Studio" value={s.address} href={s.map_url || "#"} />}
              {s.phone_tel && <Row Icon={Phone} label="Call" value={s.phone_display || s.phone_tel} href={`tel:${s.phone_tel}`} />}
              {s.whatsapp_number && <Row Icon={MessageCircle} label="WhatsApp" value={s.phone_display || s.whatsapp_number} href={whatsappLinkFor(s.whatsapp_number, `Hi ${s.brand_name}!`)} />}
              {s.instagram_url && <Row Icon={Instagram} label="Instagram" value={s.instagram_handle} href={s.instagram_url} />}
            </div>
            <Link to="/booking" className="btn-gold">Book a Consultation</Link>
          </div>
          {s.map_embed && (<div className="aspect-square md:aspect-[4/3] bg-surface border border-gold/30 p-2 shadow-elegant">
            <iframe
              title="Studio location"
              src={s.map_embed}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>)}
        </div>
      </section>
    </>
  );
}

type Reel = { url: string; title: string | null };
function ReelsRow() {
  const [reels, setReels] = useState<Reel[]>([]);
  useEffect(() => {
    supabase
      .from("reels")
      .select("url, title")
      .eq("is_active", true)
      .order("sort_order")
      .limit(3)
      .then(({ data }) => {
        if (data) setReels(data);
      });
  }, []);
  if (!reels.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {reels.map((r, i) => (
        <ReelCard key={i} url={r.url} title={r.title} />
      ))}
    </div>
  );
}

function ReelCard({ url, title }: { url: string; title: string | null }) {
  const isInstagram = /instagram\.com\/(reel|p|tv)\//i.test(url);
  if (isInstagram) {
    const clean = url.split("?")[0].replace(/\/$/, "");
    return (
      <div className="relative bg-blush overflow-hidden shadow-soft" style={{ aspectRatio: "9/16" }}>
        <iframe
          src={`${clean}/embed`}
          title={title || "Instagram reel"}
          loading="lazy"
          allowTransparency
          allow="encrypted-media"
          className="w-full h-full border-0"
        />
      </div>
    );
  }
  return (
    <div className="relative bg-ink overflow-hidden shadow-soft" style={{ aspectRatio: "9/16" }}>
      <video
        src={url}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Row({ Icon, label, value, href }: { Icon: any; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex gap-4 items-start group">
      <span className="w-12 h-12 border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
        <Icon className="w-4 h-4 text-gold" />
      </span>
      <span>
        <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans-ui mb-0.5">{label}</span>
        <span className="block text-ink group-hover:text-gold-dark transition-colors">{value}</span>
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center" : ""}`}>
      <span className={`ornament mb-5 ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.05] tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="font-sans-ui uppercase tracking-[0.2em] text-[11px] text-muted-foreground mt-4">{subtitle}</p>}
    </div>
  );
}

function PortfolioGrid() {
  const [filter, setFilter] = useState<"All" | "Bridal" | "Party" | "Natural">("All");
  const [tiles, setTiles] = useState<Tile[]>(PORTFOLIO);

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("title, category, image_url")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!data || !data.length) return;
        const norm = (c: string | null): Tile["cat"] => {
          const v = (c || "").toLowerCase();
          if (v.startsWith("part")) return "Party";
          if (v.startsWith("nat")) return "Natural";
          return "Bridal";
        };
        setTiles(
          data.map((d) => ({
            src: d.image_url,
            cat: norm(d.category),
            alt: d.title || "Portfolio image",
          }))
        );
      });
  }, []);

  const items = filter === "All" ? tiles : tiles.filter((p) => p.cat === filter);

  return (
    <>
      <div className="flex justify-center gap-2 md:gap-4 mb-10 flex-wrap">
        {(["All", "Bridal", "Party", "Natural"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`font-sans-ui uppercase tracking-[0.2em] text-[10px] md:text-[11px] px-4 md:px-5 py-2 md:py-2.5 transition-all ${filter === c ? "bg-ink text-surface" : "text-ink/60 hover:text-gold border border-transparent hover:border-gold/40"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {items.map((g, i) => (
          <div
            key={`${g.src}-${i}`}
            className={`relative overflow-hidden bg-blush group cursor-zoom-in shadow-soft hover:shadow-elegant transition-all duration-500 ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
              <span className="text-surface text-[10px] font-sans-ui uppercase tracking-[0.25em]">{g.cat}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type Testimonial = { author_name: string; author_role: string | null; quote: string; rating: number };

function TestimonialsSlider() {
  const [items, setItems] = useState<Testimonial[]>([
    { author_name: "Ananya P.", author_role: "Bride, Cuttack", quote: "Suryanshi made me feel like royalty. The makeup lasted from haldi to vidaai — every photograph looks like art.", rating: 5 },
    { author_name: "Ritika S.", author_role: "Bride, Bhubaneswar", quote: "She didn't just do my makeup, she understood my heritage. The Odia bridal look she created was stunning.", rating: 5 },
    { author_name: "Meera K.", author_role: "Bride, Puri", quote: "From skincare prep to reception look, every detail was thought through. Worth every rupee.", rating: 5 },
  ]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("author_name, author_role, quote, rating")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length) setItems(data);
      });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  const t = items[idx];
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-ink text-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="ornament justify-center mb-6" style={{ color: "var(--gold)" }}>Testimonials</span>
        <h2 className="font-display text-4xl md:text-5xl mb-12 text-balance">In their own words</h2>
        <div className="min-h-[220px] flex flex-col items-center justify-center" key={idx}>
          <div className="flex gap-1 text-gold mb-6 animate-fade-in">
            {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <p className="font-display italic text-2xl md:text-3xl text-surface/95 leading-relaxed mb-8 animate-fade-in">"{t.quote}"</p>
          <div className="h-px w-12 bg-gold/40 mx-auto mb-4" />
          <p className="font-display text-lg">{t.author_name}</p>
          {t.author_role && <p className="text-[10px] font-sans-ui uppercase tracking-[0.3em] text-gold mt-1">{t.author_role}</p>}
        </div>
        <div className="flex justify-center items-center gap-4 mt-10">
          <button onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)} aria-label="Previous" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 transition-all ${i === idx ? "w-8 bg-gold" : "w-1.5 bg-surface/30"}`} />
            ))}
          </div>
          <button onClick={() => setIdx((i) => (i + 1) % items.length)} aria-label="Next" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function OfferBanner() {
  const [offer, setOffer] = useState<{ title: string; image_url: string | null; expires_at: string | null } | null>(null);

  useEffect(() => {
    supabase
      .from("offers")
      .select("title, image_url, expires_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        if (data.expires_at && new Date(data.expires_at).getTime() < Date.now()) return;
        setOffer(data);
      });
  }, []);

  if (!offer) return null;
  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 bg-gradient-to-b from-blush/30 to-surface overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="animate-fade-up">
          <span className="ornament mb-5">Special Offer</span>
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.05] tracking-tight text-balance">
            <span className="inline-block animate-fade-in italic text-gold">{offer.title}</span>
          </h2>
          <div className="h-px w-16 bg-gold/40 mt-7" />
          <Link to="/booking" className="btn-gold mt-8 inline-flex">Book Now</Link>
        </div>
        {offer.image_url && (
          <div className="aspect-[4/5] overflow-hidden shadow-elegant animate-fade-in">
            <img src={offer.image_url} alt={offer.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        )}
      </div>
    </section>
  );
}
