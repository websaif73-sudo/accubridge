import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Palette, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const [counts, setCounts] = useState({ total: 0, published: 0 });
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("posts").select("published");
      if (data) setCounts({ total: data.length, published: data.filter((p) => p.published).length });
    })();
  }, []);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Welcome back.</h1>
        <p className="text-muted-foreground mt-2">Manage your journal and brand identity from one place.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-card border border-border p-6 shadow-luxury">
          <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-royal" /><h2 className="font-display text-2xl">Blog</h2></div>
          <div className="mt-4 flex gap-6">
            <div><div className="text-4xl font-display text-royal">{counts.total}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Total posts</div></div>
            <div><div className="text-4xl font-display text-gold">{counts.published}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Published</div></div>
          </div>
          <Link to="/admin/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-gold">Manage posts <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-3xl bg-card border border-border p-6 shadow-luxury">
          <div className="flex items-center gap-3"><Palette className="h-5 w-5 text-royal" /><h2 className="font-display text-2xl">Brand identity</h2></div>
          <p className="mt-3 text-sm text-muted-foreground">Update company name, tagline, WhatsApp, email and logo image.</p>
          <Link to="/admin/brand" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-gold">Edit brand <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}
