import prisma from "@/lib/db";
import ProductPageClient from "./product-page.client";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    include: { category: { select: { id: true, name: true } } },
  });
  return <ProductPageClient productsData={products} />;
}
