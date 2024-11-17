import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient, metadata } from '@prisma/client';

export async function POST(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const { id, values } = await req.json(); // Expecting `id` to identify the record and `values` for the update data
  const prisma = new PrismaClient();

  console.log('ID', id);

  try {
    const data: metadata = await prisma.metadata.update({
      where: { id: id }, // Ensure you provide the correct field for identification
      data: values,
    });

    console.log('DATA', data);

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
