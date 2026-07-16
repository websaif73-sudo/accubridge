import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 md:px-8 transition-all duration-500",
          scrolled
            ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-luxury mx-3 md:mx-auto"
            : "bg-transparent"
        )}
      >
        <Link to="/" className="flex items-center py-2">
          <Logo className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: scrolled ? "text-royal" : "text-gold" }}
              inactiveProps={{
                className: scrolled
                  ? "text-foreground/70 hover:text-royal"
                  : "text-white/90 hover:text-gold",
              }}
              className="relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gold-gradient origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {signedIn ? (
            <>
              <Link
                to="/admin"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all",
                  scrolled
                    ? "text-royal hover:bg-royal/5"
                    : "text-white/90 hover:text-gold"
                )}
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </Link>
              <button
                onClick={signOut}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all",
                  scrolled
                    ? "text-foreground/60 hover:text-royal"
                    : "text-white/70 hover:text-gold"
                )}
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all",
                scrolled
                  ? "text-royal hover:bg-royal/5"
                  : "text-white/90 hover:text-gold"
              )}
            >
              <LogIn className="h-3.5 w-3.5" /> Sign In
            </Link>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-royal-gradient px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-luxury hover:shadow-gold-glow hover:scale-105 transition-all duration-500"
          >
            Book a Call
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className={cn("lg:hidden p-2", scrolled ? "text-royal" : "text-white")}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-3 mt-2 rounded-3xl glass-light p-4 shadow-luxury animate-reveal-up">
          <div className="flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-royal border-b border-border/50 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-royal border-b border-border/50 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={() => { setOpen(false); signOut(); }}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground/70 hover:text-royal flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-royal flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-royal-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
