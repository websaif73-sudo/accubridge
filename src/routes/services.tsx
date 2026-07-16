import { createFileRoute } from "@tanstack/react-router";
import { Palette, Globe, Megaphone, TrendingUp, Calculator, Briefcase, Scale, ShoppingBag, Search, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AccuBridge | Brand, Web, Ads, Tax, Legal, Advisory" },
      { name: "description", content: "Full-spectrum business services: brand identity, web, social, Meta ads, tax filing, business advisory, legal, e-commerce, SEO." },
      { property: "og:title", content: "AccuBridge — Full-Spectrum Services" },
      { property: "og:description", content: "Nine premium disciplines, one accountable partner." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/services" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/services" }],
  }),
  component: ServicesPage,
});

const marquee = [
  "Brand Identity", "Web Development", "Social Media", "Meta Ads",
  "Tax Filing", "Business Advisory", "Legal", "E-Commerce", "SEO & Content"
];

const services = [
  { icon: Palette, title: "Brand Identity", short: "Icon-worthy identities engineered for recall.", long: "Naming, verbal identity, logo systems, typography, color engineering, guideline decks and rollout kits. Every asset built for scale — from business card to billboard." },
  { icon: Globe, title: "Web Development", short: "Cinematic sites that convert and rank.", long: "Design-led builds on Next / TanStack / WordPress. Motion, 3D, CMS, headless commerce, Core Web Vitals in the 95+ range. Performance is not optional." },
  { icon: Megaphone, title: "Social Media Management", short: "Content that stops thumbs and moves stock.", long: "Strategy, calendar, high-craft creative, community, reporting. Fully managed programs across Instagram, TikTok, LinkedIn and YouTube Shorts." },
  { icon: TrendingUp, title: "Meta Ads Management", short: "Performance media, engineered.", long: "Full-funnel Meta buying with creative testing frameworks, MMM-lite attribution, Advantage+ optimization and monthly business reviews. Ideal spend range $10k–$500k/mo." },
  { icon: Calculator, title: "Tax Filing & Compliance", short: "Airtight, on time, without drama.", long: "Corporate income tax, sales tax, withholding, quarterly & annual filings, audit response. Senior CAs on every account — never juniors." },
  { icon: Briefcase, title: "Business Advisory", short: "Fractional leadership for the next chapter.", long: "Growth strategy, org design, financial modeling, fundraising prep, board packs. Boutique advisory with operator DNA." },
  { icon: Scale, title: "Legal & Company Formation", short: "From incorporation to protection.", long: "SECP registration, shareholder agreements, employment contracts, trademark & IP, commercial contracts and dispute advisory." },
  { icon: ShoppingBag, title: "E-commerce Solutions", short: "Storefronts built to compound.", long: "Shopify Plus, WooCommerce, headless. Merchandising, checkout optimization, subscriptions, retention, logistics integrations." },
  { icon: Search, title: "SEO & Content Marketing", short: "Compounding organic — for real.", long: "Technical SEO audits, topical authority builds, editorial calendars, digital PR and link development. Written by humans who understand your category." },
] as const;

function ServicesPage() {
  const [active, setActive] = useState<typeof services[number] | null>(null);

  return (
    <>
      {/* Marquee header */}
      <section className="pt-40 pb-20 md:pt-48 bg-hero-gradient text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Disciplines</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-4xl">Nine premium disciplines. <em className="text-gradient-gold">One accountable partner.</em></h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70">
            Instead of hiring six agencies and stitching the seams yourself, retain one senior team that owns the entire brand engine.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="hairline-gold absolute inset-x-0 top-0" />
          <div className="hairline-gold absolute inset-x-0 bottom-0" />
          <div className="flex animate-marquee whitespace-nowrap py-8">
            {[...marquee, ...marquee, ...marquee].map((m, i) => (
              <span key={i} className="mx-8 font-display text-4xl md:text-6xl text-white/10 hover:text-gold transition-colors">
                {m} <span className="text-gold mx-4">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(s)}
                className="group card-3d text-left relative overflow-hidden rounded-3xl border border-border bg-card p-8 animate-reveal-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-royal/5 blur-3xl group-hover:bg-gold/20 transition-all duration-700" />
                <div className="relative">
                  <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl bg-royal-gradient text-gold shadow-luxury">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-royal group-hover:text-gold transition">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popup modal */}
      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-royal-deep/80 backdrop-blur-md p-4 animate-reveal-up" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-2xl rounded-3xl bg-card p-10 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-muted transition">
              <X className="h-4 w-4" />
            </button>
            <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-royal-gradient text-gold shadow-luxury">
              <active.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-3xl">{active.title}</h3>
            <p className="mt-2 text-gold text-sm uppercase tracking-[0.25em]">{active.short}</p>
            <p className="mt-6 text-foreground/80 leading-relaxed">{active.long}</p>
            <div className="mt-8 flex gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-luxury">
                Request proposal <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button onClick={() => setActive(null)} className="rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-muted transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
