export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import { Merchandise } from '../../../../lib/models';
import { merchandiseSchema } from '../../../../lib/validation';

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();
  const item = await Merchandise.findById(id).lean();
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    const data = await req.json();
    const parsed = merchandiseSchema.partial().parse(data);
    const updated = await Merchandise.findByIdAndUpdate(id, parsed, { new: true });
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
  await Merchandise.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
