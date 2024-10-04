import { NextResponse } from 'next/server';

import { PrismaClient, content } from '@prisma/client';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function GET(): Promise<NextResponse> {
  const prisma = new PrismaClient();
  const allContent: content[] = await prisma.content.findMany({
    include: {
      metadata: true,
    },
  });

  return NextResponse.json(allContent);
}
