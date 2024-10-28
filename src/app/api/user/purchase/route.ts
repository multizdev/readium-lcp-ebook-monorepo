import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import { PrismaClient, user as User } from '@prisma/client';

import { generateSha256 } from '@/server/util';
import { generateLicense } from '@/server/readium/license';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');
const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<Response | undefined> {
  const { content_id }: { content_id: string } = await req.json();
  const token = req.cookies.get('userSessionId')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    // Find user details from the database
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { id, email, name } = user;

    // User information for license generation
    const userInfo = {
      id,
      email,
      hint: name,
      passphraseHash: generateSha256('123456'), // Use SHA-256 hashed passphrase
    };

    // const provider = process.env.PROVIDER || ''; // Replace with your provider
    const provider = 'http://192.168.18.109:3000';

    // Rights information for the license
    const rights = {
      print: 10, // Allow 10 pages to be printed
      copy: 2048, // Allow 2048 characters to be copied
      start: '2024-09-08T01:00:00Z',
      end: '2024-12-08T01:00:00Z',
    };

    // Generate the license for the content
    const licenseResponse = await generateLicense(
      content_id,
      provider,
      userInfo,
      rights,
    );

    if (licenseResponse.status !== 201) {
      throw new Error('Failed to generate license');
    }

    console.log('User', userInfo);

    console.log('License', licenseResponse.data);

    return NextResponse.json({
      license: {
        ...licenseResponse.data,
      },
      content_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `License generation failed: ${error}` },
        { status: 500 },
      );
    }
  }
}
