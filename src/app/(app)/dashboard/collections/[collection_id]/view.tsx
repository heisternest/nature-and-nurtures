"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAlertDialog } from "@/hooks/alert-dialog/use-alert-dialog";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CollectionViewClient({
  collection,
  handleDelete,
  disconnectProduct,
}: {
  collection: any;
  handleDelete: (id: string) => Promise<{
    success: boolean;
    error?: string | undefined;
  }>;
  disconnectProduct: (
    collectionId: string,
    productId: string
  ) => Promise<{
    success: boolean;
    error?: string | undefined;
  }>;
}) {
  const { openDialog } = useAlertDialog();

  const router = useRouter();
  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-8">
      {/* Header with Edit button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{collection.name}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/collections/${collection.id}/edit`}>
            <Button>Edit Collection</Button>
          </Link>

          <Button
            onClick={() =>
              openDialog({
                title: `Delete ${collection.name}?`,
                description: "Deleting this collection is irreversible. ",
                onConfirm: async () => {
                  const deleted = await handleDelete(collection.id);
                  if (deleted.success) {
                    toast.success("Collection deleted");
                    router.push("/dashboard/collections");
                  } else {
                    toast.error(deleted.error || "Error deleting collection");
                  }
                },
              })
            }
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            size={"sm"}
            aria-label="Delete product"
          >
            Delete <TrashIcon size={18} className="text-red-600" />
          </Button>
        </div>
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
              {collection.products.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-sm relative" // add relative here
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 z-10"
                    onClick={() =>
                      openDialog({
                        title: `Remove ${product.name} from ${collection.name}?`,
                        description: `Removing this product from ${collection.name} will not delete it permanently. It can still be found in the products section.`,
                        onConfirm: async () => {
                          const res = await disconnectProduct(
                            collection.id,
                            product.id
                          );
                          if (res.success) {
                            toast.success(
                              `${product.name} removed from ${collection.name}`
                            );
                            router.refresh();
                          } else {
                            toast.error(
                              res.error ||
                                "Error removing product from collection"
                            );
                          }
                        },
                      })
                    }
                  >
                    <TrashIcon size={16} className="text-red-600" />
                  </Button>

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
