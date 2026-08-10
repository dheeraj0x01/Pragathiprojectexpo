import { NextResponse } from 'next/server';
import { RegistrationService } from '@/services/registration.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId') || undefined;
    const userId = searchParams.get('userId') || undefined;

    const list = await RegistrationService.getRegistrations(eventId, userId);
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.eventId || !body.userId) {
      return NextResponse.json({ success: false, error: "eventId and userId are required" }, { status: 400 });
    }

    const reg = await RegistrationService.createRegistration(body);
    return NextResponse.json({ success: true, data: reg }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
