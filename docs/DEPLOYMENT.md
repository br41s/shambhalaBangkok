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
   git remote add origin https://github.com/your-org/shambala-bangkok.git
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
   | `NEXT_PUBLIC_SITE_URL` | `https://shambalabangkok.vercel.app` (or custom domain) | All |
   | `NEXT_PUBLIC_GA_ID` | Your Plausible domain | All |
   | `BREVO_API_KEY` | Your Brevo API key | Production |
   | `WEBHOOK_SECRET` | Random 32-char string | Production |

4. **Configure Domain**
   - Go to Settings → Domains
   - Add `shambhala-bangkok.org`
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

## Alternative: Cloudflare Pages

### Steps

1. **Connect GitHub** in Cloudflare Pages dashboard

2. **Build Settings**
   - Build command: `pnpm build`
   - Build output: `.next`
   - Root directory: `shambala-bangkok`

3. **Environment Variables**
   Same as Vercel (see above)

4. **Custom Domain**
   - Add domain in Cloudflare DNS
   - Enable proxied mode for CDN benefits

> **Note**: Some API routes may need adjustment for Cloudflare Workers compatibility.

---

## Decap CMS Setup

### Git Gateway (Netlify Identity)

1. Enable Netlify Identity on a Netlify site (can be separate from hosting)
2. Enable Git Gateway in Identity settings
3. Invite editors via email
4. Update `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

### GitHub Backend (Direct)

Alternative if not using Netlify Identity:

```yaml
backend:
  name: github
  repo: your-org/shambala-bangkok
  branch: main
```

Editors need GitHub accounts with repository access.

---

## Decap CMS with Vercel

Since Vercel doesn't natively support Netlify Identity/Git Gateway, choose one of:

### Option A: GitHub Backend
Use the GitHub backend directly (editors need GitHub accounts):
```yaml
backend:
  name: github
  repo: your-org/shambala-bangkok
  branch: main
```

### Option B: External Auth
Use an external OAuth provider:
1. Deploy a small OAuth app (e.g., using [netlify-cms-oauth-provider-node](https://github.com/vencax/netlify-cms-github-oauth-provider))
2. Configure the base_url in config.yml

### Option C: Netlify Identity (Separate)
1. Create a free Netlify site pointing to the same repo
2. Enable Identity + Git Gateway on Netlify
3. Use Netlify's identity endpoint in Decap CMS config

---

## Post-Deployment Checklist

- [ ] Site loads at custom domain with HTTPS
- [ ] All pages render correctly
- [ ] Events display with correct dates (timezone: Asia/Bangkok GMT+7)
- [ ] Calendar ICS feed works: `/api/calendar/feed.ics`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Newsletter signup works (test with real email)
- [ ] Decap CMS accessible at `/admin/`
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

### For Vercel
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### For Cloudflare
```
Type    Name    Value
CNAME   @       shambala-bangkok.pages.dev
CNAME   www     shambala-bangkok.pages.dev
```

---

## Rollback

If a deployment breaks:

1. **Vercel**: Go to Deployments → click on a previous successful deployment → "Promote to Production"
2. **Cloudflare**: Go to Pages → Deployments → "Rollback"

Or revert the Git commit and push:
```bash
git revert HEAD
git push
```
