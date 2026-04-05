import { Redis } from '@upstash/redis';

const SETTINGS_PREFIX = 'settings:';
const GITHUB_SETTINGS_PATH = 'content/settings.json';

// --- Redis backend ---

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// --- GitHub-file backend (fallback when Redis is not configured) ---

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  return {
    token,
    repo: 'braisntext/shambhalaBangkok',
    branch: 'main',
    api: 'https://api.github.com',
  };
}

interface GitHubSettingsFile {
  [key: string]: string;
}

let ghCache: { data: GitHubSettingsFile; sha: string; fetchedAt: number } | null = null;
const GH_CACHE_TTL = 60 * 1000; // 1 minute

async function ghFetchSettings(): Promise<{ data: GitHubSettingsFile; sha: string } | null> {
  if (ghCache && Date.now() - ghCache.fetchedAt < GH_CACHE_TTL) {
    return { data: ghCache.data, sha: ghCache.sha };
  }

  const gh = getGitHubConfig();
  if (!gh) return null;

  const res = await fetch(
    `${gh.api}/repos/${gh.repo}/contents/${GITHUB_SETTINGS_PATH}?ref=${gh.branch}`,
    {
      headers: {
        Authorization: `Bearer ${gh.token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    }
  );

  if (res.status === 404) {
    // File doesn't exist yet — empty settings
    ghCache = { data: {}, sha: '', fetchedAt: Date.now() };
    return { data: {}, sha: '' };
  }

  if (!res.ok) return null;

  const json = await res.json();
  const content = Buffer.from(json.content, 'base64').toString('utf-8');
  const data = JSON.parse(content) as GitHubSettingsFile;
  ghCache = { data, sha: json.sha, fetchedAt: Date.now() };
  return { data, sha: json.sha };
}

async function ghSaveSettings(settings: GitHubSettingsFile, currentSha: string): Promise<boolean> {
  const gh = getGitHubConfig();
  if (!gh) return false;

  const encoded = Buffer.from(JSON.stringify(settings, null, 2)).toString('base64');

  const res = await fetch(`${gh.api}/repos/${gh.repo}/contents/${GITHUB_SETTINGS_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${gh.token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'chore: update settings',
      content: encoded,
      branch: gh.branch,
      ...(currentSha ? { sha: currentSha } : {}),
    }),
  });

  if (!res.ok) return false;

  // Invalidate cache
  ghCache = null;
  return true;
}

// --- Public API (Redis → GitHub fallback) ---

export async function getSetting(key: string): Promise<string | null> {
  const redis = getRedis();
  if (redis) {
    return redis.get<string>(`${SETTINGS_PREFIX}${key}`);
  }

  const gh = await ghFetchSettings();
  if (!gh) return null;
  return gh.data[key] ?? null;
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    await redis.set(`${SETTINGS_PREFIX}${key}`, value);
    return true;
  }

  const gh = await ghFetchSettings();
  if (!gh) return false;
  gh.data[key] = value;
  return ghSaveSettings(gh.data, gh.sha);
}

export async function deleteSetting(key: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    await redis.del(`${SETTINGS_PREFIX}${key}`);
    return true;
  }

  const gh = await ghFetchSettings();
  if (!gh) return false;
  delete gh.data[key];
  return ghSaveSettings(gh.data, gh.sha);
}
