import prisma from "@/lib/db";
import CategoriesPageClient from "./client.page";

async function GetCategory() {
  const categories = await prisma.category.findMany();

  return categories;
}

export default async function CategoriesPage() {
  const categories = await GetCategory();
  return <CategoriesPageClient data={categories} />;
}
