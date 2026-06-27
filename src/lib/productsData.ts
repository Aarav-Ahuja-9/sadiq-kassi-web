export interface Product {
  id: string;
  name: string;
  description: string;
  specs: string;
  price: number;
  weights: string[];
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "traditional-lahori",
    name: "Traditional Lahori Kassi",
    description: "Generational Punjab craftsmanship. Forged with premium high-carbon steel, heat-treated for maximum durability in both soft and hard soils. Perfect balance and weight for construction and general soil work.",
    specs: "Material: Carbon Steel | Handle: Shisham Wood | Edge: Heat-Treated | Finish: Matte Oil",
    price: 1500,
    weights: ["1.5", "2.0", "2.5"],
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800",
    category: "General Purpose"
  },
  {
    id: "heavy-mattock",
    name: "Heavy Duty Mattock",
    description: "Industrial-grade forged head engineered specifically to break through rocky, hard, and root-filled ground. Exceptional strength, dual forged edge, and maximum impact resistance.",
    specs: "Material: Industrial Steel | Handle: Kikar Wood | Edge: Dual Forged | Impact: High",
    price: 1850,
    weights: ["2.5", "3.0"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    category: "Heavy Duty"
  },
  {
    id: "farming-hoe",
    name: "Precision Farming Hoe",
    description: "Lightweight and perfectly balanced for detailed crop weeding, soil aeration, and prolonged tasks. Designed for soft agricultural soil and creating precise ridges.",
    specs: "Material: Light Alloy Steel | Handle: Shisham Wood | Weight Class: Ultra-Light",
    price: 1200,
    weights: ["1.2", "1.5"],
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800",
    category: "Agriculture"
  }
];
