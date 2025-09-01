"use server";

import prisma from "@/lib/db";
import { stripeServer } from "@/lib/stripe/stripe-server";
import { ProductData } from "./type";

export async function SaveProduct(data: ProductData) {
  if (!stripeServer) {
    throw new Error("Stripe not initialized");
  }

  try {
    const stripeProduct = await stripeServer.products.create({
      name: data.name,
      description: data.description || "",
      images: data.images,
      metadata: { sku: data.sku },
    });

    const stripePrice = await stripeServer.prices.create({
      unit_amount: Math.round(parseFloat(data.price as string) * 100),
      currency: "usd",
      product: stripeProduct.id,
    });

    const product = await prisma.$transaction(async (tx) => {
      return tx.product.create({
        data: {
          name: data.name,
          category: { connect: { id: data.category } },
          slug: `${data.name.replace(/\s+/g, "-").toLowerCase()}-${data.sku}`,
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
              title: feature.description,
              description: feature.description,
            })),
          },
          specifications: {
            create: data.specifications.map((specification) => ({
              key: specification.key,
              value: specification.value,
            })),
          },
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
        },
      });
    });

    return { ok: true, product };
  } catch (err) {
    console.error("SaveProduct error:", err);
    return {
      success: false,
      error: "Failed to save product",
    };
  }
}
