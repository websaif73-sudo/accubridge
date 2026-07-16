import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Sparkles, Award, Users2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AccuBridge | Accuracy. Connecting. Growth." },
      { name: "description", content: "The story, team, mission and values behind AccuBridge Business Services." },
      { property: "og:title", content: "About AccuBridge" },
      { property: "og:description", content: "A boutique business services firm engineered for ambitious brands." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/about" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/about" }],
  }),
  component: AboutPage,
});

const team = [
  { n: "Saif Ali Asif", r: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600" },
  { n: "Ayesha Khan", r: "Creative Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600" },
  { n: "Bilal Raza", r: "Head of Growth", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600" },
  { n: "Zainab Iqbal", r: "Tax & Compliance Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" },
];

const values = [
  { icon: Target, t: "Mission", d: "To engineer premium business infrastructure that turns ambitious founders into category leaders." },
  { icon: Eye, t: "Vision", d: "To be the most respected boutique business services firm serving South Asia and its diaspora." },
  { icon: Heart, t: "Values", d: "Accuracy above ego. Connecting people to opportunity. Growth measured in impact, not invoices." },
];

function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 md:pt-52 bg-hero-gradient text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Story</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-4xl">Built for the founders who <em className="text-gradient-gold">refuse to blend in.</em></h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Chapter One</p>
            <h2 className="font-display text-4xl md:text-5xl">A boutique firm with an <em className="text-royal">operator's mindset.</em></h2>
          </div>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>AccuBridge Business Services (Pvt.) Ltd. was founded on a stubborn belief: that a single, disciplined partner could out-execute a stack of specialist agencies — if it hired senior, obsessed over craft and refused to compromise on outcomes.</p>
            <p>We are creatives, technologists, chartered accountants and lawyers under one roof. We bridge the gap between <span className="text-royal font-semibold">what a brand looks like</span> and <span className="text-royal font-semibold">what a business actually needs</span>. That is the promise inside our name.</p>
            <p className="italic text-royal">Accuracy. Connecting. Growth. — three words we live by, in that order.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">What We Stand For</p>
            <h2 className="font-display text-4xl md:text-6xl">Mission. <em className="text-royal">Vision.</em> Values.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={v.t} className="card-3d rounded-3xl bg-card border border-border p-10 text-center animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-royal-gradient text-gold shadow-luxury">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl mb-3">{v.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">The People</p>
            <h2 className="font-display text-4xl md:text-6xl">Meet the <em className="text-royal">crew.</em></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <div key={m.n} className="card-3d group relative overflow-hidden rounded-3xl animate-reveal-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={m.img} alt={m.n} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-royal-deep via-royal-deep/60 to-transparent p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{m.r}</p>
                  <h3 className="mt-1 font-display text-xl">{m.n}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-hero-gradient text-white">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: Award, t: "12 Years", d: "of combined leadership across brand, growth and compliance." },
            { icon: Users2, t: "240+ Clients", d: "from bootstrapped studios to publicly listed enterprises." },
            { icon: Sparkles, t: "Global Roster", d: "serving founders across Karachi, Dubai, London and Toronto." },
          ].map((s) => (
            <div key={s.t} className="rounded-3xl glass p-8">
              <s.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
              <p className="mt-2 text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
