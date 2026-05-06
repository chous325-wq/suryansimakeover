import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { toast } from "sonner";
import { Phone, MapPin, Instagram, Facebook, Mail } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Suryanshi Makeover | Bhubaneswar, Odisha" },
      { name: "description", content: "Reach Suryanshi Makeover in Bhubaneswar, Odisha. Quick replies on WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const s = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill all fields");
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <>
      <PageHero eyebrow="Get in Touch" title={<>Let's <span className="italic">connect</span></>} subtitle="We respond to all enquiries within 24 hours. For urgent bookings, WhatsApp is fastest." />
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl mb-8">Studio Details</h2>
            <ul className="space-y-6">
              {s.address && <ContactRow Icon={MapPin} label="Visit the Studio" value={s.address} href={s.map_url} />}
              {s.phone_tel && <ContactRow Icon={Phone} label="Call us" value={s.phone_display || s.phone_tel} href={`tel:${s.phone_tel}`} />}
              {s.email && <ContactRow Icon={Mail} label="Email" value={s.email} href={`mailto:${s.email}`} />}
              {s.instagram_url && <ContactRow Icon={Instagram} label="Instagram" value={s.instagram_handle} href={s.instagram_url} />}
              {s.facebook_url && <ContactRow Icon={Facebook} label="Facebook" value={s.facebook_url} href={s.facebook_url} />}
            </ul>
            {s.map_embed && (
              <div className="mt-10 aspect-video bg-blush overflow-hidden">
                <iframe
                  title="Studio location"
                  src={s.map_embed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
          <form onSubmit={handle} className="bg-surface border-2 border-gold/30 p-8 md:p-10 space-y-6 self-start">
            <h2 className="font-display text-3xl mb-2">Send a message</h2>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-ink/70 font-sans-ui mb-2">Name</span>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="cinput" />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-ink/70 font-sans-ui mb-2">Email</span>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="cinput" />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-ink/70 font-sans-ui mb-2">Message</span>
              <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="cinput resize-none" />
            </label>
            <button className="btn-gold w-full !py-4">Send Message</button>
          </form>
        </div>
      </section>
      <style>{`.cinput{width:100%;padding:0.875rem 1rem;border:1px solid var(--border);background:var(--surface);font-family:var(--font-body);color:var(--ink);transition:border-color .2s}.cinput:focus{outline:none;border-color:var(--gold)}`}</style>
    </>
  );
}

function ContactRow({ Icon, label, value, href }: any) {
  const Wrap = href ? "a" : "div";
  return (
    <li>
      <Wrap href={href} className="flex gap-5 items-start group">
        <span className="w-12 h-12 border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
          <Icon className="w-4 h-4 text-gold" />
        </span>
        <span>
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans-ui mb-1">{label}</span>
          <span className="block text-ink group-hover:text-gold-dark transition-colors">{value}</span>
        </span>
      </Wrap>
    </li>
  );
}
