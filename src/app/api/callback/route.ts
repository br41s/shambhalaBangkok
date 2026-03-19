import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'OAuth not configured' }, { status: 500 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return NextResponse.json({ error: data.error_description }, { status: 401 });
  }

  // Decap CMS expects the token via postMessage in a popup window
  const html = `
    <html><body><script>
      (function() {
        function recieveMessage(e) {
          console.log("recieveMessage %o", e);
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
            e.origin
          );
          window.removeEventListener("message", recieveMessage, false);
        }
        window.addEventListener("message", recieveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
