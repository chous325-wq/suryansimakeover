import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-surface/80 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl text-surface tracking-[0.2em] uppercase">Kaashvi</h2>
          <p className="font-sans-ui uppercase tracking-[0.3em] text-[9px] text-gold mt-2">Beauty Studio</p>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-surface/70">
            Heirloom bridal artistry rooted in the opulent traditions of Odisha. Crafting timeless beauty for the woman who carries history in her grace.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="https://instagram.com" aria-label="Instagram" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="w-10 h-10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-sans-ui uppercase tracking-[0.2em] text-[10px] text-gold mb-6">Studio</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">About the Artist</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/packages" className="hover:text-gold transition-colors">Bridal Packages</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
            <li><Link to="/reviews" className="hover:text-gold transition-colors">Reviews</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition-colors">Beauty Journal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans-ui uppercase tracking-[0.2em] text-[10px] text-gold mb-6">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 items-start"><MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" /><span>Bhubaneswar, Odisha, India</span></li>
            <li className="flex gap-3 items-center"><Phone className="w-4 h-4 text-gold shrink-0" /><a href="tel:+919999999999" className="hover:text-gold">+91 99999 99999</a></li>
            <li className="flex gap-3 items-center"><Mail className="w-4 h-4 text-gold shrink-0" /><a href="mailto:hello@kaashvibeauty.com" className="hover:text-gold">hello@kaashvibeauty.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-surface/50 font-sans-ui tracking-wider uppercase">
          <span>© {new Date().getFullYear()} Kaashvi Beauty Studio</span>
          <span>Crafted with care in Odisha</span>
        </div>
      </div>
    </footer>
  );
}
