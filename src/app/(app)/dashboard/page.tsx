import { getDashboardStats } from "@/actions/dashboard";
import { StatsCards } from "@/components/dashboard/stats-card";
import { StatsChart } from "@/components/dashboard/stats-chart";
import { OrdersAndProductsTable } from "@/components/dashboard/top-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View dashboard statistics, revenue, orders, and product performance.",
};

export default async function Page() {
  const dashboardData = await getDashboardStats();

  return <Dashboard data={dashboardData} />;
}

interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: Array<{
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    avatar: string;
  }>;
  bestSellingProducts: Array<{
    name: string;
    sales: string;
    quantity: number;
    image: string;
  }>;
  revenueData: Array<{ name: string; value: number }>;
  salesData: Array<{ name: string; value: number }>;
  customersData: Array<{ name: string; value: number }>;
}

function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Top Metrics */}
        <StatsCards data={data} />

        <StatsChart />

        <OrdersAndProductsTable data={data} />
      </div>
    </div>
  );
}
