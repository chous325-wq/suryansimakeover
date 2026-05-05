import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

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
  const s = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-3 md:top-5 inset-x-3 md:inset-x-6 z-50">
      <div
        className={`mx-auto max-w-7xl rounded-full transition-all duration-500 flex items-center gap-3 pl-4 pr-2 md:pl-7 md:pr-2.5 py-2 md:py-2.5 ${
          scrolled
            ? "bg-surface/90 backdrop-blur-2xl border border-gold/25 shadow-soft"
            : "bg-ink/35 backdrop-blur-xl border border-white/10"
        }`}
      >
        <Link to="/" className="group shrink-0 flex flex-col leading-none">
          <span
            className="font-display text-lg md:text-2xl tracking-[0.18em] uppercase font-semibold bg-gradient-to-r from-gold via-[oklch(0.82_0.12_82)] to-gold-dark bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          >
            {s.brand_short}
          </span>
          <span
            className={`hidden md:block font-sans-ui uppercase tracking-[0.32em] text-[8px] mt-1 transition-colors ${
              scrolled ? "text-gold-dark" : "text-gold"
            }`}
          >
            Makeover
          </span>
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans-ui uppercase tracking-[0.18em] text-[11px] transition-colors hover:text-gold ${
                scrolled ? "text-ink/75" : "text-surface/90"
              }`}
              activeProps={{
                className:
                  "font-sans-ui uppercase tracking-[0.18em] text-[11px] text-gold",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-full font-sans-ui uppercase tracking-[0.2em] text-[10px] md:text-[11px] px-4 md:px-6 py-2.5 md:py-3 bg-[oklch(0.58_0.21_25)] hover:bg-[oklch(0.50_0.22_25)] text-white shadow-[0_8px_20px_-8px_oklch(0.58_0.21_25/0.6)] transition-colors"
          >
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book</span>
          </Link>

          <button
            aria-label="Menu"
            className={`lg:hidden inline-flex items-center justify-center rounded-full w-10 h-10 transition-colors ${
              scrolled
                ? "text-ink hover:bg-ink/5"
                : "text-surface hover:bg-white/10"
            }`}
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col animate-fade-in lg:hidden">
          <div className="flex justify-between items-center px-5 py-5 border-b border-gold/20">
            <span className="font-display text-xl tracking-[0.2em] uppercase font-semibold bg-gradient-to-r from-gold via-[oklch(0.82_0.12_82)] to-gold-dark bg-clip-text text-transparent">
              {s.brand_short}
            </span>
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
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full font-sans-ui uppercase tracking-[0.2em] text-[11px] px-7 py-3.5 bg-[oklch(0.58_0.21_25)] hover:bg-[oklch(0.50_0.22_25)] text-white"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
