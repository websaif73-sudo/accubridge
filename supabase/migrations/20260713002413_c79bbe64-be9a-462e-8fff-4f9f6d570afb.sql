CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Websites',
  description text,
  image_url text,
  site_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT ALL ON public.portfolio_items TO service_role;

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published portfolio" ON public.portfolio_items FOR SELECT TO anon USING (published = true);
CREATE POLICY "Authenticated can read all portfolio" ON public.portfolio_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert portfolio" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update portfolio" ON public.portfolio_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete portfolio" ON public.portfolio_items FOR DELETE TO authenticated USING (true);

CREATE TRIGGER portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();