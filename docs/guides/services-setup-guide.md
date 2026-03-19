---
stylesheet: null
body_class: guide
css: |-
  @page { margin: 2cm; size: A4; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a1a; line-height: 1.7; font-size: 11pt; }
  h1 { color: #2563EB; font-size: 28pt; margin-top: 0; padding-bottom: 8px; border-bottom: 3px solid #2563EB; }
  h2 { color: #2563EB; font-size: 18pt; margin-top: 36px; padding-bottom: 4px; border-bottom: 1px solid #ddd; page-break-after: avoid; }
  h3 { color: #1e40af; font-size: 13pt; margin-top: 20px; page-break-after: avoid; }
  h4 { color: #374151; font-size: 11pt; margin-top: 16px; page-break-after: avoid; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10pt; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 9.5pt; page-break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10pt; page-break-inside: avoid; }
  th { background: #2563EB; color: white; padding: 10px 12px; text-align: left; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) { background: #f8fafc; }
  blockquote { border-left: 4px solid #F59E0B; background: #fffbeb; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  .cover { text-align: center; padding: 100px 0 60px; page-break-after: always; }
  .cover h1 { border: none; font-size: 36pt; }
  .cover p { font-size: 14pt; color: #64748b; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
  ul, ol { padding-left: 24px; }
  li { margin-bottom: 4px; }
  .checklist { list-style: none; padding-left: 0; }
  .checklist li::before { content: "☐ "; }
  .done li::before { content: "☑ "; color: #22c55e; }
  .warning { border-left-color: #ef4444; background: #fef2f2; }
  .success { border-left-color: #22c55e; background: #f0fdf4; }
---

<div class="cover">

# Bangkok Shambhala

# Services Configuration Guide

Step-by-step setup for all external services

Version 1.0 — March 2026

</div>

## Overview & Checklist

This guide walks you through configuring every external service the Bangkok Shambhala website depends on. Complete them in order — some services depend on others.

**Master Checklist:**

| # | Service | Priority | Est. Time | Status |
|---|---------|----------|-----------|--------|
| 1 | GitHub Repository | Required | 5 min | ☐ |
| 2 | Vercel (Hosting) | Required | 15 min | ☐ |
| 3 | Custom Domain & DNS | Required | 15 min | ☐ |
| 4 | Brevo (Email / Newsletter) | Required | 20 min | ☐ |
| 5 | Plausible Analytics | Required | 10 min | ☐ |
| 6 | Decap CMS (Content Editor) | Required | 15 min | ☐ |
| 7 | Google Search Console | Required | 10 min | ☐ |
| 8 | Google Business Profile | Required | 15 min | ☐ |
| 9 | Social Channels (WhatsApp, LINE) | Required | 20 min | ☐ |
| 10 | Wise (International Donations) | Recommended | 15 min | ☐ |
| 11 | PromptPay / Thai QR | Recommended | 10 min | ☐ |
| 12 | n8n (Automation) | Recommended | 30 min | ☐ |
| 13 | OpenAI API (Social Copy AI) | Optional | 10 min | ☐ |
| 14 | Google Sheets (Social Copy Log) | Optional | 10 min | ☐ |
| 15 | Cloudinary (Image CDN) | Optional | 10 min | ☐ |

**Total estimated time: ~3–4 hours**

---

## 1. GitHub Repository

**Purpose:** Source code hosting, version control, CMS backend.

**You need:** A GitHub account.

### Steps

1. **Sign in** to [github.com](https://github.com)

2. **Repository already created** at:
   `https://github.com/braisntext/shambalaBangkok`

3. **Add collaborators** (other admins/developers):
   - Go to repository → **Settings** → **Collaborators**
   - Click **Add people**
   - Enter their GitHub username or email
   - Assign role: `Write` for editors, `Admin` for administrators

4. **Protect main branch** (recommended):
   - Settings → **Branches** → **Add rule**
   - Branch name pattern: `main`
   - Enable: **Require a pull request before merging**
   - Enable: **Require status checks to pass** (select the CI workflow)
   - Click **Create**

### Verification

- [ ] Repository accessible at `https://github.com/braisntext/shambalaBangkok`
- [ ] CI workflow runs on push (check Actions tab)
- [ ] Collaborators can access the repo

---

## 2. Vercel (Hosting & Deployment)

**Purpose:** Website hosting, automatic builds, CDN, serverless API routes.

**You need:** GitHub account (same as above).

### Steps

1. **Sign up** at [vercel.com](https://vercel.com) — use **Continue with GitHub**

2. **Import project:**
   - Click **Add New → Project**
   - Select the `braisntext/shambalaBangkok` repository
   - Vercel auto-detects Next.js

3. **Configure build settings:**

   | Setting | Value |
   |---------|-------|
   | Framework Preset | Next.js (auto-detected) |
   | Root Directory | `shambala-bangkok` |
   | Build Command | `pnpm build` |
   | Output Directory | `.next` |
   | Install Command | `pnpm install` |
   | Node.js Version | 20.x |

4. **Set environment variables** (Settings → Environment Variables):

   | Variable | Value | Environments |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_SITE_URL` | `https://shambhala-bangkok.org` | All |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `shambhala-bangkok.org` | All |
   | `BREVO_API_KEY` | *(from Step 4)* | Production |
   | `BREVO_LIST_ID` | *(from Step 4)* | Production |

   > **Note:** Don't worry about Brevo values yet — come back after completing Section 4.

5. **Deploy:**
   - Click **Deploy**
   - Wait for the build to complete (~1-2 minutes)
   - Vercel assigns a temporary URL: `shambalabangkok-xxx.vercel.app`

6. **Verify the deployment:**
   - Open the temporary URL
   - Check homepage loads
   - Check `/events`, `/blog`, `/about` pages

### Verification

- [ ] Vercel project created and linked to GitHub repo
- [ ] Automatic deployment on push to `main`
- [ ] Site loads at Vercel temporary URL
- [ ] Environment variables set

---

## 3. Custom Domain & DNS

**Purpose:** Point `shambhala-bangkok.org` to the Vercel deployment.

**You need:** Access to your domain registrar (where you bought the domain).

### Steps

1. **In Vercel:**
   - Go to Project → **Settings** → **Domains**
   - Add domain: `shambhala-bangkok.org`
   - Add domain: `www.shambhala-bangkok.org`
   - Vercel shows the required DNS records

2. **In your domain registrar** (e.g., Namecheap, GoDaddy, Cloudflare):

   Add these DNS records:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | `76.76.21.21` | 300 |
   | CNAME | www | `cname.vercel-dns.com` | 300 |

3. **Wait for DNS propagation** (5 min to 48 hours, usually <30 min)

4. **Verify in Vercel:**
   - Go back to Settings → Domains
   - Both domains should show a green checkmark ✓
   - SSL certificate is issued automatically

5. **Set redirect:**
   - Configure `www.shambhala-bangkok.org` to redirect to `shambhala-bangkok.org`
   - In Vercel: Domains → www → set as "Redirect to" the apex domain

### Verification

- [ ] `https://shambhala-bangkok.org` loads the site
- [ ] `https://www.shambhala-bangkok.org` redirects to the apex
- [ ] SSL padlock icon shows in browser
- [ ] `http://` automatically redirects to `https://`

---

## 4. Brevo (Email & Newsletter)

**Purpose:** Newsletter subscription management, email sending for automations.

**You need:** A valid email address.

### Step 4.1 — Create Account

1. Go to [app.brevo.com/account/register](https://app.brevo.com/account/register)
2. Sign up with email
3. Confirm your email address
4. Complete the onboarding wizard:
   - Company: `Bangkok Shambhala`
   - Industry: `Non-profit / Education`
   - Team size: `1-10`

### Step 4.2 — Get API Key

1. Go to **Settings** (gear icon) → **SMTP & API** → **API Keys**
2. Click **Generate a new API key**
3. Name: `shambhala-bangkok-website`
4. Copy the API key

   > **Important:** Save this key securely. You won't see it again.

5. **Add to Vercel:**
   - Go to Vercel → Project Settings → Environment Variables
   - Add `BREVO_API_KEY` = *(paste the key)*
   - Environment: Production

### Step 4.3 — Create Contact List

1. Go to **Contacts** → **Lists**
2. Click **Create a list**
3. Name: `Newsletter Subscribers`
4. Note the **List ID** (shown in the URL or list details, usually `1` for the first list)
5. **Add to Vercel:**
   - Add `BREVO_LIST_ID` = *(the list ID number)*

### Step 4.4 — Configure Sender

1. Go to **Settings** → **Senders & IP** → **Senders**
2. Click **Add a sender**
3. Fill in:
   - Name: `Bangkok Shambhala`
   - Email: `bangkok@shambhala.info` *(or your email)*
4. Brevo sends a verification email — click the link to confirm

### Step 4.5 — Set Up Domain Authentication (Important for Deliverability)

1. Go to **Settings** → **Senders & IP** → **Domains**
2. Click **Add a domain**
3. Enter your domain: `shambhala-bangkok.org`
4. Brevo shows **3 DNS records** to add:

   | Type | Name | Value | Purpose |
   |------|------|-------|---------|
   | TXT | `mail._domainkey.shambhala-bangkok.org` | *(provided by Brevo)* | DKIM |
   | TXT | `shambhala-bangkok.org` | *(provided by Brevo)* | SPF |
   | CNAME | *(provided)* | *(provided)* | Tracking |

5. Add these records in your DNS registrar
6. Back in Brevo, click **Verify**
7. Wait for validation (can take up to 24 hours)

### Step 4.6 — Test the Newsletter Signup

1. Redeploy the site in Vercel (or wait for next push)
2. Open the website
3. Scroll to the footer newsletter form
4. Enter a test email address
5. Click Subscribe
6. Check Brevo → Contacts → the test email should appear in the list

### Verification

- [ ] Brevo account created and confirmed
- [ ] API key generated and added to Vercel env vars
- [ ] Contact list created, List ID saved in Vercel
- [ ] Sender email verified
- [ ] Domain authenticated (DKIM + SPF)
- [ ] Test newsletter signup works end-to-end

---

## 5. Plausible Analytics

**Purpose:** Privacy-first website analytics — no cookies, GDPR/PDPA compliant.

**You need:** An email address. Plausible has a paid plan (~€9/month) or you can self-host for free.

### Option A: Plausible Cloud (Recommended)

1. Sign up at [plausible.io/register](https://plausible.io/register)
2. Start the 30-day free trial
3. **Add your site:**
   - Click **Add a website**
   - Domain: `shambhala-bangkok.org`
4. **Snippet is already installed** — the site includes the Plausible script in `layout.tsx`
5. Verify in Vercel that `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set to `shambhala-bangkok.org`

### Option B: Self-hosted Plausible

1. Follow the [self-hosting guide](https://plausible.io/docs/self-hosting)
2. Deploy on a VPS (e.g., DigitalOcean, Hetzner)
3. Update the script source in `src/app/layout.tsx`:
   ```
   src="https://your-plausible-server.com/js/script.js"
   ```

### Configure Goals (Optional but Recommended)

In your Plausible dashboard:

1. Go to **Settings** → **Goals**
2. Create these custom events:

   | Goal Name | Tracks |
   |-----------|--------|
   | `Newsletter Signup` | Email subscriptions |
   | `Calendar Download` | ICS file downloads |
   | `WhatsApp Join` | Click on WhatsApp button |
   | `LINE Join` | Click on LINE button |
   | `Donate Click` | Click on donation methods |
   | `Event View` | Views of event detail pages |

### Verification

- [ ] Plausible account created and site added
- [ ] Env variable `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set in Vercel
- [ ] Visit the site, then check Plausible dashboard — your visit should appear within 30 seconds
- [ ] Goals configured (optional)

---

## 6. Decap CMS (Content Editor)

**Purpose:** Visual web-based content editor for non-technical editors.

**You need:** The deployed site + GitHub account.

### Option A: GitHub Backend (Simplest)

This lets editors log in with their GitHub account.

1. **Edit `public/admin/config.yml`** — update the backend:

   ```yaml
   backend:
     name: github
     repo: braisntext/shambalaBangkok
     branch: main
   ```

2. **Register an OAuth Application on GitHub:**
   - Go to [github.com/settings/applications/new](https://github.com/settings/applications/new)
   - Application name: `Bangkok Shambhala CMS`
   - Homepage URL: `https://shambhala-bangkok.org`
   - Authorization callback URL: `https://shambhala-bangkok.org/admin/`
   - Click **Register application**
   - Note the **Client ID**
   - Generate a **Client Secret** — copy it immediately

3. **Deploy an OAuth proxy** (required by Decap CMS for GitHub):

   The simplest option is using Netlify's open-source proxy. Deploy this to Vercel or use a service:

   **Option: Use `netlify-cms-oauth-provider-node`**
   - Fork [this repo](https://github.com/vencax/netlify-cms-github-oauth-provider)
   - Deploy to Vercel/Heroku/Railway
   - Set env vars: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`
   - Note the deployed URL

   **Option: Use a pre-built service like [Sveltia CMS Auth](https://github.com/sveltia/sveltia-cms-auth)**
   - Deploy to Cloudflare Workers (free)
   - Set Client ID and Secret
   - Note the deployed URL

4. **Update `public/admin/config.yml`** to use your auth proxy:

   ```yaml
   backend:
     name: github
     repo: braisntext/shambalaBangkok
     branch: main
     base_url: https://your-oauth-proxy.vercel.app
   ```

5. **Commit and push** — the CMS will be available at `/admin/`

### Option B: Netlify Identity + Git Gateway

If you prefer not to require GitHub accounts for editors:

1. Create a free site on [netlify.com](https://netlify.com) linked to the same repo
2. Go to **Site settings** → **Identity** → **Enable Identity**
3. Go to **Settings** → **Identity** → **Services** → **Enable Git Gateway**
4. Invite editors: Identity → **Invite users** → enter their emails
5. `public/admin/config.yml` already uses `git-gateway` — no changes needed
6. Editors receive an email invite, set a password, and can log in at `/admin/`

### Test the CMS

1. Navigate to `https://shambhala-bangkok.org/admin/`
2. Log in with your credentials
3. Try creating a test event:
   - Click **Events** → **New Event**
   - Fill in the fields
   - Click **Publish**
4. Wait 1-2 minutes for Vercel to rebuild
5. Check the event appears on the website

### Verification

- [ ] CMS accessible at `/admin/`
- [ ] Login works (GitHub or Netlify Identity)
- [ ] Can create, edit, and publish content
- [ ] Published content appears on site after rebuild
- [ ] Invited editors can access the CMS

---

## 7. Google Search Console

**Purpose:** Monitor search performance, submit sitemap, catch crawl errors.

**You need:** A Google account.

### Steps

1. Go to [search.google.com/search-console](https://search.google.com/search-console)

2. Click **Add property**

3. Choose **Domain** property type

4. Enter: `shambhala-bangkok.org`

5. **Verify ownership** via DNS:
   - Google gives you a TXT record
   - Add it to your DNS:

   | Type | Name | Value |
   |------|------|-------|
   | TXT | @ | `google-site-verification=xxxxx` |

6. Wait for verification (minutes to hours)

7. **Submit sitemap:**
   - Go to **Sitemaps** in the left menu
   - Enter: `https://shambhala-bangkok.org/sitemap.xml`
   - Click **Submit**

8. **Request indexing** for key pages:
   - Use the URL inspection tool at the top
   - Enter your homepage URL
   - Click **Request Indexing**
   - Repeat for `/events`, `/blog`, `/learn/meditation`, `/community`

### Verification

- [ ] Property verified in Search Console
- [ ] Sitemap submitted and status shows "Success"
- [ ] No crawl errors in the Coverage report

---

## 8. Google Business Profile

**Purpose:** Appear in Google Maps, local search results, "meditation bangkok" searches.

**You need:** A Google account, physical address access.

### Steps

1. Go to [business.google.com](https://business.google.com)

2. Click **Manage now** or **Add your business**

3. Fill in business information:

   | Field | Value |
   |-------|-------|
   | Business name | Bangkok Shambhala Meditation Centre |
   | Category | Meditation Centre |
   | Address | Young Place Building, 3rd Floor, Sukhumvit Soi 23, Bangkok 10110 |
   | Phone | *(your community phone)* |
   | Website | `https://shambhala-bangkok.org` |

4. **Verify your business** — Google sends a postcard to the physical address with a verification code (takes 1-2 weeks), or offers phone/email verification for some accounts

5. **After verification, complete your profile:**
   - Add business hours (meditation schedule):
     - Wednesday: 19:00 – 20:30
     - Sunday: 10:00 – 11:30
   - Upload photos of the meditation space
   - Write a business description:
     > "Bangkok Shambhala is a non-profit meditation community offering free weekly meditation sessions, workshops, and retreats in the Asok area of Bangkok. All experience levels welcome."
   - Add attributes: Free Wi-Fi, Wheelchair accessible (if applicable)

6. **Link to your site** — ensure the website URL is correct

### Verification

- [ ] Business profile created
- [ ] Ownership verified (postcard/phone/email)
- [ ] Hours, photos, description, and website URL added
- [ ] Profile appears in Google Maps search

---

## 9. Social Channels

**Purpose:** Community communication and event distribution.

### 9.1 WhatsApp Group

1. Open WhatsApp → **New Group**
2. Name: `Bangkok Shambhala Community`
3. Set group description with website link
4. Go to **Group settings** → **Invite via link**
5. Copy the invite link
6. **Update `src/lib/config.ts`** — replace the placeholder WhatsApp URL:
   ```typescript
   url: 'https://chat.whatsapp.com/YOUR_ACTUAL_INVITE_CODE',
   ```

### 9.2 LINE Group / Official Account

**Option A: LINE Official Account (Recommended)**
1. Go to [manager.line.biz](https://manager.line.biz)
2. Create an official account: `Bangkok Shambhala`
3. Customize: add profile photo, greeting message
4. Get the friend-add URL from Account settings
5. Update `src/lib/config.ts` with the LINE URL

**Option B: LINE Group**
1. Create a LINE group
2. Generate invite link via group settings
3. Update `src/lib/config.ts`

### 9.3 Facebook Page

1. Go to [facebook.com/pages/create](https://facebook.com/pages/create)
2. Choose category: **Religious Organization** or **Non-Profit**
3. Page name: `Bangkok Shambhala`
4. Complete setup: add cover photo, about text, location
5. Note the page URL
6. Update `src/lib/config.ts` if different from current placeholder

### 9.4 Instagram

1. Create an Instagram account: `@shambhalabangkok`
2. Switch to **Professional/Business account** (Settings → Account)
3. Link to the Facebook page
4. Add website link in bio: `shambhala-bangkok.org`
5. Update `src/lib/config.ts` if needed

### 9.5 Meetup Group

1. Go to [meetup.com/create](https://www.meetup.com/create/)
2. Create group: `Bangkok Shambhala`
3. Category: Spirituality → Meditation
4. Location: Bangkok
5. Add regular events to match your schedule
6. Update `src/lib/config.ts`

### After Updating Config

After updating all URLs in `src/lib/config.ts`:

```bash
git add src/lib/config.ts
git commit -m "chore: update social channel URLs with real links"
git push
```

The site rebuilds automatically with the real links.

### Verification

- [ ] WhatsApp group created, invite link works
- [ ] LINE group/account created, link works
- [ ] Facebook page created, URL updated
- [ ] Instagram account created, bio has website link
- [ ] Meetup group created, events listed
- [ ] All URLs updated in `src/lib/config.ts` and pushed

---

## 10. Wise (International Donations)

**Purpose:** Receive international donations with low transfer fees.

**You need:** A valid ID/passport, bank account.

### Steps

1. Sign up at [wise.com](https://wise.com)
2. Complete identity verification (ID + selfie)
3. Add your **bank account** as a recipient
4. Go to **Receive money** → **Get your account details**
5. Wise provides:
   - Account holder name
   - Account number / IBAN
   - Bank name/code (SWIFT/BIC)
6. **Create a payment link:**
   - Go to **Payment links** or **Request money**
   - Create a link for `Bangkok Shambhala Donation`
   - Choose: **any amount** (let supporters decide)
   - Copy the payment link

7. **Update `src/lib/config.ts`** — replace the Wise URL placeholder:
   ```typescript
   url: 'https://wise.com/pay/YOUR_ACTUAL_PAYMENT_LINK',
   ```

### Verification

- [ ] Wise account verified
- [ ] Payment link created and tested (send yourself a small amount)
- [ ] URL updated in `config.ts` and pushed

---

## 11. PromptPay / Thai QR (Local Donations)

**Purpose:** Receive free instant donations from Thai bank accounts.

**You need:** A Thai bank account with PromptPay enabled.

### Steps

1. **Enable PromptPay** on your Thai bank account:
   - Open your banking app (SCB, KBank, Bangkok Bank, etc.)
   - Go to Settings → PromptPay registration
   - Register with your phone number or national ID

2. **Generate a QR code:**
   - In your banking app → **Receive money** → **Show QR**
   - Screenshot the QR code
   - Alternative: Use the Bank of Thailand PromptPay standard QR generator

3. **Save the QR image:**
   - Save as `public/images/promptpay-qr.png`
   - Should be at least 400×400px

4. **Update the QR image path in the code** if the DonateWidget references a different path

5. **Note your PromptPay details** and update `src/lib/config.ts`:
   - Account name
   - PromptPay ID (phone number or ID for display)

### Verification

- [ ] PromptPay registered on bank account
- [ ] QR code image saved to `public/images/`
- [ ] Test: scan with a different bank app (send 1 THB to yourself)
- [ ] Donation page displays QR correctly

---

## 12. n8n (Automation Platform)

**Purpose:** Automated event notifications, weekly digests, broken link monitoring, social copy generation.

**You need:** An email address. Choose cloud or self-hosted.

### Step 12.1 — Choose Deployment

| Option | Cost | Best For |
|--------|------|----------|
| [n8n.cloud](https://n8n.cloud) | Free (5 workflows), then €20/mo | Quick setup, no server management |
| Self-hosted (Docker) | Free + VPS cost (~$5/mo) | Full control, unlimited workflows |

**For n8n.cloud:**
1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create an instance
3. Note your instance URL: `https://your-instance.app.n8n.cloud`

**For self-hosted:**
1. Provision a VPS (DigitalOcean, Hetzner, etc.)
2. Install Docker
3. Run:
   ```bash
   docker run -d --name n8n -p 5678:5678 \
     -v n8n_data:/home/node/.n8n \
     n8nio/n8n
   ```
4. Access at `http://your-server:5678`
5. Set up HTTPS using a reverse proxy (Caddy or nginx)

### Step 12.2 — Import Workflows

1. Open your n8n instance
2. Go to **Workflows** → **Import from file**
3. Import each workflow JSON:
   - `automation/n8n/event-published.json`
   - `automation/n8n/weekly-event-reminder.json`
   - `automation/n8n/broken-link-monitor.json`
   - `automation/n8n/social-copy-generator.json`

### Step 12.3 — Configure Credentials

In n8n, go to **Settings** → **Variables** and add:

| Variable | Value | Used By |
|----------|-------|---------|
| `SITE_URL` | `https://shambhala-bangkok.org` | Weekly reminder, broken link monitor |
| `BREVO_API_KEY` | *(same as Vercel)* | Event published, weekly reminder, broken link |
| `ADMIN_EMAIL` | *(your admin email)* | Broken link monitor alerts |

### Step 12.4 — Configure Webhook Authentication

For the **Event Published** and **Social Copy Generator** webhooks:

1. Open each workflow
2. Click the **Webhook Trigger** node
3. Under Authentication → Header Auth:
   - Header Name: `X-Webhook-Secret`
   - Header Value: *(generate a random secret)*
4. Save the secret — you'll need it to call the webhook from CI/CD or scripts

### Step 12.5 — Activate Workflows

1. Open each imported workflow
2. Toggle the **Active** switch in the top-right corner
3. Verify the cron triggers:
   - Weekly reminder: Monday at 09:00
   - Broken link monitor: Sunday at 03:00

### Step 12.6 — Test Each Workflow

**Event Published:**
```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/event-published \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret" \
  -d '{
    "title": "Test Event",
    "summary": "This is a test",
    "startDate": "2026-03-25T19:00:00+07:00",
    "canonicalUrl": "https://shambhala-bangkok.org/events/test",
    "socialCopyShort": "Join us for a test event!"
  }'
```

**Weekly Reminder:** Click **Execute Workflow** manually in n8n.

**Broken Link Monitor:** Click **Execute Workflow** manually.

### Verification

- [ ] n8n instance running (cloud or self-hosted)
- [ ] All 4 workflows imported
- [ ] Environment variables configured
- [ ] Webhook authentication set up
- [ ] All workflows activated
- [ ] Manual test execution succeeds for each workflow

---

## 13. OpenAI API (Social Copy AI)

**Purpose:** AI-generated social media copy for events (used by n8n social-copy-generator).

**You need:** A credit card for OpenAI billing.

### Steps

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **Settings** → **Billing** → add a payment method
4. Set a monthly spending limit (e.g., $5 — enough for hundreds of generations)
5. Go to **API Keys** → **Create new secret key**
   - Name: `shambhala-n8n`
   - Copy the key immediately

6. **Add to n8n:**
   - Go to n8n → Settings → Variables
   - Add `OPENAI_API_KEY` = *(paste the key)*

> **Cost estimate:** Each social copy generation uses ~500 tokens with `gpt-4o-mini`, costing approximately $0.001. Even 100 events/month costs less than $0.10.

### Verification

- [ ] OpenAI account with billing enabled
- [ ] API key generated and added to n8n
- [ ] Test the Social Copy Generator workflow in n8n

---

## 14. Google Sheets (Social Copy Log)

**Purpose:** Store AI-generated social copy for editorial review before posting.

**You need:** A Google account.

### Steps

1. Go to [sheets.google.com](https://sheets.google.com) → **Create new spreadsheet**
2. Name it: `Bangkok Shambhala — Social Copy`
3. Add column headers in Row 1:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Event Title | Event Date | Facebook | Instagram | WhatsApp | LINE |

4. Note the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`

5. **Create a Service Account** for n8n access:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project: `shambhala-bangkok`
   - Enable the **Google Sheets API**
   - Go to **Credentials** → **Create credentials** → **Service account**
   - Name: `n8n-sheets-writer`
   - Download the JSON key file
   - In the spreadsheet, click **Share** → add the service account email as Editor

6. **Add to n8n:**
   - Create a **Google Sheets** credential in n8n using the service account JSON
   - Or add these as variables:
     - `GOOGLE_SHEET_ID` = *(the spreadsheet ID)*
     - `GOOGLE_ACCESS_TOKEN` = *(service account token)*

### Verification

- [ ] Google Sheet created with correct columns
- [ ] Service account created with Sheets API access
- [ ] Sheet shared with service account email
- [ ] n8n can write to the sheet (test the Social Copy Generator)

---

## 15. Cloudinary (Image CDN) — Optional

**Purpose:** Host and optimize images externally (better performance than Git-stored images).

**You need:** An email address.

### Steps

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier: 25 credits/month)

2. From the Dashboard, note:
   - **Cloud name**
   - **API key**
   - **API secret**

3. **Add to Vercel environment variables:**
   - `CLOUDINARY_CLOUD_NAME` = *(cloud name)*
   - `CLOUDINARY_API_KEY` = *(API key)*
   - `CLOUDINARY_API_SECRET` = *(API secret)*

4. The `next.config.js` already allows Cloudinary images via the `remotePatterns` config

5. **Upload images** via Cloudinary's dashboard or API

> **Note:** Cloudinary is optional. Images stored in `public/images/` or uploaded via Decap CMS work fine for a site this size.

### Verification

- [ ] Cloudinary account created
- [ ] Env vars added to Vercel
- [ ] Test: upload an image, use its URL in a blog post

---

## Final: Environment Variables Summary

After completing all services, your Vercel environment should have:

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your domain | ✅ Yes |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible (Section 5) | ✅ Yes |
| `BREVO_API_KEY` | Brevo (Section 4) | ✅ Yes |
| `BREVO_LIST_ID` | Brevo (Section 4) | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary (Section 15) | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary (Section 15) | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary (Section 15) | Optional |

And your **n8n instance** should have:

| Variable | Source | Required |
|----------|--------|----------|
| `SITE_URL` | Your domain | ✅ Yes |
| `BREVO_API_KEY` | Brevo (Section 4) | ✅ Yes |
| `ADMIN_EMAIL` | Your email | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI (Section 13) | Optional |
| `GOOGLE_SHEET_ID` | Google Sheets (Section 14) | Optional |

---

## Post-Setup Verification

Once all services are configured, run through this final checklist:

- [ ] Site loads at `https://shambhala-bangkok.org`
- [ ] Newsletter signup form works (check email appears in Brevo)
- [ ] Plausible shows real-time visitors
- [ ] Decap CMS login works at `/admin/`
- [ ] Create a test event in CMS → appears on site after rebuild
- [ ] Calendar feed works at `/api/calendar/feed.ics`
- [ ] WhatsApp button opens the correct group
- [ ] LINE button opens the correct group
- [ ] Donation QR code is visible on `/donate`
- [ ] Wise payment link works
- [ ] Google Search Console shows sitemap submitted
- [ ] Google Business Profile is live
- [ ] n8n workflows are active and tested
- [ ] Security headers grade: test at [securityheaders.com](https://securityheaders.com)
- [ ] Performance: test at [pagespeed.web.dev](https://pagespeed.web.dev)

**Congratulations!** 🎉 All services are configured and the Bangkok Shambhala website is fully operational.

---

*Bangkok Shambhala Services Configuration Guide v1.0 — March 2026*
