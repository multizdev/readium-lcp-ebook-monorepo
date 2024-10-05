import { NextRequest, NextResponse } from 'next/server';

import { v4 as uuidv4 } from 'uuid';

import { generateSha256 } from '@/server/util';
import { generateLicense } from '@/server/readium/license';

export async function POST(req: NextRequest): Promise<Response | undefined> {
  const { content_id }: { content_id: string } = await req.json();

  // User information for license generation
  const userInfo = {
    id: uuidv4(),
    email: 'user@example.com',
    hint: 'The title of the first book you ever read',
    passphraseHash: generateSha256('userHash'), // Use SHA-256 hashed passphrase
  };

  const provider = 'http://localhost:3000'; // Replace with your provider

  // Rights information for the license
  const rights = {
    print: 10, // Allow 10 pages to be printed
    copy: 2048, // Allow 2048 characters to be copied
    start: '2024-09-08T01:00:00Z',
    end: '2024-12-08T01:00:00Z',
  };

  try {
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

    return NextResponse.json({
      license: {
        ...licenseResponse.data,
      },
      content_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR', error.message);
      return NextResponse.json(
        { error: `File upload or publish failed: ${error}` },
        { status: 500 },
      );
    }
  }
}
