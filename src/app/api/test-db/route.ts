import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ message: "Connection Failed", error: "MONGODB_URI is not configured" }, { status: 500 });
    }
    const client = await clientPromise;
    const db = client.db("sadiq-kassi"); // Database ka naam
    return NextResponse.json({ message: "Database Connected Successfully!" });
  } catch (e: any) { 
    return NextResponse.json({ message: "Connection Failed", error: e.message || e });
  }
}
