"use client";

import { useCartStore } from "@/lib/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartClientDrawer } from "../cart/client";
import { SearchDrawer } from "../search-drawer";

export function HeaderClient({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | "explore">(null);

  const { items } = useCartStore();

  const categories = Array.isArray(data) ? data : [];

  // Flatten all products
  const allProducts = categories.flatMap((c: any) =>
    (c.products || []).map((p: any) => ({
      ...p,
      categoryId: c.id,
      categoryName: c.name,
      categoryImage: c.imageUrl,
    }))
  );

  // Featured products: top 4 by discount
  const megaMenuFeatured = allProducts
    .slice()
    .sort((a: any, b: any) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  // Limit categories displayed in mega menu (e.g., top 4)
  const megaMenuCategories = categories.slice(0, 4);

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
                                    item.id
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

                      {/* Categories */}
                      {megaMenuCategories.map((category: any) => (
                        <div key={category.id} className="min-w-[220px]">
                          <Link
                            href={`/category/${encodeURIComponent(
                              category.id
                            )}`}
                            className="font-serif text-xl mb-2 text-gray-900 hover:text-[#7c2943] block"
                          >
                            {category.name}
                          </Link>
                          <ul className="ml-2 pl-2 border-l border-[#7c2943] space-y-1">
                            {(category.products || [])
                              .slice(0, 6)
                              .map((item: any) => (
                                <li key={item.id}>
                                  <Link
                                    href={`/product/${encodeURIComponent(
                                      item.id
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

                      {/* Category Images */}
                      <div className="flex flex-col items-center justify-start space-y-6">
                        {categories
                          .filter((c: any) => c.imageUrl)
                          .slice(0, 3)
                          .map((c: any) => (
                            <Link
                              key={c.id}
                              href={`/category/${encodeURIComponent(c.id)}`}
                              className="flex flex-col items-center"
                            >
                              <Image
                                src={c.imageUrl}
                                alt={c.name}
                                width={160}
                                height={128}
                                className="w-40 h-32 object-cover rounded"
                                unoptimized
                              />
                              <span className="mt-2 text-sm text-gray-700 text-center">
                                {c.name}
                              </span>
                            </Link>
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
          <div className="relative">
            <ShoppingBag
              className="w-5 h-5 cursor-pointer"
              onClick={showDrawer}
            />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                {
                  // total quantity instead of items
                  items.reduce((total, item) => total + item.quantity, 0)
                }
              </span>
            )}
          </div>
        </div>
      </div>
      <SearchDrawer open={searchOpen} closeDrawer={closeSearchDrawer} />
      <CartClientDrawer open={open} closeDrawer={closeDrawer} />
    </header>
  );
}
