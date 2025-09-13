import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import Link from "next/link";

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
    <div className="container mx-auto max-w-5xl p-6 space-y-8">
      {/* Header with Edit button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <Link href={`/dashboard/categories/${category.id}/edit`}>
          <Button>Edit Category</Button>
        </Link>
      </div>

      {/* Category Info */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          {category.description && (
            <CardDescription>{category.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Image */}
          {category.imageUrl && (
            <div className="relative w-full ">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="rounded-lg object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="space-y-3">
            <p>
              <span className="font-medium">Slug:</span> {category.slug || "—"}
            </p>
            <p>
              <Badge
                className={
                  category.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {category.active ? "Active" : "Inactive"}
              </Badge>
            </p>
            {category.description && (
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle>Products in this Category</CardTitle>
          <CardDescription>
            {category.products?.length && category.products.length > 0
              ? `This category has ${category.products.length} product(s).`
              : "No products are assigned to this category."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {category.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="relative w-full h-48">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name || "Product image"}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium truncate">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
