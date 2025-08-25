"use server";

import prisma from "@/lib/db";
import { ProductData } from "../../create/type";

export async function SaveProduct(id: string, data: ProductData) {
  // Basic server-side handling: log the incoming product data
  // This function can be extended to validate and persist the product to a DB.
  //

  try {
    // delete many all relations
    await prisma.productColor.deleteMany({ where: { productId: id } });
    await prisma.productSize.deleteMany({ where: { productId: id } });
    await prisma.productFeature.deleteMany({ where: { productId: id } });
    await prisma.productSpecification.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        category: {
          connect: { id: data.category },
        },
        active: data.active ?? false,
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
