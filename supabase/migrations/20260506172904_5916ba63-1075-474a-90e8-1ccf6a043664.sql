DROP POLICY IF EXISTS "Public reads safe settings" ON public.site_settings;
CREATE POLICY "Public reads safe settings"
ON public.site_settings
FOR SELECT
TO public
USING (key = ANY (ARRAY['brand_name','tagline','instagram_url','instagram_handle','facebook_url','map_url','map_embed','address','phone_display','phone_tel','whatsapp_number','hero_video_url','email']));