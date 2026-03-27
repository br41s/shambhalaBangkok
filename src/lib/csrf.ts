import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from './config';

/**
 * Validates Origin/Referer header against the site URL.
 * Returns a 403 response if the request is cross-origin, or null if valid.
 */
export function verifyCsrf(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const siteUrl = new URL(siteConfig.url);
  const allowedOrigin = siteUrl.origin;

  // Origin header is most reliable (sent on all cross-origin POST requests)
  if (origin) {
    if (origin !== allowedOrigin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return null;
  }

  // Fallback to Referer if Origin is missing (same-origin requests in some browsers)
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (refererOrigin !== allowedOrigin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return null;
    } catch {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // If neither Origin nor Referer is present, allow in dev, block in prod
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}
