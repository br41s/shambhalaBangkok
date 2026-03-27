import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/auth';
import { saveContentFile, deleteContentFile } from '@/lib/github';

async function authGuard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  const denied = await authGuard();
  if (denied) return denied;

  const body = await request.json();
  const { type, slug, frontmatter, content, message } = body;

  if (!type || !slug || !frontmatter) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (type !== 'events' && type !== 'blog') {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const result = await saveContentFile(
    type,
    slug,
    frontmatter,
    content || '',
    message || `Update ${type}/${slug}`
  );
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  revalidatePath('/');
  revalidatePath(`/${type}`);
  revalidatePath(`/${type}/${slug}`);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const denied = await authGuard();
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');

  if (!type || !slug) {
    return NextResponse.json({ error: 'Missing type or slug' }, { status: 400 });
  }

  if (type !== 'events' && type !== 'blog') {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const result = await deleteContentFile(type as 'events' | 'blog', slug, `Delete ${type}/${slug}`);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  revalidatePath('/');
  revalidatePath(`/${type}`);
  revalidatePath(`/${type}/${slug}`);

  return NextResponse.json({ ok: true });
}
