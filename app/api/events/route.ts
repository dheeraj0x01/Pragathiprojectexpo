import { NextResponse } from 'next/server';
import { EventService } from '@/services/event.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as any;
    const status = searchParams.get('status') as any;
    const search = searchParams.get('search') || undefined;

    const events = await EventService.getEvents(category, status, search);
    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, error: "Title and Category are required" }, { status: 400 });
    }
    const newEvent = await EventService.createEvent(body);
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
