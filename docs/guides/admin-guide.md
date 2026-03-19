---
stylesheet: null
body_class: guide
css: |-
  @page { margin: 2cm; size: A4; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a1a; line-height: 1.7; font-size: 11pt; }
  h1 { color: #2563EB; font-size: 28pt; margin-top: 0; padding-bottom: 8px; border-bottom: 3px solid #2563EB; }
  h2 { color: #2563EB; font-size: 18pt; margin-top: 32px; padding-bottom: 4px; border-bottom: 1px solid #ddd; page-break-after: avoid; }
  h3 { color: #1e40af; font-size: 13pt; margin-top: 20px; page-break-after: avoid; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10pt; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 9.5pt; page-break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10pt; page-break-inside: avoid; }
  th { background: #2563EB; color: white; padding: 10px 12px; text-align: left; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) { background: #f8fafc; }
  blockquote { border-left: 4px solid #F59E0B; background: #fffbeb; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  .cover { text-align: center; padding: 120px 0 80px; page-break-after: always; }
  .cover h1 { border: none; font-size: 36pt; }
  .cover p { font-size: 14pt; color: #64748b; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
  ul, ol { padding-left: 24px; }
  li { margin-bottom: 4px; }
  img { max-width: 100%; border-radius: 8px; }
  .step { background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; page-break-inside: avoid; }
---

<div class="cover">

# Shambhala Bangkok

# Admin Walkthrough Guide

Website Administration Manual

Version 1.0 — March 2026

</div>

## 1. Introduction

Welcome to the Shambhala Bangkok website administration guide. This document walks you through every aspect of managing the site, from creating events to publishing blog posts and monitoring site health.

**Who is this guide for?**
- Community coordinators who manage events
- Content editors who write blog posts
- Site administrators who oversee the website

**What you'll need:**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Your CMS login credentials (provided by the site administrator)
- Access to the GitHub repository (for advanced operations)

---

## 2. Accessing the Admin Area

### 2.1 Admin Dashboard

The internal admin dashboard provides a quick overview of your content:

1. Open your browser
2. Navigate to `https://shambhala-bangkok.org/admin-dashboard`
3. You'll see:
   - **Stats tiles** — total events, blog posts, and pages
   - **Quick actions** — links to create new content or open the CMS
   - **Upcoming events** — next scheduled events
   - **Recent posts** — latest blog articles

> **Note:** The admin dashboard is informational. To create or edit content, use the Decap CMS.

### 2.2 Decap CMS (Content Editor)

The visual content editor is where you create and manage all content:

1. Navigate to `https://shambhala-bangkok.org/admin/`
2. Click **Login with GitHub** (or your configured auth provider)
3. Authorize the application if prompted
4. You'll see the **Content Manager** with collections:
   - **Events** — meditation sessions, workshops, retreats
   - **Blog** — articles, announcements, reflections
   - **Pages** — static page content

---

## 3. Managing Events

### 3.1 Creating a New Event

1. In Decap CMS, click **Events** in the sidebar
2. Click the **New Event** button
3. Fill in the required fields:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Event name (e.g., "Wednesday Evening Meditation") |
| Slug | Yes | URL path — auto-generated from title |
| Start Date | Yes | Event start with time (Bangkok timezone GMT+7) |
| End Date | Yes | Event end with time |
| Summary | Yes | 1-2 sentences for event cards and search results |
| Body | Yes | Full description in Markdown |
| Modality | Yes | `in-person`, `online`, or `hybrid` |
| Pricing | Yes | `free`, `donation`, or `paid` |
| Status | Yes | `upcoming`, `cancelled`, or `past` |

**Optional fields:**

| Field | Description |
|-------|-------------|
| Tags | Categories: meditation, workshop, retreat, online, etc. |
| Featured Image | Upload or provide URL for the event banner |
| Registration URL | External link (Meetup, Google Form) |
| Max Participants | Capacity limit (leave empty for unlimited) |
| Facilitator Name | Who leads the session |
| Facilitator Bio | Short bio of the facilitator |
| Location Override | If different from default (Young Place Building) |
| Price Amount | Numeric amount for paid events |
| Price Currency | THB, USD, EUR |

4. Preview your content in the right panel
5. Click **Publish** to make it live

> **Important:** After publishing, the site rebuilds automatically. Changes appear within 1-2 minutes.

### 3.2 Event Lifecycle

Follow this workflow for every event:

```
CREATE event (status: upcoming)
    ↓
EVENT HAPPENS
    ↓
UPDATE status to "past"
    ↓
(Optional) Add recap or photos to the body
```

**Cancelling an event:**
1. Open the event
2. Change Status to `cancelled`
3. Add a notice at the top of the body: `> **This event has been cancelled.**`
4. Publish

### 3.3 Recurring Events

For weekly sessions (e.g., Wednesday Meditation):

1. Create one event per session date
2. Use a consistent naming convention: `Wednesday Evening Meditation — March 25`
3. Keep the same slug prefix: `wednesday-evening-meditation-2026-03-25`
4. Copy the previous week's event and update the date

> **Tip:** Create events at least 2 weeks in advance so they appear in the weekly digest.

### 3.4 Event Calendar Feed

The site automatically generates an ICS calendar feed at:
- **All events:** `/api/calendar/feed.ics`
- **Single event:** `/api/events/[slug]/ics`

Users can subscribe to the feed in Google Calendar, Apple Calendar, or Outlook. No action needed from you — this is fully automatic.

---

## 4. Managing Blog Posts

### 4.1 Creating a New Post

1. In Decap CMS, click **Blog** in the sidebar
2. Click **New Blog Post**
3. Fill in the fields:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Article headline |
| Slug | Yes | URL path (auto-generated) |
| Date | Yes | Publication date |
| Author | Yes | Author name |
| Excerpt | Yes | 2-3 sentence summary for cards |
| Body | Yes | Full article in Markdown |
| Tags | No | Categories for organization |
| Featured Image | No | Header image |

4. Click **Publish**

### 4.2 Writing Best Practices

- **Keep paragraphs short** — 2-3 sentences for easy scanning
- **Use headings** (`## Heading`) to break up long articles
- **Target 300-800 words** per post
- **Include a call to action** — link to an upcoming event or community channel
- **Add images** to increase engagement
- **Use internal links** when referencing events or other pages

### 4.3 Markdown Quick Reference

```markdown
## Heading 2
### Heading 3

**Bold text** and *italic text*

[Link text](https://example.com)

![Image description](image-url.jpg)

- Bullet point
- Another point

1. Numbered list
2. Second item

> Blockquote — great for callouts or quotes
```

### 4.4 Content Calendar

Suggested publishing schedule:

| Day | Content Type | Example |
|-----|-------------|---------|
| Monday | Weekly preview | "This Week at Shambhala Bangkok" |
| Wednesday | Post-session update | Recap + reflection |
| Friday | Weekend preview | Upcoming workshop details |
| 1st of month | Monthly newsletter | Events digest + community news |

---

## 5. Managing Images

### 5.1 Image Guidelines

| Aspect | Recommendation |
|--------|---------------|
| Format | WebP or JPEG (photos), PNG (graphics) |
| Max width | 1200px |
| Max file size | 200KB |
| Naming | Descriptive: `wednesday-meditation-group.jpg` |
| Alt text | Always describe the image content |

### 5.2 Uploading Images

1. In the CMS editor, click the **+** button or image icon
2. Choose **Upload** to select from your computer
3. Add descriptive **alt text** (required for accessibility)
4. The image is stored in the Git repository

> **Tip:** Compress images before uploading using [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com).

---

## 6. Newsletter Management

### 6.1 How Signups Work

1. Visitors enter their email in the newsletter form (footer or dedicated section)
2. The form includes a hidden **honeypot field** to block bots
3. A **rate limiter** prevents abuse (max 5 signups/minute per IP)
4. Valid emails are forwarded to **Brevo** (your email service)

### 6.2 Managing Subscribers in Brevo

1. Log in to [app.brevo.com](https://app.brevo.com)
2. Go to **Contacts** to see all subscribers
3. Create **segments** for targeted campaigns
4. Send newsletters using Brevo's email editor

### 6.3 Unsubscribe Handling

Brevo automatically adds an unsubscribe link to every email. This is required by law (PDPA in Thailand, GDPR in Europe).

---

## 7. Automation (n8n)

### 7.1 Available Workflows

The site includes 4 pre-built n8n automation workflows:

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| Event Published | Webhook | Sends newsletter + prepares social copy |
| Weekly Reminder | Monday 9:00 AM | Sends weekly event digest to WhatsApp + email |
| Broken Link Monitor | Sunday 3:00 AM | Checks all URLs, emails alert if any are broken |
| Social Copy Generator | Webhook | Uses AI to generate Facebook/Instagram/WhatsApp/LINE copy |

### 7.2 Setting Up n8n

1. Install n8n (self-hosted or [n8n.cloud](https://n8n.cloud))
2. Import workflow JSON files from `/automation/n8n/`
3. Configure credentials (Brevo API key, OpenAI key, etc.)
4. Activate the workflows

### 7.3 Monitoring

- Check n8n's **Execution History** weekly for failed runs
- Review the broken link report if you receive an alert email
- Test the event published webhook after deploying changes

---

## 8. SEO Management

### 8.1 What's Automatic

The site handles these SEO aspects automatically:

- **Schema.org** structured data on every page
- **Open Graph** tags for social sharing
- **Sitemap** at `/sitemap.xml` (auto-generated)
- **Robots.txt** at `/robots.txt`
- **Canonical URLs**
- **Breadcrumb** structured data

### 8.2 What You Control

When creating content, optimize these fields:

| Field | SEO Impact | Tips |
|-------|-----------|------|
| Title | High | Include keywords: "Meditation Workshop Bangkok" |
| Summary/Excerpt | High | This appears in Google search results |
| Body headings | Medium | Use `##` and `###` for structure |
| Alt text | Medium | Describe images for search engines |
| Tags | Low | Helps internal categorization |

### 8.3 Google Search Console

1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for `shambhala-bangkok.org`
3. Submit sitemap: `https://shambhala-bangkok.org/sitemap.xml`
4. Monitor for crawl errors weekly

---

## 9. Site Monitoring

### 9.1 Regular Checks

**Weekly:**
- [ ] Check site loads correctly
- [ ] Review Plausible analytics at [plausible.io](https://plausible.io)
- [ ] Update event statuses (mark past events)

**Monthly:**
- [ ] Check Google Search Console for errors
- [ ] Review newsletter subscriber count in Brevo
- [ ] Run Lighthouse audit (Chrome DevTools → Lighthouse tab)

**Quarterly:**
- [ ] Review and rotate API keys
- [ ] Update dependencies (coordinate with developer)
- [ ] Full QA pass (see QA Checklist in repository)

### 9.2 Vercel Dashboard

Your hosting dashboard at [vercel.com](https://vercel.com) shows:
- **Deployments** — build history and status
- **Analytics** — Web Vitals performance data
- **Logs** — API route execution logs
- **Domains** — custom domain configuration

---

## 10. Troubleshooting

| Problem | Solution |
|---------|----------|
| Changes don't appear after publishing | Wait 1-2 min for rebuild. Check Vercel dashboard for build errors. |
| CMS login fails | Clear browser cache. Try incognito mode. Verify GitHub access. |
| Images don't load | Check file size (< 5MB). Verify the image URL is correct. |
| Event not on homepage | Verify status is `upcoming` and date is in the future. |
| Newsletter signup fails | Check Brevo API key in Vercel env vars. Check API logs. |
| 404 errors for old URLs | Add a redirect in `next.config.js` (developer task). |
| Site down | Check [status.vercel.com](https://status.vercel.com). Rollback in Vercel if recent deploy broke it. |
| Slow page load | Run Lighthouse audit. Check for large images. Contact developer. |

---

## 11. Security Reminders

- **Never share** CMS credentials publicly
- **Never commit** API keys to the repository
- **Review** editor access quarterly — remove departed members
- **Rotate** API keys (Brevo, n8n) every 3-6 months
- **Report** any suspicious activity to the site administrator immediately

---

## 12. Getting Help

| Type of Help | Contact |
|-------------|---------|
| Content questions | Community coordinator |
| Technical issues | Site developer |
| CMS access | Site administrator |
| Brevo / newsletters | Site administrator |
| n8n automations | Site developer |

---

*Shambhala Bangkok Admin Guide v1.0 — March 2026*
*For the latest version, check the repository at `/docs/guides/`*
