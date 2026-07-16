# Cloudflare Workers Deployment

This project's Vite build already targets Cloudflare (Nitro `cloudflare_module` preset), so `vite build` emits a Worker at `.output/server/index.mjs` plus static assets in `.output/public`.

## One-time setup
1. Install Wrangler: `bun add -d wrangler` (or `npm i -D wrangler`)
2. Login: `bunx wrangler login`
3. Set your Supabase env vars in the build environment (needed because `VITE_*` values are baked at build time):
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...
   VITE_SUPABASE_PROJECT_ID=...
   ```
4. (Optional) add runtime secrets used inside server functions:
   ```
   bunx wrangler secret put SUPABASE_URL
   bunx wrangler secret put SUPABASE_PUBLISHABLE_KEY
   bunx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   ```

## Local preview against the Worker runtime
```
bun run cf:preview
```

## Deploy
```
bun run cf:deploy
```

That's it — `wrangler.toml` at the repo root points at the built Worker and its static assets.
