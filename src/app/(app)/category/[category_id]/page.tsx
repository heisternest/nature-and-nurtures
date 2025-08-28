"use server";

import prisma from "@/lib/db";
import type { Metadata } from "next";
import { CategoryProductClient } from "./client";

async function getCategoryWithProducts(category_id: string) {
  return prisma.category.findUnique({
    where: { id: category_id },
    include: {
      products: {
        include: {
          category: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category_id: string }>;
}): Promise<Metadata> {
  const { category_id } = await params;
  const category = await prisma.category.findUnique({
    where: { id: category_id },
    select: { name: true },
  });

  return {
    title: category ? `${category.name} - Products` : "Category",
    description: category
      ? `Browse products under the ${category.name} category.`
      : "Explore our categories and products.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const { category_id } = await params;
  const data = await getCategoryWithProducts(category_id);

  return <CategoryProductClient data={data} />;
}
