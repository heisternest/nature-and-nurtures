"use server";

import prisma from "@/lib/db";
import { stripeServer } from "@/lib/stripe/stripe-server";
import { ProductData } from "../../create/type";

export async function SaveProduct(data: ProductData, id: string) {
  if (!stripeServer) {
    throw new Error("Stripe not initialized");
  }

  try {
    // 1. Get the existing product
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new Error("Product not found");
    }

    // 2. Handle Stripe updates first
    let stripeProductId = existing.stripeProductId;
    let stripePriceId = existing.stripePriceId;

    if (!stripeProductId) {
      // Create a new Stripe product if it doesn’t exist yet
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

      stripeProductId = stripeProduct.id;
      stripePriceId = stripePrice.id;
    } else {
      // Update Stripe product
      await stripeServer.products.update(stripeProductId, {
        name: data.name,
        description: data.description || "",
        images: data.images,
      });

      // Deactivate old price if exists
      if (stripePriceId) {
        await stripeServer.prices.update(stripePriceId, { active: false });
      }

      // Create new price
      const stripePrice = await stripeServer.prices.create({
        unit_amount: Math.round(parseFloat(data.price as string) * 100),
        currency: "usd",
        product: stripeProductId,
      });

      stripePriceId = stripePrice.id;
    }

    // 3. Now update the DB (transaction for relations + product fields)
    const updated = await prisma.$transaction(
      async (tx) => {
        // Clear relations
        await Promise.all([
          tx.productColor.deleteMany({ where: { productId: id } }),
          tx.productSize.deleteMany({ where: { productId: id } }),
          tx.productFeature.deleteMany({ where: { productId: id } }),
          tx.productSpecification.deleteMany({ where: { productId: id } }),
        ]);

        return tx.product.update({
          where: { id },
          data: {
            name: data.name,
            category: { connect: { id: data.category } },
            active: data.active ?? false,
            slug: `${data.name.replace(/\s+/g, "-").toLowerCase()}-${data.sku}`,
            images: data.images,
            description: data.description,
            metaDescription: data.metaDescription,
            metaTitle: data.metaTitle,
            metaKeywords: data.metaKeywords?.split(",").map((k) => k.trim()),
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
            stripeProductId,
            stripePriceId,
          },
        });
      },
      {
        timeout: 30000,
      }
    );

    return { ok: true, product: updated };
  } catch (err) {
    console.error("UpdateProduct error:", err);
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}
