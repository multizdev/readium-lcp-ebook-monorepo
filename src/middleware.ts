import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  let token =
    req.cookies.get('sessionId')?.value ||
    req.cookies.get('userSessionId')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  try {
    await jwtVerify(token, JWT_SECRET);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/admin/:path*',
    '/admin/dashboard/:path*',
    '/mybooks/:path*',
  ],
};
