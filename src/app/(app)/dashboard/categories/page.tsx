"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "/electronics-icon.png",
    active: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Clothing",
    description: "Fashion and apparel for all ages",
    image: "/clothing-icon.png",
    active: true,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "Books",
    description: "Educational and entertainment books",
    image: "/books-icon.png",
    active: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    name: "Home & Garden",
    description: "Everything for your home and garden needs",
    image: "/home-garden-icon.png",
    active: true,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    name: "Sports",
    description: "Sports equipment and accessories",
    image: "/sports-icon.png",
    active: true,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
];

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <img src={image} alt={row.getValue("name")} className="h-10 w-10" />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <span>{createdAt.toLocaleDateString()}</span>;
    },
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your product categories with ease
          </p>
        </div>
        <Link href="/dashboard/categories/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Category
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockCategories} />
        </CardContent>
      </Card>
    </div>
  );
}
