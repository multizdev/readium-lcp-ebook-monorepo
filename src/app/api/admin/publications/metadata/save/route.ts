import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient, metadata } from '@prisma/client';

export async function POST(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const { values } = await req.json();
  const prisma = new PrismaClient();

  try {
    const data: metadata = await prisma.metadata.create({
      data: values,
    });

    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({
        error: e.message,
        status: 500,
      });
    }
  }
}
