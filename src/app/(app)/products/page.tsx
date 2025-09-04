import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ProductsListClient } from "@/components/shared/product/products-list.client";
import prisma from "@/lib/db";
import type { Metadata } from "next";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Shop Products | Best Deals & Categories | Nature and Nurtures",
  description:
    "Browse our latest collection of active products. Find the best deals, top categories, and trending items updated daily.",
  keywords: [
    "online shop",
    "products",
    "categories",
    "best deals",
    "trending items",
    "buy online",
  ],
  openGraph: {
    title: "Shop Products | Best Deals & Categories | Nature and Nurtures",
    description:
      "Explore our wide range of active products with top categories and trending items.",
    siteName: "Nature and Nurtures",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Products | Best Deals & Categories",
    description:
      "Discover trending products and top categories from our online shop.",
  },
  alternates: {
    canonical: "https://yourdomain.com/products",
  },
};

export default async function ProductsPage() {
  const initialProducts = await prisma.product.findMany({
    where: { active: true },
    take: 10,
    include: {
      category: {
        select: { name: true, id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Filter out products without categories
  const filteredProducts = initialProducts.filter(
    (product) => product.category !== null
  );

  const totalProducts = await prisma.product.count({
    where: { active: true },
  });

  const hasMore = filteredProducts.length === 10 && totalProducts > 10;

  return (
    <>
      <Header />
      <ProductsListClient
        initialProducts={filteredProducts as any}
        hasMore={hasMore}
      />
      <Footer />
    </>
  );
}
