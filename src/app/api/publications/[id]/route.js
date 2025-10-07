export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import { Publication } from '../../../../lib/models';
import { publicationSchema } from '../../../../lib/validation';

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();
  const item = await Publication.findById(id).lean();
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    const data = await req.json();
    const parsed = publicationSchema.partial().parse(data);
    const updated = await Publication.findByIdAndUpdate(id, parsed, { new: true });
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
  await Publication.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
