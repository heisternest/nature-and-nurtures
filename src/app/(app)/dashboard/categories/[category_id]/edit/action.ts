"use server";

import prisma from "@/lib/db";

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

  return {
    success: true,
    category,
  };
}
