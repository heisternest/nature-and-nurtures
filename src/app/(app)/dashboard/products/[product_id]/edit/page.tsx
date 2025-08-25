"use server";

import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductData } from "../../create/type";
import { ProductEditForm } from "./product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const param = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: param.product_id,
    },
    include: {
      category: { select: { id: true, name: true } },
      colors: true,
      sizes: true,
      features: true,
      specifications: true,
    },
  });

  const categories = await prisma.category.findMany();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductEditForm
        categories={categories}
        product={product as unknown as ProductData}
      />
    </div>
  );
}
