import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sadiq-kassi"); // Database ka naam
    return NextResponse.json({ message: "Database Connected Successfully!" });
  } catch (e) { 
    return NextResponse.json({ message: "Connection Failed", error: e });
  }
}
