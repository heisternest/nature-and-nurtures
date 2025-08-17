"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { useMemo } from "react";

const productsData = [
  {
    id: 1,
    name: "HP Pavilion 16.1 Inch Gaming Laptop",
    price: 960.99,
    category: "Electronics",
    stock: 5,
    sku: "RCH45Q1A",
    rating: 4.9,
    status: "Active",
  },
  {
    id: 2,
    name: "Samsung SM-A21S Galaxy A21S",
    price: 350.0,
    category: "Electronics",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Active",
  },
  {
    id: 3,
    name: "Schwaiger KHS105 513 Buegelkopfhoerer",
    price: 300.0,
    category: "Electronics",
    stock: 27,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Out Of Stock",
  },
  {
    id: 4,
    name: "Ultimate Ears Wonderboom Bluetooth Speaker",
    price: 119.99,
    category: "Electronics",
    stock: 10,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Active",
  },
  {
    id: 5,
    name: "Canon Pixma TS3350 Multifunction Printer",
    price: 439.5,
    category: "Electronics",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
  {
    id: 6,
    name: "Canon 4000D 18-55 MM III (Canon Eurasia Guaranteed)",
    price: 49.5,
    category: "Beauty",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
  {
    id: 7,
    name: "Lobwerk Lenovo Tab M10 TB-X605F",
    price: 49.5,
    category: "Beauty",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
  {
    id: 8,
    name: '2019 55" Q60R QLED 4K Quantum HDR Smart TV',
    price: 49.5,
    category: "Beauty",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
  {
    id: 9,
    name: "Toshiba Canvio Partner 1 TB Portable",
    price: 49.5,
    category: "Beauty",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
  {
    id: 10,
    name: "Projection Laser Presentation Controller 2.4ghz Kl-Qx01",
    price: 49.5,
    category: "Beauty",
    stock: 25,
    sku: "MVCFH27F",
    rating: 4.65,
    status: "Closed For Sale",
  },
];

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

export default function ProductPage() {
  type Product = (typeof productsData)[number];

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
            <div
              className={`w-10 h-10 rounded-md mr-3 ${
                row.original.id % 2 === 0 ? "bg-gray-200" : "bg-gray-700"
              }`}
            ></div>
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
      },
      {
        accessorKey: "stock",
        enableSorting: true,

        header: () => <div>Stock</div>,
      },
      { accessorKey: "sku", header: () => <div>SKU</div> },
      {
        accessorKey: "rating",
        enableSorting: true,

        header: () => <div>Rating</div>,
        cell: ({ getValue }) => (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {getValue<number>()}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ getValue }) => {
          const status = getValue<string>();
          switch (status) {
            case "Active":
              return (
                <span className="bg-green-100 text-green-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              );
            case "Out Of Stock":
              return (
                <span className="bg-yellow-100 text-yellow-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Out Of Stock
                </span>
              );
            case "Closed For Sale":
              return (
                <span className="bg-red-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Closed For Sale
                </span>
              );
            default:
              return null;
          }
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <button>
            <MoreHorizontal className="h-5 w-5" />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <button className="mt-4 md:mt-0 flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
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
