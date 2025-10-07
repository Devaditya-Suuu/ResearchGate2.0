export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import { Publication } from '../../../lib/models';
import { publicationSchema } from '../../../lib/validation';

export async function GET() {
  await dbConnect();
  const pubs = await Publication.find().sort({ date: -1 }).lean();
  return NextResponse.json(pubs);
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const parsed = publicationSchema.parse(data);
    const created = await Publication.create(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten?.() || e.message }, { status: 422 });
    return NextResponse.json({ error: e.message || 'Bad request' }, { status: 400 });
  }
}
