"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCategory(id: string) {
  try {
    // Check if category has products
    const productCount = await prisma.product.count({
      where: {
        categoryId: id,
      },
    });

    if (productCount > 0) {
      return {
        success: false,
        error:
          "Cannot delete category with existing products. Please reassign or delete the products first.",
      };
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: "Failed to delete category",
    };
  }
}
