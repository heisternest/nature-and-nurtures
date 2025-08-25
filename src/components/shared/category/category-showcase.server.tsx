"use server";

import prisma from "@/lib/db";
import { CategoryShowcaseClient } from "./category-showcase";

export async function CategoryShowcase() {
  const categories = await prisma.category.findMany();
  return <CategoryShowcaseClient categories={categories} />;
}
