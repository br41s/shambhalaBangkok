import * as cheerio from 'cheerio'
import { fromZonedTime } from 'date-fns-tz'

export type ParsedEvent = {
  title: string
  starts_at: string
  ends_at: string
  description: string
}

const EVENT_TIMEZONE = 'Asia/Bangkok'

export function parseEventEmail(html: string): ParsedEvent {
  const $ = cheerio.load(html)

  const title = extractTitle($)
  const dateTime = extractDateTime($)
  const description = extractDescription($)

  if (!title) {
    throw new Error('Could not extract event title')
  }

  if (!dateTime) {
    throw new Error('Could not extract event date/time')
  }

  return {
    title,
    starts_at: dateTime.startsAt,
    ends_at: dateTime.endsAt,
    description,
  }
}

function extractTitle($: cheerio.CheerioAPI): string | null {
  let title: string | null = null

  $('p').each((_, element) => {
    const text = $(element)
      .text()
      .replace(/\s+/g, ' ')
      .trim()

    if (!title && text.match(/our .+ course begins/i)) {
      const match = text.match(/our (.+?) course begins/i)

      if (match) {
        title = match[1].trim()
      }
    }
  })

  return title
}

function extractDateTime(
  $: cheerio.CheerioAPI
): {
  startsAt: string
  endsAt: string
} | null {
  const paragraphs = $('p').toArray()

  for (const element of paragraphs) {
    const text = $(element)
      .text()
      .replace(/\s+/g, ' ')
      .trim()

    const match = text.match(
      /begins on\s+\w+,\s+(\d{1,2})\s+(\w+),\s+from\s+(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/i
    )

    if (!match) {
      continue
    }

    const [
      ,
      dayString,
      monthString,
      startHourString,
      startMinuteString,
      endHourString,
      endMinuteString,
    ] = match

    const day = Number(dayString)
    const startHour = Number(startHourString)
    const startMinute = Number(startMinuteString)
    const endHour = Number(endHourString)
    const endMinute = Number(endMinuteString)

    const month = getMonthNumber(monthString)

    if (month === null) {
      throw new Error(`Unknown month: ${monthString}`)
    }

    // Temporary while testing this email.
    const year = 2026

    const dateString = [
      year,
      String(month + 1).padStart(2, '0'),
      String(day).padStart(2, '0'),
    ].join('-')

    const startsAt = fromZonedTime(
      `${dateString} ${String(startHour).padStart(2, '0')}:${String(
        startMinute
      ).padStart(2, '0')}:00`,
      EVENT_TIMEZONE
    )

    const endsAt = fromZonedTime(
      `${dateString} ${String(endHour).padStart(2, '0')}:${String(
        endMinute
      ).padStart(2, '0')}:00`,
      EVENT_TIMEZONE
    )

    return {
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    }
  }

  return null
}

function getMonthNumber(month: string): number | null {
  const months: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  }

  return months[month.toLowerCase()] ?? null
}

function extractDescription($: cheerio.CheerioAPI): string {
  const paragraphs: string[] = []

  let started = false

  $('p').each((_, element) => {
    const text = $(element)
      .text()
      .replace(/\s+/g, ' ')
      .trim()

    if (!text) {
      return
    }

    // Start collecting at the main course description.
    if (text.match(/This five-week course explores/i)) {
      started = true
    }

    if (started) {
      // Don't include the email footer or administrative details.
      if (
        text.match(
          /Warm wishes|Stay Connected|Course Fee/i
        )
      ) {
        return
      }

      paragraphs.push(text)
    }
  })

  return paragraphs.join('\n\n')
}
