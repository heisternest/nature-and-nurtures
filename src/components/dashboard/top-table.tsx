import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { DataTable } from "../data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const bestSellingProducts = [
  { name: "Apple Watch", sales: "$278.00", quantity: 20, image: "📱" },
  { name: "Macbook T-Shirt", sales: "$270.00", quantity: 20, image: "👕" },
  { name: "Jeans", sales: "$190.00", quantity: 15, image: "👖" },
  { name: "Nike Sneakers", sales: "$420.00", quantity: 40, image: "👟" },
  { name: "Red Scarf", sales: "$80.00", quantity: 37, image: "🧣" },
  { name: "Formal Accessories", sales: "$320.00", quantity: 18, image: "👔" },
  { name: "Bicycle", sales: "$190.00", quantity: 19, image: "🚲" },
  { name: "Sports Shoes", sales: "$290.00", quantity: 8, image: "👟" },
];

const recentOrders = [
  {
    id: "#001",
    customer: "Theresa Webb",
    product: "Smartphone",
    amount: "$500.00",
    status: "Paid",
    avatar: "TW",
  },
  {
    id: "#002",
    customer: "Kathryn Murphy",
    product: "Engine Oil",
    amount: "$800.00",
    status: "Paid",
    avatar: "KM",
  },
  {
    id: "#003",
    customer: "Jerome Bell",
    product: "Brake Pad",
    amount: "$500.00",
    status: "Pending",
    avatar: "JB",
  },
  {
    id: "#004",
    customer: "Marvin McKinney",
    product: "Fuel Pump",
    amount: "$700.00",
    status: "Cancelled",
    avatar: "MM",
  },
  {
    id: "#005",
    customer: "Cody Fisher",
    product: "Cleaning Wheel",
    amount: "$350.00",
    status: "Paid",
    avatar: "CF",
  },
  {
    id: "#006",
    customer: "Savannah Nguyen",
    product: "Air Filter",
    amount: "$250.00",
    status: "Paid",
    avatar: "SN",
  },
  {
    id: "#007",
    customer: "Bessie Cooper",
    product: "Oil Filter",
    amount: "$270.00",
    status: "Pending",
    avatar: "BC",
  },
  {
    id: "#008",
    customer: "Leslie Alexander",
    product: "Radiator Cap",
    amount: "$240.00",
    status: "Cancelled",
    avatar: "LA",
  },
];

const recentOrdersTable = recentOrders.map((o, i) => ({
  id: i + 1,
  header: `${o.customer} — ${o.product}`,
  type: o.product,
  status: o.status,
  target: o.amount,
  limit: "-",
  reviewer: o.avatar || "",
}));

const bestSellingTable = bestSellingProducts.map((p, i) => ({
  id: recentOrders.length + i + 1,
  header: p.name,
  type: p.image,
  status: "Available",
  target: p.sales,
  limit: String(p.quantity),
  reviewer: "",
}));

const bestSellingColumns: ColumnDef<TableRow>[] = [
  { accessorKey: "header", header: "Product" },
  { accessorKey: "type", header: "Icon" },
  { accessorKey: "limit", header: "Qty" },
  { accessorKey: "target", header: "Sales" },
];

export const dataTableSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});
type TableRow = z.infer<typeof dataTableSchema>;

function getBgColor(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

const recentOrdersColumns: ColumnDef<TableRow>[] = [
  { accessorKey: "header", header: "Order" },
  { accessorKey: "type", header: "Product" },
  {
    accessorKey: "target",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={cn(getBgColor(row.getValue("status")))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  { accessorKey: "reviewer", header: "Avatar" },
];

export function OrdersAndProductsTable() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Filter orders..." className="max-w-sm" />
          </div>
          <DataTable data={recentOrdersTable} columns={recentOrdersColumns} />
          <p className="text-xs text-gray-500 mt-4">
            Showing 1 to 8 of {recentOrdersTable.length} results
          </p>
        </CardContent>
      </Card>

      {/* Best Selling Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Best Selling Products</CardTitle>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Filter products..." className="max-w-sm" />
          </div>
          <DataTable data={bestSellingTable} columns={bestSellingColumns} />
          <p className="text-xs text-gray-500 mt-4">
            Showing 1 to 8 of {bestSellingTable.length} results
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
