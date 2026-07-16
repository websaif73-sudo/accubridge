import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Sparkles, TrendingUp, ShieldCheck, Palette, Globe, Megaphone, Calculator, Briefcase, Scale, ShoppingBag, Search, Star, Play, Quote } from "lucide-react";
import { SiMeta, SiShopify, SiGoogleads, SiTiktok, SiInstagram, SiYoutube, SiStripe, SiWordpress, SiGoogleanalytics, SiHubspot } from "react-icons/si";
import { Particles } from "@/components/particles";
import { useEffect, useRef, useState } from "react";

const brandLogos = [
  { Icon: SiMeta, label: "Meta Ads", color: "#0866FF", pos: "top-[18%] left-[6%]", size: "h-16 w-16", delay: "0s" },
  { Icon: SiShopify, label: "Shopify", color: "#95BF47", pos: "top-[30%] left-[38%]", size: "h-14 w-14", delay: "0.4s" },
  { Icon: SiGoogleads, label: "Google Ads", color: "#FBBC04", pos: "top-[62%] left-[4%]", size: "h-14 w-14", delay: "0.8s" },
  { Icon: SiTiktok, label: "TikTok", color: "#ffffff", pos: "top-[75%] left-[42%]", size: "h-12 w-12", delay: "1.2s" },
  { Icon: SiInstagram, label: "Instagram", color: "#E4405F", pos: "top-[12%] right-[38%]", size: "h-12 w-12", delay: "0.6s" },
  { Icon: SiYoutube, label: "YouTube", color: "#FF0000", pos: "top-[68%] right-[36%]", size: "h-14 w-14", delay: "1.6s" },
  { Icon: SiStripe, label: "Stripe", color: "#635BFF", pos: "top-[52%] right-[6%]", size: "h-14 w-14", delay: "1s" },
  { Icon: SiWordpress, label: "WordPress", color: "#ffffff", pos: "bottom-[10%] right-[28%]", size: "h-12 w-12", delay: "1.4s" },
  { Icon: SiGoogleanalytics, label: "Analytics", color: "#F9AB00", pos: "top-[8%] right-[6%]", size: "h-12 w-12", delay: "0.2s" },
  { Icon: SiHubspot, label: "HubSpot", color: "#FF7A59", pos: "bottom-[6%] left-[46%]", size: "h-12 w-12", delay: "1.8s" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AccuBridge — Luxury Business Services | Brand, Web, Ads, Tax & Legal" },
      { name: "description", content: "AccuBridge Business Services: premium brand identity, web development, Meta & Google ads, tax, legal and advisory. We build brands that dominate." },
      { property: "og:title", content: "AccuBridge — We Build Brands That Dominate" },
      { property: "og:description", content: "Premium brand identity, web, ads, tax, legal and advisory for ambitious brands." },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/" }],
  }),
  component: HomePage,
});

const services = [
  { icon: Palette, title: "Brand Identity", desc: "Icon-worthy logos, systems and stories that command attention." },
  { icon: Globe, title: "Web Development", desc: "Fast, cinematic sites engineered to convert and rank." },
  { icon: Megaphone, title: "Social & Meta Ads", desc: "Scroll-stopping creative with performance-first media buying." },
  { icon: Calculator, title: "Tax & Compliance", desc: "Airtight filings and reporting handled by senior specialists." },
  { icon: Scale, title: "Legal & Formation", desc: "Company setup, contracts and IP protection — end to end." },
  { icon: Briefcase, title: "Business Advisory", desc: "Strategy sprints and fractional leadership for the next phase." },
] as const;

const stats = [
  { n: 240, suf: "+", label: "Brands Elevated" },
  { n: 18, suf: "M", label: "Ad Spend Managed" },
  { n: 96, suf: "%", label: "Client Retention" },
  { n: 12, suf: "", label: "Countries Served" },
] as const;

function useCountUp(target: number, duration = 1800) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { v, ref };
}

function Stat({ n, suf, label }: { n: number; suf: string; label: string }) {
  const { v, ref } = useCountUp(n);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl text-gradient-gold">{v}{suf}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">{label}</div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-hero-gradient text-white">
        <Particles count={90} />
        {/* 3D perspective grid floor */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] grid-3d opacity-60" />
        {/* Floating geometric shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-24 left-[8%] h-40 w-40 rounded-3xl border border-gold/30 animate-float-slow animate-tilt-3d" />
          <div className="absolute top-40 right-[10%] h-56 w-56 rounded-full border border-white/10 animate-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-32 left-[22%] h-24 w-24 rotate-45 bg-gold/10 backdrop-blur-xl border border-gold/30 animate-float-slow" style={{ animationDelay: "2s" }} />
          {/* Wireframe sphere (orbiting rings) */}
          <div className="absolute top-1/3 right-[18%] h-64 w-64">
            <div className="absolute inset-0 rounded-full border border-gold/25 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border border-white/20 animate-spin-reverse" style={{ borderStyle: "dashed" }} />
            <div className="absolute inset-8 rounded-full border-2 border-gold/20 animate-spin-slow" style={{ transform: "rotateX(70deg)" }} />
            <div className="absolute inset-8 rounded-full border-2 border-white/20 animate-spin-reverse" style={{ transform: "rotateY(70deg)" }} />
            {/* orbiting dot */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-gold-glow animate-orbit" />
          </div>
          {/* Glowing 3D crystal */}
          <div className="absolute bottom-20 right-[8%] h-32 w-32 animate-tilt-3d">
            <div className="h-full w-full rotate-45 bg-gradient-to-br from-gold/40 to-royal-glow/50 blur-2xl" />
            <div className="absolute inset-4 rotate-45 border-2 border-gold/60" />
          </div>
          {/* Light rays */}
          <div className="absolute -top-20 left-1/4 h-[140%] w-40 bg-gradient-to-b from-gold/25 to-transparent blur-2xl animate-ray-sweep" />
          <div className="absolute -top-20 right-1/3 h-[140%] w-56 bg-gradient-to-b from-royal-glow/40 to-transparent blur-3xl animate-ray-sweep" style={{ animationDelay: "1.5s" }} />

          {/* Floating platform brand badges */}
          {brandLogos.map(({ Icon, label, color, pos, size, delay }) => (
            <div
              key={label}
              className={`absolute ${pos} ${size} animate-float-slow`}
              style={{ animationDelay: delay }}
              aria-hidden="true"
            >
              <div className="group relative h-full w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-luxury flex items-center justify-center animate-tilt-3d hover:bg-white/10 transition">
                <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/10 transition" />
                <Icon className="h-1/2 w-1/2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ color }} />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white/50 opacity-0 group-hover:opacity-100 transition">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-40 md:pt-52 pb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-gold animate-reveal-up">
              <Sparkles className="h-3.5 w-3.5" /> Premium Business Services
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl animate-reveal-up" style={{ animationDelay: "0.08s" }}>
              We Build <span className="text-gradient-gold">Brands</span><br />
              That <span className="italic text-gradient-royal">Dominate.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed animate-reveal-up" style={{ animationDelay: "0.15s" }}>
              AccuBridge is a full-spectrum business services partner. From identity to infrastructure — 
              we design, build and scale brands with the precision of a Swiss studio and the fire of a challenger startup.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-reveal-up" style={{ animationDelay: "0.22s" }}>
              <Link to="/contact" className="group relative inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-royal shadow-gold-glow hover:scale-105 transition-transform duration-300">
                Book a Call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full glass px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition">
                <Play className="h-4 w-4" /> View Our Work
              </Link>
            </div>

            {/* trust bar */}
            <div className="mt-16 flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.25em] text-white/50 animate-reveal-up" style={{ animationDelay: "0.3s" }}>
              <span className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> Award-winning studio</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> ISO-aligned processes</span>
              <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-gold" /> ROI-guaranteed frameworks</span>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative border-y border-white/10 backdrop-blur-xl bg-black/20">
          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12">
            {stats.map((s) => <Stat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">What we do</div>
              <h2 className="font-display text-4xl md:text-6xl max-w-2xl">A rare fusion of <em className="text-royal">craft</em> and <em className="text-royal">commerce</em>.</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-royal hover:text-gold transition">
              All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-3d group relative overflow-hidden rounded-3xl border border-border bg-card p-8 animate-reveal-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-royal/5 blur-2xl group-hover:bg-gold/20 transition-all duration-700" />
                <div className="relative">
                  <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl bg-royal-gradient text-gold shadow-luxury">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-royal group-hover:text-gold transition">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="relative bg-hero-gradient py-28 md:py-40 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl animate-glow-pulse" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Selected Work</div>
            <h2 className="font-display text-4xl md:text-6xl">Portfolio built for <em className="text-gradient-gold">legacy</em>.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Skyline Realty", cat: "Web · Branding", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop" },
              { t: "Meridian Coffee", cat: "Identity · Ecom", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop" },
              { t: "Northlane Legal", cat: "Web · Advisory", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop" },
              { t: "Halo Cosmetics", cat: "Ads · Social", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop" },
              { t: "Terra Logistics", cat: "Brand · Web", img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&auto=format&fit=crop" },
              { t: "Aurora Studios", cat: "Identity · Film", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop" },
            ].map((p, i) => (
              <Link
                to="/portfolio"
                key={p.t}
                className="group relative overflow-hidden rounded-3xl aspect-[4/5] card-3d"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.cat}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Client Voices</div>
            <h2 className="font-display text-4xl md:text-6xl">The verdict from <em className="text-royal">founders & CMOs</em>.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { q: "AccuBridge rebuilt our brand from the ground up — revenue doubled inside 90 days.", n: "Zara Malik", r: "Founder · Halo Cosmetics" },
              { q: "The most disciplined agency we've hired. Every quarter feels engineered.", n: "Bilal Ahmed", r: "CEO · Terra Logistics" },
              { q: "Their creative rivals studios triple the price. Elite work, humble team.", n: "Sophia Reyes", r: "CMO · Meridian Coffee" },
            ].map((t, i) => (
              <div key={i} className="relative rounded-3xl border border-border bg-card p-8 card-3d">
                <Quote className="absolute -top-4 left-6 h-10 w-10 text-gold/20" />
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg leading-relaxed text-foreground/85">"{t.q}"</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold">{t.n}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-secondary/40 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Journal</div>
              <h2 className="font-display text-4xl md:text-6xl max-w-2xl">Ideas <em className="text-royal">worth</em> compounding.</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-royal hover:text-gold transition">
              All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "The New Rules of Luxury Branding", d: "Why premium brands are abandoning the safe playbook — and what to build instead.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
              { t: "Meta Ads: From Spray to Sniper", d: "The measurement stack that separates 3× ROAS from real, defensible scale.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
              { t: "Pakistan's Compliance Playbook 2026", d: "The quiet operators of Karachi and Lahore share their tax and legal setups.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800" },
            ].map((b) => (
              <Link to="/blog" key={b.t} className="group block overflow-hidden rounded-3xl bg-card border border-border card-3d">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.img} alt={b.t} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">Insights</p>
                  <h3 className="mt-3 font-display text-xl">{b.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-hero-gradient text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40"><Particles count={40} /></div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl">Ready to build a brand <span className="text-gradient-gold">that dominates?</span></h2>
          <p className="mt-6 text-lg text-white/70">One call. Zero fluff. A tailored plan on the table within 24 hours.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-royal shadow-gold-glow hover:scale-105 transition">
              Book Your Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
