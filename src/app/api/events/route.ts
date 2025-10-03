import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Event } from '@/lib/models';
import { eventSchema } from '@/lib/validation';

export async function GET() {
  await dbConnect();
  const events = await Event.find().sort({ date: 1 }).lean();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const json = await req.json();
    const parsed = eventSchema.parse(json);
    const created = await Event.create(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten() }, { status: 422 });
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
