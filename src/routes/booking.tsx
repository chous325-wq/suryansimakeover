import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { toast } from "sonner";
import { CalendarDays, Check, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BRAND, whatsappLink } from "@/lib/brand";
import { z } from "zod";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Suryanshi Makeover" },
      { name: "description", content: "Reserve your bridal, HD or party makeup booking with Suryanshi Makeover, Odisha." },
    ],
  }),
  component: BookingPage,
});

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 10, {
      message: "Phone must be exactly 10 digits",
    }),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  event_date: z.string().min(1, "Date required"),
  service_slug: z.string().min(1),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ServiceRow = { slug: string; name: string };

function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServiceRow[]>([
    { slug: "bridal", name: "Bridal Makeup" },
    { slug: "party", name: "Party Makeup" },
    { slug: "hd", name: "HD Makeup" },
    { slug: "airbrush", name: "Airbrush Makeup" },
    { slug: "hair", name: "Hairstyling" },
  ]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    event_date: "",
    service_slug: "bridal",
    location: "",
    message: "",
  });

  useEffect(() => {
    supabase
      .from("services")
      .select("slug, name")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => { if (data && data.length) setServices(data); });
  }, []);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      event_date: form.event_date,
      service_slug: form.service_slug,
      location: form.location.trim() || null,
      message: form.message.trim() || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not submit booking. Please try WhatsApp.");
      return;
    }
    setSubmitted(true);
    toast.success("Booking received!");
    const svc = services.find((s) => s.slug === form.service_slug)?.name ?? form.service_slug;
    const msg = `Hi ${BRAND.name}!%0A%0AI'd like to book:%0A👤 Name: ${form.name}%0A📞 Phone: ${form.phone}%0A💄 Service: ${svc}%0A📅 Date: ${form.event_date}%0A📍 Location: ${form.location || "—"}%0A${form.message ? `📝 Note: ${form.message}` : ""}`;
    setTimeout(() => {
      window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${msg}`, "_blank");
    }, 600);
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Confirmed" title={<>Thank you, <span className="italic">{form.name}</span></>} />
        <section className="px-6 lg:px-12 pb-32">
          <div className="max-w-2xl mx-auto text-center border-2 border-gold/30 p-12 bg-surface">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-gold" />
            </div>
            <p className="text-lg text-ink mb-4">Your booking request has been received.</p>
            <p className="text-muted-foreground mb-8">
              We'll reach out on WhatsApp at <strong>{form.phone}</strong> within 2 hours to confirm your appointment on <strong>{form.event_date}</strong>.
            </p>
            <a href={whatsappLink(`Hi ${BRAND.name}, I just submitted a booking under ${form.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex">
              <MessageCircle className="w-4 h-4 mr-3" /> Open WhatsApp
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Reserve Your Date" title={<>Book your <span className="italic">appointment</span></>} subtitle="Tell us about your event. We'll respond within 2 hours via WhatsApp." />
      <section className="px-6 lg:px-12 pb-32">
        <form onSubmit={handle} className="max-w-3xl mx-auto bg-surface border-2 border-gold/30 p-8 md:p-12 space-y-6 shadow-elegant">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full Name *"><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" /></Field>
            <Field label="Phone (10 digits) *">
              <input
                required
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                className="input"
                placeholder="10-digit mobile number"
              />
            </Field>
          </div>
          <Field label="Email (optional)"><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input" /></Field>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Service *">
              <select value={form.service_slug} onChange={e => setForm({...form, service_slug: e.target.value})} className="input">
                {services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="Preferred Date *">
              <div className="relative">
                <input required type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} className="input" min={new Date().toISOString().split("T")[0]} />
                <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
              </div>
            </Field>
          </div>
          <Field label="Event Location"><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input" placeholder="City or venue" /></Field>
          <Field label="Message (optional)"><textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input resize-none" /></Field>
          <button type="submit" disabled={loading} className="btn-gold w-full !py-5 disabled:opacity-50">
            {loading ? "Submitting..." : "Request Booking & Open WhatsApp"}
          </button>
          <p className="text-xs text-muted-foreground text-center">By submitting you agree to be contacted via WhatsApp at {BRAND.phoneDisplay}.</p>
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
