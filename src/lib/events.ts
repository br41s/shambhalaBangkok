import { createAdminClient } from '@/lib/supabase/admin'
import type { SEvent } from '@/lib/types'
import type { EventOccurrence } from '@/lib/event-recurrence'

/**
 * Represents one email import.
 *
 * One import can produce:
 * - one event
 * - or many events belonging to the same series
 */
export type EventImport = {
  id: string
  source_email_id: string
  series_id: string | null
  created_at: string
}

/**
 * Create or retrieve an event import.
 *
 * source_email_id is unique, so the same Resend email
 * can never create a second import.
 */
export async function createEventImport(
  sourceEmailId: string,
  seriesId: string | null = null
): Promise<EventImport> {
  const supabase = createAdminClient()

  /*
   * First check whether this email has already been imported.
   *
   * This also makes the function useful for webhook retries.
   */
  const { data: existingImport, error: lookupError } =
    await supabase
      .from('event_imports')
      .select('*')
      .eq('source_email_id', sourceEmailId)
      .maybeSingle()

  if (lookupError) {
    throw new Error(
      `Failed to check event import: ${lookupError.message}`
    )
  }

  if (existingImport) {
    return existingImport
  }

  const { data, error } = await supabase
    .from('event_imports')
    .insert({
      source_email_id: sourceEmailId,
      series_id: seriesId,
    })
    .select()
    .single()

  if (error) {
    /*
     * A concurrent webhook retry may have inserted the
     * same email between our lookup and insert.
     *
     * In that case, retrieve the existing import.
     */
    if (error.code === '23505') {
      const { data: concurrentImport, error: retryError } =
        await supabase
          .from('event_imports')
          .select('*')
          .eq('source_email_id', sourceEmailId)
          .single()

      if (retryError || !concurrentImport) {
        throw new Error(
          `Failed to retrieve existing event import: ${retryError?.message ?? 'Unknown error'
          }`
        )
      }

      return concurrentImport
    }

    throw new Error(
      `Failed to create event import: ${error.message}`
    )
  }

  return data
}

/**
 * Update the series ID associated with an import.
 */
export async function updateEventImportSeries(
  importId: string,
  seriesId: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('event_imports')
    .update({
      series_id: seriesId,
    })
    .eq('id', importId)
    .select()
    .single()

  if (error) {
    throw new Error(
      `Failed to update event import series: ${error.message}`
    )
  }

  return data
}

/**
 * Get an existing event import by Resend email ID.
 */
export async function getEventImportByEmailId(
  sourceEmailId: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('event_imports')
    .select('*')
    .eq('source_email_id', sourceEmailId)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Failed to get event import: ${error.message}`
    )
  }

  return data
}

/**
 * Get all events belonging to an import.
 *
 * This is useful when Resend retries a webhook that has
 * already been processed.
 */
export async function getEventsByImportId(
  importId: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('import_id', importId)
    .order('starts_at', {
      ascending: true,
    })

  if (error) {
    throw new Error(
      `Failed to get imported events: ${error.message}`
    )
  }

  return (data ?? []).map(mapEvent)
}

/**
 * Create one concrete event occurrence.
 *
 * The recurrence engine has already converted the event's
 * local date/time into UTC ISO timestamps.
 */
export async function createEvent(
  event: EventOccurrence,
  options?: {
    importId?: string
    seriesId?: string | null
  }
) {
  const supabase = createAdminClient()

  const slug = await createUniqueSlug(
    event.title,
    event.starts_at
  )

  const { data, error } = await supabase
    .from('events')
    .insert({
      title: event.title,
      slug,
      starts_at: event.starts_at,
      ends_at: event.ends_at,
      description: event.description,
      location: event.location,
      published: false,

      import_id:
        options?.importId ?? null,

      series_id:
        options?.seriesId ?? null,
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

/**
 * Update an event's image.
 *
 * Publishing is deliberately NOT done here.
 *
 * The webhook will publish the event only after the
 * image upload has succeeded.
 */
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

/**
 * Publish one event.
 */
export async function publishEvent(
  eventId: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .update({
      published: true,
    })
    .eq('id', eventId)
    .select()
    .single()

  if (error) {
    throw new Error(
      `Failed to publish event: ${error.message}`
    )
  }

  return data
}

/**
 * Publish all events belonging to an import.
 *
 * Useful for recurring events where all occurrences
 * should become public together.
 */
export async function publishEventsByImportId(
  importId: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .update({
      published: true,
    })
    .eq('import_id', importId)
    .select()

  if (error) {
    throw new Error(
      `Failed to publish imported events: ${error.message}`
    )
  }

  return data ?? []
}

/**
 * Convert the Supabase event shape into the shape
 * expected by the existing frontend components.
 */
function mapEvent(
  event: any
): SEvent & { id: string; slug: string } {
  const supabase = createAdminClient()

  const imageUrl = event.image
    ? supabase.storage
        .from('images')
        .getPublicUrl(event.image).data.publicUrl
    : null

  return {
    ...event,
    image: imageUrl,
    startDate: event.starts_at,
    endDate: event.ends_at,
    summary:
      event.summary ?? '',
    location: event.location ?? '',
    status: event.status ?? 'active',
    modality:
      event.modality ?? undefined,
    capacity:
      event.capacity ?? undefined,
    registrationUrl:
      event.registration_url ?? undefined,
  }
}

/**
 * Get all events.
 *
 * Sorted by start date, soonest first.
 */
export async function getAllEvents() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', {
      ascending: true,
    })

  if (error) {
    throw new Error(
      `Failed to get events: ${error.message}`
    )
  }

  return (data ?? []).map(mapEvent)
}

/**
 * Get upcoming events.
 */
export async function getUpcomingEvents() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte(
      'starts_at',
      new Date().toISOString()
    )
    .order('starts_at', {
      ascending: true,
    })

  if (error) {
    throw new Error(
      `Failed to get upcoming events: ${error.message}`
    )
  }

  return (data ?? []).map(mapEvent)
}

/**
 * Get a single event by ID.
 */
export async function getEventById(
  id: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(
      `Failed to get event: ${error.message}`
    )
  }

  return mapEvent(data)
}

/**
 * Get a single event by slug.
 */
export async function getEventBySlug(
  slug: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    throw new Error(
      `Failed to get event: ${error.message}`
    )
  }

  return mapEvent(data)
}

/**
 * Get a published event by slug.
 */
export async function getActiveEventBySlug(
  slug: string
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Failed to get active event: ${error.message}`
    )
  }

  if (!data) {
    return null
  }

  return mapEvent(data)
}

/**
 * Get published upcoming events.
 */
export async function getActiveUpcomingEvents() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .gte(
      'starts_at',
      new Date().toISOString()
    )
    .order('starts_at', {
      ascending: true,
    })

  if (error) {
    throw new Error(
      `Failed to get upcoming events: ${error.message}`
    )
  }

  return (data ?? []).map(mapEvent)
}

/**
 * Get published past events.
 */
export async function getActivePastEvents(
  limit = 6
) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .lt(
      'starts_at',
      new Date().toISOString()
    )
    .order('starts_at', {
      ascending: false,
    })
    .limit(limit)

  if (error) {
    throw new Error(
      `Failed to get past events: ${error.message}`
    )
  }

  return (data ?? []).map(mapEvent)
}

/**
 * Create a URL-safe slug.
 */
function slugify(
  text: string
): string {
  return text
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      ''
    )
    .replace(
      /\s+/g,
      '-'
    )
    .replace(
      /-+/g,
      '-'
    )
}

/**
 * Create a unique slug for an event.
 *
 * Recurring events often have the same title, so:
 *
 * "Sunday Meditation"
 *
 * becomes:
 *
 * /events/sunday-meditation-2026-09-06
 * /events/sunday-meditation-2026-09-13
 *
 * If the base slug isn't taken, we keep the shorter slug.
 */
async function createUniqueSlug(
  title: string,
  startsAt: string
): Promise<string> {
  const supabase = createAdminClient()

  const baseSlug = slugify(title)

  if (!baseSlug) {
    throw new Error(
      'Cannot create event slug from empty title'
    )
  }

  /*
   * First try the normal title slug.
   */
  const { data: existingBase } =
    await supabase
      .from('events')
      .select('id')
      .eq('slug', baseSlug)
      .maybeSingle()

  if (!existingBase) {
    return baseSlug
  }

  /*
   * If the title already exists, append the local
   * calendar date.
   *
   * We use Intl instead of slicing the UTC ISO string
   * because the event is in Asia/Bangkok.
   */
  const datePart =
    new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    ).format(
      new Date(startsAt)
    )

  const datedSlug =
    `${baseSlug}-${datePart}`

  const { data: existingDated } =
    await supabase
      .from('events')
      .select('id')
      .eq('slug', datedSlug)
      .maybeSingle()

  if (!existingDated) {
    return datedSlug
  }

  /*
   * Extremely unlikely, but make the slug deterministic
   * and unique if the same event/date is imported again.
   */
  let counter = 2

  while (counter <= 100) {
    const candidate =
      `${datedSlug}-${counter}`

    const { data: existing } =
      await supabase
        .from('events')
        .select('id')
        .eq('slug', candidate)
        .maybeSingle()

    if (!existing) {
      return candidate
    }

    counter += 1
  }

  throw new Error(
    'Could not generate a unique event slug'
  )
}