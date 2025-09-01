"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function SaveCategory(
  id: string,
  data: {
    name: string;
    description?: string | null | undefined;
    imageUrl?: string | null | undefined;
  }
) {
  const category = await prisma.category.update({
    where: {
      id,
    },
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
