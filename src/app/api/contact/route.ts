import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    // Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ResearchGate Club <noreply@sitresearchgate.com>',
        to: ['sitresearchgate@gmail.com'],
        subject: `Contact Form: ${name}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 422 });
    }
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}
