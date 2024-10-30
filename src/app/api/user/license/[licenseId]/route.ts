import { PrismaClient, user } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { generateSha256 } from '@/server/util';
import axios from 'axios';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { licenseId: string } },
) {
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

  const { licenseId } = params;

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const userId = payload.id as string;

  const user: user | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    const hex_value = generateSha256('123456');

    const licenseUrl = `http://localhost:8989/licenses/${licenseId}`;

    const licensePayload = {
      user: {
        email: user.email,
        encrypted: ['email'],
      },
      encryption: {
        user_key: {
          text_hint: user.name,
          hex_value,
        },
      },
    };

    const response = await axios.post(licenseUrl, licensePayload, {
      auth: {
        username: process.env.LCP_USERNAME || 'lcp-user',
        password: process.env.LCP_PASSWORD || 'lcp-pass',
      },
    });

    // Return the .lcpl file as a download response
    const responseData =
      typeof response.data === 'object'
        ? JSON.stringify(response.data)
        : response.data;

    // Return the .lcpl file as a download response
    return new NextResponse(responseData, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.readium.lcp.license.v1.0+json',
        'Content-Disposition': 'attachment; filename="license.lcpl"',
      },
    });
  } else {
    return NextResponse.json(
      { error: 'Could not fetch license' },
      { status: 500 },
    );
  }
}
