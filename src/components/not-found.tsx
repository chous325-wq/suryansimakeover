import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 pt-32">
      <div className="max-w-md text-center">
        <p className="ornament justify-center mb-6">Lost in beauty</p>
        <h1 className="font-display text-7xl text-ink">404</h1>
        <h2 className="mt-4 font-display text-2xl text-ink/80">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has been moved or no longer exists.
        </p>
        <Link to="/" className="btn-gold mt-8 inline-flex">Return Home</Link>
      </div>
    </div>
  );
}
