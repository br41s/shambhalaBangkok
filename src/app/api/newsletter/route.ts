import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/csrf';
import { rateLimitNewsletter } from '@/lib/rate-limit';
import { addContact } from '@/lib/brevo';

export async function POST(request: NextRequest) {
  const csrf = verifyCsrf(request);
  if (csrf) return csrf;

  const limited = await rateLimitNewsletter(request);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { email } = body;

    // Honeypot check - if website field is filled, it's a bot
    if (body.website) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Sanitize
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 320);

    const result = await addContact(sanitizedEmail);
    if (!result.ok) {
      console.error('[Newsletter] Brevo error:', result.error);
      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
