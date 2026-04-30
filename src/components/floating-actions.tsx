import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  const phone = "919999999999";
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi Kaashvi Beauty Studio, I'd like to book a consultation."
  )}`;
  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-elegant hover:scale-105 transition-transform"
        style={{ boxShadow: "0 12px 32px -8px rgba(37,211,102,0.5)" }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-sans-ui uppercase tracking-[0.15em] text-[11px] hidden sm:inline">Book Now</span>
      </a>
      <a
        href="tel:+919999999999"
        aria-label="Call us"
        className="fixed bottom-6 left-6 z-40 sm:hidden bg-ink text-surface w-12 h-12 rounded-full flex items-center justify-center shadow-elegant"
      >
        <Phone className="w-5 h-5" />
      </a>
    </>
  );
}
