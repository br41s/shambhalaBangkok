import { createAdminClient } from '@/lib/supabase/admin'
import type { ParsedEvent } from '@/lib/event-parser'

export async function createEvent(event: ParsedEvent) {
  const supabase = createAdminClient()

  const slug = createSlug(event.title)

  const { data, error } = await supabase
    .from('events')
    .insert({
      title: event.title,
      slug,
      starts_at: event.starts_at,
      ends_at: event.ends_at,
      description: event.description,
      published: false,
    })
    .select()
    .single()

  if (error) {
    throw new Error(
      `Failed to create event: ${error.message}`
    )
  }

  return data
}

export async function updateEventImage(
  eventId: string,
  imagePath: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .update({
      image: imagePath,
    })
    .eq('id', eventId)
    .select()
    .single()

  if (error) {
    throw new Error(
      `Failed to update event image: ${error.message}`
    )
  }

  return data
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}