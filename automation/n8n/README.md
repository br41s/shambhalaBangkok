# n8n Automation Workflows

Pre-built workflow templates for Bangkok Shambhala operations.
Import these JSON files into your n8n instance.

## Workflows

### 1. Event Published (`event-published.json`)
**Trigger:** Webhook (POST)
**Actions:**
- Sends newsletter notification via Brevo
- Prepares social media copy for Facebook and WhatsApp

**Setup:**
1. Import the workflow into n8n
2. Set environment variables: `BREVO_API_KEY`
3. Configure the webhook URL in Decap CMS publish hook or CI/CD post-deploy

---

### 2. Weekly Event Reminder (`weekly-event-reminder.json`)
**Trigger:** Cron — every Monday at 09:00 Bangkok time
**Actions:**
- Fetches upcoming events from the ICS calendar feed
- Builds a weekly digest
- Sends to WhatsApp group and email subscribers via Brevo

**Setup:**
1. Import the workflow into n8n
2. Set environment variables: `SITE_URL`, `BREVO_API_KEY`
3. Configure WhatsApp Business API credentials

---

### 3. Broken Link Monitor (`broken-link-monitor.json`)
**Trigger:** Cron — every Sunday at 03:00
**Actions:**
- Fetches sitemap.xml
- Checks every URL with HEAD requests
- Sends alert email if any URL returns 4xx/5xx

**Setup:**
1. Import the workflow into n8n
2. Set environment variables: `SITE_URL`, `BREVO_API_KEY`, `ADMIN_EMAIL`

---

### 4. Social Copy Generator (`social-copy-generator.json`)
**Trigger:** Webhook (POST)
**Actions:**
- Sends event data to OpenAI GPT-4o-mini
- Generates platform-specific copy (Facebook, Instagram, WhatsApp, LINE)
- Stores results in a Google Sheet for editorial review

**Setup:**
1. Import the workflow into n8n
2. Set environment variables: `OPENAI_API_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_ACCESS_TOKEN`
3. Call the webhook manually or chain it after `event-published`

---

## Required Environment Variables

| Variable | Used By | Description |
|---|---|---|
| `SITE_URL` | weekly-reminder, broken-link | Base URL of the deployed site |
| `BREVO_API_KEY` | event-published, weekly-reminder, broken-link | Brevo (Sendinblue) API key |
| `ADMIN_EMAIL` | broken-link | Admin email for alerts |
| `OPENAI_API_KEY` | social-copy | OpenAI API key for copy generation |
| `GOOGLE_SHEET_ID` | social-copy | Google Sheets spreadsheet ID |
| `GOOGLE_ACCESS_TOKEN` | social-copy | Google OAuth access token |

## WhatsApp / LINE Integration

These workflows use placeholder endpoints for WhatsApp and LINE.
Replace them with your actual API provider:

- **WhatsApp Business API**: Use Meta's Cloud API or a provider like Twilio
- **LINE Messaging API**: Use LINE's official Push Message endpoint

## Security Notes

- All webhook triggers use header-based authentication
- Store API keys as n8n credentials or environment variables, never hardcode them
- Restrict webhook access to known IPs if possible
