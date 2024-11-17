import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get('sessionId')?.value ||
    req.cookies.get('userSessionId')?.value;

  // Check if the request is for '/admin'
  if (req.nextUrl.pathname === '/admin') {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);

        // Redirect to '/admin/dashboard' if the token is valid
        return NextResponse.redirect(
          new URL('/admin/dashboard', req.nextUrl.origin),
        );
      } catch (error) {
        // If token verification fails, redirect to home
        return NextResponse.redirect(new URL('/', req.nextUrl.origin));
      }
    } else {
      // If no token, redirect to home
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  // For other paths, proceed with the token validation
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
    '/admin/:path*',
    '/mybooks/:path*',
  ],
};
