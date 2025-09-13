"use server";

import prisma from "@/lib/db";
import { CategoryFormValues } from "./schema";

export async function saveCategory(data: CategoryFormValues) {
  try {
    if (data.id) {
      await prisma.category.update({
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          slug: data.slug,
          active: data.active || false,
        },
      });
      return { success: true, message: "Category updated successfully" };
    } else {
      await prisma.category.create({
        data: {
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          slug: data.slug,
          active: data.active || false,
        },
      });
      return { success: true, message: "Category created successfully" };
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
}
