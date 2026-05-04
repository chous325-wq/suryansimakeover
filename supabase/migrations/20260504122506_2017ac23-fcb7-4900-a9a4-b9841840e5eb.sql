-- Hero video settings stored in site_settings (key/value)
-- Using existing site_settings table; no schema change needed for hero video URL.

-- Reels table
CREATE TABLE public.reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads active reels" ON public.reels
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins read all reels" ON public.reels
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage reels" ON public.reels
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_reels_updated_at
  BEFORE UPDATE ON public.reels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for hero-video bucket (create bucket)
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-video', 'hero-video', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read hero-video" ON storage.objects
  FOR SELECT USING (bucket_id = 'hero-video');

CREATE POLICY "Admins upload hero-video" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'hero-video' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update hero-video" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'hero-video' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete hero-video" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'hero-video' AND private.has_role(auth.uid(), 'admin'::app_role));