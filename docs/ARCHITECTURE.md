# Architecture

## Overview

Bangkok Shambhala is a static-first Next.js application with selective server-side rendering and API routes. The architecture prioritizes speed, simplicity, and maintainability by a small non-technical team.

## Design Decisions

### Why Next.js App Router?
- **Static generation** for content pages = fastest possible load times
- **Server components** = smaller client bundles
- **API routes** = newsletter signup, ICS generation, admin auth without external servers
- **Vercel hosting** = zero-config deployment with CDN

### Why Markdown + Custom Admin?
- Content lives in Git → version history, no vendor lock-in
- Custom admin panel at `/admin/` with email/password login
- Editors create/edit content through forms with a Markdown editor toolbar
- Changes are committed to GitHub via API → Vercel rebuilds automatically
- No database to maintain or scale

### Why NOT a database?
- < 100 events/year → Markdown files are sufficient
- Single admin account → no complex user management needed
- Donations via external payment links → no transaction processing
- Community channels are external (WhatsApp, LINE) → no chat integration

## Content Flow

```
Editor logs in at /admin/login
  ↓
Admin panel (email/password auth)
  ↓
Creates/edits event or post via forms
  ↓
GitHub API commits Markdown file
  ↓
Vercel build trigger
  ↓
Static pages generated
  ↓
CDN serves worldwide
```

## Admin Panel Architecture

```
/admin/login        → Email/password + optional Turnstile captcha
/admin/             → Dashboard (stats, quick actions, recent content)
/admin/events       → Events list with Edit/New links
/admin/events/new   → EventForm component → POST /api/admin/content
/admin/events/[slug]/edit → EventForm pre-filled → POST /api/admin/content
/admin/posts        → Posts list with Edit/New links
/admin/posts/new    → PostForm component → POST /api/admin/content
/admin/posts/[slug]/edit  → PostForm pre-filled → POST /api/admin/content
```

### Authentication Flow
1. User submits email + password (+ optional Turnstile token)
2. Server verifies credentials against `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars
3. If valid, creates HMAC-SHA256 signed session token (24h expiry)
4. Token stored in HTTP-only secure cookie (`admin_session`)
5. All admin pages call `requireAuth()` which validates the cookie or redirects to login

### Content CRUD Flow
1. Admin fills form → client POSTs JSON to `/api/admin/content`
2. API route verifies session cookie
3. Builds Markdown file with YAML frontmatter (via `gray-matter`)
4. Sends to GitHub Contents API (Base64-encoded, with SHA for updates)
5. GitHub commit triggers Vercel rebuild (~1-2 minutes)

## Directory Architecture

```
src/
├── app/                 # Routes (file-system based)
│   ├── layout.tsx       # Root layout (Header, Footer, fonts, analytics)
│   ├── page.tsx         # Homepage
│   ├── events/          # Events listing & detail
│   ├── blog/            # Blog listing & detail
│   ├── about/           # Institutional pages
│   ├── admin/           # Custom admin panel
│   │   ├── login/       # Email/password login page
│   │   ├── events/      # Event list, new, edit
│   │   └── posts/       # Post list, new, edit
│   └── api/             # Server-side API routes
│       └── admin/       # Auth + content CRUD endpoints
├── components/
│   ├── admin/           # EventForm, PostForm, MarkdownEditor, LogoutButton
│   ├── layout/          # Header, Footer (used in root layout)
│   └── ui/              # Reusable presentational components
│                          # Includes BookList (bibliography), SectionTabs (blog sections)
└── lib/
    ├── types.ts         # All TypeScript interfaces (incl. BlogSection union type)
    ├── config.ts        # Site configuration & navigation
    ├── auth.ts          # Session management (HMAC-signed cookies)
    ├── github.ts        # GitHub API client (content CRUD)
    ├── content.ts       # File-system content reader (gray-matter)
    ├── markdown.ts      # Markdown → HTML conversion (remark)
    ├── events.ts        # Event data access functions
    ├── blog.ts          # Blog data access (incl. section filtering)
    ├── books-data.ts    # Bibliography: Book interface + 29 book entries
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

### Blog Sections
Blog posts can belong to one of five sections via a `section` field in frontmatter:

| Section | Slug | Description |
|---------|------|-------------|
| Shambhala Vision | `shambhala-vision` | Core teachings and philosophy |
| What We Offer | `what-we-offer` | Programs and activities |
| Bibliography | `bibliography` | Recommended reading list |
| Resources | `resources` | Practice resources and links |
| Membership | `membership` | Community membership info |

- **SectionTabs** (`components/ui/SectionTabs.tsx`) renders horizontal tab pills on the blog listing page
- `blog.ts` provides `getPostsBySection()` for filtered queries
- The `BlogSection` union type is defined in `types.ts`

### Bibliography (Special Rendering)
The bibliography section has custom rendering instead of raw Markdown HTML:

1. `books-data.ts` exports a `Book[]` array with 29 entries (title, author, cover image path, short text, optional extended text)
2. `BookList.tsx` (client component) renders each book with:
   - Cover thumbnail on the left (`public/images/books/`)
   - Title, author, and description on the right
   - "Show more" / "Show less" toggle for books with extended text (CSS `max-h` transition)
3. `[slug]/page.tsx` detects `slug === 'bibliography'` and renders `<BookList>` instead of `dangerouslySetInnerHTML`

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

### Admin Authentication
- Email/password login verified against environment variables
- HMAC-SHA256 signed session tokens with 24-hour expiry
- HTTP-only secure cookie for session storage
- Timing-safe comparison to prevent timing attacks
- Optional Cloudflare Turnstile captcha on login
- All admin pages protected by `requireAuth()` middleware

### API Protection
- Admin API routes verify session cookie before processing
- GitHub API calls authenticated via personal access token
- Rate limiting on newsletter endpoint (5 requests/minute per IP)
- Honeypot field for bot detection
- CORS controlled by Next.js defaults

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
