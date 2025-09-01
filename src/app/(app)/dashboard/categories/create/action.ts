"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function CreateCategory(data: any) {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/dashboard/categories");

  return {
    success: true,
    category,
  };
}
