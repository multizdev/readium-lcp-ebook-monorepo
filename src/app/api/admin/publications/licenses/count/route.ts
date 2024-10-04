import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(): Promise<NextResponse | undefined> {
  const prisma = new PrismaClient();

  const data: number = await prisma.license.count();

  return NextResponse.json({ count: data });
}
