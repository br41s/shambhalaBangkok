import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { parseEventEmail } from '@/lib/event-parser'
import {
  createEvent,
  updateEventImage,
} from '@/lib/events'
import { uploadEventImage } from '@/lib/event-image'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    if (payload.type !== 'email.received') {
      return NextResponse.json({ received: true })
    }

    const emailId = payload.data?.email_id

    if (!emailId) {
      return NextResponse.json(
        { error: 'Missing email_id' },
        { status: 400 }
      )
    }

    // Retrieve the complete email from Resend.
    const { data: email, error: emailError } =
      await resend.emails.receiving.get(emailId)

    if (emailError || !email) {
      console.error(
        'Failed to retrieve email:',
        emailError
      )

      return NextResponse.json(
        { error: 'Failed to retrieve email' },
        { status: 500 }
      )
    }

    if (!email.html) {
      return NextResponse.json(
        { error: 'Email has no HTML content' },
        { status: 422 }
      )
    }

    // Parse the email into our event structure.
    const parsedEvent = parseEventEmail(email.html)

    console.log('Parsed event:', parsedEvent)

    // Create the event as an unpublished draft.
    const event = await createEvent(
      parsedEvent,
      emailId
    )

    console.log('Created event:', event)

    // Look for an image attachment and upload it.
    const imagePath = await uploadEventImage(
      emailId,
      event.id
    )

    if (imagePath) {
      await updateEventImage(
        event.id,
        imagePath
      )

      console.log(
        'Uploaded event image:',
        imagePath
      )
    }

    return NextResponse.json({
      success: true,
      eventId: event.id,
      image: imagePath,
    })
  } catch (error) {
    console.error('Webhook error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}