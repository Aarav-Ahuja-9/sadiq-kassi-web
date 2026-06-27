import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getLocalOrders } from '@/lib/localDb';

export async function GET() {
  try {
    let orders: any[] = [];
    let loadedFromDb = false;

    // 1. Fetch from MongoDB if available
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('sadiq-kassi');
        orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
        loadedFromDb = true;
      } catch (dbError) {
        console.error('Failed to read orders from MongoDB, falling back to local file:', dbError);
      }
    }

    // 2. Fetch from Local JSON DB
    if (!loadedFromDb) {
      orders = getLocalOrders();
      // Sort local orders by date descending
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error('Admin Orders API error:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders.' }, { status: 500 });
  }
}
