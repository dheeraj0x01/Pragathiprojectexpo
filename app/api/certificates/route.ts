import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "COMING_SOON",
    module: "Automated Certificate Generator",
    message: "API endpoint shell ready. TODO: College dev team connect PDF generation pipeline.",
  });
}
