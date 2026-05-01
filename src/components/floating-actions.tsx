import { MessageCircle, Phone } from "lucide-react";
import { BRAND, whatsappLink } from "@/lib/brand";

export function FloatingActions() {
  const wa = whatsappLink(`Hi ${BRAND.name}, I'd like to book a consultation.`);
  return (
    <>
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
      <a
        href={`tel:${BRAND.phoneTel}`}
        aria-label="Call us"
        className="fixed bottom-6 left-6 z-40 bg-ink text-surface w-12 h-12 rounded-full flex items-center justify-center shadow-elegant hover:scale-105 transition-transform"
      >
        <Phone className="w-5 h-5" />
      </a>
    </>
  );
}
