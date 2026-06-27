import clientPromise from '@/lib/mongodb';
import ProductsCatalog from './ProductsCatalog';
import { getLocalProducts } from '@/lib/localDb';

const DEFAULT_PRODUCTS = [
  {
    _id: "traditional-lahori",
    name: "Traditional Lahori Kassi",
    price: 1500,
    description: "Generational Punjab craftsmanship. Perfect balance and weight for construction and general soil work.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800",
    category: "General Purpose"
  },
  {
    _id: "heavy-mattock",
    name: "Heavy Duty Mattock",
    price: 1850,
    description: "Built for rocky, hard, and root-filled ground. Exceptional strength and impact resistance.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    category: "Heavy Duty"
  },
  {
    _id: "farming-hoe",
    name: "Precision Farming Hoe",
    price: 1200,
    description: "Designed for soft agricultural soil, weeding, and creating ridges. Light and precise.",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800",
    category: "Agriculture"
  }
];

// Data Fetching Function
async function getProducts() {
  try {
    if (!clientPromise) {
      console.log("No MongoDB URI configured, using fallback products list.");
      return [...DEFAULT_PRODUCTS, ...getLocalProducts()];
    }
    const client = await clientPromise;
    const db = client.db("sadiq-kassi");
    const products = await db.collection("products").find({}).toArray();
    
    const dbProductsMapped = products.map(p => ({
      ...p,
      _id: p._id.toString()
    }));
    return [...DEFAULT_PRODUCTS, ...dbProductsMapped, ...getLocalProducts()];
  } catch (e) {
    console.error("Failed to fetch products from MongoDB, using fallback:", e);
  }
  return [...DEFAULT_PRODUCTS, ...getLocalProducts()];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px' }}>
      <ProductsCatalog initialProducts={products as any} />
    </div>
  );
}