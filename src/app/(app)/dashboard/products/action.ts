"use server";

import prisma from "@/lib/db";

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
