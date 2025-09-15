import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header/index";
import { Star } from "lucide-react";

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
