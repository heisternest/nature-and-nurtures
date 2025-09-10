"use server";

import prisma from "@/lib/db";
import { CollectionData } from "../collection-form";

export const handleUpdate = async (data: CollectionData, id: string) => {
  try {
    const collection = await prisma.productCollection.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        products: {
          set: data.productIds?.map((id) => ({ id })) || [],
        },
      },
    });

    return { ok: true, collection };
  } catch (error: any) {
    console.error("Error updating collection:", error);

    // Handle unique constraint violation
    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      return {
        ok: false,
        error: "A collection with this name already exists",
      };
    }

    return { ok: false, error: "Failed to update collection" };
  }
};
