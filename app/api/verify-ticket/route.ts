import { NextResponse } from 'next/server';
import { CheckInService } from '@/services/checkin.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketCode, volunteerId, gateLocation } = body;

    if (!ticketCode) {
      return NextResponse.json({ success: false, error: "ticketCode is required" }, { status: 400 });
    }

    const result = await CheckInService.verifyAndRecordCheckIn(
      ticketCode,
      volunteerId || "usr_vol_05",
      gateLocation || "Main Entrance Gate 1"
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
