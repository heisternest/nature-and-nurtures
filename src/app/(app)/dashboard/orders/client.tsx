"use client";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ListFilter, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer } from "recharts";

function paymentColor(paymentStatus: string) {
  switch (paymentStatus) {
    case "refund":
      return "text-red-600 bg-red-100 border-red-400";
    case "complete":
      return "text-green-600 bg-green-100 border-green-500";
  }
}

function fulfillmentColor(fulfillmentStatus: string) {
  switch (fulfillmentStatus) {
    case "Fulfilled":
      return "text-green-600 bg-green-100 border-green-500";
    case "Unfulfilled":
      return "text-red-600 bg-red-100 border-red-500";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  payment: string;
  total: string;
  delivery: string;
  items: string;
  order_type: string;
  customerAddressLine1: string;
  customerAddressLine2: string;
  customerCity: string;
  deliveryStatus: OrderStatus;
  _count: {
    items: number;
  };
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
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
    cell: ({ row }) => (
      <Badge className={paymentColor(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "amountTotal",
    header: "Total",
    cell: ({ row }) => `$${(row.getValue("amountTotal") as number) / 100}`,
  },
  {
    accessorKey: "_count.items",
    header: "Items",
    cell: ({ row }) => `${row.original._count.items} Items`,
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => (
      <Badge className={fulfillmentColor(row.getValue("deliveryStatus"))}>
        {row.getValue("deliveryStatus")}
      </Badge>
    ),
  },
];

export function OrdersPageClient({
  data,
  cardData,
}: {
  data: any;
  cardData: any[];
}) {
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {cardData.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-3xl font-bold">{card.value}</p>
                    <p
                      className={`text-xs ${
                        card.change.startsWith("-")
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {card.change}
                    </p>
                  </div>
                  <div className="h-16 w-28 -mr-4 -mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={card.trend}>
                        <Line
                          type="monotone"
                          dataKey="uv"
                          stroke={card.stroke || "#8884d8"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table Section */}
        <Card>
          <Tabs defaultValue="all">
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 pr-2 py-1.5 border rounded-md w-full sm:w-auto text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <ListFilter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <TabsContent value="all" className="p-4">
              <DataTable columns={columns} data={data} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
