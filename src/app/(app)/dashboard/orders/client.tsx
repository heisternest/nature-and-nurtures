// app/(dashboard)/contacts/page.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DynamicDataTable from "@/components/ui/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabaseClient } from "@/lib/supabase/client";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => (
      <Link
        className="text-blue-600 hover:underline"
        href={`/dashboard/orders/${row.getValue("id")}`}
      >
        # {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },

  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col ">
          <p className="font-semibold">{row.original.customerName}</p>
          <p className="text-gray-500">{row.original.customerEmail}</p>
        </div>
      );
    },
  },
  {
    header: "Address",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col ">
          <p className="font-semibold">{row.original.customerAddressLine1}</p>
          <p className="text-gray-500">
            {row.original.customerAddressLine2}
            {", "}
            <span className="text-gray-500">{row.original.customerCity}</span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Payment",
    cell: ({ row }) => <Badge>{row.getValue("status")}</Badge>,
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => <Badge>{row.getValue("deliveryStatus")}</Badge>,
  },
];

export default function Page() {
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage and track your orders</p>
          </div>

          <Link href="/dashboard/orders/new">
            <Button>
              <PlusCircle className="h-4 w-4" />
              Create Order
            </Button>
          </Link>
        </div>

        {/* Orders Table Section */}
        <Card>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="p-4">
              <DynamicDataTable<any>
                supabase={supabaseClient}
                table="orders"
                select="*"
                columns={columns}
                searchableColumns={["customerName", "customerEmail"]}
                filterDefs={[
                  {
                    id: "id",
                    type: "text",
                    title: "Order Id",
                    operator: "eq",
                  },
                  {
                    id: "deliveryStatus",
                    type: "select",

                    title: "Delivery Status",
                    options: [
                      { label: "PROCESSING", value: "PROCESSING" },
                      { label: "COMPLETED", value: "COMPLETED" },
                      { label: "CANCELLED", value: "CANCELLED" },
                      { label: "PENDING", value: "PENDING" },
                    ],
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
