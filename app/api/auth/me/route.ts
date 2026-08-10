import { NextResponse } from 'next/server';
import { DEFAULT_CURRENT_USER } from '@/lib/auth';

export async function GET() {
  return NextResponse.json({
    success: true,
    user: DEFAULT_CURRENT_USER,
  });
}
