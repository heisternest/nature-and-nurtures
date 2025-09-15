"use client";

import { useCartStore } from "@/lib/cart-store";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { useState } from "react";
import { toast } from "sonner";

export function ProductPage({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.images[0] || "/placeholder.svg",
      price: product.price,
      quantity: quantity,
      options: `${
        product.colors[selectedColor]?.name || "Default"
      } / ${selectedSize}`,
    };
    addToCart(cartItem);
    toast(`Added ${product.name} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="flex gap-4 sticky top-8 self-start">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-24 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <img
                  src={imageThumbnailUrl(image) || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  width={80}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden h-[38rem]">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt="Mesh Shirt"
              width={500}
              height={1200}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6 overflow-y-auto pr-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                {product.category.name}
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
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
            <span className="text-sm text-gray-600">(1234 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
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
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Colors:</h3>
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

          {/* Size */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-900">Size:</h3>
            </div>
            <div className="flex gap-2">
              {product.sizes.map((size: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
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
              disabled={!product.inStock}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              ADD TO CART
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              Share Products
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="text-lg text-gray-600 space-y-1">
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Categories:</strong>
                {product.category.name}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="relative pt-6">
            <div className="border border-gray-200 rounded-md pt-8 pb-4 px-4">
              <div className="flex gap-2 flex-wrap justify-center">
                <img src="/payment/visa.webp" alt="Visa" className="w-12 h-8" />
                <img
                  src="/payment/mastercard.webp"
                  alt="MasterCard"
                  className="w-12 h-8"
                />
                <img
                  src="/payment/amex.webp"
                  alt="American Express"
                  className="w-12 h-8"
                />
                <img
                  src="/payment/paypal.webp"
                  alt="PayPal"
                  className="w-12 h-8"
                />
                <img
                  src="/payment/discover.webp"
                  alt="Discover"
                  className="w-12 h-8"
                />
                <img
                  src="/payment/opal.webp"
                  alt="Stripe"
                  className="w-12 h-8"
                />
              </div>
            </div>

            <h3 className="absolute top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xl font-semibold text-gray-900  text-center">
              Guaranteed Safe Checkout
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 text-lg font-medium ${
              activeTab === "description"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`pb-4 text-lg font-medium ${
              activeTab === "specifications"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Specifications
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* About This Products */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About This Product
              </h3>
              <ul className="space-y-3 text-gray-600">
                {product.features.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="mb-16">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specifications.map((spec: any) => (
                <li key={spec.id} className="flex gap-2">
                  <span className="font-medium text-gray-900 ">
                    {spec.key}:
                  </span>
                  <span className="text-gray-600">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Customer Review Section */}
      </div>
    </div>
  );
}
