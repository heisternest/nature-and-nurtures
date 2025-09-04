import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      skip: offset,
      take: limit,
      include: {
        category: {
          select: { name: true, id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter out products without categories
    const filteredProducts = products.filter(
      (product) => product.category !== null
    );

    const totalProducts = await prisma.product.count({
      where: { active: true },
    });

    return NextResponse.json({
      products: filteredProducts,
      hasMore: offset + limit < totalProducts,
      total: totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
