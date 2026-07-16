import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AccuBridge | Book a Strategy Call" },
      { name: "description", content: "Reach AccuBridge for premium branding, web, ads, tax, legal and advisory. Karachi HQ · serving globally." },
      { property: "og:title", content: "Contact AccuBridge" },
      { property: "og:description", content: "Book a strategy call or WhatsApp us directly." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://accurbidge-grand-opus.lovable.app/contact" },
      { property: "og:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
      { name: "twitter:image", content: "https://accurbidge-grand-opus.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://accurbidge-grand-opus.lovable.app/contact" }],
  }),
  component: ContactPage,
});

const WHATSAPP_NUMBER = "923350320720";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().max(60),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "PKR 500k – 2M", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    // Compose WhatsApp fallback link
    const text = `New enquiry from ${form.name} (${form.email})\nCompany: ${form.company || "—"}\nBudget: ${form.budget}\n\n${form.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp — we'll reply within minutes.");
      setForm({ name: "", email: "", company: "", budget: "PKR 500k – 2M", message: "" });
      setSending(false);
    }, 400);
  };

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 bg-hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Get in touch</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-4xl">Let's build something <em className="text-gradient-gold">rare.</em></h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">Tell us about the brand you're building. A senior partner will reply personally within one business day.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12">
          <form onSubmit={submit} className="lg:col-span-3 rounded-3xl bg-card border border-border p-8 md:p-10 shadow-luxury">
            <h2 className="font-display text-3xl">Project brief</h2>
            <p className="text-sm text-muted-foreground mt-2">Fill in a few details — we'll take it from there.</p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Company (optional)" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Budget range</label>
                <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {["Under PKR 500k", "PKR 500k – 2M", "PKR 2M – 10M", "PKR 10M+", "Undecided"].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Tell us about your project</label>
              <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 2000) })} className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="What are you building, and what does success look like in 12 months?" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-luxury hover:shadow-gold-glow transition disabled:opacity-60">
                <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send Enquiry"}
              </button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-secondary transition">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-hero-gradient text-white p-8 shadow-luxury">
              <h3 className="font-display text-2xl">HQ & Contact</h3>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-gold mt-0.5" /><span className="text-white/80">Karachi, Pakistan<br />Serving globally</span></div>
                <div className="flex items-start gap-3"><Phone className="h-4 w-4 text-gold mt-0.5" /><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-white/80 hover:text-gold">+92 335 0320720</a></div>
                <div className="flex items-start gap-3"><Mail className="h-4 w-4 text-gold mt-0.5" /><a href="mailto:management@accubridge.tech" className="text-white/80 hover:text-gold">management@accubridge.tech</a></div>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border shadow-luxury aspect-square">
              <iframe
                title="AccuBridge HQ"
                src="https://maps.google.com/maps?q=Karachi&t=&z=11&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value.slice(0, 200))} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
