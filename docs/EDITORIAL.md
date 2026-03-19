# Editorial Guide

A guide for non-technical editors managing content on the Bangkok Shambhala website.

## Accessing the Admin Panel

1. Go to `https://your-site.com/admin/login`
2. Enter your admin email and password
3. You'll see the admin dashboard with stats, quick actions, and recent content

## Managing Events

### Creating a New Event

1. From the dashboard, click **+ New Event** (or navigate to `/admin/events/new`)
2. Fill in the required fields:

| Field | Required | Notes |
|---|---|---|
| Title | Yes | Event name in English |
| Slug | Auto | URL-friendly version (auto-generated from title) |
| Start Date | Yes | Include time, always use Bangkok timezone (GMT+7) |
| End Date | Yes | When the event finishes |
| Summary | Yes | 1-2 sentence description (shown on event cards) |
| Body | Yes | Full event description in Markdown (toolbar provided) |
| Modality | Yes | `in-person`, `online`, or `hybrid` |
| Pricing | Yes | `free`, `donation`, or `paid` |
| Status | Yes | `upcoming`, `cancelled`, or `past` |
| Location | Yes | Pre-filled with default venue |
| Tags | No | Comma-separated: meditation, workshop, retreat |
| Featured Image | No | URL for the event banner |
| Facilitator | No | Who leads the session |
| Capacity | No | Number (leave empty for unlimited) |

3. Click **Save Event**

> **Note:** After saving, the site rebuilds automatically. Changes appear within 1-2 minutes.

### Editing an Event

1. Go to `/admin/events` to see all events
2. Click **Edit** on the event you want to change
3. Make your changes
4. Click **Save Event**

### Event Status Workflow

```
upcoming → (event happens) → past
upcoming → (if cancelled) → cancelled
```

Change status to `past` after the event ends.

---

## Managing Blog Posts

### Creating a New Post

1. From the dashboard, click **+ New Post** (or navigate to `/admin/posts/new`)
2. Fill in fields:

| Field | Required | Notes |
|---|---|---|
| Title | Yes | Article title |
| Slug | Auto | URL path (auto-generated from title) |
| Date | Yes | Publication date |
| Author | Yes | Author name (defaults to "Bangkok Shambhala") |
| Tags | No | Categories: community, practice, teaching, etc. |
| Excerpt | Yes | Short summary for cards (2-3 sentences) |
| Featured Image | No | URL for header image |
| Published | Yes | Toggle to make post visible |
| Body | Yes | Full article in Markdown (toolbar provided) |

3. Click **Save Post**

### Writing Tips

- **Keep paragraphs short** — 2-3 sentences max for web readability
- **Use headings** (## and ###) to break up long articles
- **Include images** where relevant to increase engagement
- **Add internal links** to events or other pages when relevant
- **Aim for 300-800 words** per post

---

## Markdown Editor

The admin panel includes a Markdown editor with a toolbar. Available formatting:

| Button | What It Does | Markdown |
|--------|-------------|----------|
| **B** | Bold text | `**text**` |
| *I* | Italic text | `*text*` |
| H2 | Heading 2 | `## Heading` |
| H3 | Heading 3 | `### Heading` |
| List | Bullet list | `- item` |
| Link | Insert link | `[text](url)` |
| Image | Insert image | `![alt](url)` |

You can also type Markdown directly in the editor.

---

## Managing Pages

Static pages (About, Contact, etc.) are managed through code. To request changes to these pages, contact the development team.

---

## Images

### Best Practices
- **Format**: Use WebP or JPEG for photos, PNG for graphics with transparency
- **Size**: Maximum 1200px wide, under 200KB
- **Alt text**: Always describe the image for accessibility
- **Naming**: Use descriptive names: `wednesday-meditation-group.jpg` not `IMG_4523.jpg`

### Using Images in Content
In the Markdown editor, click the **Image** button in the toolbar or type:
```markdown
![Description of the image](https://example.com/image.jpg)
```

---

## Content Calendar Suggestions

| Day | Content Type | Example |
|---|---|---|
| Monday | Weekly schedule reminder | "This week's sessions" post |
| Wednesday | Post-session recap | Photo + short reflection |
| Friday | Weekend event promotion | Upcoming workshop details |
| 1st of month | Monthly newsletter | Events digest + community update |

---

## SEO Guidelines

Every piece of content should:

1. **Have a clear title** — include keywords naturally (e.g., "Meditation Workshop Bangkok")
2. **Have a good summary/excerpt** — this appears in Google search results
3. **Use headings** — helps Google understand content structure
4. **Include internal links** — link to related events or blog posts
5. **Add alt text to images** — describes images for search engines and screen readers

---

## Common Tasks

### Cancelling an Event
1. Open the event from `/admin/events`
2. Change **Status** to `cancelled`
3. Optionally add a note at the top of the body: `> **This event has been cancelled.**`
4. Save

### Featuring an Event on the Homepage
The homepage automatically shows the next 3 upcoming events sorted by date. To feature a specific event, ensure its start date is correctly set.

### Adding a New Community Channel
Contact the development team to add new social channels (e.g., a new LINE group or Telegram channel).

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Changes don't appear on site | Wait 1-2 minutes for Vercel to rebuild |
| Login fails | Check email/password. Clear cookies. Try incognito. |
| Images not loading | Ensure the image URL is valid and accessible |
| Event not showing on homepage | Verify status is `upcoming` and date is in the future |
| Markdown formatting looks wrong | Use the preview or check Markdown syntax |

## Getting Help

- **Technical issues**: Contact the development team
- **Content questions**: Check this guide or ask the community coordinator
