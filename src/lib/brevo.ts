import { getSetting } from '@/lib/settings';

const BREVO_API = 'https://api.brevo.com/v3';

async function getApiKey(): Promise<string | null> {
  // Redis setting takes priority over env var
  const fromRedis = await getSetting('brevo_api_key');
  if (fromRedis) return fromRedis;
  return process.env.BREVO_API_KEY || null;
}

async function getListId(): Promise<number> {
  const fromRedis = await getSetting('brevo_list_id');
  if (fromRedis) return parseInt(fromRedis, 10);
  return parseInt(process.env.BREVO_LIST_ID || '1', 10);
}

interface BrevoResult {
  ok: boolean;
  error?: string;
  alreadyExists?: boolean;
}

/**
 * Add a contact to a Brevo list.
 * If the contact already exists, updates their list membership.
 */
export async function addContact(email: string): Promise<BrevoResult> {
  const apiKey = await getApiKey();
  if (!apiKey) {
    console.warn('[Brevo] API key not configured — skipping subscription');
    return { ok: true };
  }

  const listId = await getListId();

  const res = await fetch(`${BREVO_API}/contacts`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (res.ok || res.status === 201) {
    return { ok: true };
  }

  // 409 = contact already exists — add to list instead
  if (res.status === 409) {
    return addToList(email, listId, apiKey);
  }

  const body = await res.json().catch(() => ({}));
  console.error(`[Brevo] Failed to create contact: ${res.status}`, body);
  return { ok: false, error: body.message || `Brevo API error: ${res.status}` };
}

/**
 * Add an existing contact to a specific list.
 */
async function addToList(email: string, listId: number, apiKey: string): Promise<BrevoResult> {
  const res = await fetch(`${BREVO_API}/contacts/lists/${listId}/contacts/add`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ emails: [email] }),
  });

  if (res.ok) {
    return { ok: true, alreadyExists: true };
  }

  const body = await res.json().catch(() => ({}));
  console.error(`[Brevo] Failed to add to list: ${res.status}`, body);
  return { ok: false, error: body.message || `Brevo API error: ${res.status}` };
}
