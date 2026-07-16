import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, X, Eye, EyeOff, Tag, Pencil } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/portfolio")({
  component: PortfolioAdmin,
});

type Item = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  site_url: string | null;
  sort_order: number;
  published: boolean;
  updated_at: string;
};

type Category = { id: string; name: string; slug: string; sort_order: number };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const empty: Omit<Item, "id" | "updated_at"> = {
  title: "",
  category: "Websites",
  description: "",
  image_url: "",
  site_url: "",
  sort_order: 0,
  published: true,
};

function PortfolioAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Item | (typeof empty & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState("");
  const [newCatOrder, setNewCatOrder] = useState(0);

  const load = async () => {
    setLoading(true);
    const [itemsRes, catsRes] = await Promise.all([
      supabase
        .from("portfolio_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false }),
      (supabase as any)
        .from("portfolio_categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
    ]);
    if (itemsRes.error) toast.error(itemsRes.error.message);
    else setItems(itemsRes.data as Item[]);
    if (!catsRes.error && catsRes.data) setCategories(catsRes.data as Category[]);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const addCategory = async () => {
    const name = newCat.trim();
    if (!name) return toast.error("Category name required");
    const slug = slugify(name);
    const { error } = await (supabase as any)
      .from("portfolio_categories")
      .insert({ name, slug, sort_order: Number(newCatOrder) || 0 });
    if (error) return toast.error(error.message);
    setNewCat("");
    setNewCatOrder(0);
    toast.success("Category added");
    load();
  };

  const renameCategory = async (c: Category) => {
    const name = prompt("Rename category", c.name)?.trim();
    if (!name || name === c.name) return;
    const { error } = await (supabase as any)
      .from("portfolio_categories")
      .update({ name, slug: slugify(name) })
      .eq("id", c.id);
    if (error) return toast.error(error.message);
    // cascade rename on items so existing items still filter correctly
    await supabase.from("portfolio_items").update({ category: name }).eq("category", c.name);
    toast.success("Renamed");
    load();
  };

  const removeCategory = async (c: Category) => {
    if (!confirm(`Delete category "${c.name}"? Items keep the label but the chip is removed.`)) return;
    const { error } = await (supabase as any).from("portfolio_categories").delete().eq("id", c.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };


  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title,
      category: editing.category,
      description: editing.description,
      image_url: editing.image_url,
      site_url: editing.site_url,
      sort_order: Number(editing.sort_order) || 0,
      published: editing.published,
    };
    if (!payload.title) return toast.error("Title required");
    if ("id" in editing && editing.id) {
      const { error } = await supabase.from("portfolio_items").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Item updated");
    } else {
      const { error } = await supabase.from("portfolio_items").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Item created");
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const togglePublish = async (p: Item) => {
    const { error } = await supabase.from("portfolio_items").update({ published: !p.published }).eq("id", p.id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Portfolio</h1>
          <p className="text-muted-foreground mt-1 text-sm">Add case studies shown on the public Portfolio page.</p>
        </div>
        <button
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-luxury hover:shadow-gold-glow transition"
        >
          <Plus className="h-4 w-4" /> New item
        </button>
      </div>

      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-luxury">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No items yet — click <b>New item</b> to add your first case study.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {items.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition">
                {p.image_url ? (
                  <img src={p.image_url} alt="" className="h-14 w-20 rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-20 rounded-lg bg-secondary" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg truncate">{p.title}</p>
                    {p.published ? (
                      <span className="text-[10px] uppercase tracking-widest bg-gold/20 text-gold-foreground px-2 py-0.5 rounded-full">Live</span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {p.category} · order {p.sort_order}
                  </p>
                </div>
                <button onClick={() => togglePublish(p)} className="p-2 rounded-lg hover:bg-secondary" title="Toggle visibility">
                  {p.published ? <Eye className="h-4 w-4 text-gold" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </button>
                <button onClick={() => setEditing(p)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-royal hover:bg-secondary">
                  Edit
                </button>
                <button onClick={() => remove(p.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Categories manager */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-luxury">
        <div className="flex items-center gap-3">
          <Tag className="h-5 w-5 text-royal" />
          <h2 className="font-display text-2xl">Categories</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          These labels appear as filter chips on the public Portfolio page.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.length === 0 && (
            <span className="text-sm text-muted-foreground">No categories yet.</span>
          )}
          {categories.map((c) => (
            <span
              key={c.id}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 pl-4 pr-2 py-1.5 text-sm"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-xs text-muted-foreground">#{c.sort_order}</span>
              <button
                onClick={() => renameCategory(c)}
                className="p-1 rounded-full hover:bg-secondary"
                title="Rename"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => removeCategory(c)}
                className="p-1 rounded-full text-destructive hover:bg-destructive/10"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              New category
            </label>
            <input
              className="input"
              placeholder="e.g. Product Photography"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
            />
          </div>
          <div className="w-28">
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              Order
            </label>
            <input
              type="number"
              className="input"
              value={newCatOrder}
              onChange={(e) => setNewCatOrder(Number(e.target.value))}
            />
          </div>
          <button
            onClick={addCategory}
            className="inline-flex items-center gap-2 rounded-full bg-royal-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-luxury hover:shadow-gold-glow transition"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>



      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-royal-deep/70 backdrop-blur-sm p-4 animate-reveal-up">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-luxury">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <h2 className="font-display text-2xl">{"id" in editing && editing.id ? "Edit item" : "New item"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Field label="Title">
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Category">
                  <select className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Sort order (lower shows first)">
                  <input
                    type="number"
                    className="input"
                    value={editing.sort_order}
                    onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  />
                </Field>
              </div>
              <Field label="Image URL">
                <input
                  className="input"
                  placeholder="https://…"
                  value={editing.image_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                />
              </Field>
              <Field label="Site / project URL">
                <input
                  className="input"
                  placeholder="https://…"
                  value={editing.site_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, site_url: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className="input min-h-[100px]"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Field>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="h-4 w-4"
                />
                Published (visible on the public portfolio)
              </label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setEditing(null)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:bg-secondary">
                Cancel
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-royal shadow-gold-glow hover:scale-105 transition"
              >
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;border:1px solid var(--border);border-radius:12px;padding:10px 14px;background:var(--background);outline:none;transition:border-color .2s;font-size:14px}.input:focus{border-color:var(--ring)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}
