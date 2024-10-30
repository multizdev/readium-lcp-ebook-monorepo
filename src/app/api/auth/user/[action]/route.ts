import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient, user } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || '';

const prisma = new PrismaClient();

// User Registration Endpoint
export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } },
): Promise<NextResponse> {
  if (params.action === 'register') {
    try {
      const { name, email, password } = await req.json();

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          id: uuid(),
          name,
          email,
          password_hash: hashedPassword,
        },
      });

      return NextResponse.json({
        message: 'User registered successfully',
        userId: newUser.id,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 },
      );
    }
  }

  if (params.action === 'login') {
    try {
      const { email, password } = await req.json();

      // Find the user by email
      const userData: user | null = await prisma.user.findUnique({
        where: { email },
      });

      if (!userData) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 },
        );
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(
        password,
        userData.password_hash,
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 },
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: userData.id, name: userData.name, email: userData.email },
        JWT_SECRET,
        { expiresIn: '24h' },
      );

      // Set the JWT token as an HTTP-only cookie
      const response = NextResponse.json({
        message: 'Login successful',
        token,
      });
      response.cookies.set('userSessionId', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export const config = {
  matcher: ['/api/[action]/user/:action*'],
};
