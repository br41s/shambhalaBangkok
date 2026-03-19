import { NextResponse } from 'next/server';

export function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({ error: 'OAuth not configured' }, { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/callback`,
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
