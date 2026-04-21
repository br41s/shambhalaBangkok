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

# Bangkok Shambhala

# Admin Walkthrough Guide

Website Administration Manual

Version 1.0 — March 2026

</div>

## 1. Introduction

Welcome to the Bangkok Shambhala website administration guide. This document walks you through every aspect of managing the site, from creating events to publishing blog posts and monitoring site health.

**Who is this guide for?**

- Community coordinators who manage events
- Content editors who write blog posts
- Site administrators who oversee the website

**What you'll need:**

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Your admin login credentials (email and password, configured by the site administrator)

---

## 2. Accessing the Admin Area

### 2.1 Logging In

1. Open your browser
2. Navigate to `https://shambhala-bangkok.org/admin/login`
3. Enter your **email** and **password**
4. If captcha is enabled, complete the Cloudflare Turnstile challenge
5. Click **Sign In**

> **Note:** Your session lasts 24 hours. After that, you'll need to log in again.

### 2.2 Admin Dashboard

After logging in, you'll see the dashboard at `/admin/`:

- **Stats tiles** — total events, blog posts
- **Quick actions** — links to create new events or posts
- **Upcoming events** — next scheduled events
- **Recent posts** — latest blog articles

### 2.3 Navigation

The admin sidebar includes:

- **Dashboard** — overview and quick actions
- **Events** — list all events, create new, edit existing
- **Posts** — list all blog posts, create new, edit existing
- **View Site** — open the public website
- **Logout** — end your session

---

## 3. Managing Events

### 3.1 Creating a New Event

1. Click **Events** in the admin navigation, then **+ New Event**
   Or click **+ New Event** from the dashboard
2. Fill in the required fields:

| Field      | Required | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| Title      | Yes      | Event name (e.g., "Wednesday Evening Meditation")        |
| Slug       | Auto     | URL path — auto-generated from title, editable           |
| Start Date | Yes      | Event start with time (timezone auto-appended as +07:00) |
| End Date   | Yes      | Event end with time                                      |
| Summary    | Yes      | 1-2 sentences for event cards and search results         |
| Body       | Yes      | Full description using the Markdown editor               |
| Modality   | Yes      | `in-person`, `online`, or `hybrid`                       |
| Pricing    | Yes      | `free`, `donation`, or `paid`                            |
| Status     | Yes      | `upcoming`, `cancelled`, or `past`                       |
| Location   | Yes      | Pre-filled with default venue address                    |

**Optional fields:**

| Field          | Description                                             |
| -------------- | ------------------------------------------------------- |
| Tags           | Categories: meditation, workshop, retreat, online, etc. |
| Featured Image | URL for the event banner image                          |
| Facilitator    | Who leads the session                                   |
| Capacity       | Limit (leave empty for unlimited)                       |
| Price Amount   | Numeric amount for paid events                          |
| Price Currency | THB, USD, EUR                                           |

3. Use the **Markdown toolbar** to format the body (Bold, Italic, Headings, Lists, Links, Images)
4. Click **Save Event**

> **Important:** After saving, the site rebuilds automatically. Changes appear within 1-2 minutes.

### 3.2 Editing an Event

1. Go to **Events** in the admin navigation
2. Find the event and click **Edit**
3. Make your changes
4. Click **Save Event**

### 3.3 Event Lifecycle

Follow this workflow for every event:

```
CREATE event (status: upcoming)
    ↓
EVENT HAPPENS
    ↓
Edit → change status to "past"
    ↓
(Optional) Add recap or photos to the body
```

**Cancelling an event:**

1. Open the event for editing
2. Change Status to `cancelled`
3. Add a notice at the top of the body: `> **This event has been cancelled.**`
4. Save

### 3.4 Recurring Events

For weekly sessions (e.g., Wednesday Meditation):

1. Create one event per session date
2. Use a consistent naming convention: `Wednesday Evening Meditation — March 25`
3. Keep the same slug prefix: `wednesday-evening-meditation-2026-03-25`
4. You can create a new event and reuse similar content from a previous one

> **Tip:** Create events at least 2 weeks in advance so they appear in the weekly digest.

### 3.5 Event Calendar Feed

The site automatically generates an ICS calendar feed at:

- **All events:** `/api/calendar/feed.ics`
- **Single event:** `/api/events/[slug]/ics`

Users can subscribe to the feed in Google Calendar, Apple Calendar, or Outlook. No action needed from you — this is fully automatic.

---

## 4. Managing Blog Posts

### 4.1 Creating a New Post

1. Click **Posts** in the admin navigation, then **+ New Post**
2. Fill in the fields:

| Field          | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| Title          | Yes      | Article headline                                 |
| Slug           | Auto     | URL path (auto-generated from title)             |
| Date           | Yes      | Publication date                                 |
| Author         | Yes      | Author name (defaults to "Bangkok Shambhala")    |
| Excerpt        | Yes      | 2-3 sentence summary for cards                   |
| Body           | Yes      | Full article using the Markdown editor           |
| Tags           | No       | Categories for organization                      |
| Featured Image | No       | URL for header image                             |
| Published      | Yes      | Toggle — only published posts appear on the site |

3. Click **Save Post**

### 4.2 Writing Best Practices

- **Keep paragraphs short** — 2-3 sentences for easy scanning
- **Use headings** (`## Heading`) to break up long articles
- **Target 300-800 words** per post
- **Include a call to action** — link to an upcoming event or community channel
- **Add images** to increase engagement
- **Use internal links** when referencing events or other pages

### 4.3 Using the Markdown Editor

The editor includes a toolbar with these buttons:

| Button | What It Does | Markdown Inserted |
| ------ | ------------ | ----------------- |
| **B**  | Bold text    | `**text**`        |
| _I_    | Italic text  | `*text*`          |
| H2     | Heading 2    | `## Heading`      |
| H3     | Heading 3    | `### Heading`     |
| List   | Bullet list  | `- item`          |
| Link   | Insert link  | `[text](url)`     |
| Image  | Insert image | `![alt](url)`     |

You can also type Markdown directly in the text area.

### 4.4 Blog Sections

Blog posts are organized into sections. When creating or editing a post, assign it to one of these sections via the `section` frontmatter field:

| Section Slug       | Display Name     | Description                             |
| ------------------ | ---------------- | --------------------------------------- |
| `shambhala-vision` | Shambhala Vision | Core teachings and philosophy           |
| `what-we-offer`    | What We Offer    | Programs, sessions, workshops           |
| `bibliography`     | Bibliography     | Recommended reading (special rendering) |
| `resources`        | Resources        | Practice resources and links            |
| `membership`       | Membership       | Community membership info               |

Users can filter posts by section using the **tab pills** on the blog listing page.

### 4.5 Managing the Bibliography

The Bibliography section has a special layout displaying book covers with expandable descriptions.

**Book data** is stored in `src/lib/books-data.ts` (not in Markdown). Each entry includes:

| Field          | Required | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| `title`        | Yes      | Full book title                                             |
| `author`       | Yes      | Author name(s)                                              |
| `cover`        | Yes      | Path to cover image (e.g., `/images/books/filename.jpg`)    |
| `shortText`    | Yes      | Brief description shown by default                          |
| `extendedText` | No       | Longer text revealed by "Show more" (set to `null` if none) |

**To add a new book:**

1. Add the cover image to `public/images/books/` (JPEG, max 200KB, ~160×240px recommended)
2. Add a new entry to the `books` array in `src/lib/books-data.ts`
3. Commit and push — Vercel will rebuild automatically

**To edit a book:** Update the corresponding entry in `src/lib/books-data.ts`.

> **Note:** The Bibliography section's `content/blog/bibliography.md` still provides frontmatter metadata (title, date, section), but the page body is rendered by the BookList component, not from the Markdown content.

### 4.6 Content Calendar

Suggested publishing schedule:

| Day          | Content Type        | Example                          |
| ------------ | ------------------- | -------------------------------- |
| Monday       | Weekly preview      | "This Week at Bangkok Shambhala" |
| Wednesday    | Post-session update | Recap + reflection               |
| Friday       | Weekend preview     | Upcoming workshop details        |
| 1st of month | Monthly newsletter  | Events digest + community news   |

---

## 5. Managing Images

### 5.1 Image Guidelines

| Aspect        | Recommendation                                |
| ------------- | --------------------------------------------- |
| Format        | WebP or JPEG (photos), PNG (graphics)         |
| Max width     | 1200px                                        |
| Max file size | 200KB                                         |
| Naming        | Descriptive: `wednesday-meditation-group.jpg` |
| Alt text      | Always describe the image content             |

### 5.2 Adding Images to Content

1. Upload your image to a hosting service (e.g., Cloudinary, Imgur, or your preferred CDN)
2. Copy the image URL
3. In the admin editor, click the **Image** toolbar button or type `![description](url)` directly
4. Paste the image URL
5. Always add a descriptive alt text for accessibility

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

| Workflow              | Trigger        | What It Does                                              |
| --------------------- | -------------- | --------------------------------------------------------- |
| Event Published       | Webhook        | Sends newsletter + prepares social copy                   |
| Weekly Reminder       | Monday 9:00 AM | Sends weekly event digest to WhatsApp + email             |
| Broken Link Monitor   | Sunday 3:00 AM | Checks all URLs, emails alert if any are broken           |
| Social Copy Generator | Webhook        | Uses AI to generate Facebook/Instagram/WhatsApp/LINE copy |

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

| Field           | SEO Impact | Tips                                            |
| --------------- | ---------- | ----------------------------------------------- |
| Title           | High       | Include keywords: "Meditation Workshop Bangkok" |
| Summary/Excerpt | High       | This appears in Google search results           |
| Body headings   | Medium     | Use `##` and `###` for structure                |
| Alt text        | Medium     | Describe images for search engines              |
| Tags            | Low        | Helps internal categorization                   |

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

| Problem                           | Solution                                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| Changes don't appear after saving | Wait 1-2 min for rebuild. Check Vercel dashboard for build errors.                                  |
| Admin login fails                 | Clear browser cache. Try incognito mode. Verify ADMIN_EMAIL and ADMIN_PASSWORD env vars.            |
| Images don't load                 | Verify the image URL is correct and publicly accessible.                                            |
| Event not on homepage             | Verify status is `upcoming` and date is in the future.                                              |
| Newsletter signup fails           | Check Brevo API key in Vercel env vars. Check API logs.                                             |
| 404 errors for old URLs           | Add a redirect in `next.config.js` (developer task).                                                |
| Site down                         | Check [status.vercel.com](https://status.vercel.com). Rollback in Vercel if recent deploy broke it. |
| Slow page load                    | Run Lighthouse audit. Check for large images. Contact developer.                                    |

---

## 11. Security Reminders

- **Never share** admin credentials (email/password) publicly
- **Never commit** API keys or secrets to the repository
- **Review** who has admin credentials quarterly — change password if a member departs
- **Rotate** API keys (GitHub token, Brevo, n8n) every 3-6 months
- **Report** any suspicious activity to the site administrator immediately

---

## 12. Getting Help

| Type of Help        | Contact               |
| ------------------- | --------------------- |
| Content questions   | Community coordinator |
| Technical issues    | Site developer        |
| Admin panel access  | Site administrator    |
| Brevo / newsletters | Site administrator    |
| n8n automations     | Site developer        |

---

_Bangkok Shambhala Admin Guide v1.0 — March 2026_
_For the latest version, check the repository at `/docs/guides/`_
