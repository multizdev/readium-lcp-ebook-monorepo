import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your_jwt_secret_key',
);
const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get('sessionId')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    // Find user details from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/auth/user/session'],
};
