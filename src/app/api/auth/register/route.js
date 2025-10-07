export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import { User } from '../../../../lib/models';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    await dbConnect();
    const existing = await User.findOne({ email }).lean();
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
