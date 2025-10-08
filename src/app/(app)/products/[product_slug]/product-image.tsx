"use client";

import { imageThumbnailUrl } from "@/utils/image-otf";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamically import zoom component to avoid SSR issues
const EasyZoomOnHover = dynamic(
  () => import("easy-magnify").then((mod) => mod.EasyZoomOnHover),
  { ssr: false }
);

export function ProductImageSection({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
}: {
  product: any;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
}) {
  // ✅ Preload all product images for instant switching
  useEffect(() => {
    product.productImages?.forEach((img: any) => {
      const preload = new Image();
      preload.src = imageThumbnailUrl(img.url, 500, 500);
    });
  }, [product.productImages]);

  return (
    <div className="space-y-4">
      {/* ✅ Main Image with Fade Transition + Zoom */}
      <motion.div
        key={selectedImageIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative"
      >
        <EasyZoomOnHover
          mainImage={{
            src:
              imageThumbnailUrl(
                product.productImages?.[selectedImageIndex]?.url,
                500,
                500
              ) || "/placeholder.png",
            alt:
              product.productImages?.[selectedImageIndex]?.alt ||
              product.name ||
              "Product image",
          }}
          loadingIndicator={
            // with width and height to avoid layout shift
            <div
              style={{ width: 500, height: 500 }}
              className="w-full  flex items-center justify-center bg-gray-100"
            >
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          }
          zoomImage={{
            src:
              imageThumbnailUrl(
                product.productImages?.[selectedImageIndex]?.url,
                1000,
                1000
              ) || "/placeholder.png",
          }}
        />
      </motion.div>

      {/* ✅ Thumbnail Image Selector */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {product.productImages?.map((img: any, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImageIndex === index
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={imageThumbnailUrl(img.url, 100, 100) || "/placeholder.svg"}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
