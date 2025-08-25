import prisma from "@/lib/db";
import { ProductForm } from "./product-form";

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <ProductForm categories={categories} />
    </div>
  );
}
