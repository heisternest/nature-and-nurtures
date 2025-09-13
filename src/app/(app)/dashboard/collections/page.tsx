"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DynamicDataTable from "@/components/ui/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabaseClient } from "@/lib/supabase/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, PlusCircle } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.imageUrl}
          alt="Collection Image"
          className="rounded-md w-12 h-12 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue-600 hover:underline flex items-center"
          href={`/dashboard/collections/${row.original.id}`}
        >
          {row.getValue("name")}

          <ExternalLink className="inline-block ml-2 h-4 w-4" />
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground w-60 block overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("description")}
        </span>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <Badge className={active ? "bg-green-500" : "bg-red-500"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <span>{new Date(createdAt).toLocaleDateString()}</span>;
    },
  },
];

export default function Page() {
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Product Collections
            </h1>
            <p className="text-gray-600">
              Manage and track your product collections
            </p>
          </div>

          <Link
            href="/dashboard/collections/create"
            className="bg-black  text-white px-4 py-1 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create Collection
          </Link>
        </div>

        {/* Orders Table Section */}
        <Card>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="p-4">
              <DynamicDataTable<any>
                supabase={supabaseClient}
                table="product_collections"
                select="*"
                columns={columns}
                searchableColumns={["name"]}
                filterDefs={[]}
                initialPagination={{ pageSize: 20 }}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
