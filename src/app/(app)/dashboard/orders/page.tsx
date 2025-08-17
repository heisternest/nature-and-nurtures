"use client";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  FileUp,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const cardData = [
  {
    title: "Total Orders",
    value: "21",
    change: "+25.2% last week",
    trend: [
      { name: "Page A", uv: 200 },
      { name: "Page B", uv: 300 },
      { name: "Page C", uv: 250 },
      { name: "Page D", uv: 400 },
      { name: "Page E", uv: 350 },
    ],
  },
  {
    title: "Order items over time",
    value: "15",
    change: "+18.2% last week",
    trend: [
      { name: "Page A", uv: 100 },
      { name: "Page B", uv: 250 },
      { name: "Page C", uv: 150 },
      { name: "Page D", uv: 300 },
      { name: "Page E", uv: 280 },
    ],
  },
  {
    title: "Returns Orders",
    value: "0",
    change: "-1.2% last week",
    trend: [
      { name: "Page A", uv: 400 },
      { name: "Page B", uv: 300 },
      { name: "Page C", uv: 350 },
      { name: "Page D", uv: 200 },
      { name: "Page E", uv: 220 },
    ],
    stroke: "#ef4444",
  },
  {
    title: "Fulfilled orders over time",
    value: "12",
    change: "+12.2% last week",
    trend: [
      { name: "Page A", uv: 200 },
      { name: "Page B", uv: 300 },
      { name: "Page C", uv: 250 },
      { name: "Page D", uv: 400 },
      { name: "Page E", uv: 350 },
    ],
  },
];

const ordersData = [
  {
    id: "1002",
    date: "11 Feb, 2024",
    customer: "Wade Warren",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "1004",
    date: "13 Feb, 2024",
    customer: "Esther Howard",
    payment: "Success",
    total: "$22.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "1007",
    date: "15 Feb, 2024",
    customer: "Jenny Wilson",
    payment: "Pending",
    total: "$25.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "1009",
    date: "17 Feb, 2024",
    customer: "Guy Hawkins",
    payment: "Success",
    total: "$27.00",
    delivery: "N/A",
    items: "5 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "1011",
    date: "19 Feb, 2024",
    customer: "Jacob Jones",
    payment: "Pending",
    total: "$32.00",
    delivery: "N/A",
    items: "4 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "1013",
    date: "21 Feb, 2024",
    customer: "Kristin Watson",
    payment: "Success",
    total: "$215.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "1015",
    date: "23 Feb, 2024",
    customer: "Albert Flores",
    payment: "Pending",
    total: "$28.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "1018",
    date: "25 Feb, 2024",
    customer: "Eleanor Pena",
    payment: "Success",
    total: "$35.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "1019",
    date: "27 Feb, 2024",
    customer: "Theresa Webb",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Unfulfilled",
  },
];

function paymentColor(paymentStatus: string) {
  switch (paymentStatus) {
    case "Pending":
      return "text-yellow-600 bg-yellow-100 border-yellow-400";
    case "Success":
      return "text-green-600 bg-green-100 border-green-500";
    case "Failed":
      return "text-red-600 bg-red-100 border-red-500";
    default:
      return "text-gray-600 bg-gray-100";
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
  customer: string;
  payment: string;
  total: string;
  delivery: string;
  items: string;
  fulfillment: string;
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
  { accessorKey: "date", header: "Date" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => (
      <Badge className={paymentColor(row.getValue("payment"))}>
        {row.getValue("payment")}
      </Badge>
    ),
  },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "delivery", header: "Delivery" },
  { accessorKey: "items", header: "Items" },
  {
    accessorKey: "fulfillment",
    header: "Fulfillment",
    cell: ({ row }) => (
      <Badge className={fulfillmentColor(row.getValue("fulfillment"))}>
        {row.getValue("fulfillment")}
      </Badge>
    ),
  },
];

export default function OrdersPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <FileUp className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              More actions <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create order
            </Button>
          </div>
        </div>

        {/* Date Picker - Simplified */}
        <div className="mb-6">
          <Button variant="outline" size="sm">
            Jan 1 - Jan 30, 2024 <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
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
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unfulfilled">Unfulfilled</TabsTrigger>
                  <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
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
              <DataTable columns={columns} data={ordersData} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
