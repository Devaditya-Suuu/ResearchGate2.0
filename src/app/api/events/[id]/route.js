import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import { Event } from '../../../../lib/models';
import mongoose from 'mongoose';
import { eventSchema } from '../../../../lib/validation';

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const event = await Event.findById(id).lean();
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const data = await req.json();
    const parsed = eventSchema.partial().parse(data);
    const updated = await Event.findByIdAndUpdate(id, parsed, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten?.() || e.message }, { status: 422 });
    return NextResponse.json({ error: e.message || 'Bad request' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await dbConnect();
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
