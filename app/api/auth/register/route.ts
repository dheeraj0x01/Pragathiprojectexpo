import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, phone, college, department, rollNo } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }

    const newUser = {
      id: `usr_reg_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      role: 'PARTICIPANT',
      college: college || 'SR University',
      department: department || 'Computer Science & Engineering',
      rollNo: rollNo || '2203A51000',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Participant registration account created successfully',
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Registration processing failed' }, { status: 500 });
  }
}
