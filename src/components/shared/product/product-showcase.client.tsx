"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link href={`/products/${product.slug}`} className="p-4">
    <div
      className="rounded-lg relative flex flex-col justify-end h-96 bg-center bg-cover text-left overflow-hidden"
      style={{
        ...(product.images && product.images.length > 0
          ? {
              backgroundImage: `url(${imageThumbnailUrl(
                product.images[0],
                200,
                300
              )})`,
            }
          : {}),
      }}
    >
      {product.category && (
        <div className="absolute top-4 left-4 text-xs font-semibold tracking-widest bg-white/80 px-3 py-1 rounded">
          {product.category.title}
        </div>
      )}

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

export const ProductShowcaseClient = ({ products }: { products: any }) => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <div className="max-w-7xl mx-auto my-20 overflow-hidden">
        {/* Header */}
        <div className="bg-white font-serif p-8 flex items-center justify-between w-full mb-10">
          {/* Central text block with "Explore Face Wash" and the curved arrow */}
          <div className="text-center relative">
            <h2 className="text-5xl text-gray-300">Explore</h2>
            <h1 className="text-6xl italic text-gray-900 -mt-4">
              Our Products
            </h1>
          </div>

          {/* Description text to the right of the central text */}

          {/* Navigation arrows on the far right */}
          <div className="flex items-center space-x-4">
            <CarouselNext className="relative border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition-colors">
              <ChevronRight size={18} />
            </CarouselNext>
            <CarouselPrevious className="relative border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition-colors"></CarouselPrevious>
          </div>
        </div>

        {/* Carousel */}
        <CarouselContent className="ml-0">
          {products.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};
