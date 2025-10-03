import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Publication } from '@/lib/models';
import mongoose from 'mongoose';
import { publicationSchema } from '@/lib/validation';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const doc = await Publication.findById(id).lean();
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const data = await req.json();
    const parsed = publicationSchema.partial().parse(data);
    const updated = await Publication.findByIdAndUpdate(id, parsed, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten() }, { status: 422 });
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await Publication.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
