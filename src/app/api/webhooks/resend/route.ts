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
    // IMPORTANT:
    // Get the raw body first. Signature verification requires
    // the exact bytes that Resend sent.
    const payload = await request.text()

    // Verify that this request actually came from Resend.
    const event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') ?? '',
        timestamp: request.headers.get('svix-timestamp') ?? '',
        signature: request.headers.get('svix-signature') ?? '',
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
    })

    // Only process email.received events.
    if (event.type !== 'email.received') {
      return NextResponse.json({
        received: true,
      })
    }

    const emailId = event.data?.email_id

    if (!emailId) {
      return NextResponse.json(
        { error: 'Missing email_id' },
        { status: 400 }
      )
    }

    console.log(
      `Processing Resend email: ${emailId}`
    )

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

    // Create the event, or return the existing event if this
    // email has already been processed.
    const eventRecord = await createEvent(
      parsedEvent,
      emailId
    )

    console.log(
      'Created/found event:',
      eventRecord.id
    )

    // Look for an image attachment and upload it.
    const imagePath = await uploadEventImage(
      emailId,
      eventRecord.id
    )

    if (imagePath) {
      await updateEventImage(
        eventRecord.id,
        imagePath
      )

      console.log(
        'Uploaded event image:',
        imagePath
      )
    }

    return NextResponse.json({
      success: true,
      eventId: eventRecord.id,
      image: imagePath,
    })
  } catch (error) {
    console.error('Webhook error:', error)

    return new NextResponse(
      'Invalid webhook or processing error',
      { status: 400 }
    )
  }
}