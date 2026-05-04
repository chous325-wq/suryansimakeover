## Header Redesign — Floating Pill Style

Refactor `src/components/site-header.tsx` to match the reference: a floating rounded pill bar with brand on the left, centered nav links, and a prominent red "Book Now" CTA on the right. The brand name will be visually highlighted on both mobile and desktop.

### Visual Design

- **Container**: Floating bar centered with horizontal margin, `rounded-full`, sits 16–20px from top. Initially semi-transparent over hero with backdrop blur; on scroll switches to a solid surface variant with subtle shadow + gold border.
- **Brand (left)**: "SURYANSHI" wordmark in display font, bold/uppercase, with a gold gradient text effect (`bg-gradient-gold` clipped to text) so it stands out on both light/dark backgrounds. Small "Makeover" eyebrow stays under it on desktop only.
- **Nav (center, desktop)**: Work/Process style — `Home · About · Services · Portfolio · Packages · Reviews · Contact` evenly spaced; medium weight, hover → gold; active link gets a subtle gold underline pill.
- **CTA (right)**: "Book Now" button styled as solid red/gold rounded-full pill (matching reference's red book button) with strong contrast — uses brand `--ink` background by default, switches to a vibrant red accent for emphasis as in the reference. Always visible.
- **Mobile**: Same pill bar with brand (highlighted gold gradient), a compact "Book" red pill button, and a hamburger icon. Full-screen overlay menu retains current behavior; brand inside overlay also uses the gold-gradient highlight.

### Layout / Responsiveness

```
[ ◐ SURYANSHI ]   Home  About  Services  Portfolio  ...    [ Book Now ]
```
- Desktop (≥lg): brand left, nav center (flex-1 + justify-center), CTA right.
- Tablet/mobile (<lg): brand left, [Book] + [☰] right; nav hidden until overlay opens.

### Technical Changes

- Edit `src/components/site-header.tsx`:
  - Wrap header in a `fixed top-3 inset-x-3 md:inset-x-6 z-50` container; inner `rounded-full` pill with `px-4 md:px-6 py-2.5`.
  - Replace current scrolled/transparent two-line brand with a single-line wordmark span using `bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent` plus `drop-shadow` for readability over hero video. Eyebrow "Makeover" appears under the wordmark on `md:` and up only.
  - Center nav: change desktop nav to `absolute left-1/2 -translate-x-1/2` or use 3-column flex (`justify-between` with center group `flex-1 justify-center`).
  - Add a dedicated red CTA style (e.g. inline classes: `bg-[oklch(0.62_0.20_25)] hover:bg-[oklch(0.55_0.22_25)] text-white rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.2em]`). Keep existing `btn-gold` available for other pages.
  - Mobile: show shrunk "Book" pill + hamburger; both inside the same pill bar.
  - Mobile overlay menu: brand at top uses the same gold gradient highlight.
- No changes to other files. No new dependencies. Brand colors come from existing CSS vars in `src/styles.css` (`--gold`, `--gold-dark`, `--ink`, `--surface`).
- `useState`/`useEffect` scroll listener is preserved; it now toggles between transparent-glass and solid-surface variants of the pill.

### Out of Scope

- No content/data changes.
- No router/route changes.
- Footer untouched.

After approval I'll switch to default mode and implement the edits in `src/components/site-header.tsx`.
