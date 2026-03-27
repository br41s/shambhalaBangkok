import { Redis } from '@upstash/redis';

const SETTINGS_PREFIX = 'settings:';

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getSetting(key: string): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<string>(`${SETTINGS_PREFIX}${key}`);
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  await redis.set(`${SETTINGS_PREFIX}${key}`, value);
  return true;
}

export async function deleteSetting(key: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  await redis.del(`${SETTINGS_PREFIX}${key}`);
  return true;
}
