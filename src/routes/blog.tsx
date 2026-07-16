import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — AccuBridge | Ideas on Brand, Growth & Business" },
      { name: "description", content: "Long-form thinking on branding, growth marketing, compliance and building premium businesses." },
      { property: "og:title", content: "AccuBridge Journal" },
      { property: "og:description", content: "Ideas worth compounding." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/blog" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/blog" }],
  }),
  component: BlogPage,
});

type Post = {
  id: string; slug: string; title: string; excerpt: string | null;
  cover_url: string | null; category: string; updated_at: string;
};

const seedPosts: Post[] = [
  { id: "s1", slug: "luxury-branding", title: "The New Rules of Luxury Branding", excerpt: "Why premium brands are abandoning the safe playbook — and what to build instead.", cover_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200", category: "Brand", updated_at: "2026-07-08" },
  { id: "s2", slug: "meta-ads-sniper", title: "Meta Ads: From Spray to Sniper", excerpt: "The measurement stack that separates 3× ROAS from real, defensible scale.", cover_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200", category: "Growth", updated_at: "2026-07-04" },
  { id: "s3", slug: "pk-compliance-2026", title: "Pakistan's Compliance Playbook 2026", excerpt: "The quiet operators of Karachi and Lahore share their tax and legal setups.", cover_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200", category: "Compliance", updated_at: "2026-06-28" },
  { id: "s4", slug: "boring-wins", title: "The Founder's Framework for Boring Wins", excerpt: "Repeatable, unsexy processes that outperform ten viral moments.", cover_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", category: "Advisory", updated_at: "2026-06-22" },
  { id: "s5", slug: "design-systems-ship", title: "Design Systems That Actually Ship", excerpt: "How to build a token architecture your whole team will use.", cover_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200", category: "Design", updated_at: "2026-06-14" },
  { id: "s6", slug: "b2b-positioning", title: "Positioning a Category-Defining B2B", excerpt: "Sharpening the wedge that turns cold traffic into signed contracts.", cover_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200", category: "Strategy", updated_at: "2026-06-05" },
];

function fmt(d: string) {
  try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }); } catch { return d; }
}

function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id,slug,title,excerpt,cover_url,category,updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setPosts(data as Post[]);
      });
  }, []);

  const [feat, ...rest] = posts;
  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 bg-hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">The Journal</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-4xl">Ideas that <em className="text-gradient-gold">compound.</em></h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">Field notes from the AccuBridge team on brand, growth, compliance and craft.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/blog" className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl bg-card border border-border overflow-hidden shadow-luxury">
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              {feat.cover_url && <img src={feat.cover_url} alt={feat.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
            </div>
            <div className="p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{feat.category} · {fmt(feat.updated_at)}</p>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">{feat.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{feat.excerpt}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-royal group-hover:text-gold transition">
                Read essay <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link to="/blog" key={p.id} className="group block overflow-hidden rounded-3xl bg-card border border-border card-3d animate-reveal-up" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  {p.cover_url && <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.category} · {fmt(p.updated_at)}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
