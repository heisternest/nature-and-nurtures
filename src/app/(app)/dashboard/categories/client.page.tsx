"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.imageUrl ?? ""}
          alt={row.getValue("name")}
          className="h-10 w-10"
        />
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <span>{createdAt.toLocaleDateString()}</span>;
    },
  },
  // add edit which redirects to /edit
  {
    id: "edit",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/categories/${row.original.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
      );
    },
  },
];

export default function CategoriesPageClient({ data }: { data: Category[] }) {
  return (
    <div className="container mx-auto py-8 px-8">
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
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
