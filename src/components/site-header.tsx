import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Packages" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-2xl border-b border-gold/20 py-3 shadow-soft"
          : "bg-gradient-to-b from-ink/40 to-transparent backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-4">
        <Link to="/" className="group shrink-0">
          <h1 className={`font-display text-xl md:text-2xl tracking-[0.18em] uppercase leading-none transition-colors ${scrolled ? "text-ink" : "text-surface"}`}>
            {BRAND.short}
          </h1>
          <p className={`font-sans-ui uppercase tracking-[0.3em] text-[8px] mt-1 transition-colors ${scrolled ? "text-gold-dark" : "text-gold"}`}>
            Makeover
          </p>
        </Link>

        <nav className="hidden lg:flex gap-7 items-center justify-end flex-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans-ui uppercase tracking-[0.18em] text-[11px] transition-colors hover:text-gold ${scrolled ? "text-ink/75" : "text-surface/85"}`}
              activeProps={{ className: "font-sans-ui uppercase tracking-[0.18em] text-[11px] text-gold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/booking" className="btn-gold !py-3 !px-6">
            Book Now
          </Link>
        </nav>

        <button
          aria-label="Menu"
          className={`lg:hidden ${scrolled ? "text-ink" : "text-surface"}`}
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col animate-fade-in lg:hidden">
          <div className="flex justify-between items-center px-5 py-5 border-b border-gold/20">
            <span className="font-display text-xl tracking-[0.2em] uppercase">{BRAND.short}</span>
            <button aria-label="Close" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-ink hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-gold mt-4">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
