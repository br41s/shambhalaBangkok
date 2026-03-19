# QA Acceptance Checklist

Use this checklist before every major release or after significant changes.

## Core Functionality

### Homepage
- [ ] Hero section loads with correct title and CTAs
- [ ] Upcoming events section shows next 3 events
- [ ] FAQ accordion opens/closes correctly
- [ ] Community channels section displays WhatsApp and LINE buttons
- [ ] Donation section shows QR and Wise methods
- [ ] Blog section shows latest 3 posts
- [ ] CTA strip renders at bottom
- [ ] All links navigate correctly

### Events
- [ ] Events listing page shows all upcoming events
- [ ] Past events section shows past events
- [ ] Event cards display correct date, modality, pricing badges
- [ ] Event detail pages load with full content
- [ ] "Add to Calendar" button generates valid ICS
- [ ] Google Calendar link opens in new tab with correct data
- [ ] ICS feed at `/api/calendar/feed.ics` returns valid ICS data
- [ ] Event tags filter correctly (if implemented)

### Blog
- [ ] Blog listing shows all published posts
- [ ] Blog cards have image, date, title, excerpt
- [ ] Blog detail pages render Markdown correctly
- [ ] Schema.org BlogPosting data is present in page source

### Community
- [ ] WhatsApp button links to correct group
- [ ] LINE button links to correct group
- [ ] All social channel links work

### Donations
- [ ] Thai QR / PromptPay info displays correctly
- [ ] Wise transfer details display correctly
- [ ] Links open in new tabs

### Location
- [ ] Google Maps embed loads
- [ ] Address displays in English and Thai
- [ ] "Open in Google Maps" link works
- [ ] Transit information is accurate

### About Pages
- [ ] About index links to all sub-pages
- [ ] Shambhala, Vision, Lineage pages load correctly

### Legal Pages
- [ ] Privacy policy loads
- [ ] Terms of use loads
- [ ] Code of conduct loads
- [ ] Content is current and accurate

---

## Navigation & Layout

- [ ] Header renders on all pages
- [ ] Mobile hamburger menu opens/closes
- [ ] All nav links work on desktop
- [ ] All nav links work on mobile
- [ ] Footer renders on all pages
- [ ] Footer links all work
- [ ] Breadcrumbs show correct path on sub-pages
- [ ] 404 page displays for invalid URLs
- [ ] Logo links to homepage

---

## SEO & Metadata

- [ ] Every page has unique `<title>` tag
- [ ] Every page has `<meta name="description">`
- [ ] Open Graph tags present on all pages (og:title, og:description, og:image)
- [ ] JSON-LD Organization schema on homepage
- [ ] JSON-LD Event schema on event detail pages
- [ ] JSON-LD BlogPosting schema on blog posts
- [ ] Breadcrumb schema on all sub-pages
- [ ] `sitemap.xml` returns valid XML with all public URLs
- [ ] `robots.txt` allows crawling of public pages, blocks /api/ and /admin/
- [ ] Canonical URLs are correct

Verify with:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

---

## Performance

- [ ] Lighthouse Performance score > 95
- [ ] Lighthouse Accessibility score > 95
- [ ] Lighthouse Best Practices score > 95
- [ ] Lighthouse SEO score > 95
- [ ] First Contentful Paint < 1.2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] No large unoptimized images (> 200KB)
- [ ] Fonts loaded with `display: swap`

---

## Accessibility (WCAG AA)

- [ ] All images have `alt` text
- [ ] Focusable elements have visible focus indicators
- [ ] Color contrast ratio meets AA standard (4.5:1 for text)
- [ ] Page navigable by keyboard alone
- [ ] Skip to content link present (if applicable)
- [ ] Form inputs have associated labels
- [ ] Error states are announced to screen readers
- [ ] Reduced motion is respected (`prefers-reduced-motion`)
- [ ] Headings follow correct hierarchy (h1 → h2 → h3)
- [ ] ARIA labels on interactive elements

Test with:
- axe DevTools browser extension
- VoiceOver (macOS) / NVDA (Windows)
- Keyboard-only navigation

---

## Security

- [ ] HTTPS enforced
- [ ] Security headers: test at securityheaders.com (target: A+)
- [ ] Newsletter honeypot blocks bots
- [ ] Rate limiting works on newsletter endpoint
- [ ] No sensitive data in client-side code
- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in source code

---

## Cross-Browser & Device Testing

### Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Samsung Internet (latest)

### Devices
- [ ] iPhone SE (small mobile)
- [ ] iPhone 14 (standard mobile)
- [ ] iPad (tablet)
- [ ] Desktop 1080p
- [ ] Desktop 1440p

### Breakpoints
- [ ] Mobile: 320px - 639px
- [ ] Tablet: 640px - 1023px
- [ ] Desktop: 1024px+

---

## API Routes

- [ ] `POST /api/newsletter` — accepts valid email, returns 200
- [ ] `POST /api/newsletter` — rejects invalid email, returns 400
- [ ] `POST /api/newsletter` — honeypot filled → returns 200 (silently ignores)
- [ ] `POST /api/newsletter` — rate limit exceeded → returns 429
- [ ] `GET /api/calendar/feed.ics` — returns valid ICS
- [ ] `GET /api/events/[slug]/ics` — returns valid ICS for specific event
- [ ] `GET /sitemap.xml` — returns valid XML
- [ ] `GET /robots.txt` — returns valid robots.txt

---

## Admin Panel

- [ ] Login page loads at `/admin/login`
- [ ] Login with valid email/password succeeds → redirects to dashboard
- [ ] Login with wrong credentials shows error
- [ ] Dashboard shows stats (events count, posts count)
- [ ] Can create new event from `/admin/events/new`
- [ ] Can edit existing event from `/admin/events/[slug]/edit`
- [ ] Can create new blog post from `/admin/posts/new`
- [ ] Can edit existing blog post from `/admin/posts/[slug]/edit`
- [ ] Saving content triggers GitHub commit
- [ ] Published content appears on site after Vercel rebuild (~1-2 min)
- [ ] Logout works (cookie cleared, redirects to login)
- [ ] Unauthenticated access to `/admin/` redirects to `/admin/login`

### Admin API Routes

- [ ] `POST /api/admin/login` — valid credentials → sets session cookie
- [ ] `POST /api/admin/login` — invalid credentials → returns 401
- [ ] `POST /api/admin/logout` — clears session cookie
- [ ] `POST /api/admin/content` — creates Markdown file in GitHub repo
- [ ] `DELETE /api/admin/content` — removes file from GitHub repo
- [ ] All admin API routes reject unauthenticated requests

---

## Legacy Migration

- [ ] `/programs/meditation-in-everyday-life/` → redirects to `/events`
- [ ] `/teachings/` → redirects to `/learn/meditation`
- [ ] `/community-2/` → redirects to `/community`
- [ ] `/about/` → redirects to `/about`
- [ ] `/contact/` → redirects to `/contact`
- [ ] `/support-us/` → redirects to `/donate`

---

## Sign-Off

| Role | Name | Date | Status |
|---|---|---|---|
| Developer | | | |
| Content Lead | | | |
| Community Manager | | | |
