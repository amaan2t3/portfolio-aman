import 'dotenv/config';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = Number(process.env.PORT || 3001);
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const sessionSecret = process.env.ADMIN_SESSION_SECRET;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sessionCookie = 'portfolio_admin_session';
const sessionDurationSeconds = 60 * 60 * 8;
const loginAttempts = new Map();
const supabase = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

const isAuthConfigured = Boolean(
  email
  && password
  && password.length >= 12
  && sessionSecret
  && sessionSecret.length >= 32,
);
const isDatabaseConfigured = Boolean(supabase);

if (!isAuthConfigured) {
  console.error('Admin auth is disabled. Set ADMIN_EMAIL, ADMIN_PASSWORD (12+ characters), and ADMIN_SESSION_SECRET (32+ characters).');
}
if (!isDatabaseConfigured) {
  console.error('Portfolio writes are disabled. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for the server.');
}

app.disable('x-powered-by');
app.use(express.json({ limit: '2mb', strict: true }));

function signPayload(payload) {
  return crypto.createHmac('sha256', sessionSecret).update(payload).digest('base64url');
}

function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({
    email,
    expiresAt: Date.now() + sessionDurationSeconds * 1000,
  })).toString('base64url');
  return `${payload}.${signPayload(payload)}`;
}

function verifySessionToken(token) {
  if (!isAuthConfigured || !token) return null;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return null;

  const expected = Buffer.from(signPayload(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (session.email !== email || !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function readCookie(request, name) {
  const cookieHeader = request.headers.cookie || '';
  for (const cookie of cookieHeader.split(';')) {
    const separator = cookie.indexOf('=');
    if (separator < 0 || cookie.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(cookie.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

function requireAdmin(request, response, next) {
  const session = verifySessionToken(readCookie(request, sessionCookie));
  if (!session) return response.status(401).json({ error: 'Please sign in again to continue.' });
  request.admin = session;
  return next();
}

function getAttemptState(ip) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  if (!attempt || attempt.resetAt <= now) {
    const next = { failures: 0, resetAt: now + 15 * 60 * 1000, blockedUntil: 0 };
    loginAttempts.set(ip, next);
    return next;
  }
  return attempt;
}

function noCache(response) {
  response.set('Cache-Control', 'no-store');
}

app.get('/api/auth/session', (request, response) => {
  noCache(response);
  const authenticated = Boolean(verifySessionToken(readCookie(request, sessionCookie)));
  response.json({ configured: isAuthConfigured, authenticated, email: authenticated ? email : null });
});

app.post('/api/auth/login', (request, response) => {
  noCache(response);
  if (!isAuthConfigured) return response.status(503).json({ error: 'Admin login is not configured on the server.' });

  const ip = request.ip;
  const attempt = getAttemptState(ip);
  if (attempt.blockedUntil > Date.now()) {
    return response.status(429).json({ error: 'Too many sign-in attempts. Try again in 15 minutes.' });
  }

  const submittedEmail = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const submittedPassword = typeof request.body?.password === 'string' ? request.body.password : '';
  const emailMatches = crypto.timingSafeEqual(
    crypto.createHash('sha256').update(submittedEmail).digest(),
    crypto.createHash('sha256').update(email).digest(),
  );
  const passwordMatches = crypto.timingSafeEqual(
    crypto.createHash('sha256').update(submittedPassword).digest(),
    crypto.createHash('sha256').update(password).digest(),
  );

  if (!emailMatches || !passwordMatches) {
    attempt.failures += 1;
    if (attempt.failures >= 5) attempt.blockedUntil = Date.now() + 15 * 60 * 1000;
    return response.status(401).json({ error: 'Email or password is incorrect.' });
  }

  loginAttempts.delete(ip);
  response.cookie(sessionCookie, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api',
    maxAge: sessionDurationSeconds * 1000,
  });
  return response.json({ authenticated: true, email });
});

app.post('/api/auth/logout', (request, response) => {
  noCache(response);
  response.clearCookie(sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api',
  });
  response.status(204).end();
});

app.put('/api/portfolio', requireAdmin, async (request, response) => {
  noCache(response);
  if (!isDatabaseConfigured) return response.status(503).json({ error: 'Portfolio database is not configured on the server.' });
  const content = request.body;
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return response.status(400).json({ error: 'Portfolio content must be a JSON object.' });
  }

  const { error } = await supabase
    .from('portfolio_content')
    .upsert({ id: 1, content }, { onConflict: 'id' });

  if (error) {
    console.error('Unable to save portfolio content:', error.message);
    return response.status(502).json({ error: 'Could not save content to the portfolio database.' });
  }
  return response.json({ saved: true });
});

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPath = path.join(projectRoot, 'dist');
app.use(express.static(distPath, { index: false }));
app.get(/^(?!\/api\/).*/, (request, response, next) => {
  response.sendFile(path.join(distPath, 'index.html'), (error) => {
    if (error) next();
  });
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
