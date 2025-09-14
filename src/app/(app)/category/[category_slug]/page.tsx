"use server";

import prisma from "@/lib/db";
import type { Metadata } from "next";
import { CategoryProductClient } from "./client";

async function getCategoryWithProducts(category_slug: string) {
  return prisma.category.findUnique({
    where: { slug: category_slug, active: true },
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
  params: Promise<{ category_slug: string }>;
}): Promise<Metadata> {
  const { category_slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: category_slug, active: true },
    select: {
      name: true,
      metaDescription: true,
      metaTitle: true,
      description: true,
    },
  });

  return {
    title: category
      ? category.metaTitle || `${category.name} | Nature and Nurtures`
      : "Category Not Found | Nature and Nurtures",
    description: category
      ? category.metaDescription ||
        category.description ||
        `Explore products under the ${category.name} category.`
      : "The category you're looking for is not available.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category_slug: string }>;
}) {
  const { category_slug } = await params;
  const data = await getCategoryWithProducts(category_slug);

  return <CategoryProductClient data={data} />;
}
