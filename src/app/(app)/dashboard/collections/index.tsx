"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    products: number;
  };
}

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("description") || "No description"}
      </div>
    ),
  },
  {
    accessorKey: "_count.products",
    header: "Products",
    cell: ({ row }) => (
      <div className="text-center">{row.original._count?.products || 0}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("updatedAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/collections/${row.original.id}`}>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>
    ),
  },
];

export function CollectionPageClient({ collections }: { collections: any[] }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
          <p className="text-muted-foreground">
            Manage your product collections
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/collections/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Collection
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Collections</CardTitle>
          <CardDescription>
            A list of all your product collections including their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={collections} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
