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

The `/admin` portal uses one server-side `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The Node API validates credentials, rate-limits failed login attempts, and issues a signed, HTTP-only, same-site session cookie. The browser never receives the admin password or Supabase service-role key. Portfolio edits and uploaded images are handled by authenticated server APIs; visitors can read portfolio content and images publicly.

1. Copy `.env.example` to `.env` locally and set `ADMIN_EMAIL`, a unique `ADMIN_PASSWORD` of at least 12 characters, and a random `ADMIN_SESSION_SECRET` of at least 32 characters.
2. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project. Never prefix the service-role key or admin credentials with `VITE_`.
3. Run [`supabase/setup.sql`](./supabase/setup.sql) in the Supabase SQL editor. It creates the portfolio table and the public `portfolio-images` storage bucket used for uploads.
4. Run `npm run dev`; the local API runs in the Vite process, so no second terminal or API port is needed.
5. For Vercel, add all six values from `.env.example` under Project Settings → Environment Variables, keeping admin credentials and the service-role key server-only. Redeploy after setting them. The API routes in [`api/`](./api) are deployed as Vercel serverless functions.

Admins can upload PNG, JPEG, GIF, WebP, or AVIF images (up to 3 MB) for profile, project, experience, education, certificate, and skill imagery. Re-run the SQL setup after deploying this upload feature to create/configure the storage bucket.
