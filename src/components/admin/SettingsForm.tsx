'use client';

import { useState, useEffect } from 'react';

interface SettingsState {
  brevo_api_key: string | null;
  brevo_list_id: string | null;
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsState>({
    brevo_api_key: null,
    brevo_list_id: null,
  });
  const [apiKey, setApiKey] = useState('');
  const [listId, setListId] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: SettingsState) => {
        setSettings(data);
        setListId(data.brevo_list_id || '');
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load settings' }))
      .finally(() => setLoading(false));
  }, []);

  async function saveSetting(key: string, value: string) {
    setSaving(key);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
        return;
      }

      setMessage({
        type: 'success',
        text: `${key === 'brevo_api_key' ? 'API Key' : 'List ID'} updated`,
      });

      // Refresh settings to get masked value
      const refreshed = await fetch('/api/admin/settings').then((r) => r.json());
      setSettings(refreshed);
      if (key === 'brevo_api_key') setApiKey('');
      if (key === 'brevo_list_id') setListId(refreshed.brevo_list_id || '');
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`text-sm rounded-lg px-4 py-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Brevo API Key */}
      <div className="bg-white rounded-xl border border-black/[0.06] p-6 space-y-4">
        <div>
          <h2 className="font-semibold">Brevo API Key</h2>
          <p className="text-sm text-gray-500 mt-1">
            Required for newsletter subscriptions. Get your key from{' '}
            <a
              href="https://app.brevo.com/settings/keys/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Brevo Settings → API Keys
            </a>
          </p>
        </div>

        {settings.brevo_api_key && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Current:</span>
            <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
              {settings.brevo_api_key}
            </code>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={settings.brevo_api_key ? 'Enter new key to replace' : 'xkeysib-...'}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => saveSetting('brevo_api_key', apiKey)}
            disabled={!apiKey || saving === 'brevo_api_key'}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving === 'brevo_api_key' ? 'Saving...' : 'Save'}
          </button>
        </div>

        {settings.brevo_api_key && (
          <button
            onClick={() => saveSetting('brevo_api_key', '')}
            disabled={saving === 'brevo_api_key'}
            className="text-xs text-red-600 hover:text-red-800 transition-colors"
          >
            Remove API key
          </button>
        )}
      </div>

      {/* Brevo List ID */}
      <div className="bg-white rounded-xl border border-black/[0.06] p-6 space-y-4">
        <div>
          <h2 className="font-semibold">Brevo List ID</h2>
          <p className="text-sm text-gray-500 mt-1">
            The contact list where subscribers will be added. Defaults to list{' '}
            <code className="bg-gray-100 px-1 rounded">1</code> if not set.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
            placeholder="1"
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => saveSetting('brevo_list_id', listId)}
            disabled={saving === 'brevo_list_id'}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving === 'brevo_list_id' ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50/50 rounded-xl p-6">
        <h3 className="font-semibold text-sm mb-2">How it works</h3>
        <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
          <li>Settings stored here take priority over environment variables</li>
          <li>Changes take effect immediately — no redeployment needed</li>
          <li>API keys are encrypted at rest in Upstash Redis</li>
          <li>If no API key is configured, newsletter subscriptions are logged but not sent</li>
        </ul>
      </div>
    </div>
  );
}
