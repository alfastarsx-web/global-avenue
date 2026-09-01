import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface LeadPayload {
  name: string;
  phone: string;
  interest?: string;
  comment?: string;
  project?: string;
  source?: string;
  locale?: string;
  page?: string;
}

/** Oddiy xotira ichidagi rate limit — bir IP daqiqasiga 5 ta ariza */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_HITS;
}

function clean(value: unknown, max = 300): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function notifyTelegram(lead: LeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, skipped: true };

  const lines = [
    '<b>🔔 Yangi ariza — globalavenue.uz</b>',
    '',
    `<b>Ism:</b> ${escapeHtml(lead.name)}`,
    `<b>Telefon:</b> ${escapeHtml(lead.phone)}`,
    lead.project ? `<b>Loyiha:</b> ${escapeHtml(lead.project)}` : '',
    lead.interest ? `<b>Qiziqish:</b> ${escapeHtml(lead.interest)}` : '',
    lead.comment ? `<b>Izoh:</b> ${escapeHtml(lead.comment)}` : '',
    `<b>Manba:</b> ${escapeHtml(lead.source ?? '-')} (${escapeHtml(lead.page ?? '')})`,
    `<b>Til:</b> ${escapeHtml(lead.locale ?? '-')}`,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  return { ok: res.ok, skipped: false };
}

async function pushToCrm(lead: LeadPayload) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        TITLE: `Sayt arizasi — ${lead.name}`,
        NAME: lead.name,
        PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }],
        COMMENTS: [lead.project, lead.interest, lead.comment].filter(Boolean).join(' | '),
        SOURCE_ID: 'WEB',
        UTM_SOURCE: lead.source,
      },
    }),
  });
  return { ok: res.ok, skipped: false };
}

/** Fallback: lidlarni faylga yozib boramiz — Telegram/CRM ishlamasa ham yo'qolmaydi */
async function archive(lead: LeadPayload & { ip: string; at: string }) {
  try {
    const dir = path.join(process.cwd(), 'data');
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(lead) + '\n', 'utf8');
  } catch (err) {
    console.error('lead archive failed', err);
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const lead: LeadPayload = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    interest: clean(body.interest, 120),
    comment: clean(body.comment, 1000),
    project: clean(body.project, 80),
    source: clean(body.source, 80),
    locale: clean(body.locale, 8),
    page: clean(body.page, 200),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json({ error: 'name_and_phone_required' }, { status: 400 });
  }
  if (lead.phone.replace(/\D/g, '').length < 9) {
    return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });
  }

  const at = new Date().toISOString();
  await archive({ ...lead, ip, at });

  const [tg, crm] = await Promise.allSettled([notifyTelegram(lead), pushToCrm(lead)]);

  if (tg.status === 'rejected') console.error('telegram notify failed', tg.reason);
  if (crm.status === 'rejected') console.error('crm push failed', crm.reason);

  return NextResponse.json({
    ok: true,
    delivered: {
      telegram: tg.status === 'fulfilled' && tg.value.ok,
      crm: crm.status === 'fulfilled' && crm.value.ok,
    },
  });
}
