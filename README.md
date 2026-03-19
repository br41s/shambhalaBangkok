# Shambhala Bangkok Website

Modern, fast, community-focused website for [Shambhala Bangkok](https://shambalabangkok.vercel.app) — a non-profit meditation community in the heart of Bangkok.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| CMS | Decap CMS (Git-based) |
| Hosting | Vercel (shambalabangkok.vercel.app) |
| Analytics | Plausible (privacy-first) |
| Email | Brevo (Sendinblue) |
| Automation | n8n |
| Translation | Google Translate (auto-detect) |
| Markdown | remark + remark-html |

## Key Features

- **Markdown → HTML**: Content files processed at build time via `remark` + `remark-html`
- **Auto-translation**: Google Translate widget auto-detects browser language
- **Bangkok timezone**: All dates/times display in Asia/Bangkok (GMT+7)
- **SVG logo**: Custom brand logo served from `/public/images/logo.svg`
- **Static-first**: All pages pre-rendered at build time for maximum speed
- **Calendar integration**: ICS feed and per-event calendar downloads

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shambhala-bangkok/website.git
cd website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
shambala-bangkok/
├── automation/n8n/       # n8n workflow templates
├── content/
│   ├── blog/             # Blog posts (Markdown)
│   └── events/           # Events (Markdown)
├── docs/                 # Documentation
├── public/
│   └── admin/            # Decap CMS entry point
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── about/        # About pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── events/       # Event pages
│   │   └── ...           # Other routes
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   └── ui/           # Reusable components
│   └── lib/              # Data layer, utilities, types
└── package.json
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3000 |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |

## Content Management

Content is stored as Markdown files in the `content/` directory and managed via Decap CMS.

### Adding an Event

1. Go to `/admin/` on the deployed site
2. Click "Events" → "New Event"
3. Fill in the fields and publish

Or create a Markdown file in `content/events/`:

```markdown
---
title: "Wednesday Evening Meditation"
slug: "wednesday-evening-meditation"
startDate: "2025-01-15T19:00:00+07:00"
endDate: "2025-01-15T20:30:00+07:00"
modality: "in-person"
pricing: "free"
status: "upcoming"
summary: "Weekly open meditation session."
---

Full description here in Markdown.
```

### Adding a Blog Post

Create a Markdown file in `content/blog/`:

```markdown
---
title: "Welcome to Our New Website"
slug: "welcome-new-website"
date: "2025-01-01"
author: "Shambhala Bangkok"
tags: ["community", "announcement"]
excerpt: "Short description for cards."
---

Full article content here.
```

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## Documentation

| Document | Description |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture & design decisions |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment guide (Vercel, Cloudflare) |
| [EDITORIAL.md](docs/EDITORIAL.md) | Content editing guide for editors |
| [SECURITY.md](docs/SECURITY.md) | Security configuration & policies |
| [QA-CHECKLIST.md](docs/QA-CHECKLIST.md) | QA acceptance checklist |
| [MIGRATION.md](docs/MIGRATION.md) | URL migration from legacy site |
| [ROADMAP.md](docs/ROADMAP.md) | Feature roadmap (v1 → v2) |
| [MAINTENANCE.md](docs/MAINTENANCE.md) | Ongoing maintenance plan |

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Public URL of the site |
| `NEXT_PUBLIC_GA_ID` | No | Plausible domain |
| `BREVO_API_KEY` | No | Brevo API for newsletters |
| `WEBHOOK_SECRET` | No | Secret for n8n webhooks |

## License

This project is maintained by Shambhala Bangkok. All rights reserved.
