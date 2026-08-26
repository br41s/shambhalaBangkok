import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(
  request: NextRequest
) {
    try {
      const payload = await request.json();
      console.log(payload);

      const { data, error } = await resend.emails.receiving.get(
      payload.data.email_id
      );
      
      if (data) {
        console.log(data);
      } else if (error) {
        console.log(error);
      }
      return NextResponse.json(payload);
    } catch (error) {
      console.log(error);

      return new NextResponse(`Error: ${error}`, { status: 500});
    }
}
