
-- 1. Restrict site_settings public SELECT to non-sensitive whitelist
DROP POLICY IF EXISTS "Public reads settings" ON public.site_settings;
CREATE POLICY "Public reads safe settings"
ON public.site_settings
FOR SELECT
TO public
USING (key IN ('brand_name','tagline','instagram_url','instagram_handle','map_url','address','hero_video_url'));

-- 2. Remove public.has_role (keep private.has_role only used by RLS policies)
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 3. Tighten storage SELECT policies to prevent bucket listing
DROP POLICY IF EXISTS "Authenticated can view portfolio files" ON storage.objects;
DROP POLICY IF EXISTS "Public read hero-video" ON storage.objects;
CREATE POLICY "Public can view individual hero-video files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'hero-video' AND name IS NOT NULL);
