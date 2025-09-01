"use client";

import {
  IconBorderBottom,
  IconCategory,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconListDetails,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: IconChartBar,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconCategory,
    },
  ],

  navPageBuilder: [
    {
      name: "Hero Section",
      url: "/dashboard/page-builder/hero",
      icon: IconSettings,
    },
    {
      name: "FAQ",
      url: "/dashboard/page-builder/faq",
      icon: IconHelp,
    },
    {
      name: "Footer",
      url: "/dashboard/page-builder/footer",
      icon: IconBorderBottom,
    },
  ],
  documents: [
    {
      name: "Blogs",
      url: "/dashboard/blogs",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src={"/logo.png"} alt="Logo" className="h-4 " />
                <span className="text-base font-semibold">Admin Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavDocuments title="Documents" items={data.documents} />
        <NavDocuments title="Page Builder" items={data.navPageBuilder} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
