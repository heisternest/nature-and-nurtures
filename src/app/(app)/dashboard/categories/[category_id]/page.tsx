import prisma from "@/lib/db";
import Link from "next/link";
import { deleteCategory } from "../action";
import { CategoryViewClient } from "./view";

export default async function CategoryDisplayPage({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const category = await prisma.category.findUnique({
    where: { id: (await params).category_id },
    include: { products: true },
  });

  if (!category) {
    return (
      <div className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The category you are looking for does not exist.
        </p>
        <Link
          href="/dashboard/categories"
          className="text-blue-500 hover:underline"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <CategoryViewClient handleDelete={deleteCategory} category={category} />
  );
}
