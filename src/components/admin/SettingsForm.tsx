'use client';

import { useState, useEffect } from 'react';

interface SettingsState {
  brevo_api_key: string | null;
  brevo_list_id: string | null;
  external_ics_url: string | null;
  external_ics_enabled: string | null;
  external_ics_mode: string | null;
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsState>({
    brevo_api_key: null,
    brevo_list_id: null,
    external_ics_url: null,
    external_ics_enabled: null,
    external_ics_mode: null,
  });
  const [apiKey, setApiKey] = useState('');
  const [listId, setListId] = useState('');
  const [icsUrl, setIcsUrl] = useState('');
  const [testResult, setTestResult] = useState<{
    count: number;
    events: { title: string; date: string }[];
  } | null>(null);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: SettingsState) => {
        setSettings(data);
        setListId(data.brevo_list_id || '');
        setIcsUrl(data.external_ics_url || '');
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
        text: `${
          key === 'brevo_api_key'
            ? 'API Key'
            : key === 'brevo_list_id'
              ? 'List ID'
              : key === 'external_ics_url'
                ? 'ICS Feed URL'
                : 'External feed'
        } updated`,
      });

      // Refresh settings to get masked value
      const refreshed = await fetch('/api/admin/settings').then((r) => r.json());
      setSettings(refreshed);
      if (key === 'brevo_api_key') setApiKey('');
      if (key === 'brevo_list_id') setListId(refreshed.brevo_list_id || '');
      if (key === 'external_ics_url') setIcsUrl(refreshed.external_ics_url || '');
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

      {/* External Calendar Feed */}
      <div className="bg-white rounded-xl border border-black/[0.06] p-6 space-y-4">
        <div>
          <h2 className="font-semibold">External Calendar Feed</h2>
          <p className="text-sm text-gray-500 mt-1">
            Load events from an external ICS feed. Choose whether to replace or merge with your
            internal events.
          </p>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
              settings.external_ics_enabled === 'true'
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                settings.external_ics_enabled === 'true' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            {settings.external_ics_enabled === 'true'
              ? `Active — ${
                  (settings.external_ics_mode || 'replace') === 'merge'
                    ? 'Merging with internal'
                    : 'Replacing internal'
                }`
              : 'Inactive'}
          </span>
          {settings.external_ics_url && (
            <span className="text-xs text-gray-400 truncate max-w-xs">
              {settings.external_ics_url}
            </span>
          )}
        </div>

        {/* Feed mode selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Feed Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => saveSetting('external_ics_mode', 'replace')}
              disabled={saving === 'external_ics_mode'}
              className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                (settings.external_ics_mode || 'replace') === 'replace'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">Replace</div>
              <div className="text-xs mt-0.5 opacity-75">Only show external events</div>
            </button>
            <button
              onClick={() => saveSetting('external_ics_mode', 'merge')}
              disabled={saving === 'external_ics_mode'}
              className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                settings.external_ics_mode === 'merge'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">Merge</div>
              <div className="text-xs mt-0.5 opacity-75">Combine external + internal</div>
            </button>
          </div>
        </div>

        {/* URL input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ICS Feed URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={icsUrl}
              onChange={(e) => {
                setIcsUrl(e.target.value);
                setTestResult(null);
              }}
              placeholder="https://calendar.google.com/calendar/ical/.../basic.ics"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => saveSetting('external_ics_url', icsUrl)}
              disabled={!icsUrl || saving === 'external_ics_url'}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving === 'external_ics_url' ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Test button */}
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (!icsUrl) return;
              setTesting(true);
              setTestResult(null);
              setMessage(null);
              try {
                const res = await fetch('/api/admin/settings/test-feed', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url: icsUrl }),
                });
                if (!res.ok) {
                  const data = await res.json();
                  setMessage({ type: 'error', text: data.error || 'Failed to test feed' });
                  return;
                }
                const data = await res.json();
                setTestResult(data);
              } catch {
                setMessage({ type: 'error', text: 'Failed to test feed' });
              } finally {
                setTesting(false);
              }
            }}
            disabled={!icsUrl || testing}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {testing ? 'Testing...' : 'Test Feed'}
          </button>

          {/* Enable / Disable toggle */}
          {settings.external_ics_url && (
            <button
              onClick={() =>
                saveSetting(
                  'external_ics_enabled',
                  settings.external_ics_enabled === 'true' ? 'false' : 'true'
                )
              }
              disabled={saving === 'external_ics_enabled'}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
                settings.external_ics_enabled === 'true'
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
            >
              {saving === 'external_ics_enabled'
                ? 'Saving...'
                : settings.external_ics_enabled === 'true'
                  ? 'Disable'
                  : 'Enable'}
            </button>
          )}
        </div>

        {/* Test results */}
        {testResult && (
          <div className="bg-blue-50/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-blue-800">
              Found {testResult.count} event{testResult.count !== 1 ? 's' : ''}
            </p>
            {testResult.events.length > 0 && (
              <ul className="text-sm text-blue-700 space-y-1">
                {testResult.events.map((ev, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span className="truncate">{ev.title}</span>
                    <span className="text-blue-400 text-xs shrink-0">
                      {new Date(ev.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
                {testResult.count > 5 && (
                  <li className="text-blue-400 text-xs">...and {testResult.count - 5} more</li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* Remove URL */}
        {settings.external_ics_url && (
          <button
            onClick={() => {
              saveSetting('external_ics_enabled', 'false').then(() =>
                saveSetting('external_ics_url', '')
              );
              setIcsUrl('');
              setTestResult(null);
            }}
            disabled={saving !== null}
            className="text-xs text-red-600 hover:text-red-800 transition-colors"
          >
            Remove external feed
          </button>
        )}
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
