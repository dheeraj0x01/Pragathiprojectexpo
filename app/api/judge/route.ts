import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "COMING_SOON",
    module: "Judge Scoring System",
    message: "API endpoint shell ready. TODO: College dev team connect rubric scoring handler.",
  });
}

export async function POST() {
  return NextResponse.json({
    status: "COMING_SOON",
    module: "Judge Scoring System",
    message: "Score submitted to placeholder queue.",
  });
}
