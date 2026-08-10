import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required' }, { status: 400 });
    }

    // Match existing user or create temporary authenticated session
    let user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: role || 'PARTICIPANT',
        college: 'SR University',
        department: 'Computer Science & Engineering',
        rollNo: '22SRU01CS101',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server authentication error' }, { status: 500 });
  }
}
