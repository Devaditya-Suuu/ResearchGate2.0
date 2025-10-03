import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Publication } from '@/lib/models';
import { publicationSchema } from '@/lib/validation';

export async function GET() {
  await dbConnect();
  const items = await Publication.find().sort({ publishedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const json = await req.json();
    const parsed = publicationSchema.parse(json);
    const created = await Publication.create(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten() }, { status: 422 });
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
