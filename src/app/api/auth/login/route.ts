import { NextRequest, NextResponse } from 'next/server';

// TODO: remove this mock data
const MOCK_USERS = [
  {
    id: 1,
    email: 'professor@university.edu',
    password: 'password123',
    name: 'John Smith',
  },
  {
    id: 2,
    email: 'admin@university.edu',
    password: 'admin123',
    name: 'Admin User',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const response = {
      accessToken: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
