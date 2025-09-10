"use server";

import prisma from "@/lib/db";
import { CollectionData } from "../collection-form";

export async function createCollection(data: CollectionData) {
  try {
    const collection = await prisma.productCollection.create({
      data: {
        name: data.name,
        description: data.description,
        products: {
          connect: data.productIds?.map((id) => ({ id })) || [],
        },
      },
    });

    return { ok: true, collection };
  } catch (error: any) {
    console.error("Error creating collection:", error);

    // Handle unique constraint violation
    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      return { ok: false, error: "A collection with this name already exists" };
    }

    return { ok: false, error: "Failed to create collection" };
  }
}
