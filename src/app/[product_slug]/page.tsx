"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { useState } from "react";

function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const images = [
    "/product/amber/1.webp",
    "/product/amber/2.webp",
    "/product/amber/3.webp",
    "/product/amber/4.webp",
  ];

  const thumbnails = [
    "/product/amber/1.webp",
    "/product/amber/2.webp",
    "/product/amber/3.webp",
    "/product/amber/4.webp",
  ];

  const colors = [
    { name: "Gray", color: "#8B8B8B" },
    { name: "Pink", color: "#E8A5A5" },
    { name: "White", color: "#F5F5F5" },
  ];

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="flex gap-4 sticky top-8 self-start">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-24 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <img
                  src={thumb || "/placeholder.svg"}
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
              src={images[selectedImage] || "/placeholder.svg"}
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
              <p className="text-sm text-gray-500 font-medium">T-SHIRT</p>
              <h1 className="text-3xl font-bold text-gray-900">Mesh Shirt</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
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
            <span className="text-3xl font-bold text-gray-900">$35.00</span>
            <span className="text-lg text-gray-500 line-through">$45.00</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
              -22%
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Keep your home organized, yet elegant with storage cabinets by Onita
            Patio Furniture. Traditionally designed, they are perfect to be used
            in the any place where you need to store.
          </p>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Colors:</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === index
                      ? "border-gray-900"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.color }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-900">Size:</h3>
              <button className="text-sm text-red-500 hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
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
            <button className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors">
              ADD TO CART
            </button>
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
              BUY IT NOW
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
                <strong>SKU:</strong> 53453412
              </p>
              <p>
                <strong>Categories:</strong> fashion, women
              </p>
              <p>
                <strong>Tag:</strong> t-shirt
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

          {/* Get It Today Section */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Get It Today
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Free shipping on orders over $75.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Support Everyday
                  </h4>
                  <p className="text-sm text-gray-600">
                    Support from 8:30 AM to 10:00 PM everyday
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">100 Day Returns</h4>
                  <p className="text-sm text-gray-600">
                    Not impressed? Get a refund. You have 100 days to break our
                    hearts.
                  </p>
                </div>
              </div>
            </div>
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
                Keep your home organized, yet elegant with storage cabinets by
                Onita Patio Furniture. These cabinets not only make a great
                storage units, but also bring a great decorative accent to your
                decor. Traditionally designed, they are perfect to be used in
                the hallway, living room, bedroom, office or any place where you
                need to store or display things. Made of high quality materials,
                they are sturdy and durable for years. Bring one-of-a- kind look
                to your interior with furniture from Onita Furniture!
              </p>
            </div>

            {/* About This Products */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About This Products
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Nulla luctus libero quis mauris vestibulum dapibus.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Maecenas ullamcorper erat mi, vel consequat enim suscipit at.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Quisque consectetur nibh ac urna molestie scelerisque.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Mauris in nisl scelerisque massa consectetur pretium sed et
                  mauris.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="mb-16">
            <p className="text-gray-600">
              Specifications content would go here...
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Shipping Faster */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Shipping Faster
            </h4>
            <p className="text-gray-600 text-sm">
              Use on walls, furniture, doors and many more surfaces. The
              possibilities are endless.
            </p>
          </div>

          {/* Cotton Material */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Cotton Material
            </h4>
            <p className="text-gray-600 text-sm">
              Use on walls, furniture, doors and many more surfaces. The
              possibilities are endless.
            </p>
          </div>

          {/* High Quality */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              High Quality
            </h4>
            <p className="text-gray-600 text-sm">
              Use on walls, furniture, doors and many more surfaces. The
              possibilities are endless.
            </p>
          </div>

          {/* Highly Compatible */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Highly Compatible
            </h4>
            <p className="text-gray-600 text-sm">
              Use on walls, furniture, doors and many more surfaces. The
              possibilities are endless.
            </p>
          </div>
        </div>

        {/* Customer Review Section */}
        <div className="mt-16">
          {/* Customer Review Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Review
            </h2>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
              WRITE REVIEWS
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Rating Summary */}
            <div className="lg:col-span-1">
              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">4.6</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">(1968 Rating)</div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[
                  { stars: 5, percentage: 50 },
                  { stars: 4, percentage: 20 },
                  { stars: 3, percentage: 10 },
                  { stars: 2, percentage: 10 },
                  { stars: 1, percentage: 10 },
                ].map((rating) => (
                  <div
                    key={rating.stars}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-2">{rating.stars}</span>
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 w-8">
                      {rating.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Reviews */}
            <div className="lg:col-span-2">
              {/* Customer Images */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  All Image (128)
                </h3>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[
                    "/beige-outfit-woman.png",
                    "/woman-in-white-shirt.png",
                    "/woman-brown-top.png",
                    "/woman-black-dress.png",
                    "/woman-white-tee.png",
                    "/woman-in-pink-dress.png",
                  ].map((src, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Customer photo ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Sort By</span>
                  {[
                    "Newest",
                    "5 Star",
                    "4 Star",
                    "3 Star",
                    "2 Star",
                    "1 Star",
                  ].map((filter) => (
                    <button
                      key={filter}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {[
                  {
                    title:
                      "Unbeatable Style And Quality: A Fashion Brand That Delivers",
                    content:
                      "I can't get enough of the fashion pieces from this brand. They have a great selection for every occasion and the prices are reasonable. The shipping is fast and the items always arrive in perfect condition.",
                    author: "Tony Nguyen",
                    date: "1 days ago",
                    variant: "Yellow / XL",
                    likes: 20,
                  },
                  {
                    title:
                      "Exceptional Fashion: The Perfect Blend Of Style And Durability",
                    content:
                      "The fashion brand's online shopping experience is seamless. The website is user-friendly, the product images are clear, and the checkout process is quick.",
                    author: "Tony Nguyen",
                    date: "1 days ago",
                    variant: "Yellow / XL",
                    likes: 20,
                  },
                  {
                    title:
                      "Elevate Your Wardrobe: Stunning Dresses That Make A Statement",
                    content:
                      "I love how sustainable and ethically conscious this fashion brand is. They prioritize eco-friendly materials and fair trade practices, which makes me feel good about supporting them.",
                    author: "Tony Nguyen",
                    date: "1 days ago",
                    variant: "Yellow / XL",
                    likes: 20,
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex gap-4">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((imgIndex) => (
                          <div
                            key={imgIndex}
                            className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden"
                          >
                            <img
                              src={`/happy-customer-unboxing.png`}
                              alt={`Review photo ${imgIndex}`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="flex text-yellow-400 mb-2">
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
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {review.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span className="font-medium">{review.author}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                          <span>•</span>
                          <span>{review.variant}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{review.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
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
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            {review.likes}
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-800">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Comments */}
              <div className="text-center mt-6">
                <button className="text-gray-900 hover:underline font-medium">
                  View More Comments
                </button>
              </div>
            </div>
          </div>

          {/* Leave A Comment Form */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Leave A Comment
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <textarea
                placeholder="Your message *"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              ></textarea>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="save-info" className="rounded" />
                <label htmlFor="save-info" className="text-sm text-gray-600">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
              >
                SUBMIT REVIEWS
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <ProductPage />
      <Footer />
    </>
  );
}
