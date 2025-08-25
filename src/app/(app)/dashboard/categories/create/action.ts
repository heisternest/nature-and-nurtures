"use server";

import prisma from "@/lib/db";

export async function CreateCategory(data: any) {
  const category = await prisma.category.create({
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
