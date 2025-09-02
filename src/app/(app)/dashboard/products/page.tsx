import prisma from "@/lib/db";
import { Metadata } from "next";
import ProductPageClient from "./product-page.client";

export const metadata: Metadata = {
  title: "Dashboard - Products",
  description: "Manage and view your products in the dashboard.",
};

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    include: { category: { select: { id: true, name: true } } },
  });
  return <ProductPageClient productsData={products} />;
}
