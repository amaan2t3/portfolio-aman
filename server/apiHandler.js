import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const sessionSecret = process.env.ADMIN_SESSION_SECRET;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sessionCookie = 'portfolio_admin_session';
const sessionDurationSeconds = 60 * 60 * 8;
const imageBucket = 'portfolio-images';
const maxImageSizeBytes = 3 * 1024 * 1024;
const imageTypes = {
  'image/png': { extension: 'png', matches: (bytes) => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
  'image/jpeg': { extension: 'jpg', matches: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  'image/gif': { extension: 'gif', matches: (bytes) => ['GIF87a', 'GIF89a'].includes(bytes.subarray(0, 6).toString('ascii')) },
  'image/webp': { extension: 'webp', matches: (bytes) => bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP' },
  'image/avif': { extension: 'avif', matches: (bytes) => bytes.subarray(4, 12).toString('ascii').includes('ftypavif') || bytes.subarray(4, 12).toString('ascii').includes('ftypavis') },
};
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

if (!isAuthConfigured) {
  console.error('Admin auth is disabled. Set ADMIN_EMAIL, ADMIN_PASSWORD (12+ characters), and ADMIN_SESSION_SECRET (32+ characters).');
}
if (!supabase) {
  console.error('Portfolio writes are disabled. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for the server.');
}

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(body === null ? '' : JSON.stringify(body));
}

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

function sameSecret(submitted, expected) {
  return crypto.timingSafeEqual(
    crypto.createHash('sha256').update(submitted).digest(),
    crypto.createHash('sha256').update(expected).digest(),
  );
}

function getClientIp(request) {
  return request.headers['x-vercel-forwarded-for']
    || request.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || request.socket?.remoteAddress
    || 'unknown';
}

function getRequestPath(request) {
  const url = new URL(request.originalUrl || request.url, `http://${request.headers.host || 'localhost'}`);
  return url.pathname.replace(/\/+$/, '') || '/';
}

export async function handleApiRequest(request, response) {
  const method = request.method?.toUpperCase();
  const pathname = getRequestPath(request);

  if (method === 'GET' && pathname === '/api/auth/session') {
    const authenticated = Boolean(verifySessionToken(readCookie(request, sessionCookie)));
    return sendJson(response, 200, { configured: isAuthConfigured, authenticated, email: authenticated ? email : null });
  }

  if (method === 'POST' && pathname === '/api/auth/login') {
    if (!isAuthConfigured) return sendJson(response, 503, { error: 'Admin login is not configured on the server.' });

    const ip = getClientIp(request);
    const attempt = getAttemptState(ip);
    if (attempt.blockedUntil > Date.now()) {
      return sendJson(response, 429, { error: 'Too many sign-in attempts. Try again in 15 minutes.' });
    }

    const submittedEmail = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
    const submittedPassword = typeof request.body?.password === 'string' ? request.body.password : '';
    const credentialsMatch = sameSecret(submittedEmail, email) && sameSecret(submittedPassword, password);
    if (!credentialsMatch) {
      attempt.failures += 1;
      if (attempt.failures >= 5) attempt.blockedUntil = Date.now() + 15 * 60 * 1000;
      return sendJson(response, 401, { error: 'Email or password is incorrect.' });
    }

    loginAttempts.delete(ip);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    response.setHeader('Set-Cookie', `${sessionCookie}=${encodeURIComponent(createSessionToken())}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${sessionDurationSeconds}${secure}`);
    return sendJson(response, 200, { authenticated: true, email });
  }

  if (method === 'POST' && pathname === '/api/auth/logout') {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    response.setHeader('Set-Cookie', `${sessionCookie}=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0${secure}`);
    return sendJson(response, 204, null);
  }

  if (method === 'POST' && pathname === '/api/upload-image') {
    if (!verifySessionToken(readCookie(request, sessionCookie))) {
      return sendJson(response, 401, { error: 'Please sign in again to continue.' });
    }
    if (!supabase) return sendJson(response, 503, { error: 'Portfolio storage is not configured on the server.' });

    const { contentType, data } = request.body || {};
    const imageType = Object.hasOwn(imageTypes, contentType) ? imageTypes[contentType] : null;
    if (!imageType || typeof data !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
      return sendJson(response, 400, { error: 'Choose a PNG, JPEG, GIF, WebP, or AVIF image.' });
    }

    const image = Buffer.from(data, 'base64');
    if (image.length === 0 || image.length > maxImageSizeBytes) {
      return sendJson(response, 413, { error: 'Images must be no larger than 3 MB.' });
    }
    if (!imageType.matches(image)) {
      return sendJson(response, 400, { error: 'The selected file does not match its image format.' });
    }

    const path = `${crypto.randomUUID()}.${imageType.extension}`;
    const { error } = await supabase.storage
      .from(imageBucket)
      .upload(path, image, { contentType, upsert: false });

    if (error) {
      console.error('Unable to upload portfolio image:', error.message);
      return sendJson(response, 502, { error: 'Could not upload the image to portfolio storage.' });
    }
    const { data: publicUrl } = supabase.storage.from(imageBucket).getPublicUrl(path);
    return sendJson(response, 201, { url: publicUrl.publicUrl });
  }

  if (method === 'PUT' && pathname === '/api/portfolio') {
    if (!verifySessionToken(readCookie(request, sessionCookie))) {
      return sendJson(response, 401, { error: 'Please sign in again to continue.' });
    }
    if (!supabase) return sendJson(response, 503, { error: 'Portfolio database is not configured on the server.' });

    const content = request.body;
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      return sendJson(response, 400, { error: 'Portfolio content must be a JSON object.' });
    }

    const { error } = await supabase
      .from('portfolio_content')
      .upsert({ id: 1, content }, { onConflict: 'id' });

    if (error) {
      console.error('Unable to save portfolio content:', error.message);
      return sendJson(response, 502, { error: 'Could not save content to the portfolio database.' });
    }
    return sendJson(response, 200, { saved: true });
  }

  return sendJson(response, 404, { error: 'API route not found.' });
}
