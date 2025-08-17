"use client";

export default function Page() {
  return <Dashboard />;
}

import { StatsCards } from "@/components/dashboard/stats-card";
import { StatsChart } from "@/components/dashboard/stats-chart";
import { OrdersAndProductsTable } from "@/components/dashboard/top-table";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Top Metrics */}
        <StatsCards />

        <StatsChart />

        <OrdersAndProductsTable />
      </div>
    </div>
  );
}
