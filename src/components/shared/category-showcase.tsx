"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

const categories = [
  "Skincare",
  "Makeup",
  "Haircare",
  "Fragrance",
  "Tools & Accessories",
];

const products = [
  {
    name: "Face Wash",
    category: "Skincare",
    imageUrl: "feature-6.webp",
  },
  {
    name: "Cleansers",
    category: "Skincare",
    imageUrl: "c1.webp",
  },
  {
    name: "Beauty Tools",
    category: "Tools & Accessories",
    imageUrl: "p2-1-1.webp",
  },
  {
    name: "Sunscreens",
    category: "Skincare",
    imageUrl: "p2-5.webp",
  },
  {
    name: "Moisturizers",
    category: "Skincare",
    imageUrl: "c5.webp",
  },
];

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 17L17 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7H17V17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ProductCardProps {
  product: {
    name: string;
    imageUrl: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="p-2">
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden group">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full bg-white/90 backdrop-blur-sm text-black px-4 py-3 rounded-lg flex justify-between items-center text-sm font-medium transition-colors duration-300 hover:bg-white">
            <span>{product.name.toUpperCase()}</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("Skincare");
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="bg-white text-neutral-800 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-start mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
              Find your own <em className="italic">unique style</em>, and
              thousands of brands.
            </h1>
          </div>
          <div className="mt-6 md:mt-0 text-left flex-shrink-0">
            <p className=" text-neutral-500 tracking-wider">
              GET 15% DISCOUNT ON YOUR FIRST ORDER!
            </p>
            <button className="mt-4 border border-neutral-800 rounded-full px-8 py-3 text-sm font-semibold hover:bg-neutral-800 hover:text-white transition-colors duration-300">
              SHOP NOW
            </button>
          </div>
        </header>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          {/* Categories & Carousel Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-full border transition-colors duration-300",
                    activeCategory === cat
                      ? "bg-neutral-800 text-white border-neutral-800"
                      : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400"
                  )}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="">
              <CarouselPrevious className=" relative border border-neutral-300 rounded-full w-10 h-10" />
              <CarouselNext className="static  border border-neutral-300 rounded-full w-10 h-10" />
            </div>
          </div>

          {/* Products Carousel */}

          <CarouselContent className="-ml-2">
            {products.map((product) => (
              <CarouselItem
                key={product.name}
                className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
