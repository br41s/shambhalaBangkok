# Content Migration Matrix

Migration plan from the legacy site at `https://bangkok.shambhala.info/` to the new site.

## URL Mapping

### Automatic Redirects (configured in next.config.js)

| Legacy URL | New URL | Status |
|---|---|---|
| `/programs/meditation-in-everyday-life/` | `/events` | 301 Redirect |
| `/teachings/` | `/learn/meditation` | 301 Redirect |
| `/community-2/` | `/community` | 301 Redirect |
| `/about/` | `/about` | 301 Redirect |
| `/contact/` | `/contact` | 301 Redirect |
| `/support-us/` | `/donate` | 301 Redirect |

### Page-by-Page Migration

| Legacy Page | Content Status | New Location | Notes |
|---|---|---|---|
| Homepage | Rewritten | `/` | New design, modern content |
| Programs listing | Rewritten | `/events` | Now events-based |
| Individual program pages | Migrated | `/events/[slug]` | Convert to event format |
| About page | Rewritten | `/about` | Split into sub-pages |
| About Shambhala | Rewritten | `/about/shambhala` | New content |
| Vision/Mission | Rewritten | `/about/vision` | New content |
| Teachers/Lineage | Rewritten | `/about/lineage` | New content |
| Community page | Rewritten | `/community` | Focus on WhatsApp/LINE |
| Contact | Rewritten | `/contact` | Updated info |
| Support/Donate | Rewritten | `/donate` | Thai QR + Wise |
| Blog (if any) | Migrated | `/blog` | Convert posts to Markdown |

### New Pages (no legacy equivalent)

| New Page | Purpose |
|---|---|
| `/learn/meditation` | Introduction to meditation practice |
| `/location` | Dedicated location page with map |
| `/resources` | External reading & practice resources |
| `/privacy` | PDPA privacy policy |
| `/terms` | Terms of use |
| `/code-of-conduct` | Community guidelines |
| `/blog` | Blog/news section |

---

## Content Migration Steps

### Phase 1: Content Audit (Before Migration)

1. **Crawl legacy site**: Use a tool like Screaming Frog or `wget --mirror` to get full site structure
2. **Identify all content pages**: List every URL with content worth preserving
3. **Prioritize**: Mark each page as:
   - ✅ **Migrate** — content is still relevant
   - ✏️ **Rewrite** — concept is relevant but content needs updating
   - ❌ **Deprecate** — no longer needed
4. **Download media**: Save all images and documents from the legacy site

### Phase 2: Content Transfer

1. **Events**: Convert legacy program pages to Markdown event files in `content/events/`
2. **Blog posts**: Convert any existing blog content to Markdown in `content/blog/`
3. **Images**: Optimize and place in `public/images/`
4. **Static pages**: Content is embedded in page components (manual update)

### Phase 3: Redirect Configuration

All redirects are configured in `next.config.js`:

```javascript
async redirects() {
  return [
    { source: '/legacy-url/', destination: '/new-url', permanent: true },
    // Add more as discovered
  ];
}
```

### Phase 4: DNS Cutover

1. Update DNS to point to new hosting (Vercel)
2. Legacy site serves redirects during transition
3. Monitor 404 logs for missed redirects
4. Add additional redirects as needed

---

## SEO Migration Checklist

- [ ] All legacy URLs redirect (301) to new equivalents
- [ ] New sitemap submitted to Google Search Console
- [ ] Google Search Console: "Change of Address" tool used (if domain changes)
- [ ] Monitor Search Console for crawl errors after launch
- [ ] Check indexed pages in Google: `site:shambhala-bangkok.org`
- [ ] Verify no duplicate content between old and new sites
- [ ] Update all external links pointing to legacy site (social profiles, directories)
- [ ] Set up 404 monitoring to catch missed redirects

---

## External Profile Updates

After migration, update the URL on these platforms:

| Platform | Profile URL | Status |
|---|---|---|
| Google Business Profile | Update website URL | ⬜ |
| Facebook Page | Update website link | ⬜ |
| Instagram Bio | Update link | ⬜ |
| Meetup Group | Update website | ⬜ |
| LINE Official Account | Update rich menu links | ⬜ |
| Shambhala International | Request directory update | ⬜ |
| Google Maps | Update website in listing | ⬜ |

---

## Rollback Plan

If critical issues are discovered after migration:

1. Revert DNS to point back to legacy hosting
2. Fix issues on new site
3. Re-deploy and switch DNS again
4. Keep legacy site running for at least 30 days after successful migration
