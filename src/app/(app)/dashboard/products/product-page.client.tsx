"use client";

import { DataTable } from "@/components/data-table";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Edit3Icon,
  PlusCircle,
  Search,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
}

const StatCard = ({ title, value, change, changeType }: StatCardProps) => {
  const isPositive = changeType === "positive";
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const bgColor = isPositive ? "bg-green-100" : "bg-red-100";

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${bgColor} ${changeColor}`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

interface DropdownProps {
  label: string;
}

const Dropdown = ({ label }: DropdownProps) => (
  <button className="flex items-center justify-between text-sm bg-white border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto">
    <span className="text-gray-700">{label}</span>
    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
  </button>
);

export default function ProductPageClient({
  productsData,
}: {
  productsData: Product[];
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
            <img
              src={row.original.images[0]}
              alt={row.original.name}
              className="w-10 h-10 rounded-md mr-3"
            />
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "price",
        enableSorting: true,

        header: () => <div>Price</div>,
        cell: ({ getValue }) => <div>{formatCurrency(getValue<number>())}</div>,
        sortingFn: "basic",
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
      {
        accessorKey: "stockQuantity",
        enableSorting: true,

        header: () => <div>Stock</div>,
      },
      { accessorKey: "sku", header: () => <div>SKU</div> },

      {
        accessorKey: "active",
        header: () => <div>Status</div>,
        cell: ({ getValue }) => {
          const status = getValue<boolean>();
          if (status === true) {
            return (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            );
          } else {
            return (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Inactive
              </span>
            );
          }
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

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <button
            onClick={() => router.push("/dashboard/products/create")}
            className="mt-4 md:mt-0 flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Sales"
            value="$30,230"
            change="+20.1"
            changeType="positive"
          />
          <StatCard
            title="Number of Sales"
            value="982"
            change="+5.02"
            changeType="positive"
          />
          <StatCard
            title="Affiliate"
            value="$4,530"
            change="+3.1"
            changeType="positive"
          />
          <StatCard
            title="Discounts"
            value="$2,230"
            change="-3.58"
            changeType="negative"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full md:w-auto md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <Dropdown label="Status" />
            <Dropdown label="Category" />
            <Dropdown label="Price: $100-$200" />
            <button className="flex items-center text-sm bg-white border border-gray-300 rounded-md px-3 py-2">
              Columns
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <DataTable data={productsData} columns={columns} />
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
