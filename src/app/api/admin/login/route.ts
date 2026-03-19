import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, verifyTurnstile, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
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
