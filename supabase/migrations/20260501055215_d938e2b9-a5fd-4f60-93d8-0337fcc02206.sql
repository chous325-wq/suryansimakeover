-- =========================
-- ENUMS
-- =========================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.booking_status AS ENUM ('new', 'contacted', 'confirmed', 'completed', 'cancelled');

-- =========================
-- UPDATED_AT TRIGGER FN
-- =========================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================
-- PROFILES
-- =========================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- USER ROLES
-- =========================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================
-- BOOKINGS
-- =========================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_date DATE,
  event_type TEXT,
  service_slug TEXT,
  location TEXT,
  message TEXT,
  status booking_status NOT NULL DEFAULT 'new',
  follow_up_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- PORTFOLIO
-- =========================
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  category TEXT NOT NULL DEFAULT 'Bridal',
  image_url TEXT NOT NULL,
  before_url TEXT,
  after_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- SERVICES
-- =========================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price_from INT,
  price_to INT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- PACKAGES
-- =========================
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_packages_updated BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- TESTIMONIALS
-- =========================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  quote TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- OFFERS
-- =========================
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  badge TEXT,
  link_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_offers_updated BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- SITE SETTINGS (single key/value store)
-- =========================
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- RLS POLICIES
-- =========================

-- profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(),'admin'));

-- user_roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- bookings: anyone can insert (public form), only admins can read/update/delete
CREATE POLICY "Anyone can submit booking" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read bookings" ON public.bookings FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete bookings" ON public.bookings FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- portfolio_items: public read of published, admin write
CREATE POLICY "Public reads published portfolio" ON public.portfolio_items FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read all portfolio" ON public.portfolio_items FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage portfolio" ON public.portfolio_items FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- services
CREATE POLICY "Public reads active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins read all services" ON public.services FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- packages
CREATE POLICY "Public reads active packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins read all packages" ON public.packages FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- testimonials
CREATE POLICY "Public reads published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read all testimonials" ON public.testimonials FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- offers
CREATE POLICY "Public reads active offers" ON public.offers FOR SELECT USING (is_active = true);
CREATE POLICY "Admins read all offers" ON public.offers FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage offers" ON public.offers FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- site_settings: public read, admin write
CREATE POLICY "Public reads settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================
-- STORAGE BUCKET
-- =========================
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view portfolio files" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admins upload portfolio files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update portfolio files" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete portfolio files" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(),'admin'));

-- =========================
-- SEED DATA
-- =========================
INSERT INTO public.site_settings (key, value) VALUES
  ('brand_name', 'Suryanshi Makeover'),
  ('phone', '+91 8144602025'),
  ('whatsapp', '918144602025'),
  ('email', 'chous325@gmail.com'),
  ('instagram_url', 'https://www.instagram.com/suryanshi_makeover_offcial'),
  ('instagram_handle', '@suryanshi_makeover_offcial'),
  ('map_url', 'https://maps.app.goo.gl/1Kx41Pr68squARkGA'),
  ('address', 'Odisha, India'),
  ('tagline', 'Flawless Makeup for Your Special Moments');

INSERT INTO public.services (slug, name, tagline, description, price_from, price_to, sort_order) VALUES
  ('bridal', 'Bridal Makeup', 'The Suryanshi Bride', 'Long-lasting heirloom artistry for your wedding day with detailed traditional styling.', 25000, 55000, 1),
  ('party', 'Party Makeup', 'Evening Glamour', 'Sculpted, photo-ready glam for receptions, sangeets, and special occasions.', 5500, 12000, 2),
  ('hd', 'HD Makeup', 'Flawless on Camera', 'High-definition formulas designed for 4K cameras and pro photography.', 7500, 15000, 3),
  ('airbrush', 'Airbrush Makeup', 'Weightless Perfection', 'Featherlight, lasting coverage applied through professional airbrush technology.', 9500, 18000, 4),
  ('hair', 'Hairstyling', 'Crowning Touches', 'Bridal updos and traditional braiding with floral & jewelled adornments.', 3500, 8000, 5);

INSERT INTO public.packages (name, price, features, is_popular, sort_order) VALUES
  ('Engagement Ritual', 28000, ARRAY['HD bridal makeup','Hairstyling with adornments','Saree/lehenga draping','Trial session','Touch-up kit','On-location service'], false, 1),
  ('Royal Bride', 55000, ARRAY['Premium airbrush makeup','Heritage hairstyling','Full draping & jewellery setting','Pre-bridal trial','Mother of bride makeup','All-day touch-ups','Reception look'], true, 2),
  ('Heirloom Trousseau', 95000, ARRAY['3 ceremonies covered','Sangeet, Wedding & Reception','Premium airbrush throughout','Family makeup (4 members)','Two artists on wedding day','Pre-bridal skin consult','Travel within 100km included'], false, 3);

INSERT INTO public.testimonials (author_name, author_role, quote, rating, sort_order) VALUES
  ('Ananya P.', 'Bride, Cuttack', 'Suryanshi made me feel like royalty. The makeup lasted from haldi to vidaai — every photograph looks like art.', 5, 1),
  ('Ritika S.', 'Bride, Bhubaneswar', 'She didn''t just do my makeup, she understood my heritage. The Odia bridal look she created was stunning.', 5, 2),
  ('Meera K.', 'Bride, Puri', 'From skincare prep to reception look, every detail was thought through. Worth every rupee.', 5, 3);

INSERT INTO public.offers (title, description, badge, is_active) VALUES
  ('Limited Time Bridal Offer', 'Book your bridal package this season and receive a complimentary pre-bridal trial.', 'Limited Time', true);