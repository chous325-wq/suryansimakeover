## Issues & Fixes

### 1. Booking phone — require exactly 10 digits
In `src/routes/booking.tsx` update the Zod schema so `phone` must contain exactly 10 digits (after stripping non-digits). Show clear error "Phone must be 10 digits". Also add `inputMode="numeric"`, `maxLength=10`, and a digit-only filter on the input.

### 2. Booking service category not recorded in dashboard
Today the booking form sends `service_slug`, but the admin Bookings table only displays `event_type` (which is never collected) — so the service appears empty.

Fix in `src/routes/admin.tsx` → `BookingsAdmin`:
- Add a "Service" column that reads `b.service_slug` and maps to a friendly name from a fetched services list.
- Keep showing `event_date` below it.

### 3. Admin edits not reflected on the website
The public pages render hard-coded arrays from `src/data/site-data.ts`, so changes saved to the database never appear.

Convert these pages to fetch from Supabase (with the static arrays kept only as fallback while loading / if DB empty):

- `src/routes/services.tsx` → fetch active rows from `services` ordered by `sort_order`.
- `src/routes/packages.tsx` → fetch active rows from `packages`.
- `src/routes/portfolio.tsx` → fetch published `portfolio_items`; build category filter list from DB rows.
- `src/routes/reviews.tsx` → fetch published `testimonials`.
- `src/routes/index.tsx` services preview → fetch top 6 active services.

Each page keeps a small loading skeleton; if the query returns empty (e.g. fresh DB), fall back to the existing static arrays so the site never looks empty.

### 4. Portfolio dashboard: "Image required" after choosing a file
The storage bucket `portfolio` has RLS policies that call `public.has_role(...)`. In a previous migration we revoked EXECUTE on `public.has_role` from the public/authenticated roles (only `private.has_role` is callable). As a result the storage INSERT policy evaluates to false, the upload silently fails, the file URL is never set, and Save then complains "Image required".

Fix with a new migration that updates the three storage policies (`Admins upload/update/delete portfolio files`) to call `private.has_role(auth.uid(), 'admin')` instead of `public.has_role(...)`.

Also harden the admin upload UX in `PortfolioAdmin`:
- Show toast errors from upload (already does) but also keep the file input enabled so the user can retry.
- Disable the Save button while `uploading` is true so the user can't submit before the upload finishes.

### Technical summary

Files to edit
- `src/routes/booking.tsx` — phone validation (exactly 10 digits) + input constraints.
- `src/routes/admin.tsx` — Bookings table: show service name from `service_slug`; PortfolioAdmin: disable Save while uploading.
- `src/routes/services.tsx`, `src/routes/packages.tsx`, `src/routes/portfolio.tsx`, `src/routes/reviews.tsx`, `src/routes/index.tsx` — fetch from Supabase with static fallback.

New migration
- Update storage RLS policies on `storage.objects` for the `portfolio` bucket to use `private.has_role` instead of `public.has_role`.

No schema changes to existing tables. No new tables.

After approval I will implement these in default mode.