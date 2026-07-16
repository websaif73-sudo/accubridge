import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — AccuBridge | Selected Work" },
      { name: "description", content: "A curated selection of AccuBridge's premium branding, web, social and ad campaigns." },
      { property: "og:title", content: "AccuBridge Portfolio" },
      { property: "og:description", content: "Selected work: identities, sites, campaigns and launches." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/portfolio" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/portfolio" }],
  }),
  component: PortfolioPage,
});

type Item = { title: string; cat: string; img: string; site: string; desc: string };

const seed: Item[] = [
  { title: "Skyline Realty", cat: "Websites", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200", site: "https://example.com", desc: "Editorial property platform with cinematic scroll storytelling." },
  { title: "Halo Cosmetics", cat: "Ads", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200", site: "https://example.com", desc: "Meta ad program that scaled from PKR 3M to PKR 22M/mo at stable ROAS." },
  { title: "Meridian Coffee", cat: "Branding", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200", site: "https://example.com", desc: "Full identity system for a premium single-origin coffee house." },
  { title: "Terra Logistics", cat: "Branding", img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200", site: "https://example.com", desc: "B2B rebrand + digital HQ for a regional logistics leader." },
  { title: "Aurora Studios", cat: "Social Media", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200", site: "https://example.com", desc: "Editorial social program for a film production studio." },
  { title: "Northlane Legal", cat: "Websites", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200", site: "https://example.com", desc: "Trust-forward legal firm site with client portal." },
  { title: "Everline Fitness", cat: "Ads", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200", site: "https://example.com", desc: "Creative-led social program driving membership growth." },
  { title: "Voltra Motors", cat: "Websites", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200", site: "https://example.com", desc: "Configurator-first site for a challenger EV brand." },
  { title: "Ivory & Oak", cat: "Branding", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200", site: "https://example.com", desc: "Boutique interior studio identity & collateral." },
];

function PortfolioPage() {
  const [items, setItems] = useState<Item[]>(seed);
  const [dbCats, setDbCats] = useState<string[] | null>(null);
  const [cat, setCat] = useState<string>("All");
  const [preview, setPreview] = useState<Item | null>(null);

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("title,category,image_url,site_url,description")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(
            data.map((r: any) => ({
              title: r.title,
              cat: r.category,
              img: r.image_url ?? "",
              site: r.site_url ?? "#",
              desc: r.description ?? "",
            })),
          );
        }
      });
    (supabase as any)
      .from("portfolio_categories")
      .select("name")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .then(({ data }: any) => {
        if (data && data.length > 0) setDbCats(data.map((r: any) => r.name as string));
      });
  }, []);

  const cats = useMemo(() => {
    const fromDb = dbCats ?? Array.from(new Set(items.map((i) => i.cat)));
    return ["All", ...fromDb];
  }, [dbCats, items]);
  const list = useMemo(() => (cat === "All" ? items : items.filter((i) => i.cat === cat)), [cat, items]);



  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 bg-hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Selected Work</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-4xl">Case studies with <em className="text-gradient-gold">receipts.</em></h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">Every project below launched, scaled and delivered measurable outcomes for the brand behind it.</p>

          <div className="mt-12 flex flex-wrap gap-3">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${cat === c ? "bg-gold-gradient text-royal shadow-gold-glow" : "glass text-white/80 hover:bg-white/10"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {list.map((it, i) => (
              <button
                key={it.title}
                onClick={() => setPreview(it)}
                className="mb-6 break-inside-avoid group relative block w-full overflow-hidden rounded-3xl card-3d text-left"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/6]"}`}>
                  <img src={it.img} alt={it.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-gold">{it.cat}</p>
                      <h3 className="mt-2 font-display text-2xl text-white">{it.title}</h3>
                      <p className="mt-2 text-sm text-white/70 line-clamp-2">{it.desc}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-gold-gradient text-royal opacity-0 group-hover:opacity-100 transition">
                    <Play className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Backlink preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-royal-deep/85 backdrop-blur-md p-4 md:p-10 animate-reveal-up" onClick={() => setPreview(null)}>
          <div className="relative mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-card shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/40">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 rounded-full bg-white px-4 py-1.5 text-xs text-muted-foreground truncate max-w-md">{preview.site}</div>
              </div>
              <div className="flex items-center gap-2">
                <a href={preview.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  Open <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => setPreview(null)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted"><X className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative bg-secondary/30">
              <iframe src={preview.site} title={preview.title} className="h-full w-full" sandbox="allow-scripts allow-same-origin" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-royal-deep/60 to-transparent p-6">
                <div className="pointer-events-auto max-w-2xl rounded-2xl glass-light p-4">
                  <h3 className="font-display text-xl text-royal">{preview.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{preview.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
