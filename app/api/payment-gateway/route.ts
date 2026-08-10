import { NextResponse } from 'next/server';
import { processMockPayment } from '@/lib/payment-placeholder';

/**
 * ============================================================================
 * SRU PRAGATHI - PAYMENT GATEWAY API ROUTE PLACEHOLDER
 * ============================================================================
 * Endpoint for payment verification and order creation.
 * College Tech Team can drop in Razorpay/Paytm SDK logic here.
 * ============================================================================
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await processMockPayment({
      eventId: body.eventId || "evt_hack_01",
      eventName: body.eventName || "HackPragathi 2026",
      amount: body.amount || 250,
      userName: body.userName || "Participant",
      userEmail: body.userEmail || "user@sru.edu.in",
    });

    return NextResponse.json({
      success: true,
      message: "Payment Gateway integration hook operational (College Placeholder Mode).",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
