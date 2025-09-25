"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/cart-store";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function ProductPage({ product }: { product: any }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image:
        product.productImages?.length > 0 ? product.productImages[0].url : null,
      price: product.price,
      quantity,
      options: `${
        product.colors[selectedColor]?.name || "Default"
      } / ${selectedSize}`,
    };
    addToCart(cartItem);
    toast(`Added ${product.name} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6 sm:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {product.category &&
              product.category.slug &&
              product.category.name && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/category/${product.category.slug}`}>
                      {product.category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {product.name.split(" ").slice(0, 3).join(" ")}
              {product.name.split(" ").length > 3 ? "..." : ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          {/* Main Image with Amazon-style Zoom */}
          <div
            className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative"
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();
              const x = ((e.pageX - left) / width) * 100;
              const y = ((e.pageY - top) / height) * 100;
              e.currentTarget.style.setProperty("--zoom-x", `${x}%`);
              e.currentTarget.style.setProperty("--zoom-y", `${y}%`);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={
                  product.productImages?.[selectedImageIndex]?.url ||
                  "/placeholder.png"
                }
                alt={
                  product.productImages?.[selectedImageIndex]?.alt ||
                  product.name ||
                  "Product image"
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain transform transition duration-300 ease-in-out hover:scale-[2] cursor-zoom-in"
                style={{
                  transformOrigin: "var(--zoom-x, 50%) var(--zoom-y, 50%)",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Images */}
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
                  src={imageThumbnailUrl(img.url) || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Colors:
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color: any) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.id
                        ? "border-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hexColor }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Quantity:
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  −
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 sm:mt-16 max-w-7xl mx-auto">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="border-b border-gray-200 mb-6 sm:mb-8">
            <TabsTrigger value="about">About This Product</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          {/* About This Product */}
          <TabsContent value="about">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                About This Product
              </h3>
              <div className="mb-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                <div
                  className="prose  break-words overflow-hidden [&_*]:max-w-full   [&_img]:w-full [&_img]:object-cover"
                  dangerouslySetInnerHTML={{ __html: product.about }}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Key Features
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                {product.features.map((item: any) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2 text-sm sm:text-base"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Specifications */}
          <TabsContent value="specifications">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {product.specifications.map((spec: any) => (
                <li key={spec.id} className="flex gap-2 text-sm sm:text-base">
                  <span className="font-medium text-gray-900">{spec.key}:</span>
                  <span className="text-gray-600">{spec.value}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
