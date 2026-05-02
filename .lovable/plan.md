## Goal
Seed a ready-to-use admin account so the owner can log in at `/admin` immediately with:
- **Email:** chous325@gmail.com
- **Password:** Makeup09

No email confirmation required. Full admin role granted.

## Steps

1. **Disable email confirmation (auth setting)**
   - Turn off "Confirm email" on the auth provider so signups/logins work without clicking a verification link.
   - This applies project-wide. New signups will also skip verification (can be re-enabled later if desired).

2. **Create the auth user `chous325@gmail.com` with password `Makeup09`**
   - Use the admin (service-role) API to insert the user directly into `auth.users` with `email_confirmed_at` set to now, so the account is immediately usable.
   - The existing `handle_new_user` trigger will auto-create a row in `public.profiles`.

3. **Grant `admin` role**
   - Insert a row into `public.user_roles` with the new user's `user_id` and `role = 'admin'`.
   - This unlocks all admin RLS policies (bookings, services, packages, portfolio, testimonials, offers, settings) and the `/admin` dashboard via `useAuth().isAdmin`.

4. **Verify**
   - Confirm the user exists in `auth.users` with `email_confirmed_at` populated.
   - Confirm the `user_roles` row exists with role `admin`.
   - Tell the user to go to `/auth`, log in with the credentials, and they'll land on `/admin`.

## Notes
- Password `Makeup09` is short (8 chars) and not very strong — it will work, but I recommend changing it after first login from a password manager.
- Existing `/auth` and `/admin` routes already handle login + role gating (see `src/routes/auth.tsx`, `src/routes/admin.tsx`, `src/hooks/use-auth.ts`) — no code changes needed.
- No schema changes required; this is data + one auth-config toggle.
