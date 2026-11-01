# Amanullah Ibrahim — Portfolio

A React portfolio built with Vite, Tailwind CSS, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

After changing source portfolio images, regenerate their responsive WebP copies with `npm run optimize:assets`.

The public pages are route-split, and gallery images are lazy-loaded to avoid downloading every section's media on the first visit.

## Single-admin portal setup

The `/admin` portal uses one server-side `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The Node API validates credentials, rate-limits failed login attempts, and issues a signed, HTTP-only, same-site session cookie. The browser never receives the admin password or Supabase service-role key. Portfolio edits are written by the API to Supabase; visitors can read the portfolio using the public anon key and database read policy.

1. Copy `.env.example` to `.env` locally and set `ADMIN_EMAIL`, a unique `ADMIN_PASSWORD` of at least 12 characters, and a random `ADMIN_SESSION_SECRET` of at least 32 characters.
2. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project. Never prefix the service-role key or admin credentials with `VITE_`.
3. Run [`supabase/setup.sql`](./supabase/setup.sql) in the Supabase SQL editor.
4. For local development, run `npm run dev:api` and `npm run dev` in separate terminals.
5. For Vercel, add all six values from `.env.example` under Project Settings → Environment Variables, keeping admin credentials and the service-role key server-only. Redeploy after setting them. The API routes in [`api/`](./api) are deployed as Vercel serverless functions.
