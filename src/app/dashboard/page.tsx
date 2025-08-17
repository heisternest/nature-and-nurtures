"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Dashboard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const salesByLocationData = [
  { name: "January", current: 40, previous: 35 },
  { name: "February", current: 80, previous: 70 },
  { name: "March", current: 75, previous: 60 },
  { name: "April", current: 30, previous: 45 },
  { name: "May", current: 25, previous: 40 },
  { name: "June", current: 85, previous: 65 },
];

const trendData = [
  { name: "January", line1: 30, line2: 20, line3: 25 },
  { name: "February", line1: 35, line2: 25, line3: 30 },
  { name: "March", line1: 45, line2: 35, line3: 40 },
  { name: "April", line1: 40, line2: 30, line3: 35 },
  { name: "May", line1: 50, line2: 40, line3: 45 },
  { name: "June", line1: 55, line2: 45, line3: 50 },
  { name: "July", line1: 60, line2: 50, line3: 55 },
  { name: "August", line1: 65, line2: 55, line3: 60 },
  { name: "September", line1: 70, line2: 60, line3: 65 },
  { name: "October", line1: 75, line2: 65, line3: 70 },
  { name: "November", line1: 80, line2: 70, line3: 75 },
  { name: "December", line1: 85, line2: 75, line3: 80 },
];

const pieData = [
  { name: "Direct", value: 4200, color: "#000000" },
  { name: "Social", value: 3100, color: "#666666" },
  { name: "Email", value: 1800, color: "#999999" },
  { name: "Referrals", value: 900, color: "#cccccc" },
];

import { StatsCards } from "@/components/dashboard/stats-card";
import { StatsChart } from "@/components/dashboard/stats-chart";
import { OrdersAndProductsTable } from "@/components/dashboard/top-table";
import React from "react";

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
