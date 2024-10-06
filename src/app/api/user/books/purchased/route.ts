import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import { metadata, PrismaClient } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.cookies.get('userSessionId')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const userId = payload.id as string;

  const contentMetadata: metadata[] = await prisma.metadata.findMany({
    where: {
      content: {
        license: {
          some: {
            user_id: userId,
          },
        },
      },
    },
    include: {
      content: false,
    },
  });

  return NextResponse.json(contentMetadata);
}
