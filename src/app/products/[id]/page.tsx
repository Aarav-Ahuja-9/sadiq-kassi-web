import { redirect } from 'next/navigation';
import { products } from '@/lib/productsData';
import ProductDetailsClient from './ProductDetailsClient';
import clientPromise from '@/lib/mongodb';
import { getLocalProducts } from '@/lib/localDb';

// Helper to fetch details from DB if exists, otherwise fallback to local
async function getProduct(id: string) {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("sadiq-kassi");
      const dbProduct = await db.collection("products").findOne({ _id: id as any });
      if (dbProduct) {
        // Map DB fields to the structure expected by ProductDetailsClient
        return {
          id: dbProduct._id.toString(),
          name: dbProduct.name,
          description: dbProduct.description,
          specs: dbProduct.specs || "Material: Forged Carbon Steel | Finish: Traditional Blacksmith Oil Finish",
          price: dbProduct.price,
          weights: dbProduct.weights || ["1.5", "2.0", "2.5"],
          image: dbProduct.image
        };
      }
    }
  } catch (e) {
    console.error("Database fetch failed for product, falling back to local array:", e);
  }

  // Fallback including local JSON database products
  const allProducts = [
    ...products,
    ...getLocalProducts().map((p: any) => ({
      id: p._id || p.id,
      name: p.name,
      description: p.description,
      specs: p.specs || "Material: Forged Carbon Steel | Finish: Traditional Blacksmith Oil Finish",
      price: p.price,
      weights: p.weights || ["1.5", "2.0", "2.5"],
      image: p.image
    }))
  ];
  return allProducts.find(p => p.id === id) || null;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    redirect('/products');
  }

  const relatedProducts = products.filter(p => p.id !== id);

  return (
    <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
  );
}
