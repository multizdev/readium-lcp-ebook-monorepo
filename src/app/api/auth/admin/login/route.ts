import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient, admin } from '@prisma/client';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || ''; // Use a secure secret key

export async function POST(req: NextRequest): Promise<Response | undefined> {
  const prisma = new PrismaClient();

  try {
    const { username, password } = await req.json();

    // Find the admin by username
    const adminData: admin | null = await prisma.admin.findUnique({
      where: { username },
    });

    if (!adminData) {
      return NextResponse.json(
        { error: 'Invalid credentials not found' },
        { status: 401 },
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      adminData.password_hash,
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminData.id, username: adminData.username },
      JWT_SECRET,
      { expiresIn: '24h' }, // Token expires in 1 day
    );

    // Set the JWT token as an HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
    });
    response.cookies.set('sessionId', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: 'Invalid credentials not found' },
      { status: 401 },
    );
  }
}
