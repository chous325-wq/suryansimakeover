import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-surface/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl text-surface tracking-[0.2em] uppercase">{BRAND.short}</h2>
          <p className="font-sans-ui uppercase tracking-[0.3em] text-[9px] text-gold mt-2">Makeover</p>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-surface/70">
            Premium bridal, HD, airbrush and party makeup artistry across Odisha. Crafting flawless looks for your most special moments.
          </p>
          <div className="flex gap-4 mt-8">
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-sans-ui uppercase tracking-[0.2em] text-[10px] text-gold mb-6">Studio</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/packages" className="hover:text-gold transition-colors">Packages</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
            <li><Link to="/reviews" className="hover:text-gold transition-colors">Reviews</Link></li>
            <li><Link to="/booking" className="hover:text-gold transition-colors">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans-ui uppercase tracking-[0.2em] text-[10px] text-gold mb-6">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 items-start"><MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" /><a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{BRAND.address}</a></li>
            <li className="flex gap-3 items-center"><Phone className="w-4 h-4 text-gold shrink-0" /><a href={`tel:${BRAND.phoneTel}`} className="hover:text-gold">{BRAND.phoneDisplay}</a></li>
            <li className="flex gap-3 items-center"><Mail className="w-4 h-4 text-gold shrink-0" /><a href={`mailto:${BRAND.email}`} className="hover:text-gold break-all">{BRAND.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-surface/50 font-sans-ui tracking-wider uppercase">
          <span>© {new Date().getFullYear()} {BRAND.name}</span>
          <span>Crafted with love · Odisha</span>
        </div>
      </div>
    </footer>
  );
}
