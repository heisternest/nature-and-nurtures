"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "../cart-drawer";
import { SearchDrawer } from "../search-drawer";

export function HeaderClient() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<
    null | "explore" | "types" | "skinCare" | "bestsellers"
  >(null);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const showSearchDrawer = () => setSearchOpen(true);
  const closeSearchDrawer = () => setSearchOpen(false);

  // Dummy megamenu data
  const megaMenuFeatured = [
    "New",
    "Best Sellers",
    "Award Winners",
    "Lock-In & Save",
    "Gift Sets",
    "Gift Cards",
  ];

  const megaMenuTypes = [
    {
      title: "Fruit Pigmented® Makeup",
      items: ["Face", "Eye", "Lip", "Palettes"],
    },
    {
      title: "Hair",
      items: ["Shampoo", "Conditioner", "Treatments"],
    },
    {
      title: "Hand",
      items: ["Hand Wash & Creams"],
    },
    {
      title: "Nail Polish",
      items: [],
    },
  ];

  const megaMenuSkinCare = [
    {
      title: "Skin Care",
      items: [
        "Cleanser",
        "Toner",
        "Scrubs & Masks",
        "Serum & Face Oils",
        "Moisturizer",
        "Eye Cream",
        "SPF",
      ],
    },
    {
      title: "Body",
      items: ["Body Wash", "Body Scrubs", "Bath Treatments", "Body Cream"],
    },
  ];

  const megaMenuImages = [
    {
      src: "/public/feature-1.webp",
      label: "Makeup Best Sellers",
    },
    {
      src: "/public/feature-3.webp",
      label: "Skin Care Best Sellers",
    },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium relative">
            {/* EXPLORE MEGAMENU */}
            <div
              className="relative group"
              onMouseEnter={() => setMenuOpen("explore")}
              onMouseLeave={() => setMenuOpen(null)}
            >
              <button className="hover:text-gray-700">EXPLORE ▾</button>
              <AnimatePresence>
                {menuOpen === "explore" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 top-20 w-full z-30 bg-white shadow-2xl border-b border-gray-100 px-16 py-12 flex justify-center"
                  >
                    <div className="flex w-full max-w-7xl space-x-12">
                      {/* Featured */}
                      <div className="min-w-[180px]">
                        <h4 className="font-bold mb-4 text-xs tracking-widest text-[#7c2943]">
                          FEATURED
                        </h4>
                        <ul className="space-y-4">
                          {megaMenuFeatured.map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                className="text-lg text-gray-900 hover:text-[#7c2943] font-normal transition-colors"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Product Type */}
                      <div className="min-w-[260px]">
                        <h4 className="font-bold mb-4 text-xs tracking-widest text-[#7c2943]">
                          PRODUCT TYPE
                        </h4>
                        {megaMenuTypes.map((section) => (
                          <div key={section.title} className="mb-4">
                            <div className="text-xl mb-2 text-gray-900">
                              {section.title}
                            </div>
                            <ul className="ml-2 pl-2 border-l border-[#7c2943] space-y-1">
                              {section.items.map((item) => (
                                <li key={item}>
                                  <a
                                    href="#"
                                    className="text-gray-900 hover:text-[#7c2943] text-base font-normal transition-colors"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Skin Care & Body */}
                      <div className="min-w-[220px]">
                        {megaMenuSkinCare.map((section) => (
                          <div key={section.title} className="mb-4">
                            <div className="font-serif text-xl mb-2 text-gray-900">
                              {section.title}
                            </div>
                            <ul className="ml-2 pl-2 border-l border-[#7c2943] space-y-1">
                              {section.items.map((item) => (
                                <li key={item}>
                                  <a
                                    href="#"
                                    className="text-gray-900 hover:text-[#7c2943] text-base font-normal transition-colors"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Images */}
                      <div className="flex flex-col items-center justify-start space-y-6">
                        {megaMenuImages.map((img) => (
                          <div
                            key={img.label}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={img.src}
                              alt={img.label}
                              className="w-40 h-32 object-cover rounded"
                            />
                            <span className="mt-2 text-sm text-gray-700 text-center">
                              {img.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Search
            className="w-5 h-5 cursor-pointer"
            onClick={showSearchDrawer}
          />
          <User className="w-5 h-5 cursor-pointer" />
          <div className="relative">
            <ShoppingBag
              className="w-5 h-5 cursor-pointer"
              onClick={showDrawer}
            />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
              3
            </span>
          </div>
        </div>
      </div>
      <SearchDrawer open={searchOpen} closeDrawer={closeSearchDrawer} />
      <CartDrawer open={open} closeDrawer={closeDrawer} />
    </header>
  );
}
