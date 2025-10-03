import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const adminWritePaths = [/^\/api\/(events|publications|merchandise)(\/.*)?$/];

export async function middleware(req: NextRequest) {
  if (req.method === 'GET') return NextResponse.next();
  const url = req.nextUrl.pathname;
  if (adminWritePaths.some(r => r.test(url))) {
    const token = await getToken({ req });
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};
