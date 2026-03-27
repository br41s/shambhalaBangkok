import matter from 'gray-matter';

const REPO = 'braisntext/shambhalaBangkok';
const BRANCH = 'main';
const API = 'https://api.github.com';

function getToken(): string {
  return process.env.GITHUB_TOKEN || '';
}

async function ghFetch(path: string, options?: RequestInit) {
  return fetch(`${API}/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

export async function getFileSha(path: string): Promise<string | null> {
  const res = await ghFetch(path);
  if (!res.ok) {
    console.error(`[GitHub] Failed to fetch ${path}: ${res.status} ${res.statusText}`);
    return null;
  }
  const data = await res.json();
  return data.sha ?? null;
}

export async function saveContentFile(
  type: 'events' | 'blog',
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  const filePath = `content/${type}/${slug}.md`;
  const content = matter.stringify(body, frontmatter);
  const encoded = Buffer.from(content).toString('base64');

  const sha = await getFileSha(filePath);

  const res = await ghFetch(filePath, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: encoded,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { ok: false, error: err.message || `GitHub API error: ${res.status}` };
  }
  return { ok: true };
}

export async function deleteContentFile(
  type: 'events' | 'blog',
  slug: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  const filePath = `content/${type}/${slug}.md`;
  const sha = await getFileSha(filePath);
  if (!sha) return { ok: false, error: 'File not found' };

  const res = await ghFetch(filePath, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { ok: false, error: err.message || `GitHub API error: ${res.status}` };
  }
  return { ok: true };
}
