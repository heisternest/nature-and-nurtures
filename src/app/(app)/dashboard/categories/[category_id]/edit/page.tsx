"use server";

import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { CategoryEdit } from "./category-form";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const param = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: param.category_id,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <CategoryEdit category={category} />
    </div>
  );
}
