import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header/index";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star } from "lucide-react";

export function CategoryProductClient({ data }: { data: any }) {
  return (
    <div>
      <Header />
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
              Collection
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-gray-900 my-2">
              {data.name}
            </h1>
            <p className="max-w-md mx-auto text-gray-600 text-xs sm:text-sm leading-relaxed">
              {data.description}
            </p>
          </header>

          {/* Filters & Sorting Section */}
          <div className="border-y border-gray-200 py-3 sm:py-4 mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm gap-2">
              <span className="text-gray-600">
                {data.products.length} PRODUCTS
              </span>
              {/* You can add sorting dropdown/buttons here later */}
            </div>
          </div>

          {/* Product Grid */}
          <main>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-10">
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
