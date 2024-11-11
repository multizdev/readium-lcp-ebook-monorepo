import { NextResponse } from 'next/server';

import { PrismaClient, metadata } from '@prisma/client';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function GET(): Promise<NextResponse> {
  const prisma = new PrismaClient();
  const metadata: metadata[] = await prisma.metadata.findMany();

  const response = NextResponse.json(metadata);
  response.headers.set('Cache-Control', 'no-store, max-age=0');

  return response;
}
