import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = createRedis();

// Newsletter: 5 requests per minute per IP
const newsletterLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '1 m'), prefix: 'rl:newsletter' })
  : null;

// Login: 5 attempts per 15 minutes per IP (brute-force protection)
const loginLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '15 m'), prefix: 'rl:login' })
  : null;

// Admin content: 30 requests per minute per IP
const contentLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(30, '1 m'), prefix: 'rl:content' })
  : null;

function getIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
}

async function checkLimit(
  limiter: Ratelimit | null,
  request: NextRequest
): Promise<NextResponse | null> {
  if (!limiter) return null; // skip if Upstash not configured

  const ip = getIp(request);
  const { success, reset } = await limiter.limit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  return null;
}

export async function rateLimitNewsletter(request: NextRequest) {
  return checkLimit(newsletterLimiter, request);
}

export async function rateLimitLogin(request: NextRequest) {
  return checkLimit(loginLimiter, request);
}

export async function rateLimitContent(request: NextRequest) {
  return checkLimit(contentLimiter, request);
}
