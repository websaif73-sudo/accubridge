## Two changes

### 1. Sign In visible in header
Add a session-aware "Sign In" (or "Admin" when logged in) affordance to `src/components/site-header.tsx`, both desktop (next to Book a Call) and mobile menu.

- Subscribe to `supabase.auth.onAuthStateChange` + initial `getSession` in the header.
- Signed out → link to `/auth` labeled "Sign In" (subtle ghost style so Book a Call stays primary CTA).
- Signed in → link to `/admin` labeled "Dashboard" with a small Sign Out button that calls `supabase.auth.signOut()`.

### 2. Floating brand/tool logos in hero 3D scene
In `src/routes/index.tsx` hero section, add a new layer of floating "orbiting badge" cards showing recognizable platform marks the agency works with:

- Meta / Facebook Ads
- Google Ads
- Shopify
- TikTok
- Instagram
- YouTube
- Stripe
- WordPress

Implementation:
- Use `react-icons/si` (Simple Icons) — already-installable brand-icon set with authentic marks (SiMeta, SiShopify, SiGoogleads, SiTiktok, SiInstagram, SiYoutube, SiStripe, SiWordpress). Install via `bun add react-icons`.
- Render ~8 small glassmorphic rounded-square badges scattered around the hero using absolute positioning at varied top/left percentages, each with existing `animate-float-slow` / `animate-tilt-3d` and staggered `animationDelay`, plus subtle gold ring + backdrop-blur to match the luxury aesthetic.
- Add a slow-orbiting ring near the wireframe sphere where 3–4 of the logo badges revolve around it (reuse `animate-orbit` keyframe with different radii via wrapper rotations).
- Keep the existing shapes (rings, crystal, grid floor, rays) — logos are additive, not replacements.

No backend, styles, or other route changes.
