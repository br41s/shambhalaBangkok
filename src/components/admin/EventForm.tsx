'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownEditor } from './MarkdownEditor';
import { slugify } from '@/lib/utils';

interface EventFormProps {
  initial?: {
    title: string;
    slug: string;
    summary: string;
    startDate: string;
    endDate: string;
    location: string;
    modality: string;
    registrationUrl: string;
    facilitator: string;
    pricing: string;
    price: number | undefined;
    suggestedDonation: number | undefined;
    currency: string;
    capacity: number | undefined;
    tags: string;
    image: string;
    status: string;
    body: string;
  };
}

const defaultValues = {
  title: '',
  slug: '',
  summary: '',
  startDate: '',
  endDate: '',
  location: 'Bangkok Shambhala, Young Place Building, Sukhumvit Soi 23',
  modality: 'in-person',
  registrationUrl: '',
  facilitator: '',
  pricing: 'free',
  price: undefined as number | undefined,
  suggestedDonation: undefined as number | undefined,
  currency: 'THB',
  capacity: undefined as number | undefined,
  tags: 'meditation',
  image: '',
  status: 'draft',
  body: '',
};

export function EventForm({ initial }: EventFormProps) {
  const router = useRouter();
  const isEdit = !!initial;
  const [form, setForm] = useState(initial || defaultValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (field: string, value: string | number | undefined) =>
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !isEdit ? { slug: slugify(value as string) } : {}),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.startDate || !form.endDate) {
      setError('Title, start date, and end date are required.');
      return;
    }
    setSaving(true);
    setError('');

    const frontmatter: Record<string, unknown> = {
      title: form.title,
      summary: form.summary,
      startDate: form.startDate.includes('+') ? form.startDate : `${form.startDate}:00+07:00`,
      endDate: form.endDate.includes('+') ? form.endDate : `${form.endDate}:00+07:00`,
      timezone: 'Asia/Bangkok',
      location: form.location,
      modality: form.modality,
      organizer: 'Bangkok Shambhala',
      pricing: form.pricing,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: form.status,
    };
    if (form.registrationUrl) frontmatter.registrationUrl = form.registrationUrl;
    if (form.facilitator) frontmatter.facilitator = form.facilitator;
    if (form.pricing === 'fixed' && form.price) frontmatter.price = form.price;
    if (form.pricing === 'donation' && form.suggestedDonation) frontmatter.suggestedDonation = form.suggestedDonation;
    if (form.currency !== 'THB') frontmatter.currency = form.currency;
    if (form.capacity) frontmatter.capacity = form.capacity;
    if (form.image) frontmatter.image = form.image;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'events',
          slug: form.slug,
          frontmatter,
          content: form.body,
          message: `${isEdit ? 'Update' : 'Create'} event: ${form.title}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save');
      } else {
        setSuccess('Event saved! The site will rebuild in ~30 seconds.');
        setTimeout(() => router.push('/admin/events'), 2000);
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea value={form.summary} onChange={(e) => set('summary', e.target.value)} rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date *</label>
          <input type="datetime-local" value={form.startDate?.slice(0, 16)} onChange={(e) => set('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date *</label>
          <input type="datetime-local" value={form.endDate?.slice(0, 16)} onChange={(e) => set('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input type="text" value={form.location} onChange={(e) => set('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modality</label>
          <select value={form.modality} onChange={(e) => set('modality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="in-person">In Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pricing</label>
          <select value={form.pricing} onChange={(e) => set('pricing', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="free">Free</option>
            <option value="donation">By Donation</option>
            <option value="fixed">Fixed Price</option>
          </select>
        </div>
        {form.pricing === 'fixed' && (
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input type="number" value={form.price || ''} onChange={(e) => set('price', Number(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        )}
        {form.pricing === 'donation' && (
          <div>
            <label className="block text-sm font-medium mb-1">Suggested Donation</label>
            <input type="number" value={form.suggestedDonation || ''} onChange={(e) => set('suggestedDonation', Number(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Facilitator</label>
          <input type="text" value={form.facilitator} onChange={(e) => set('facilitator', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input type="number" value={form.capacity || ''} onChange={(e) => set('capacity', Number(e.target.value) || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Registration URL</label>
          <input type="url" value={form.registrationUrl} onChange={(e) => set('registrationUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input type="text" value={form.image} onChange={(e) => set('image', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description (Markdown)</label>
        <MarkdownEditor value={form.body} onChange={(val) => set('body', val)} />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {saving ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
        </button>
        <button type="button" onClick={() => router.push('/admin/events')}
          className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
