import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  category: string;
  published: boolean;
  updated_at: string;
};

const empty: Omit<Post, "id" | "updated_at"> = {
  slug: "", title: "", excerpt: "", content: "", cover_url: "", category: "Insights", published: false,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | (typeof empty & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
    if (error) toast.error(error.message); else setPosts(data as Post[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug || slugify(editing.title),
      title: editing.title,
      excerpt: editing.excerpt,
      content: editing.content,
      cover_url: editing.cover_url,
      category: editing.category,
      published: editing.published,
    };
    if (!payload.title) return toast.error("Title required");
    if ("id" in editing && editing.id) {
      const { error } = await supabase.from("posts").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Post updated");
    } else {
      const { error } = await supabase.from("posts").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Post created");
    }
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  const togglePublish = async (p: Post) => {
    const { error } = await supabase.from("posts").update({ published: !p.published }).eq("id", p.id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Blog Posts</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create, edit and publish articles.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-luxury hover:shadow-gold-glow transition">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-luxury">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">No posts yet — click <b>New post</b> to publish your first article.</div>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition">
                {p.cover_url ? <img src={p.cover_url} alt="" className="h-14 w-20 rounded-lg object-cover" /> : <div className="h-14 w-20 rounded-lg bg-secondary" />}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg truncate">{p.title}</p>
                    {p.published ? <span className="text-[10px] uppercase tracking-widest bg-gold/20 text-gold-foreground px-2 py-0.5 rounded-full">Live</span> : <span className="text-[10px] uppercase tracking-widest bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">Draft</span>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{p.category} · /{p.slug}</p>
                </div>
                <button onClick={() => togglePublish(p)} className="p-2 rounded-lg hover:bg-secondary" title="Toggle publish">
                  {p.published ? <Eye className="h-4 w-4 text-gold" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </button>
                <button onClick={() => setEditing(p)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-royal hover:bg-secondary">Edit</button>
                <button onClick={() => remove(p.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-royal-deep/70 backdrop-blur-sm p-4 animate-reveal-up">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-luxury">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <h2 className="font-display text-2xl">{"id" in editing && editing.id ? "Edit post" : "New post"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <Field label="Title"><input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} /></Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Slug"><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} /></Field>
                <Field label="Category"><input className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></Field>
              </div>
              <Field label="Cover image URL"><input className="input" placeholder="https://…" value={editing.cover_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} /></Field>
              <Field label="Excerpt"><textarea className="input min-h-[80px]" value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></Field>
              <Field label="Content (Markdown supported)"><textarea className="input min-h-[280px] font-mono text-sm" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></Field>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4" />
                Published (visible on the public blog)
              </label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setEditing(null)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:bg-secondary">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-royal shadow-gold-glow hover:scale-105 transition"><Save className="h-4 w-4" /> Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;border:1px solid var(--border);border-radius:12px;padding:10px 14px;background:var(--background);outline:none;transition:border-color .2s;font-size:14px}.input:focus{border-color:var(--ring)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>{children}</div>;
}
