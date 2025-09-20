"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { Category } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import * as React from "react";

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

const CategoryCard = ({ category }: any) => {
  return (
    <Link href={`/category/${category.slug}`} className="p-2 group">
      <div
        className="relative aspect-square w-full rounded-xl overflow-hidden
                   transition-transform duration-500 group-hover:scale-105"
      >
        <img
          src={
            category.imageUrl
              ? imageThumbnailUrl(category.imageUrl, 400, 400)
              : "/placeholder.png"
          }
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full bg-white/90 backdrop-blur-sm text-black px-4 py-3 rounded-lg
                       flex justify-between items-center text-sm font-medium
                       transition-colors duration-300 hover:bg-white"
          >
            <span>{category.name.toUpperCase()}</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

export function CategoryShowcaseClient({
  categories,
}: {
  categories: Category[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="bg-white text-neutral-800 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-start mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light leading-tight">
              Find your own <em className="italic">unique style</em>, and
              thousands of brands.
            </h1>
          </div>
        </header>

        {/* Carousel */}
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-2 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
