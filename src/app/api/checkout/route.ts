import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { saveLocalOrder } from '@/lib/localDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, customerName, phoneNumber, address, paymentMethod } = body;

    if (!items || !total || !customerName || !phoneNumber || !address || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required checkout details.' }, { status: 400 });
    }

    const orderId = `SDK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newOrder = {
      orderId,
      customerName,
      phoneNumber,
      address,
      items,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'Paid' : 'Pending (COD)',
      createdAt: new Date().toISOString(),
      status: 'Order Placed'
    };

    let saved = false;

    // 1. Try to save to MongoDB
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('sadiq-kassi');
        await db.collection('orders').insertOne({ ...newOrder, _id: orderId as any });
        saved = true;
        console.log(`Saved order ${orderId} to MongoDB.`);
      } catch (dbError) {
        console.error('Failed to write order to MongoDB, falling back to local file:', dbError);
      }
    }

    // 2. Fallback to Local JSON DB if not saved
    if (!saved) {
      saved = saveLocalOrder(newOrder);
      console.log(`Saved order ${orderId} to local JSON file.`);
    }

    if (!saved) {
      return NextResponse.json({ error: 'Failed to write order records.' }, { status: 500 });
    }

    // Generate a mock online transaction ID if paying online
    const paymentId = paymentMethod === 'online' 
      ? `pay_mock_${Math.random().toString(36).substr(2, 9)}` 
      : null;

    return NextResponse.json({
      success: true,
      orderId,
      paymentId,
      message: 'Order created successfully!'
    });

  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: error.message || 'Server error during checkout.' }, { status: 500 });
  }
}
