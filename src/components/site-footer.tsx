import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin, Facebook } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function SiteFooter() {
  const s = useSiteSettings();
  return (
    <footer className="bg-ink text-surface/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl text-surface tracking-[0.2em] uppercase">{s.brand_short}</h2>
          <p className="font-sans-ui uppercase tracking-[0.3em] text-[9px] text-gold mt-2">Makeover</p>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-surface/70">
            Premium bridal, HD, airbrush and party makeup artistry across Odisha. Crafting flawless looks for your most special moments.
          </p>
          <div className="flex gap-4 mt-8">
            {s.instagram_url && (
              <a href={s.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {s.facebook_url && (
              <a href={s.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            )}
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
            {s.address && (
              <li className="flex gap-3 items-start"><MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />{s.map_url ? <a href={s.map_url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{s.address}</a> : <span>{s.address}</span>}</li>
            )}
            {s.phone_tel && (
              <li className="flex gap-3 items-center"><Phone className="w-4 h-4 text-gold shrink-0" /><a href={`tel:${s.phone_tel}`} className="hover:text-gold">{s.phone_display || s.phone_tel}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-surface/50 font-sans-ui tracking-wider uppercase">
          <span>© {new Date().getFullYear()} {s.brand_name}</span>
          <span className="flex gap-4 items-center">
            Crafted with love · Odisha
            <Link to="/admin" className="opacity-40 hover:opacity-100 hover:text-gold normal-case tracking-normal">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
