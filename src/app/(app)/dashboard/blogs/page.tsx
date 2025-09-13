"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DynamicDataTable from "@/components/ui/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabaseClient } from "@/lib/supabase/client";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Post Title",
    cell: (info) => (
      <Link
        href={`/dashboard/blogs/${info.row.original.id}/edit`}
        className="font-medium"
      >
        {info.getValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info) => (
      <div className="">
        {new Date(info.getValue<string>()).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Badge className="capitalize">{info.getValue<string>()}</Badge>
    ),
  },
  {
    accessorKey: "categories",
    header: "Category",
    cell: (info) => (
      <div className="">
        {info
          .getValue<string[]>()
          .map((category) => category)
          .join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => (
      <div className="">
        {new Date(info.getValue<string>()).toLocaleDateString()}
      </div>
    ),
  },
];

export default function Page() {
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
            <p className="text-gray-600">Manage and track your blog posts</p>
          </div>

          <Link
            href="/dashboard/blogs/create"
            className="bg-black  text-white px-4 py-1 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create Blogs
          </Link>
        </div>

        {/* Orders Table Section */}
        <Card>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="p-4">
              <DynamicDataTable<any>
                supabase={supabaseClient}
                table="Blog"
                select="*"
                columns={columns}
                searchableColumns={["name"]}
                filterDefs={[
                  {
                    id: "status",
                    title: "Filter By Status",
                    options: [
                      { label: "Draft", value: "draft" },
                      { label: "Published", value: "published" },
                      { label: "Archived", value: "archived" },
                    ],
                    type: "select",
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
