import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header/index";
import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

// --- TYPE DEFINITIONS ---
interface Product {
  id: number;
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  images: string[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="group relative">
      <div className="w-full bg-[#F7F5F3] aspect-square overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 p-8"
        />
        <div className="absolute top-3 left-3 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-medium text-gray-700 tracking-wider">
            {product.category.name}
          </span>
        </div>
        <button className="absolute top-3 right-3 bg-white/50 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-white transition-colors">
          <ShoppingBag size={18} />
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 uppercase">
            {product.category.name}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export function CategoryProductClient({ data }: { data: any }) {
  return (
    <div>
      <Header />
      <div className="bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header Section */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Star size={16} className="text-gray-800" fill="currentColor" />
            </div>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Collection
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 my-2">
              {data.name}
            </h1>
            <p className="max-w-md mx-auto text-gray-600 text-sm leading-relaxed">
              {data.description}
            </p>
          </header>

          {/* Filters & Sorting Section */}
          <div className="border-y border-gray-200 py-4 mb-10">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {data.products.length} PRODUCTS
                </span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <main>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
              {data.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
