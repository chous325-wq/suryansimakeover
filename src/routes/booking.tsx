import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SERVICES } from "@/data/site-data";
import { toast } from "sonner";
import { CalendarDays, Check } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Kaashvi Beauty Studio" },
      { name: "description", content: "Reserve your bridal trial or makeup booking with Odisha's leading bridal artist." },
    ],
  }),
  component: BookingPage,
});

const TIME_SLOTS = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "Bridal", date: "", time: "", location: "", service: SERVICES[0].slug, advance: false });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Booking received! We'll confirm via WhatsApp within 2 hours.");
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Confirmed" title={<>Thank you, <span className="italic">{form.name}</span></>} />
        <section className="px-6 lg:px-12 pb-32">
          <div className="max-w-2xl mx-auto text-center border-2 border-gold/30 p-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-gold" />
            </div>
            <p className="text-lg text-ink mb-4">Your booking request has been received.</p>
            <p className="text-muted-foreground mb-8">Our team will reach out on WhatsApp at <strong>{form.phone}</strong> within 2 hours to confirm your <strong>{form.eventType}</strong> appointment on <strong>{form.date}</strong> at <strong>{form.time}</strong>.</p>
            <a href={`https://wa.me/919999999999`} className="btn-gold">Chat with us on WhatsApp</a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Reserve Your Date" title={<>Book a <span className="italic">consultation</span></>} subtitle="Tell us a little about your event. We'll respond within 2 hours via WhatsApp." />
      <section className="px-6 lg:px-12 pb-32">
        <form onSubmit={handle} className="max-w-3xl mx-auto bg-surface border-2 border-gold/30 p-8 md:p-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full Name *"><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" /></Field>
            <Field label="Phone (WhatsApp) *"><input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input" /></Field>
          </div>
          <Field label="Email"><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input" /></Field>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Event Type">
              <select value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})} className="input">
                {["Bridal", "Engagement", "Reception", "Pre-wedding Shoot", "Party", "Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Service / Package">
              <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="input">
                {SERVICES.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Preferred Date *">
              <div className="relative">
                <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input" min={new Date().toISOString().split("T")[0]} />
                <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
              </div>
            </Field>
            <Field label="Preferred Time *">
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map(t => (
                  <button type="button" key={t} onClick={() => setForm({...form, time: t})} className={`text-xs py-2.5 border transition-colors ${form.time === t ? "bg-ink text-surface border-ink" : "border-border hover:border-gold"}`}>{t}</button>
                ))}
              </div>
            </Field>
          </div>
          <Field label="Event Location"><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input" placeholder="City or venue" /></Field>
          <label className="flex gap-3 items-start cursor-pointer">
            <input type="checkbox" checked={form.advance} onChange={e => setForm({...form, advance: e.target.checked})} className="mt-1 accent-[var(--gold)]" />
            <span className="text-sm text-ink/80">I'd like to confirm with a 25% advance payment to secure my date</span>
          </label>
          <button type="submit" className="btn-gold w-full !py-5">Request Booking</button>
          <p className="text-xs text-muted-foreground text-center">By submitting, you agree to be contacted via WhatsApp & email regarding your booking.</p>
        </form>
      </section>
      <style>{`.input{width:100%;padding:0.875rem 1rem;border:1px solid var(--border);background:var(--surface);font-family:var(--font-body);color:var(--ink);transition:border-color .2s}.input:focus{outline:none;border-color:var(--gold)}`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-ink/70 font-sans-ui mb-2">{label}</span>
      {children}
    </label>
  );
}
