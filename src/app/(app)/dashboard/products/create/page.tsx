import prisma from "@/lib/db";
import { ProductForm } from "./product-form";

// add page metadata
export async function generateMetadata() {
  return {
    title: "Create Product | Nature & Nurtures",
    description: "Create a new product for your store",
  };
}

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <ProductForm categories={categories} />
    </div>
  );
}
