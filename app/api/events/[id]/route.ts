import { NextResponse } from 'next/server';
import { EventService } from '@/services/event.service';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const eventItem = await EventService.getEventById(id);
    if (!eventItem) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: eventItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await EventService.updateEvent(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await EventService.deleteEvent(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
