import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Admin Sign In — AccuBridge" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) { router.invalidate(); navigate({ to: "/" }); }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) { toast.error("Enter a valid email and 6+ character password"); return; }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast.success("Account created — you're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally { setLoading(false); }
  };

  return (
    <section className="min-h-screen grid place-items-center bg-hero-gradient text-white px-4 py-24">
      <div className="w-full max-w-md rounded-3xl glass-light p-10 shadow-luxury text-foreground">
        <div className="flex justify-center mb-6"><Logo className="h-14 w-auto" /></div>
        <h1 className="font-display text-3xl text-center text-royal">{mode === "signin" ? "Admin Sign In" : "Create Admin Account"}</h1>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {mode === "signin" ? "Access your AccuBridge dashboard." : "First-time setup for the workspace."}
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-royal-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-luxury hover:shadow-gold-glow transition disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-royal hover:text-gold transition">
            {mode === "signin" ? "Need an account? Sign up" : "Already registered? Sign in"}
          </button>
        </div>
      </div>
    </section>
  );
}
