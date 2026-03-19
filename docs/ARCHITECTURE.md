# Architecture

## Overview

Bangkok Shambhala is a static-first Next.js application with selective server-side rendering and API routes. The architecture prioritizes speed, simplicity, and maintainability by a small non-technical team.

## Design Decisions

### Why Next.js App Router?
- **Static generation** for content pages = fastest possible load times
- **Server components** = smaller client bundles
- **API routes** = newsletter signup, ICS generation without external servers
- **Vercel hosting** = zero-config deployment with CDN

### Why Markdown CMS (Decap)?
- Content lives in Git → version history, no vendor lock-in
- Non-technical editors get a visual UI at `/admin/`
- No database to maintain or scale
- Free tier covers all needs

### Why NOT a database?
- < 100 events/year → Markdown files are sufficient
- No user accounts → no auth system needed
- Donations via external payment links → no transaction processing
- Community channels are external (WhatsApp, LINE) → no chat integration

## Content Flow

```
Editor writes content
  ↓
Decap CMS UI (/admin/)
  ↓
Git commit (Markdown files)
  ↓
Vercel build trigger
  ↓
Static pages generated
  ↓
CDN serves worldwide
  ↓
n8n webhook fires (optional)
  ↓
Newsletter + social notifications
```

## Directory Architecture

```
src/
├── app/                 # Routes (file-system based)
│   ├── layout.tsx       # Root layout (Header, Footer, fonts, analytics)
│   ├── page.tsx         # Homepage
│   ├── events/          # Events listing & detail
│   ├── blog/            # Blog listing & detail
│   ├── about/           # Institutional pages
│   ├── admin/           # Internal admin dashboard
│   └── api/             # Server-side API routes
├── components/
│   ├── layout/          # Header, Footer (used in root layout)
│   └── ui/              # Reusable presentational components
└── lib/
    ├── types.ts         # All TypeScript interfaces
    ├── config.ts        # Site configuration & navigation
    ├── content.ts       # File-system content reader (gray-matter)
    ├── markdown.ts      # Markdown → HTML conversion (remark)
    ├── events.ts        # Event data access functions
    ├── blog.ts          # Blog data access functions
    ├── calendar.ts      # ICS generation
    ├── schema.ts        # Schema.org JSON-LD generators
    └── utils.ts         # Shared utilities (formatting, slugify)
```

## Data Layer

### Content Reading
All content is read from `content/` directory at build time using Node.js `fs` module:

1. `content.ts` provides generic `getAllContent()` and `getContentBySlug()`
2. `events.ts` wraps content reader with event-specific filtering & sorting
3. `blog.ts` wraps content reader with blog-specific sorting

### Schema.org
Every page includes structured data via JSON-LD:
- Organization (global)
- LocalBusiness (location pages)
- Event (event details)
- BlogPosting (blog posts)
- BreadcrumbList (all pages)
- FAQPage (FAQ sections)

### Markdown Processing
Content stored as Markdown is converted to sanitized HTML at build time:

1. Raw Markdown files are read from `content/` by `content.ts` (with gray-matter for frontmatter)
2. `markdown.ts` converts the Markdown body to HTML using `remark` + `remark-html` (sanitized)
3. `events.ts` and `blog.ts` call `markdownToHtml()` before returning content
4. Pages render the HTML via `dangerouslySetInnerHTML` inside Tailwind `prose` containers

### Client-Side Features
- **Google Translate** (`GoogleTranslate.tsx`): Auto-translate widget via Google's free Translate API, floating bottom-right
- **Analytics**: Plausible (privacy-first, no cookies)
- **Timezone**: All dates/times formatted in Asia/Bangkok (GMT+7) via `Intl.DateTimeFormat`

## Security Architecture

### Headers (next.config.js)
- Content-Security-Policy (strict)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (restricted)

### API Protection
- Rate limiting on newsletter endpoint (5 requests/minute per IP)
- Honeypot field for bot detection
- CORS controlled by Next.js defaults

### No Authentication Required
- Admin panel is informational only (links to Decap CMS)
- Decap CMS handles its own auth via Git gateway
- No user accounts in the system

## Performance Budget

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Bundle size (JS) | < 100KB gzipped |
| Lighthouse score | > 95 |

## Hosting Architecture

```
[User Browser]
     ↓
[Vercel CDN Edge]
     ↓
[Static HTML/CSS/JS]    ←  Build output
     ↓
[API Routes]            ←  Serverless functions
     ↓
[n8n Automation]        ←  External (self-hosted or cloud)
     ↓
[Brevo / WhatsApp / LINE]  ←  Notification channels
```

## Future Considerations

- **v1.1**: Multi-language support (EN/TH) via Next.js i18n routing (Google Translate widget deployed as interim solution)
- **v2**: Event registration with payment integration (PromptPay QR)
- **v2**: Teacher/facilitator profiles with dedicated pages
- See [ROADMAP.md](ROADMAP.md) for full timeline
