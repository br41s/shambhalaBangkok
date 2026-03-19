# Roadmap

## v1.0 — Launch (Current)

Core website with all essential features.

### Delivered
- [x] Modern responsive design (mobile-first)
- [x] Events system with ICS calendar support
- [x] Blog / news section
- [x] Community channels integration (WhatsApp, LINE)
- [x] Donation page (Thai QR, Wise)
- [x] Location page with Google Maps
- [x] Learn / meditation introduction
- [x] About pages (Shambhala, Vision, Lineage)
- [x] SEO optimization (Schema.org, Open Graph, sitemap)
- [x] Security headers (CSP, HSTS, X-Frame-Options)
- [x] Decap CMS for content management
- [x] Admin dashboard
- [x] Newsletter signup with anti-spam
- [x] n8n automation workflows
- [x] Privacy policy (PDPA compliant)
- [x] Legacy URL redirects
- [x] Accessibility (WCAG AA baseline)

---

## v1.1 — Polish & Engagement (1-2 months post-launch)

Focus on user engagement and content optimization.

### Planned
- [ ] **Image optimization**: Next.js Image component with automatic WebP conversion
- [ ] **Event reminders**: "Remind me" button → saves to personal calendar
- [ ] **Event series**: Link recurring events (e.g., all Wednesday sessions)
- [ ] **Social sharing buttons**: Share event/blog pages to platforms
- [ ] **Reading time**: Calculate and display reading time on blog posts
- [ ] **Related posts**: Show related blog posts based on tags
- [ ] **Announcement banner**: Dynamic site-wide banners for urgent messages
- [ ] **Contact form**: Server-side form on contact page
- [ ] **Improved analytics**: Event tracking for button clicks, downloads
- [ ] **Performance audit**: Optimize bundle size, image loading, fonts
- [ ] **Thai language basics**: Key phrases and UI labels in Thai

---

## v1.2 — Multi-language Support (3-4 months post-launch)

### Planned
- [ ] **i18n routing**: `/en/` and `/th/` URL prefixes
- [ ] **Thai translation**: Full Thai translation of all pages
- [ ] **Language switcher**: Header toggle between EN/TH
- [ ] **CMS support**: Bilingual content editing in Decap CMS
- [ ] **SEO**: `hreflang` tags for language variants
- [ ] **RTL-aware layout**: Thai doesn't need RTL but ensure proper spacing

---

## v2.0 — Interactive Features (6-12 months post-launch)

Major feature additions requiring more infrastructure.

### Planned
- [ ] **Event registration**: In-app RSVP / registration (no external links)
- [ ] **Payment integration**: PromptPay QR code generation for paid events
- [ ] **Teacher/Facilitator profiles**: Dedicated pages with bio, photo, upcoming events
- [ ] **Photo gallery**: Event photos organized by date/event
- [ ] **Resource library**: Downloadable PDFs, guided meditation audio
- [ ] **Calendar view**: Monthly calendar visualization of events
- [ ] **Search**: Full-text search across events and blog posts
- [ ] **Comments**: Moderated blog comments (optional)
- [ ] **Push notifications**: Web push for event reminders

---

## v2.1 — Community Platform (12+ months)

### Exploratory
- [ ] **Member area**: Simple login for community members
- [ ] **Event history**: Personal history of attended events
- [ ] **Discussion board**: Community discussion space (or move to Discord)
- [ ] **Volunteer coordination**: Sign-up for volunteer activities
- [ ] **Recurring donations**: Monthly donation subscription

---

## Non-Goals

These will NOT be built to keep the project focused:

- ❌ E-commerce / shop
- ❌ Full social network features
- ❌ Video streaming platform
- ❌ Mobile native app (PWA is sufficient)
- ❌ Custom email server
- ❌ User-generated content platform

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2025-01 | Next.js over WordPress | Performance, developer experience, modern stack |
| 2025-01 | Markdown over database | Simplicity, Git versioning, no server costs |
| 2025-01 | No user accounts | External community channels (WhatsApp/LINE) handle membership |
| 2025-01 | Plausible over Google Analytics | Privacy-first, GDPR/PDPA compliance |
| 2025-01 | Brevo for email | Free tier covers needs, GDPR compliant |
| 2025-01 | Tailwind v4 | Latest version, simpler configuration |
