import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Merchandise } from '@/lib/models';
import { merchandiseSchema } from '@/lib/validation';

export async function GET() {
  await dbConnect();
  const items = await Merchandise.find().lean();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const json = await req.json();
    const parsed = merchandiseSchema.parse(json);
    const created = await Merchandise.create(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.name === 'ZodError') return NextResponse.json({ error: e.flatten() }, { status: 422 });
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
