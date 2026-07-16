import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/brand")({
  component: BrandAdmin,
});

type Brand = { company_name: string; tagline: string; whatsapp: string; email: string; logo_url: string | null };

function BrandAdmin() {
  const [b, setB] = useState<Brand | null>(null);
  useEffect(() => {
    supabase.from("brand_settings").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setB(data as Brand);
    });
  }, []);
  if (!b) return <div className="text-muted-foreground">Loading…</div>;

  const save = async () => {
    const { error } = await supabase.from("brand_settings").update(b).eq("id", 1);
    if (error) return toast.error(error.message);
    toast.success("Brand identity updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Brand Identity</h1>
        <p className="text-muted-foreground mt-1 text-sm">These values feed the header, footer and WhatsApp widget.</p>
      </div>
      <div className="rounded-3xl bg-card border border-border p-6 shadow-luxury space-y-4">
        <Field label="Company name"><input className="brand-input" value={b.company_name} onChange={(e) => setB({ ...b, company_name: e.target.value })} /></Field>
        <Field label="Tagline"><input className="brand-input" value={b.tagline} onChange={(e) => setB({ ...b, tagline: e.target.value })} /></Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="WhatsApp (with country code)"><input className="brand-input" value={b.whatsapp} onChange={(e) => setB({ ...b, whatsapp: e.target.value })} /></Field>
          <Field label="Email"><input className="brand-input" value={b.email} onChange={(e) => setB({ ...b, email: e.target.value })} /></Field>
        </div>
        <Field label="Logo image URL (optional — leave empty to use the built-in SVG)">
          <input className="brand-input" placeholder="https://…" value={b.logo_url ?? ""} onChange={(e) => setB({ ...b, logo_url: e.target.value })} />
        </Field>
        {b.logo_url && <img src={b.logo_url} alt="logo preview" className="h-16 w-auto rounded-lg bg-secondary/50 p-2" />}
        <div className="pt-2">
          <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-royal shadow-gold-glow hover:scale-105 transition"><Save className="h-4 w-4" /> Save changes</button>
        </div>
      </div>
      <style>{`.brand-input{width:100%;border:1px solid var(--border);border-radius:12px;padding:10px 14px;background:var(--background);outline:none;font-size:14px}.brand-input:focus{border-color:var(--ring)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>{children}</div>;
}
