import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { verifyCsrf } from '@/lib/csrf';
import { getSetting, setSetting, deleteSetting } from '@/lib/settings';
import { clearFeedCache } from '@/lib/external-calendar';

const ALLOWED_KEYS = [
  'brevo_api_key',
  'brevo_list_id',
  'external_ics_url',
  'external_ics_enabled',
] as const;
type SettingKey = (typeof ALLOWED_KEYS)[number];

function isAllowedKey(key: string): key is SettingKey {
  return (ALLOWED_KEYS as readonly string[]).includes(key);
}

function maskSecret(key: string, value: string | null): string | null {
  if (!value) return null;
  if (key.includes('api_key')) {
    return value.length > 4 ? `••••${value.slice(-4)}` : '••••';
  }
  return value;
}

async function authGuard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await authGuard();
  if (denied) return denied;

  const settings: Record<string, string | null> = {};

  for (const key of ALLOWED_KEYS) {
    const value = await getSetting(key);
    settings[key] = maskSecret(key, value);
  }

  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const denied = await authGuard();
  if (denied) return denied;

  const csrf = verifyCsrf(request);
  if (csrf) return csrf;

  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || typeof key !== 'string' || !isAllowedKey(key)) {
      return NextResponse.json({ error: 'Invalid setting key' }, { status: 400 });
    }

    if (typeof value !== 'string') {
      return NextResponse.json({ error: 'Value must be a string' }, { status: 400 });
    }

    // Allow clearing a setting
    if (value === '') {
      const ok = await deleteSetting(key);
      if (!ok) {
        return NextResponse.json({ error: 'Redis not configured' }, { status: 503 });
      }
      if (key.startsWith('external_ics_')) {
        clearFeedCache();
      }
      return NextResponse.json({ success: true });
    }

    const ok = await setSetting(key, value.trim());
    if (!ok) {
      return NextResponse.json({ error: 'Redis not configured' }, { status: 503 });
    }

    // Clear cached external events when ICS settings change
    if (key.startsWith('external_ics_')) {
      clearFeedCache();
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
