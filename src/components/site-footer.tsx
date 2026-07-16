import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./logo";

const WHATSAPP_NUMBER = "923350320720";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-royal-glow/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white/95 p-4 inline-block">
              <Logo className="h-14 w-auto" />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              AccuBridge is a premium business services partner engineered for ambitious brands.
              We connect strategy, design, technology and compliance into one seamless growth engine.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-gold hover:text-royal hover:border-gold transition-all duration-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</h4>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {[
                ["/services", "Services"],
                ["/portfolio", "Portfolio"],
                ["/about", "About"],
                ["/blog", "Blog"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</h4>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-gold" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-gold transition-colors">+92 335 0320720</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-gold" />
                <a href="mailto:management@accubridge.tech" className="hover:text-gold transition-colors">management@accubridge.tech</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-gold" />
                <span>Karachi, Pakistan · Serving globally</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 hairline-gold" />
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} AccuBridge Business Services (Pvt.) Ltd. All rights reserved.</p>
          <p className="tracking-[0.3em] uppercase">Accuracy · Connecting · Growth</p>
        </div>
      </div>
    </footer>
  );
}
