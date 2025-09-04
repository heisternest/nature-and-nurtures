import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import ProductPageClient from "./product-page.client";

export const metadata: Metadata = {
  title: "Dashboard - Products",
  description: "Manage and view your products in the dashboard.",
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  // Await the promise
  const resolvedParams = await searchParams;

  const page = resolvedParams?.page ? Number(resolvedParams.page) : 1;
  const limit = resolvedParams?.limit ? Number(resolvedParams.limit) : 10;
  const search = resolvedParams?.search?.trim() || "";

  const where: Prisma.ProductWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: { select: { id: true, name: true } } },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return (
    <ProductPageClient
      productsData={products}
      pagination={{
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }}
      search={search}
    />
  );
}
