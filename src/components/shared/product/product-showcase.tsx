import prisma from "@/lib/db";
import { ProductShowcaseClient } from "./product-showcase.client";

export async function ProductShowcase() {
  const products = await prisma.product.findMany({
    where: { active: true },
    take: 6,
    include: {
      category: {
        select: { name: true, id: true },
      },
    },
  });
  return <ProductShowcaseClient products={products} />;
}
