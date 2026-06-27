import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { findLocalUserByEmail, saveLocalUser, getLocalUsers } from '@/lib/localDb';
import { cookies } from 'next/headers';

// Helper to check if Postgres Database URL is active
const isDbActive = !!process.env.DATABASE_URL;

export async function POST(request: Request, context: { params: Promise<{ 'better-auth': string[] }> }) {
  try {
    const params = await context.params;
    const pathSegments = params['better-auth'];
    const action = pathSegments.join('/');

    const body = await request.json().catch(() => ({}));

    // 1. SIGN UP
    if (action === 'signup/email') {
      const { email, password, name } = body;
      if (!email || !password || !name) {
        return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
      }

      if (isDbActive) {
        // Query Prisma Postgres
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
          return NextResponse.json({ error: 'Account with this email already exists.' }, { status: 400 });
        }
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password // In production, hash this with bcrypt/argon2
          }
        });
        return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      } else {
        // Query Local Fallback JSON DB
        const existing = findLocalUserByEmail(email);
        if (existing) {
          return NextResponse.json({ error: 'Account with this email already exists.' }, { status: 400 });
        }
        const mockId = `usr_${Math.random().toString(36).substr(2, 9)}`;
        const user = { id: mockId, name, email, password, createdAt: new Date().toISOString() };
        saveLocalUser(user);
        return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      }
    }

    // 2. SIGN IN
    if (action === 'signin/email') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }

      let matchedUser: any = null;

      if (isDbActive) {
        // Query Prisma Postgres
        matchedUser = await prisma.user.findFirst({
          where: { email, password } // Plaintext comparison for mock sandbox, should use bcrypt compare in production
        });
      } else {
        // Query Local Fallback JSON DB
        const user = findLocalUserByEmail(email);
        if (user && user.password === password) {
          matchedUser = user;
        }
      }

      if (!matchedUser) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
      }

      // Set a mock session cookie
      const sessionUser = { id: matchedUser.id || matchedUser._id, name: matchedUser.name, email: matchedUser.email };
      const cookieStore = await cookies();
      cookieStore.set('session_user', JSON.stringify(sessionUser), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ success: true, user: sessionUser });
    }

    // 3. FORGOT PASSWORD
    if (action === 'forget-password') {
      const { email } = body;
      if (!email) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
      }

      let userExists = false;

      if (isDbActive) {
        const user = await prisma.user.findUnique({ where: { email } });
        userExists = !!user;
      } else {
        const user = findLocalUserByEmail(email);
        userExists = !!user;
      }

      if (!userExists) {
        return NextResponse.json({ error: 'No account registered with this email.' }, { status: 404 });
      }

      // Generate a simulated security code/reset link
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`[AUTH SANDBOX] Password reset code generated for ${email}: ${resetCode}`);

      return NextResponse.json({
        success: true,
        message: 'Password reset code generated.',
        code: resetCode // Passed in response so the sandbox UI can display it for manual testing!
      });
    }

    // 4. SIGN OUT
    if (action === 'sign-out') {
      const cookieStore = await cookies();
      cookieStore.delete('session_user');
      return NextResponse.json({ success: true, message: 'Logged out successfully.' });
    }

    return NextResponse.json({ error: `POST route not found: ${action}` }, { status: 404 });

  } catch (error: any) {
    console.error('Auth API POST error:', error);
    return NextResponse.json({ error: error.message || 'Server error during authentication.' }, { status: 500 });
  }
}

export async function GET(request: Request, context: { params: Promise<{ 'better-auth': string[] }> }) {
  try {
    const params = await context.params;
    const pathSegments = params['better-auth'];
    const action = pathSegments.join('/');

    // 1. GET SESSION
    if (action === 'session') {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session_user');
      
      if (!sessionCookie || !sessionCookie.value) {
        return NextResponse.json({ session: null });
      }

      const sessionData = JSON.parse(sessionCookie.value);
      return NextResponse.json({
        session: {
          id: `sess_${Math.random().toString(36).substr(2, 9)}`,
          userId: sessionData.id,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000).toISOString()
        },
        user: sessionData
      });
    }

    return NextResponse.json({ error: `GET route not found: ${action}` }, { status: 404 });

  } catch (error: any) {
    console.error('Auth API GET error:', error);
    return NextResponse.json({ error: 'Server error retrieving session.' }, { status: 500 });
  }
}
