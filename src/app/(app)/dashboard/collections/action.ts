"use server";

import prisma from "@/lib/db";

export async function deleteCollection(collectionId: string) {
  try {
    const del = await prisma.productCollection.delete({
      where: { id: collectionId },
    });
    return {
      success: true,
      message: "Collection deleted successfully",
      collection: del,
    };
  } catch (error) {
    console.error("Error deleting collection:", error);
    return {
      success: false,
      message: "Failed to delete collection",
    };
  }
}
