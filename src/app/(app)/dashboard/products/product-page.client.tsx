"use client";

import { DataTable } from "@/components/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Edit3Icon,
  PlusCircle,
  Search,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "./action";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProductPageClient({
  productsData,
  pagination,
  search,
}: {
  productsData: Product[];
  pagination: PaginationMeta;
  search: string;
}) {
  const [localProducts, setLocalProducts] = useState<Product[]>(productsData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLocalProducts(productsData);
  }, [productsData]);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      await deleteProduct(id);

      // Close the alert dialog
      setIsAlertOpen(false);

      // Show success message
      toast.success("Product deleted successfully");

      // Revalidate/refresh the page
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsAlertOpen(true);
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center ">
            Product Name <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center w-60 truncate">
            {row.original.images?.[0] ? (
              <img
                src={
                  imageThumbnailUrl(row.original.images[0]) ||
                  "/placeholder.svg"
                }
                alt={row.original.name}
                className="w-10 h-10 rounded-md mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-md mr-3 bg-gray-200 flex items-center justify-center text-gray-500"></div>
            )}
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "price",
        enableSorting: true,
        header: () => <div>Price</div>,
        cell: ({ getValue }) => <div>{formatCurrency(getValue<number>())}</div>,
      },
      {
        accessorKey: "category",
        header: () => <div>Category</div>,
        cell: ({ row }) => (
          <div>
            {
              (row.original as unknown as { category: { name: string } })
                .category.name
            }
          </div>
        ),
      },
      { accessorKey: "stockQuantity", header: () => <div>Stock</div> },
      { accessorKey: "sku", header: () => <div>SKU</div> },
      {
        accessorKey: "active",
        header: () => <div>Status</div>,
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
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Link href={`/dashboard/products/${row.original.id}/edit`}>
              <Edit3Icon className="text-gray-500 hover:text-gray-700 h-4 w-4" />
            </Link>
            <TrashIcon
              className="ml-4 inline-block h-4 w-4 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleDeleteClick(row.original.id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const [searchValue, setSearchValue] = useState(search);

  // Sync searchValue with search prop when it changes
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/dashboard/products?search=${encodeURIComponent(
        searchValue
      )}&page=1&limit=${pagination.limit}`
    );
  };

  const goToPage = (newPage: number) => {
    router.push(
      `/dashboard/products?search=${encodeURIComponent(
        search
      )}&page=${newPage}&limit=${pagination.limit}`
    );
  };

  // Find the product to delete for the dialog
  const productToDelete = localProducts.find((p) => p.id === deleteId);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <Link
            href={"/dashboard/products/create"}
            className="mt-4 md:mt-0 flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4"
        >
          <div className="relative w-full md:w-auto md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </form>

        {/* Products Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <DataTable
            key={`${search}-${pagination.page}-${pagination.limit}`}
            data={localProducts}
            columns={columns}
          />
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-500">
          <div>
            Page {pagination.page} of {pagination.totalPages} •{" "}
            {pagination.total} items
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => goToPage(pagination.page - 1)}
              className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50"
              disabled={pagination.page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(pagination.page + 1)}
              className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50"
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <b>{productToDelete?.name}</b>?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={deleting}
                onClick={() => {
                  setIsAlertOpen(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
