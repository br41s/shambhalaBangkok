# Security Manual

## Overview

This document describes the security measures implemented in the Bangkok Shambhala website. The site has a minimal attack surface since it has no user authentication, no database, and no payment processing.

## Security Headers

All responses include the following security headers (configured in `next.config.js`):

| Header | Value | Purpose |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-src 'self' https://www.google.com` | Prevents XSS, clickjacking, data injection |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years |
| X-Frame-Options | `DENY` | Prevents clickjacking |
| X-Content-Type-Options | `nosniff` | Prevents MIME type sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` | Controls referer information |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | Restricts browser features |
| X-DNS-Prefetch-Control | `on` | Enables DNS prefetching for performance |

### Testing Headers
Visit [securityheaders.com](https://securityheaders.com) and enter the site URL. Target grade: **A+**.

## API Security

### Newsletter Endpoint (`/api/newsletter`)

1. **Rate Limiting**: 5 requests per minute per IP address
   - Uses in-memory rate limiter (resets on deployment)
   - Returns 429 if limit exceeded

2. **Honeypot Field**: Hidden form field that bots fill but humans don't
   - If `website` field is populated, request is silently accepted (200) but not processed
   - This avoids alerting bots that they've been detected

3. **Input Validation**: Email is validated server-side before processing

4. **No CORS exposure**: API routes inherit Next.js default same-origin policy

### Calendar Endpoints
- `/api/calendar/feed.ics` — Read-only, no authentication needed
- `/api/events/[slug]/ics` — Read-only, no authentication needed
- These serve public data and require no protection beyond standard headers

## Content Security

### Git-Based Content
- All content changes are Git commits via GitHub API → full audit trail
- Admin panel authenticates via email/password, then uses a GitHub PAT for commits
- No direct database writes or SQL injection vectors
- Content is sanitized at build time (Markdown → HTML with `sanitize: true`)

### Admin Authentication
- Email/password login verified against environment variables
- HMAC-SHA256 signed session tokens with 24-hour expiry
- HTTP-only, secure cookies prevent XSS access to tokens
- Timing-safe comparison prevents timing attacks
- Optional Cloudflare Turnstile captcha on login
- All admin pages and API routes verify session before processing

### No User-Generated Content
- No comment system
- No public user accounts or registration
- No file upload by public users
- Newsletter signup is the only public input

## Third-Party Dependencies

### CDN Resources
- Plausible Analytics (privacy-first, GDPR-compliant)
- Google Maps embed (iframe, controlled by CSP)
- Google Translate widget (auto-translation)

### npm Dependencies
Keep dependencies updated:
```bash
pnpm audit              # Check for vulnerabilities
pnpm update             # Update to latest compatible versions
pnpm outdated           # Check for outdated packages
```

## Privacy & Compliance

### PDPA (Thailand)
- Privacy policy at `/privacy`
- No cookies except essential (no cookie banner needed if using Plausible)
- No personal data stored in the application
- Newsletter emails stored in Brevo (GDPR-compliant provider)

### Data Collected
| Data | Where Stored | Purpose | Retention |
|---|---|---|---|
| Email (newsletter) | Brevo | Newsletter delivery | Until unsubscribed |
| Page views | Plausible | Analytics | 2 years |

### Data NOT Collected
- No IP addresses logged
- No user tracking cookies
- No personal profiles
- No payment information (external links only)

## Incident Response

### If the Site is Compromised

1. **Immediately**: Change admin password (`ADMIN_PASSWORD` in Vercel), rotate `GITHUB_TOKEN` and `ADMIN_SESSION_SECRET`
2. **Audit**: Check recent Git commits for unauthorized changes
3. **Rollback**: Deploy previous known-good commit
4. **Investigate**: Review GitHub commit history and Vercel deployment logs
5. **Remediate**: Rotate all API keys and tokens
6. **Notify**: Inform community if any data was exposed

### If API Keys are Leaked

1. Rotate the leaked key immediately
2. Update environment variables in Vercel
3. Check n8n workflows for any keys, rotate those too
4. Review Git history — use `git filter-branch` or BFG to remove secrets

## Security Checklist (Quarterly)

- [ ] Run `pnpm audit` and fix vulnerabilities
- [ ] Update dependencies to latest versions
- [ ] Test security headers at securityheaders.com
- [ ] Change admin password and rotate `ADMIN_SESSION_SECRET`
- [ ] Rotate `GITHUB_TOKEN` (create new fine-grained token, delete old)
- [ ] Rotate API keys (Brevo, n8n webhooks)
- [ ] Review Vercel access and team members
- [ ] Check Plausible for unusual traffic patterns
- [ ] Verify legacy URL redirects are working
- [ ] Test newsletter signup flow
