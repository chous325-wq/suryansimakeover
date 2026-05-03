DROP POLICY IF EXISTS "Admins upload portfolio files" ON storage.objects;
DROP POLICY IF EXISTS "Admins update portfolio files" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete portfolio files" ON storage.objects;

CREATE POLICY "Admins upload portfolio files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update portfolio files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete portfolio files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio' AND private.has_role(auth.uid(), 'admin'::app_role));