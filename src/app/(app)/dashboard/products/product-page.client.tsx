"use client";

import { DataTable } from "@/components/data-table";
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
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center">
            Product Name <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            {row.original.images?.[0] && (
              <img
                src={row.original.images[0]}
                alt={row.original.name}
                className="w-10 h-10 rounded-md mr-3"
              />
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
            <TrashIcon className="ml-4 inline-block h-4 w-4 text-red-500 cursor-pointer" />
          </div>
        ),
      },
    ],
    []
  );

  const router = useRouter();
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

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <Link
            // onClick={() => router.push("/dashboard/products/create")}
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
            data={productsData}
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
      </div>
    </div>
  );
}
