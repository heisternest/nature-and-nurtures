"use client";

import { ProductCard } from "@/components/product-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slider } from "@/components/ui/slider"; // ✅ Import shadcn slider
import { Star } from "lucide-react";
import { useMemo, useState } from "react";

export function CategoryProductClient({ data }: { data: any }) {
  // --- State for Filters & Sorting ---
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState(""); // "low" or "high"

  // --- Derived Product List ---
  const filteredProducts = useMemo(() => {
    let products = data.products.filter(
      (p: any) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "low") {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      products = [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data.products, priceRange, sortOrder]);

  // --- Handle slider changes ---
  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-10">
          <Breadcrumb>
            <BreadcrumbList className="flex flex-wrap text-xs sm:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Star size={16} className="text-gray-800" fill="currentColor" />
          </div>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
            Category
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-gray-900 my-2">
            {data.name}
          </h1>
          <p className="max-w-md mx-auto text-gray-600 text-xs sm:text-sm leading-relaxed">
            {data.description}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Filter --- */}
          <aside className="w-full lg:w-1/4 border border-gray-200 rounded-lg p-4 h-fit">
            <h3 className="text-sm font-semibold mb-4 uppercase text-gray-700">
              Filter by Price
            </h3>

            {/* Input Fields */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number(e.target.value),
                      Math.max(Number(e.target.value), priceRange[1]),
                    ])
                  }
                  min={0}
                  max={priceRange[1]}
                  className="border border-gray-300 rounded-md p-1 text-sm w-full"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      Math.min(priceRange[0], Number(e.target.value)),
                      Number(e.target.value),
                    ])
                  }
                  min={priceRange[0]}
                  max={1000}
                  className="border border-gray-300 rounded-md p-1 text-sm w-full"
                />
              </div>
            </div>

            {/* ✅ Shadcn Slider */}
            <div className="mt-4 mb-6">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handleSliderChange}
                min={0}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>

            <button
              onClick={() => setPriceRange([0, 1000])}
              className="mt-2 text-xs text-gray-600 underline"
            >
              Reset Filter
            </button>
          </aside>

          {/* --- Product Section --- */}
          <section className="w-full lg:w-3/4">
            <div className="border-y border-gray-200 py-3 sm:py-4 mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm gap-2">
              <span className="text-gray-600">
                {filteredProducts.length} PRODUCTS
              </span>

              {/* Sort Dropdown */}
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm"
                >
                  <option value="">Sort by</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <main>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-10">
                  {filteredProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">
                  No products found in this price range.
                </p>
              )}
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
