import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';
import { Publication } from '@/types';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  let token = req.cookies.get('userSessionId')?.value;

  // If token is not in cookies, try to retrieve it from the Authorization header
  if (!token) {
    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
    }
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const userId = payload.id as string;

  const licenseWithMetadata: Publication[] = await prisma.license.findMany({
    where: {
      user_id: userId,
    },
    include: {
      content: {
        select: {
          metadata: true,
        },
      },
    },
  });

  return NextResponse.json(licenseWithMetadata);
}
