import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Bridal Packages" },
  { to: "/blog", label: "Journal" },
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
          ? "bg-surface/90 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <nav className="hidden lg:flex gap-7 items-center flex-1">
          {links.slice(0, 4).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-sans-ui uppercase tracking-[0.18em] text-[11px] text-ink/75 hover:text-gold transition-colors"
              activeProps={{ className: "font-sans-ui uppercase tracking-[0.18em] text-[11px] text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="text-center group">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.2em] text-ink uppercase leading-none">
            Kaashvi
          </h1>
          <p className="font-sans-ui uppercase tracking-[0.3em] text-[8px] text-gold mt-1.5">
            Beauty Studio
          </p>
        </Link>

        <nav className="hidden lg:flex gap-7 items-center justify-end flex-1">
          {links.slice(4).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-sans-ui uppercase tracking-[0.18em] text-[11px] text-ink/75 hover:text-gold transition-colors"
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
          className="lg:hidden text-ink"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col animate-fade-in lg:hidden">
          <div className="flex justify-between items-center px-6 py-6 border-b border-gold/20">
            <span className="font-display text-xl tracking-[0.2em] uppercase">Kaashvi</span>
            <button aria-label="Close" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
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
