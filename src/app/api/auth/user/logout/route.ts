import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
  try {
    // Create a response and clear the sessionId cookie
    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.set('userSessionId', '', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      path: '/',
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
