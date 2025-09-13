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
  params: Promise<{ collection_id: string }>;
}) {
  const collection = await prisma.productCollection.findUnique({
    where: { id: (await params).collection_id },
    include: { products: true },
  });

  if (!collection) {
    return (
      <div className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">Collection Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The collection you are looking for does not exist.
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
        <h1 className="text-3xl font-bold">{collection.name}</h1>
        <Link href={`/dashboard/collections/${collection.id}/edit`}>
          <Button>Edit Collection</Button>
        </Link>
      </div>

      {/* Collection Info */}
      <Card>
        <CardHeader>
          <CardTitle>Product Collection Details</CardTitle>
          {collection.description && (
            <CardDescription>{collection.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Image */}
          <img
            src={collection.imageUrl || "/placeholder.webp"}
            alt={collection.name || "Collection image"}
            className="rounded-md w-full h-48 object-cover"
          />

          {/* Info */}
          <div className="space-y-3">
            <p>
              <span className="font-medium">Slug:</span>{" "}
              {collection.slug || "—"}
            </p>
            <p>
              <Badge
                className={
                  collection.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {collection.active ? "Active" : "Inactive"}
              </Badge>
            </p>
            {collection.description && (
              <p className="text-sm text-muted-foreground">
                {collection.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle>Products in this Collections</CardTitle>
          <CardDescription>
            {collection.products?.length && collection.products.length > 0
              ? `This collections has ${collection.products.length} product(s).`
              : "No products are assigned to this category."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {collection.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collection.products.map((product) => (
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
