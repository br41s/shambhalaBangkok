# Deployment Guide

## Recommended: Vercel

### Prerequisites
- GitHub repository with the project code
- Vercel account (free tier is sufficient)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/braisntext/shambhalaBangkok.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the GitHub repository
   - Select the `shambala-bangkok` directory as root (if monorepo)
   - Framework preset: **Next.js** (auto-detected)

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:

   | Variable | Value | Environment |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://shambhalabangkok.vercel.app` (or custom domain) | All |
   | `ADMIN_EMAIL` | Admin login email | Production |
   | `ADMIN_PASSWORD` | Strong admin password | Production |
   | `ADMIN_SESSION_SECRET` | Random 32+ char string (`openssl rand -hex 32`) | Production |
   | `GITHUB_TOKEN` | GitHub PAT with Contents read/write scope | Production |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Your Plausible domain | All |
   | `BREVO_API_KEY` | Your Brevo API key | Production |
   | `BREVO_LIST_ID` | Brevo contact list ID | Production |
   | `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (optional) | Production |
   | `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (optional) | Production |

   > **To generate `ADMIN_SESSION_SECRET`:** run `openssl rand -hex 32` in your terminal.
   >
   > **To create `GITHUB_TOKEN`:** go to GitHub → Settings → Developer settings → Fine-grained tokens → create one with Contents read/write for the `shambhalaBangkok` repo.

4. **Configure Domain** (when ready)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed by Vercel
   - SSL is automatic

5. **Deploy**
   - Every push to `main` triggers automatic deployment
   - Preview deployments for pull requests

### Build Settings
These should be auto-detected, but verify:
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node.js Version**: 20.x

---

## Admin Panel Setup

The admin panel is built into the site — no external CMS required.

### How It Works
1. Admin logs in at `/admin/login` with email and password
2. Credentials are verified against `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars
3. Session is stored as an HMAC-signed HTTP-only cookie (24h expiry)
4. Content changes are committed to GitHub via the Contents API using `GITHUB_TOKEN`
5. Each commit triggers a Vercel rebuild (~1-2 min)

### First Login
1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Vercel environment variables
2. Set `ADMIN_SESSION_SECRET` and `GITHUB_TOKEN`
3. Redeploy the site (Settings → Deployments → Redeploy)
4. Navigate to `/admin/login`
5. Log in with the email and password you configured

### Optional: Cloudflare Turnstile Captcha
To add captcha protection on the login page:
1. Create a Turnstile widget at [dash.cloudflare.com/turnstile](https://dash.cloudflare.com/turnstile)
2. Add `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to Vercel env vars
3. The login page automatically shows the captcha when the keys are present

---

## Post-Deployment Checklist

- [ ] Site loads at custom domain (or Vercel URL) with HTTPS
- [ ] All pages render correctly
- [ ] Admin login works at `/admin/login`
- [ ] Can create events and posts from admin panel
- [ ] Events display with correct dates (timezone: Asia/Bangkok GMT+7)
- [ ] Calendar ICS feed works: `/api/calendar/feed.ics`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Newsletter signup works (test with real email)
- [ ] Markdown rendering: blog posts & event descriptions render formatted HTML
- [ ] Google Translate widget: appears in bottom-right, auto-detects language
- [ ] SVG logo: displays correctly in header across all pages
- [ ] Google Search Console: submit sitemap
- [ ] Plausible Analytics: verify data collection
- [ ] Security headers: test at securityheaders.com
- [ ] Performance: test at PageSpeed Insights (target: 95+)
- [ ] Mobile responsiveness: test on real devices
- [ ] Social sharing: verify Open Graph tags with Facebook debugger
- [ ] Legacy URL redirects: test old URLs redirect correctly

---

## DNS Configuration

### For Vercel (custom domain)
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## Rollback

If a deployment breaks:

1. **Vercel**: Go to Deployments → click on a previous successful deployment → "Promote to Production"

Or revert the Git commit and push:
```bash
git revert HEAD
git push
```
