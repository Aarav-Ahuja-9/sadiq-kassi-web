import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { saveLocalProduct } from '@/lib/localDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, image, category, specs, weights } = body;

    if (!name || !price || !description || !image || !category) {
      return NextResponse.json({ error: 'Missing required product fields.' }, { status: 400 });
    }

    const newProduct = {
      _id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      price: Number(price),
      description,
      image,
      category,
      specs: specs || 'Material: Forged Carbon Steel | Finish: Traditional Blacksmith Oil Finish',
      weights: weights || ['1.5', '2.0', '2.5']
    };

    let saved = false;

    // 1. Try to save to MongoDB
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('sadiq-kassi');
        await db.collection('products').insertOne(newProduct);
        saved = true;
        console.log(`Saved product ${newProduct._id} to MongoDB.`);
      } catch (dbError) {
        console.error('Failed to write product to MongoDB, falling back to local file:', dbError);
      }
    }

    // 2. Fallback to Local JSON DB
    if (!saved) {
      saved = saveLocalProduct(newProduct);
      console.log(`Saved product ${newProduct._id} to local JSON file.`);
    }

    if (!saved) {
      return NextResponse.json({ error: 'Failed to write product record.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error('Admin Products API error:', error);
    return NextResponse.json({ error: 'Failed to save product.' }, { status: 500 });
  }
}
