"use server";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header/index";
import prisma from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "./client";

async function getProduct(product_slug: string) {
  return prisma.product.findUnique({
    where: { id: product_slug, active: true },
    include: {
      category: {
        select: { id: true, name: true },
      },
      sizes: true,
      colors: true,
      features: { select: { description: true } },
      specifications: true,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}): Promise<Metadata> {
  const { product_slug } = await params;

  const product = await prisma.product.findUnique({
    where: { id: product_slug, active: true },
    select: {
      name: true,
      description: true,
      category: { select: { name: true } },
    },
  });

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} - ${product.category?.name ?? "Product"}`,
    description:
      product.description ??
      `View details of ${product.name} in our ${product.category?.name} collection.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}) {
  const { product_slug } = await params;

  const product = await getProduct(product_slug);

  if (!product) return notFound();

  console.log(product);

  return (
    <>
      <Header />
      <ProductPage product={product} />
      <Footer />
    </>
  );
}
