import { NextResponse } from 'next/server';

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://shambhala-bangkok.org/sitemap.xml
`;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
