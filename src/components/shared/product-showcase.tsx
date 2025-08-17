"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ShoppingBag } from "lucide-react";
import React from "react";

// --- Types ---
interface Product {
  id: number;
  brand: string;
  name: string;
  type: string;
  price: number;
  imageUrl: string;
}

// --- Mock Data ---
const products: Product[] = [
  {
    id: 1,
    brand: "GLOWBEAUTY",
    name: "CLAY MASK",
    type: "LIGHT BLUE",
    price: 199.0,
    imageUrl: "face-3.webp",
  },
  {
    id: 2,
    brand: "GLOWBEAUTY",
    name: "HYDRATING SHEET MASK",
    type: "WHITE",
    price: 299.0,
    imageUrl: "face-5.webp",
  },
  {
    id: 3,
    brand: "GLOWBEAUTY",
    name: "EXFOLIATING MASK",
    type: "GREEN",
    price: 399.0,
    imageUrl: "face-2.webp",
  },
  {
    id: 4,
    brand: "GLOWBEAUTY",
    name: "CHARCOAL MASK",
    type: "CHARCOAL",
    price: 155.0,
    imageUrl: "face-1.webp",
  },
  {
    id: 5,
    brand: "GLOWBEAUTY",
    name: "CLAY MASK",
    type: "LIGHT BLUE",
    price: 199.0,
    imageUrl: "face-2-2.webp",
  },
];

// --- Components ---
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="p-4">
    <div
      className="rounded-lg relative flex flex-col justify-end h-96 bg-center bg-cover text-left overflow-hidden"
      style={{ backgroundImage: `url(${product.imageUrl})` }}
    >
      <div className="absolute top-4 left-4 text-xs font-semibold tracking-widest bg-white/80 px-3 py-1 rounded">
        {product.brand}
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
  </div>
);

const CurvedArrow = () => (
  <svg
    width="150"
    height="100"
    viewBox="0 0 150 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -bottom-12 left-1/2 transform -translate-x-1/4"
  >
    <path
      d="M1 1C1 55.5 45.5 99 99 99"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M99 99L93 93M99 99L105 93"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProductShowcase: React.FC = () => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <div className="max-w-7xl mx-auto my-20 overflow-hidden">
        {/* Header */}
        <div className="bg-white font-serif p-8 flex items-center justify-between w-full mb-10">
          <div className="flex-shrink-0 ">
            <button className="border border-gray-800 text-gray-800 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 text-sm tracking-widest">
              EXPLORE COLLECTION
            </button>
          </div>

          {/* Central text block with "Explore Face Wash" and the curved arrow */}
          <div className="text-center relative">
            <h2 className="text-5xl text-gray-300">Explore</h2>
            <h1 className="text-6xl italic text-gray-900 -mt-4">Face Wash</h1>
            <CurvedArrow />
          </div>

          {/* Description text to the right of the central text */}
          <div className="max-w-xs text-gray-600 leading-relaxed text-sm">
            <p>
              A GENTLE CLEANSER FOR ALL SKIN TYPES. REMOVES IMPURITIES AND
              MAKEUP. LEAVES SKIN FRESH AND CLEAN. PERFECT FOR DAILY USE.
            </p>
          </div>

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
          {products.map((product) => (
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
