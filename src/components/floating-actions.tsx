import { MessageCircle, Phone } from "lucide-react";
import { useSiteSettings, whatsappLinkFor } from "@/hooks/use-site-settings";

export function FloatingActions() {
  const s = useSiteSettings();
  const wa = s.whatsapp_number
    ? whatsappLinkFor(s.whatsapp_number, `Hi ${s.brand_name}, I'd like to book a consultation.`)
    : "";
  return (
    <>
      {wa && (
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-elegant hover:scale-105 transition-transform animate-fade-in"
        style={{ boxShadow: "0 12px 32px -8px rgba(37,211,102,0.5)" }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-sans-ui uppercase tracking-[0.15em] text-[11px] hidden sm:inline">WhatsApp</span>
      </a>
      )}
      {s.phone_tel && (
      <a
        href={`tel:${s.phone_tel}`}
        aria-label="Call us"
        className="fixed bottom-6 left-6 z-40 bg-ink text-surface w-12 h-12 rounded-full flex items-center justify-center shadow-elegant hover:scale-105 transition-transform"
      >
        <Phone className="w-5 h-5" />
      </a>
      )}
    </>
  );
}
