import 'dotenv/config';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const scrypt = promisify(scryptCallback);
const app = express();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isProduction = process.env.NODE_ENV === 'production';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
function isPublicSupabaseKey(key) {
  if (!key) return false;
  if (/^sb_(publishable|anon)_/.test(key)) return true;
  if (!key.startsWith('eyJ')) return false;
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString('utf8'));
    return payload.role === 'anon';
  } catch {
    return false;
  }
}
const publicSupabaseKey = isPublicSupabaseKey(supabaseKey);
const db = supabaseUrl && supabaseKey && !publicSupabaseKey ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_FROM_EMAIL);
const databaseConfigError = publicSupabaseKey
  ? 'Supabase service-role key is invalid. Configure SUPABASE_SERVICE_ROLE_KEY with the Supabase server-side service-role secret.'
  : 'Enquiry service is not configured. Please contact us directly.';
console.log(`[config] database=${db ? 'configured' : publicSupabaseKey ? 'invalid-public-key' : 'missing'} smtp=${smtpConfigured ? 'configured' : 'missing'} production=${isProduction}`);

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on('finish', () => {
    const pathname = new URL(req.originalUrl, 'http://localhost').pathname;
    console.log(`[request] ${req.method} ${pathname} ${res.statusCode} ${Date.now() - startedAt}ms`);
  });
  next();
});
app.use(express.json({ limit: '20kb', strict: true }));
app.use((req, _res, next) => {
  req.cookies = Object.fromEntries((req.headers.cookie || '').split(';').map((part) => part.trim()).filter(Boolean).map((part) => { const index = part.indexOf('='); return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))]; }));
  next();
});
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('X-Frame-Options', 'DENY');
  next();
});

const attemptBuckets = new Map();
function limit({ windowMs, max, key = (req) => req.ip }) {
  return (req, res, next) => {
    const now = Date.now(); const id = key(req); const entry = attemptBuckets.get(id);
    if (!entry || now > entry.until) { attemptBuckets.set(id, { count: 1, until: now + windowMs }); return next(); }
    if (entry.count >= max) return res.status(429).json({ error: 'Too many attempts. Please try again shortly.' });
    entry.count += 1; next();
  };
}
setInterval(() => { const now = Date.now(); for (const [key, value] of attemptBuckets) if (value.until < now) attemptBuckets.delete(key); }, 60_000).unref();

function originGuard(req, res, next) {
  const origin = req.get('origin');
  if (origin && origin !== `${req.protocol}://${req.get('host')}`) return res.status(403).json({ error: 'Request origin is not allowed.' });
  next();
}
function ensureDb(req, res, next) {
  if (!db) return res.status(503).json({ error: databaseConfigError });
  next();
}
function schemaSetupMessage(error, area) {
  if (error?.code === 'PGRST205' || error?.code === '42P01') return `${area} database is not initialized. Apply the Supabase migration in README.md, then restart the server.`;
  if (error?.code === '42501') return 'Supabase service-role access is not configured. Set SUPABASE_SERVICE_ROLE_KEY to the server-side service-role secret.';
  return null;
}
function clean(value, max) { return String(value ?? '').trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max); }
function validEmail(email) { return /^[^\s@<>(),;:\\"\[\]]+@[^\s@<>(),;:\\"\[\]]+\.[^\s@<>(),;:\\"\[\]]{2,}$/.test(email) && email.length <= 254; }
function validPhone(input) {
  const phone = input.replace(/[\s().-]/g, '');
  if (!/^\+?\d{8,15}$/.test(phone)) return false;
  const digits = phone.replace(/^\+/, '');
  if (digits.startsWith('91')) return digits.length === 12 && /^[6-9]\d{9}$/.test(digits.slice(2));
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  return !/^0+$/.test(digits) && !/^([0-9])\1+$/.test(digits);
}
function hashToken(value) { return createHash('sha256').update(value).digest('hex'); }
function escapeHtml(value) { return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function emailTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM_EMAIL) throw new Error('SMTP is not configured.');
  return nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
}
async function deliver(row) {
  let recipient = null;
  const setting = await db.from('fourza_settings').select('recipient_email').eq('id', 1).maybeSingle();
  if (setting.error) throw setting.error;
  recipient = setting.data?.recipient_email || process.env.ADMIN_EMAIL;
  if (!validEmail(recipient || '')) throw new Error('No valid enquiry recipient has been configured.');
  const attemptedAt = new Date().toISOString();
  const markedAttempt = await db.from('enquiries').update({ recipient_email: recipient, email_attempted_at: attemptedAt }).eq('id', row.id);
  if (markedAttempt.error) throw markedAttempt.error;
  const created = new Date(row.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const lines = `<p><b>Name:</b> ${escapeHtml(row.full_name)}</p><p><b>Email:</b> ${escapeHtml(row.email)}</p><p><b>Mobile:</b> ${escapeHtml(row.mobile)}</p><p><b>Service:</b> ${escapeHtml(row.service)}</p><p><b>Message:</b><br>${escapeHtml(row.message).replace(/\n/g, '<br>')}</p><p><b>Submitted:</b> ${escapeHtml(created)}</p>`;
  await emailTransport().sendMail({ from: process.env.SMTP_FROM_EMAIL, to: recipient, replyTo: row.email, subject: `New Enquiry — Fourza Media — ${row.service.replace(/[\r\n]/g, ' ').slice(0, 100)}`, text: `NEW FOURZA MEDIA ENQUIRY\n\nName: ${row.full_name}\nEmail: ${row.email}\nMobile: ${row.mobile}\nService: ${row.service}\n\nMessage:\n${row.message}\n\nSubmitted: ${created}`, html: `<div style="margin:0;background:#080808;padding:40px 16px;font-family:Arial,sans-serif;color:#f4f4f4"><div style="max-width:620px;margin:auto;border:1px solid #292929;background:#111;padding:32px"><img src="cid:fourza-logo" alt="Fourza Media" style="display:block;max-width:150px;height:auto;margin-bottom:24px"><div style="color:#ff8a00;font-size:12px;letter-spacing:3px;font-weight:bold">FOURZA MEDIA</div><h1 style="font-size:24px;letter-spacing:1px">NEW FOURZA MEDIA ENQUIRY</h1><div style="height:1px;background:#333;margin:24px 0"></div><div style="font-size:14px;line-height:1.8;color:#ddd">${lines}</div></div></div>`, attachments: [{ filename: 'fourza-logo.png', content: await readFile(path.join(root, 'public', 'logo.png')), cid: 'fourza-logo' }] });
  const updated = await db.from('enquiries').update({ email_status: 'SENT', email_sent_at: new Date().toISOString(), email_attempted_at: attemptedAt, recipient_email: recipient, email_error: null }).eq('id', row.id);
  if (updated.error) throw updated.error;
  return { status: 'SENT', recipient };
}

app.post('/api/enquiries', limit({ windowMs: 15 * 60_000, max: 5 }), ensureDb, originGuard, async (req, res) => {
  const { website } = req.body || {};
  if (website) return res.status(200).json({ success: true, emailStatus: 'SENT' });
  const full_name = clean(req.body?.name, 120); const email = clean(req.body?.email, 254).toLowerCase();
  const mobile = clean(req.body?.mobile, 24); const service = clean(req.body?.service, 120); const message = clean(req.body?.message, 5000);
  const errors = {};
  if (full_name.length < 2) errors.name = 'Please enter your full name.';
  if (!validEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!validPhone(mobile)) errors.mobile = 'Please enter a valid Indian mobile number or international number.';
  if (!service) errors.service = 'Please select a service.';
  if (message.length < 10) errors.message = 'Please add at least 10 characters about your project.';
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Please review the highlighted fields.', fields: errors });
  const saved = await db.from('enquiries').insert({ full_name, email, mobile, service, message, status: 'NEW', email_status: 'PENDING' }).select('*').single();
  if (saved.error) return res.status(503).json({ error: schemaSetupMessage(saved.error, 'Enquiry') || 'Your enquiry could not be saved. Please try again.' });
  try {
    const delivered = await deliver(saved.data);
    return res.status(201).json({ success: true, emailStatus: delivered.status });
  } catch (error) {
    const reason = String(error?.message || 'Email delivery failed.').slice(0, 300);
    console.error(`[enquiry] delivery failed for ${saved.data.id}: ${reason}`);
    await db.from('enquiries').update({ email_status: 'FAILED', email_error: reason, email_attempted_at: new Date().toISOString() }).eq('id', saved.data.id);
    return res.status(201).json({ success: true, emailStatus: 'FAILED', message: 'Your enquiry was received and saved, but email delivery is delayed. We will follow up shortly.' });
  }
});

app.post('/api/admin/login', limit({ windowMs: 15 * 60_000, max: 8, key: (req) => `${req.ip}:${clean(req.body?.email, 254).toLowerCase()}` }), ensureDb, originGuard, async (req, res) => {
  const email = clean(req.body?.email, 254).toLowerCase(); const password = String(req.body?.password ?? '');
  const admin = await db.from('fourza_admins').select('id,email,password_hash').eq('email', email).maybeSingle();
  if (admin.error) return res.status(503).json({ error: schemaSetupMessage(admin.error, 'Admin') || 'Admin sign in is not configured. Check the Supabase service-role configuration.' });
  let ok = false;
  if (admin.data && password.length >= 1) { const [salt, hash] = admin.data.password_hash.split(':'); const candidate = await scrypt(password, salt, 64); ok = timingSafeEqual(Buffer.from(hash, 'hex'), candidate); }
  if (!ok) return res.status(401).json({ error: 'Email or password is incorrect.' });
  const token = randomBytes(32).toString('base64url');
  const session = await db.from('fourza_admin_sessions').insert({ admin_id: admin.data.id, token_hash: hashToken(token), expires_at: new Date(Date.now() + 8 * 60 * 60_000).toISOString() });
  if (session.error) return res.status(503).json({ error: 'Unable to start a secure session.' });
  res.cookie('fourza_admin', token, { httpOnly: true, secure: isProduction, sameSite: 'strict', maxAge: 8 * 60 * 60_000, path: '/' });
  res.json({ success: true, email: admin.data.email });
});
async function requireAdmin(req, res, next) {
  const token = req.cookies?.fourza_admin;
  if (!token) return res.status(401).json({ error: 'Please sign in.' });
  const session = await db.from('fourza_admin_sessions').select('admin_id,expires_at,fourza_admins(email)').eq('token_hash', hashToken(token)).maybeSingle();
  if (session.error || !session.data || new Date(session.data.expires_at) < new Date()) {
    if (session.data) await db.from('fourza_admin_sessions').delete().eq('token_hash', hashToken(token));
    res.clearCookie('fourza_admin', { httpOnly: true, secure: isProduction, sameSite: 'strict', path: '/' });
    return res.status(401).json({ error: 'Please sign in.' });
  }
  req.admin = { id: session.data.admin_id, email: session.data.fourza_admins.email };
  next();
}
app.use('/api/admin', ensureDb, originGuard);
app.get('/api/admin/session', requireAdmin, (req, res) => res.json({ email: req.admin.email }));
app.post('/api/admin/logout', requireAdmin, async (req, res) => { await db.from('fourza_admin_sessions').delete().eq('token_hash', hashToken(req.cookies.fourza_admin)); res.clearCookie('fourza_admin', { httpOnly: true, secure: isProduction, sameSite: 'strict', path: '/' }); res.json({ success: true }); });
app.get('/api/admin/enquiries', requireAdmin, async (req, res) => {
  const result = await db.from('enquiries').select('id,full_name,email,mobile,service,message,status,email_status,email_sent_at,email_attempted_at,recipient_email,created_at,updated_at,email_error').order('created_at', { ascending: false });
  if (result.error) return res.status(503).json({ error: 'Could not load enquiries.' });
  const rows = result.data || [];
  res.json({ enquiries: rows, counts: { total: rows.length, new: rows.filter((row) => row.status === 'NEW').length, read: rows.filter((row) => row.status === 'READ').length, responded: rows.filter((row) => row.status === 'RESPONDED').length, failed: rows.filter((row) => row.email_status === 'FAILED').length } });
});
app.patch('/api/admin/enquiries/:id', requireAdmin, async (req, res) => {
  const status = String(req.body?.status || '').toUpperCase();
  if (!['NEW', 'READ', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'].includes(status)) return res.status(400).json({ error: 'Invalid enquiry status.' });
  const result = await db.from('enquiries').update({ status }).eq('id', req.params.id).select('*').single();
  if (result.error) return res.status(404).json({ error: 'Enquiry not found.' });
  res.json({ enquiry: result.data });
});
app.post('/api/admin/enquiries/:id/retry', requireAdmin, limit({ windowMs: 60_000, max: 10, key: (req) => `retry:${req.admin.id}` }), async (req, res) => {
  const result = await db.from('enquiries').select('*').eq('id', req.params.id).single();
  if (result.error) return res.status(404).json({ error: 'Enquiry not found.' });
  try { const delivery = await deliver(result.data); await db.from('enquiries').update({ email_error: null }).eq('id', req.params.id); res.json({ success: true, emailStatus: delivery.status }); }
  catch (error) { const reason = String(error?.message || 'Email delivery failed.').slice(0, 300); await db.from('enquiries').update({ email_status: 'FAILED', email_error: reason, email_attempted_at: new Date().toISOString() }).eq('id', req.params.id); res.status(502).json({ error: 'Email delivery failed. The enquiry remains saved.' }); }
});
app.get('/api/admin/settings', requireAdmin, async (_req, res) => { const result = await db.from('fourza_settings').select('recipient_email,business_email,business_phone,notify_admin').eq('id', 1).maybeSingle(); if (result.error) return res.status(503).json({ error: 'Could not load settings.' }); res.json({ settings: result.data || { recipient_email: '', business_email: process.env.BUSINESS_EMAIL || 'fourzamedia@gmail.com', business_phone: process.env.BUSINESS_PHONE || '+91 78451 16624 / +91 88838 81200', notify_admin: true }, fallbackEmail: process.env.ADMIN_EMAIL || '' }); });
app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  const recipient_email = clean(req.body?.recipient_email, 254).toLowerCase(); const business_email = clean(req.body?.business_email, 254).toLowerCase(); const business_phone = clean(req.body?.business_phone, 80);
  if ((recipient_email && !validEmail(recipient_email)) || (business_email && !validEmail(business_email))) return res.status(400).json({ error: 'Enter a valid email address.' });
  const result = await db.from('fourza_settings').upsert({ id: 1, recipient_email: recipient_email || null, business_email: business_email || null, business_phone: business_phone || null, notify_admin: req.body?.notify_admin !== false, updated_at: new Date().toISOString() });
  if (result.error) return res.status(503).json({ error: 'Could not save settings.' });
  res.json({ success: true });
});

app.get('/api/contact', async (_req, res) => {
  const fallbackEmail = process.env.BUSINESS_EMAIL || 'fourzamedia@gmail.com';
  const fallbackPhone = process.env.BUSINESS_PHONE || '+91 78451 16624 / +91 88838 81200';
  let email = fallbackEmail; let phone = fallbackPhone;
  if (db) { const result = await db.from('fourza_settings').select('business_email,business_phone').eq('id', 1).maybeSingle(); if (!result.error && result.data) { email = result.data.business_email || fallbackEmail; phone = result.data.business_phone || fallbackPhone; } }
  res.set('Cache-Control', 'public, max-age=300'); res.json({ email, phones: phone.split('/').map((part) => part.trim()).filter(Boolean) });
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));
if (isProduction) app.use(express.static(path.join(root, 'dist'), { index: false, redirect: false }));
else {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}
app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));

const port = Number(process.env.PORT || 3000);
if (db && process.env.ADMIN_LOGIN_EMAIL && process.env.ADMIN_LOGIN_PASSWORD && process.env.ADMIN_LOGIN_PASSWORD.length >= 12) {
  const adminEmail = process.env.ADMIN_LOGIN_EMAIL.trim().toLowerCase();
  const existingAdmin = await db.from('fourza_admins').select('id').eq('email', adminEmail).maybeSingle();
  if (!existingAdmin.error && !existingAdmin.data) {
    const salt = randomBytes(16).toString('hex');
    const passwordHash = (await scrypt(process.env.ADMIN_LOGIN_PASSWORD, salt, 64)).toString('hex');
    const created = await db.from('fourza_admins').insert({ email: adminEmail, password_hash: `${salt}:${passwordHash}` });
    if (created.error) console.error('Initial admin account could not be created:', created.error.message);
    else console.log(`Initial admin account created for ${adminEmail}.`);
  }
}
export default app;

if (!process.env.VERCEL) {
  app.listen(port, '0.0.0.0', () => console.log(`Fourza Media server listening on ${port}`));
}
