# Amanullah Ibrahim — Portfolio

A React portfolio built with Vite, Tailwind CSS, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

## Single-admin portal setup

The `/admin` portal uses one server-side `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The Node API validates credentials, rate-limits failed login attempts, and issues a signed, HTTP-only, same-site session cookie. The browser never receives the admin password or Supabase service-role key. Portfolio edits are written by the API to Supabase; visitors can read the portfolio using the public anon key and database read policy.

1. Copy `.env.example` to `.env` and set `ADMIN_EMAIL`, a unique `ADMIN_PASSWORD` of at least 12 characters, and a random `ADMIN_SESSION_SECRET` of at least 32 characters.
2. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project. Never prefix the service-role key or admin credentials with `VITE_`.
3. Run [`supabase/setup.sql`](./supabase/setup.sql) in the Supabase SQL editor.
4. In one terminal run `npm run dev:api`; in another run `npm run dev`. Open the Vite URL and go to `/admin`.

For production, build the app with `npm run build`, set the same environment variables in the hosting provider's server environment, and run `npm start`. The Node server serves the built app and API from one origin; do not deploy the API secrets as client-side variables.
