import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, Palette, LogOut, Images } from "lucide-react";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };
  return (
    <div className="min-h-screen bg-secondary/30 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[240px_1fr] gap-8">
        <aside className="md:sticky md:top-24 h-fit rounded-3xl bg-card border border-border p-5 shadow-luxury">
          <div className="px-2 pb-4 border-b border-border">
            <Logo className="h-8 w-auto" showWordmark={false} />
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">Admin</p>
          </div>
          <nav className="mt-4 flex flex-col gap-1 text-sm">
            <AdminLink to="/admin" icon={LayoutDashboard} label="Overview" exact />
            <AdminLink to="/admin/blog" icon={FileText} label="Blog Posts" />
            <AdminLink to="/admin/portfolio" icon={Images} label="Portfolio" />
            <AdminLink to="/admin/brand" icon={Palette} label="Brand Identity" />
          </nav>
          <button
            onClick={signOut}
            className="mt-6 w-full inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-foreground/70 hover:text-royal hover:border-royal/30 transition"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLink({ to, icon: Icon, label, exact }: { to: string; icon: any; label: string; exact?: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      activeProps={{ className: "bg-royal-gradient text-white shadow-luxury" }}
      inactiveProps={{ className: "text-foreground/70 hover:bg-secondary" }}
      className="inline-flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
    >
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}
