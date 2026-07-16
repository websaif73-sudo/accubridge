import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4 text-white">
      <div className="max-w-md text-center animate-reveal-up">
        <h1 className="text-8xl font-display text-gradient-gold">404</h1>
        <h2 className="mt-4 text-2xl font-display">Page not found</h2>
        <p className="mt-2 text-sm text-white/70">
          The route you're looking for slipped through the cracks.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-royal shadow-gold-glow hover:scale-105 transition"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display text-gradient-gold">Something went wrong</h1>
        <p className="mt-2 text-sm text-white/70">Try refreshing, or head back to the homepage.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-royal"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/90 hover:bg-white/10 transition">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "AccuBridge Business Services" },
        { name: "keywords", content: "AccuBridge, business services, brand identity, web development, meta ads, google ads, tax, legal, advisory, Pakistan, luxury agency" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "AccuBridge" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#0A1F44" },
        ...(gsc ? [{ name: "google-site-verification", content: gsc }] : []),
      ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AccuBridge Business Services",
          alternateName: "AccuBridge",
          url: "https://accurbidge-grand-opus.lovable.app",
          logo: "https://accurbidge-grand-opus.lovable.app/favicon.png",
          slogan: "We Build Brands That Dominate",
          sameAs: [],
        }),
      },
    ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <WhatsAppWidget />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
