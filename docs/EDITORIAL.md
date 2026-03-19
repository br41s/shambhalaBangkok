# Editorial Guide

A guide for non-technical editors managing content on the Shambhala Bangkok website.

## Accessing the CMS

1. Go to `https://your-site.com/admin/`
2. Log in with your credentials
3. You'll see the Content Manager dashboard

## Managing Events

### Creating a New Event

1. Click **Events** in the sidebar
2. Click **New Event**
3. Fill in the required fields:

| Field | Required | Notes |
|---|---|---|
| Title | Yes | Event name in English |
| Slug | Yes | URL-friendly version (auto-generated from title) |
| Start Date | Yes | Include time, always use Bangkok timezone (GMT+7) |
| End Date | Yes | When the event finishes |
| Summary | Yes | 1-2 sentence description (shown on event cards) |
| Body | Yes | Full event description in Markdown |
| Modality | Yes | `in-person`, `online`, or `hybrid` |
| Pricing | Yes | `free`, `donation`, or `paid` |
| Status | Yes | `upcoming`, `cancelled`, or `past` |
| Tags | No | Comma-separated: meditation, workshop, retreat |
| Featured Image | No | Upload or provide URL |
| Registration URL | No | External link (Meetup, Google Form, etc.) |
| Max Participants | No | Number (leave empty for unlimited) |

4. Click **Publish**

### Editing an Event

1. Click **Events** → select the event
2. Make your changes
3. Click **Publish** (saves and triggers rebuild)

### Event Status Workflow

```
upcoming → (event happens) → past
upcoming → (if cancelled) → cancelled
```

Change status to `past` after the event ends. Past events are shown in the archive section.

---

## Managing Blog Posts

### Creating a New Post

1. Click **Blog** in the sidebar
2. Click **New Blog Post**
3. Fill in fields:

| Field | Required | Notes |
|---|---|---|
| Title | Yes | Article title |
| Slug | Yes | URL path (auto-generated) |
| Date | Yes | Publication date |
| Author | Yes | Author name |
| Tags | No | Categories: community, practice, teaching, etc. |
| Excerpt | Yes | Short summary for cards (2-3 sentences) |
| Featured Image | No | Header image for the post |
| Body | Yes | Full article in Markdown |

4. Click **Publish**

### Writing Tips

- **Keep paragraphs short** — 2-3 sentences max for web readability
- **Use headings** (## and ###) to break up long articles
- **Include images** where relevant to increase engagement
- **Add internal links** to events or other pages when relevant
- **Aim for 300-800 words** per post

---

## Markdown Quick Reference

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://example.com)

![Image alt text](image-url.jpg)

- Bullet list item
- Another item

1. Numbered list
2. Second item

> Blockquote for quotes or callouts
```

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

### Uploading Images
1. In the CMS editor, click the image icon
2. Upload from your computer or paste a URL
3. Add alt text describing the image

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
1. Open the event in the CMS
2. Change **Status** to `cancelled`
3. Optionally add a note at the top of the body: `> **This event has been cancelled.**`
4. Publish

### Featuring an Event on the Homepage
The homepage automatically shows the next 3 upcoming events sorted by date. To feature a specific event, ensure its start date is correctly set.

### Adding a New Community Channel
Contact the development team to add new social channels (e.g., a new LINE group or Telegram channel).

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Changes don't appear on site | Wait 1-2 minutes for Vercel to rebuild |
| CMS login fails | Check your credentials or contact admin |
| Images not loading | Ensure file size is under 5MB |
| Event not showing on homepage | Verify status is `upcoming` and date is in the future |
| Markdown formatting looks wrong | Preview in the CMS before publishing |

## Getting Help

- **Technical issues**: Contact the development team
- **Content questions**: Check this guide or ask the community coordinator
