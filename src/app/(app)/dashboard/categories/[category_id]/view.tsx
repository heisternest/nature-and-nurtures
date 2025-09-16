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

export function CategoryViewClient({
  category,
  handleDelete,
  disconnectProduct,
}: {
  category: any;
  handleDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  disconnectProduct: (
    categoryId: string,
    productId: string
  ) => Promise<{ success: boolean; error?: string }>;
}) {
  const { openDialog } = useAlertDialog();

  const router = useRouter();
  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-8">
      {/* Header with Edit button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/categories/${category.id}/edit`}>
            <Button>Edit Category</Button>
          </Link>

          <Button
            onClick={() =>
              openDialog({
                title: `Delete ${category.name}?`,
                description: "Deleting this category is irreversible. ",
                onConfirm: async () => {
                  const deleted = await handleDelete(category.id);
                  if (deleted.success) {
                    toast.success("Category deleted");
                    router.push("/dashboard/categories");
                  } else {
                    toast.error(deleted.error || "Error deleting category");
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
              {category.products.map((product: any) => (
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
                        title: `Remove ${product.name} from ${category.name}?`,
                        description: `Removing this product from ${category.name} will not delete it permanently. It can still be found in the products section.`,
                        onConfirm: async () => {
                          // simulate deletion
                          const res = await disconnectProduct(
                            category.id,
                            product.id
                          );
                          if (res.success) {
                            toast.success("Product removed from category");
                            router.refresh();
                          } else {
                            toast.error(
                              res.error ||
                                "Error removing product from category"
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
                      src={
                        product.productImages.length > 0
                          ? product.productImages[0].url
                          : "/placeholder.png"
                      }
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
