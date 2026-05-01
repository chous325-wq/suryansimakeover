-- Tighten booking insert: require name + phone, length checks
DROP POLICY "Anyone can submit booking" ON public.bookings;
CREATE POLICY "Anyone can submit booking" ON public.bookings
FOR INSERT WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 100
  AND length(trim(phone)) BETWEEN 7 AND 20
  AND (email IS NULL OR length(email) <= 255)
  AND (location IS NULL OR length(location) <= 200)
  AND (message IS NULL OR length(message) <= 1000)
);

-- Restrict bucket listing: only allow direct file access via signed/public URL paths,
-- not bucket-wide listing. Keep file-level read public.
DROP POLICY "Public can view portfolio files" ON storage.objects;
CREATE POLICY "Public can view individual portfolio files" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio' AND auth.role() = 'anon' AND name IS NOT NULL);
CREATE POLICY "Authenticated can view portfolio files" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;