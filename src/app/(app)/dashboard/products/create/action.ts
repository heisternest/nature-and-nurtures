"use server";

import prisma from "@/lib/db";
import { ProductData } from "./type";

export async function SaveProduct(data: ProductData) {
  // Basic server-side handling: log the incoming product data
  // This function can be extended to validate and persist the product to a DB.
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: {
          connect: { id: data.category },
        },
        slug:
          // create slug based on name and sku
          `${data.name.replace(/\s+/g, "-").toLowerCase()}-${data.sku}`,
        images: data.images,
        description: data.description,
        sku: data.sku,
        stockQuantity: parseInt(data.stockQuantity as string, 10),
        price: parseFloat(data.price as string),
        originalPrice: parseFloat(data.originalPrice as string),
        discount: data.originalPrice
          ? Math.round(
              ((parseInt(data.originalPrice as string, 10) -
                parseFloat(data.price as string)) /
                parseInt(data.originalPrice as string, 10)) *
                100
            )
          : 0,
        inStock: data.inStock,
        colors: {
          create: data.colors.map((color) => ({
            name: color.name,
            hexColor: color.hexColor,
          })),
        },
        sizes: {
          create: data.sizes.map((size) => ({
            size: size.size,
          })),
        },
        features: {
          create: data.features.map((feature) => ({
            title: feature.title,
            description: feature.description,
          })),
        },
        specifications: {
          create: data.specifications.map((specification) => ({
            key: specification.key,
            value: specification.value,
          })),
        },
      },
    });

    return {
      ok: true,
      product,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Failed to save product",
    };
  }
}
