"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCartStore } from "@/lib/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartClientDrawer } from "../cart/client";
import { SearchBar } from "../search/search-drawer";

export function HeaderClient({
  data,
  collections,
  featuredProducts,
}: {
  data: any;
  collections: any;
  featuredProducts: any;
}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const { items } = useCartStore();
  const router = useRouter();

  const categories = Array.isArray(data) ? data : [];
  const megaMenuCategories = categories.slice(0, 4);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

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

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium relative">
            {/* Single EXPLORE MEGAMENU */}
            <div
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button className="hover:text-gray-700">SHOP ALL ▾</button>
              <AnimatePresence>
                {menuOpen && (
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
                          FEATURED PRODUCTS
                        </h4>
                        <ul className="space-y-4">
                          {featuredProducts.length ? (
                            featuredProducts.map((item: any) => (
                              <li key={item.id}>
                                <Link
                                  href={`/products/${encodeURIComponent(
                                    item.slug
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
                              category.slug
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
                                    href={`/products/${encodeURIComponent(
                                      item.slug
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

                      {/* Collections */}
                      <div className="min-w-[180px]">
                        <h4 className="font-bold mb-4 text-xs tracking-widest text-[#7c2943]">
                          COLLECTIONS
                        </h4>
                        <ul className="space-y-2">
                          {collections.length ? (
                            collections.map((collection: any) => (
                              <li key={collection.id}>
                                <Link
                                  href={`/collections/${encodeURIComponent(
                                    collection.slug
                                  )}`}
                                  className="text-gray-900 hover:text-[#7c2943] transition-colors"
                                >
                                  {collection.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No collections</li>
                          )}
                        </ul>
                      </div>

                      {/* Category Images */}
                      <div className="flex flex-col items-center justify-start space-y-6">
                        {categories
                          .filter((c: any) => c.imageUrl)
                          .slice(0, 3)
                          .map((c: any) => (
                            <Link
                              key={c.id}
                              href={`/category/${encodeURIComponent(c.slug)}`}
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

            <Link href="/blogs" className="hover:text-gray-700">
              BLOGS
            </Link>
          </nav>
        </div>

        {/* Search + Cart */}
        <div className="flex items-center space-x-4">
          {/* Mobile Explore Button */}
          <button
            onClick={() => setMobileExploreOpen(true)}
            className="md:hidden text-sm font-medium hover:text-gray-700"
          >
            SHOP ALL
          </button>

          {/* Search */}
          <div className="hidden md:block w-64">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <SearchBar />
          </div>

          {/* Cart */}
          <div className="relative">
            <ShoppingBag
              className="w-5 h-5 cursor-pointer"
              onClick={showDrawer}
            />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartClientDrawer open={open} closeDrawer={closeDrawer} />

      {/* Mobile Explore Drawer */}
      <Drawer open={mobileExploreOpen} onOpenChange={setMobileExploreOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>SHOP ALL</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                ✕
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="p-6 overflow-y-auto space-y-8">
            {/* Featured Products */}
            <div>
              <h4 className="font-bold mb-3 text-xs tracking-widest text-[#7c2943]">
                FEATURED PRODUCTS
              </h4>
              <ul className="space-y-2">
                {featuredProducts.length ? (
                  featuredProducts.map((item: any) => (
                    <li key={item.id}>
                      <Link
                        href={`/products/${encodeURIComponent(item.slug)}`}
                        className="text-gray-900 hover:text-[#7c2943] transition-colors"
                        onClick={() => setMobileExploreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No featured products</li>
                )}
              </ul>
            </div>

            {/* Categories */}
            {megaMenuCategories.map((category: any) => (
              <div key={category.id}>
                <Link
                  href={`/category/${encodeURIComponent(category.slug)}`}
                  className="font-serif text-lg text-gray-900 hover:text-[#7c2943] block mb-2"
                  onClick={() => setMobileExploreOpen(false)}
                >
                  {category.name}
                </Link>
                <ul className="ml-3 pl-2 border-l border-[#7c2943] space-y-1">
                  {(category.products || []).slice(0, 6).map((item: any) => (
                    <li key={item.id}>
                      <Link
                        href={`/products/${encodeURIComponent(item.slug)}`}
                        className="text-gray-700 hover:text-[#7c2943] transition-colors"
                        onClick={() => setMobileExploreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Collections */}
            <div>
              <h4 className="font-bold mb-3 text-xs tracking-widest text-[#7c2943]">
                COLLECTIONS
              </h4>
              <ul className="space-y-2">
                {collections.length ? (
                  collections.map((collection: any) => (
                    <li key={collection.id}>
                      <Link
                        href={`/collections/${encodeURIComponent(
                          collection.slug
                        )}`}
                        className="text-gray-900 hover:text-[#7c2943] transition-colors"
                        onClick={() => setMobileExploreOpen(false)}
                      >
                        {collection.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No collections</li>
                )}
              </ul>
            </div>

            {/* Category Images */}
            <div className="grid grid-cols-2 gap-4">
              {categories
                .filter((c: any) => c.imageUrl)
                .slice(0, 3)
                .map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/category/${encodeURIComponent(c.slug)}`}
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <Image
                      src={c.imageUrl}
                      alt={c.name}
                      width={160}
                      height={128}
                      className="w-full h-28 object-cover rounded"
                      unoptimized
                    />
                    <span className="mt-1 block text-sm text-gray-700 text-center">
                      {c.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
