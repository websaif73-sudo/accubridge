CREATE TABLE public.portfolio_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.portfolio_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_categories TO authenticated;
GRANT ALL ON public.portfolio_categories TO service_role;

ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories" ON public.portfolio_categories FOR SELECT TO anon USING (true);
CREATE POLICY "Auth read categories" ON public.portfolio_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth insert categories" ON public.portfolio_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update categories" ON public.portfolio_categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete categories" ON public.portfolio_categories FOR DELETE TO authenticated USING (true);

CREATE TRIGGER set_updated_at_portfolio_categories BEFORE UPDATE ON public.portfolio_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.portfolio_categories (name, slug, sort_order) VALUES
  ('Websites', 'websites', 1),
  ('Branding', 'branding', 2),
  ('Social Media', 'social-media', 3),
  ('Ads', 'ads', 4),
  ('Video', 'video', 5),
  ('Other', 'other', 99)
ON CONFLICT (name) DO NOTHING;
