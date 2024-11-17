import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient, metadata } from '@prisma/client';

export async function POST(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const { id, values } = await req.json(); // Expecting `id` to identify the record and `values` for the update data
  const prisma = new PrismaClient();

  try {
    const data: metadata = await prisma.metadata.update({
      where: { id }, // Ensure you provide the correct field for identification
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
