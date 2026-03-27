import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, verifyTurnstile, setSessionCookie } from '@/lib/auth';
import { verifyCsrf } from '@/lib/csrf';
import { rateLimitLogin } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const csrf = verifyCsrf(request);
  if (csrf) return csrf;

  const limited = await rateLimitLogin(request);
  if (limited) return limited;

  const body = await request.json();
  const { email, password, turnstileToken } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const captchaOk = await verifyTurnstile(turnstileToken || '');
  if (!captchaOk) {
    return NextResponse.json({ error: 'Captcha verification failed' }, { status: 403 });
  }

  if (!verifyCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
