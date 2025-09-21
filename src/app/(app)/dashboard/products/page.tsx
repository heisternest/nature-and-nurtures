"use client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicDataTable from "@/components/ui/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabaseClient } from "@/lib/supabase/client";
import { formatCurrency, imageThumbnailUrl } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row ${row.id}`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.product_images?.[0] ? (
          <img
            src={
              imageThumbnailUrl(row.original.product_images[0].url) ||
              "/placeholder.png"
            }
            alt={row.original.product_images[0]?.alt}
            className="w-10 h-10 rounded-md mr-3 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-md mr-3 bg-gray-200 flex items-center justify-center text-gray-500 shrink-0"></div>
        )}
        <Link
          href={`/dashboard/products/${row.original.id}`}
          className="ml-2 min-w-0 flex-1 flex items-center  group"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium max-w-xs text-blue-600 group-hover:underline">
              {row.original.name}
            </p>
            <span className="text-xs text-muted-foreground truncate block">
              {row.original.categories?.name}
            </span>
          </div>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "price",
    enableSorting: true,
    header: "Price",
    cell: ({ getValue }) => <div>{formatCurrency(getValue<number>())}</div>,
  },

  { accessorKey: "stockQuantity", header: "Stock" },
  { accessorKey: "sku", header: "SKU" },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return status ? (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ) : (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Inactive
        </span>
      );
    },
  },
];

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage and track your products</p>
          </div>

          <Link
            href="/dashboard/products/create"
            className="bg-black  text-white px-4 py-1 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create Product
          </Link>
        </div>

        {/* Orders Table Section */}
        <Card>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="p-4">
              <DynamicDataTable<any>
                supabase={supabaseClient}
                table="products"
                select="*, categories(name), product_images(url, alt)"
                columns={columns}
                searchableColumns={["name", "sku"]}
                filterDefs={[
                  // filter by status
                  {
                    id: "active",
                    title: "Filter by Status",
                    type: "select",
                    options: [
                      { label: "Active", value: "true" },
                      { label: "Inactive", value: "false" },
                    ],
                  },
                ]}
                bulkActions={[
                  {
                    id: "active",
                    label: "Change Status",
                    field: "",
                    type: "select",
                    options: [
                      { label: "Active", value: "true" },
                      { label: "Inactive", value: "false" },
                    ],
                    onUpdate: async (selectedRows, value) => {
                      const ids = selectedRows.map((row) => row.id);
                      const res = await supabaseClient
                        .from("products")
                        .update({ active: value === "true" })
                        .in("id", ids);

                      if (res.error) {
                        toast.error("Failed to update status");
                        return;
                      }

                      toast.success("Status updated successfully");
                      router.refresh();
                    },
                  },
                  {
                    id: "duplicate",
                    label: "Duplicate",
                    onUpdate: async (selectedRows) => {
                      const rowsToDuplicate = selectedRows.map((row) => ({
                        name: row.name + " (Copy)",
                        description: row.description,
                        slug: row.slug + "-copy",
                        price: row.price,
                        sku: row.sku,
                        stockQuantity: row.stockQuantity,
                        active: row.active,
                      }));

                      const res = await supabaseClient
                        .from("products")
                        .insert(rowsToDuplicate);

                      if (res.error) {
                        toast.error("Failed to duplicate products");
                        return;
                      }

                      toast.success("Products duplicated successfully");
                      router.refresh();
                    },
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    field: "",
                    onUpdate: async (selectedRows) => {
                      const ids = selectedRows.map((row) => row.id);
                      const res = await supabaseClient
                        .from("products")
                        .delete()
                        .in("id", ids);

                      if (res.error) {
                        toast.error("Failed to delete products");
                        return;
                      }

                      toast.success("Products deleted successfully");
                      router.refresh();
                    },
                  },
                ]}
                initialPagination={{ pageSize: 20 }}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
