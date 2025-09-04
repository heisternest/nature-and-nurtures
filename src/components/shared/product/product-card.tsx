import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: { name: string; id: string } | null;
  type?: string;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link href={`/product/${product.id}`} className="p-4">
    <div
      className="rounded-lg relative flex flex-col justify-end h-96 bg-center bg-cover text-left overflow-hidden"
      style={{ backgroundImage: `url(${product.images[0]})` }}
    >
      <div className="absolute top-4 left-4 text-xs font-semibold tracking-widest bg-white/80 px-3 py-1 rounded">
        {product.category?.name || "Uncategorized"}
      </div>
      <div className="absolute top-4 right-4 border border-gray-300 rounded-full p-2 bg-white/80">
        <ShoppingBag size={16} className="text-gray-600" />
      </div>
      <div className="relative z-10 p-4 bg-gradient-to-t from-white/90 via-white/60 to-transparent">
        <h3 className="font-semibold text-sm tracking-widest text-gray-900">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs tracking-widest">{product.type}</p>
        <p className="mt-2 font-semibold text-sm text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  </Link>
);
