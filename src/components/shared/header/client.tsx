"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "../cart-drawer";
import { SearchDrawer } from "../search-drawer";

export function HeaderClient({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<
    null | "explore" | "types" | "skinCare" | "bestsellers"
  >(null);

  // Prepare dynamic megamenu content from `data` (categories with products)
  // Assumptions:
  // - `data` is Category[] where each category has `id`, `name`, `imageUrl`, and `products` array
  // - each product has `id`, `name`, `slug`, `type`, `discount`, and optional image URLs inside `images` array
  const categories = Array.isArray(data) ? data : [];

  const allProducts = categories.flatMap((c: any) =>
    (c.products || []).map((p: any) => ({
      ...p,
      categoryId: c.id,
      categoryName: c.name,
      categoryImage: c.imageUrl,
    }))
  );

  // Featured: top 4 products by discount, then recent (fallback to first products)
  const megaMenuFeatured = allProducts
    .slice()
    .sort((a: any, b: any) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  // Product types grouped by product.type
  const typesMap: Record<string, any[]> = {};
  allProducts.forEach((p: any) => {
    const t = p.type || "Other";
    if (!typesMap[t]) typesMap[t] = [];
    if (typesMap[t].length < 6) typesMap[t].push(p);
  });
  const megaMenuTypes = Object.keys(typesMap).map((title) => ({
    title,
    items: typesMap[title],
  }));

  // Skin Care & Body: prefer categories with 'skin' or 'body' in the name, else fall back to first 3 categories
  const skinCareCategories = categories.filter((c: any) =>
    /skin|body/i.test(c.name)
  );
  const fallbackSkin = categories.slice(0, 3);
  const skinSource = skinCareCategories.length
    ? skinCareCategories
    : fallbackSkin;
  const megaMenuSkinCare = skinSource.map((c: any) => ({
    title: c.name,
    items: (c.products || []).slice(0, 6).map((p: any) => p),
  }));

  // Images: use category images when available
  const megaMenuImages = categories
    .filter((c: any) => c.imageUrl)
    .slice(0, 3)
    .map((c: any) => ({ src: c.imageUrl, label: c.name }));

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const showSearchDrawer = () => setSearchOpen(true);
  const closeSearchDrawer = () => setSearchOpen(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
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
                          {megaMenuFeatured.length ? (
                            megaMenuFeatured.map((item: any) => (
                              <li key={item.id}>
                                <Link
                                  href={`/product/${encodeURIComponent(
                                    item.slug || item.id
                                  )}`}
                                  className="text-lg text-gray-900 hover:text-[#7c2943] font-normal transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">
                              No featured products
                            </li>
                          )}
                        </ul>
                      </div>
                      {/* Product Type */}
                      <div className="min-w-[260px]">
                        <h4 className="font-bold mb-4 text-xs tracking-widest text-[#7c2943]">
                          PRODUCT TYPE
                        </h4>
                        {megaMenuTypes.map((section: any) => (
                          <div key={section.title} className="mb-4">
                            <div className="text-xl mb-2 text-gray-900">
                              {section.title}
                            </div>
                            <ul className="ml-2 pl-2 border-l border-[#7c2943] space-y-1">
                              {section.items.map((item: any) => (
                                <li key={item.id}>
                                  <Link
                                    href={`/product/${encodeURIComponent(
                                      item.slug || item.id
                                    )}`}
                                    className="text-gray-900 hover:text-[#7c2943] text-base font-normal transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Skin Care & Body */}
                      <div className="min-w-[220px]">
                        {megaMenuSkinCare.map((section: any) => (
                          <div key={section.title} className="mb-4">
                            <div className="font-serif text-xl mb-2 text-gray-900">
                              {section.title}
                            </div>
                            <ul className="ml-2 pl-2 border-l border-[#7c2943] space-y-1">
                              {section.items.length ? (
                                section.items.map((item: any) => (
                                  <li key={item.id}>
                                    <Link
                                      href={`/product/${encodeURIComponent(
                                        item.slug || item.id
                                      )}`}
                                      className="text-gray-900 hover:text-[#7c2943] text-base font-normal transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-500">No products</li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Images */}
                      <div className="flex flex-col items-center justify-start space-y-6">
                        {megaMenuImages.map((img: any) => (
                          <div
                            key={img.label}
                            className="flex flex-col items-center"
                          >
                            <Image
                              src={img.src}
                              alt={img.label}
                              width={160}
                              height={128}
                              className="w-40 h-32 object-cover rounded"
                              unoptimized
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
