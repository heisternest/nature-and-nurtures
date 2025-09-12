import prisma from "@/lib/db";
import { OrdersPageClient } from "./client";
export const revalidate = 1;

export const metadata = {
  title: "Orders | Dashboard | Nature and Nurtures",
  description: "Manage and view all orders in your dashboard.",
};

export default async function OrdersPage() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);

  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(now.getDate() - 5);
  fiveDaysAgo.setHours(0, 0, 0, 0);

  // Total orders this week and last week
  const totalOrdersThisWeek = await prisma.order.count({
    where: { createdAt: { gte: startOfWeek } },
  });

  const totalOrdersLastWeek = await prisma.order.count({
    where: { createdAt: { gte: startOfLastWeek, lt: startOfWeek } },
  });

  // Total items this week and last week
  const itemsThisWeekResult = await prisma.orderItem.aggregate({
    _sum: { quantity: true },
    where: { order: { createdAt: { gte: startOfWeek } } },
  });
  const itemsThisWeek = itemsThisWeekResult._sum.quantity || 0;

  const itemsLastWeekResult = await prisma.orderItem.aggregate({
    _sum: { quantity: true },
    where: { order: { createdAt: { gte: startOfLastWeek, lt: startOfWeek } } },
  });
  const itemsLastWeek = itemsLastWeekResult._sum.quantity || 0;

  // Returns this week and last week
  const returnsThisWeek = await prisma.order.count({
    where: {
      deliveryStatus: { in: ["CANCELLED", "REFUNDED"] },
      createdAt: { gte: startOfWeek },
    },
  });

  const returnsLastWeek = await prisma.order.count({
    where: {
      deliveryStatus: { in: ["CANCELLED", "REFUNDED"] },
      createdAt: { gte: startOfLastWeek, lt: startOfWeek },
    },
  });

  // Fulfilled this week and last week
  const fulfilledThisWeek = await prisma.order.count({
    where: {
      deliveryStatus: "DELIVERED",
      createdAt: { gte: startOfWeek },
    },
  });

  const fulfilledLastWeek = await prisma.order.count({
    where: {
      deliveryStatus: "DELIVERED",
      createdAt: { gte: startOfLastWeek, lt: startOfWeek },
    },
  });

  // Trends: last 5 days
  const recentOrders = await prisma.order.findMany({
    where: { createdAt: { gte: fiveDaysAgo } },
    select: { createdAt: true, deliveryStatus: true },
  });

  const recentOrderItems = await prisma.orderItem.findMany({
    where: { order: { createdAt: { gte: fiveDaysAgo } } },
    select: { quantity: true, order: { select: { createdAt: true } } },
  });

  // Group by day
  const groupByDay = (items: any[], dateField: string) => {
    const groups: { [key: string]: number } = {};
    items.forEach((item) => {
      const date = new Date(item[dateField]);
      const day = date.toISOString().split("T")[0];
      groups[day] = (groups[day] || 0) + 1;
    });
    return groups;
  };

  const totalOrdersTrend = groupByDay(recentOrders, "createdAt");

  const itemsTrend: { [key: string]: number } = {};
  recentOrderItems.forEach((item) => {
    const date = new Date(item.order.createdAt);
    const day = date.toISOString().split("T")[0];
    itemsTrend[day] = (itemsTrend[day] || 0) + item.quantity;
  });

  const returnsTrend = groupByDay(
    recentOrders.filter((o) =>
      ["CANCELLED", "REFUNDED"].includes(o.deliveryStatus)
    ),
    "createdAt"
  );

  const fulfilledTrend = groupByDay(
    recentOrders.filter((o) => o.deliveryStatus === "DELIVERED"),
    "createdAt"
  );

  // Generate trend arrays for last 5 days
  const generateTrend = (data: { [key: string]: number }) => {
    const days = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const day = date.toISOString().split("T")[0];
      days.push({ name: `Day ${5 - i}`, uv: data[day] || 0 });
    }
    return days;
  };

  const totalOrdersTrendArray = generateTrend(totalOrdersTrend);
  const itemsTrendArray = generateTrend(itemsTrend);
  const returnsTrendArray = generateTrend(returnsTrend);
  const fulfilledTrendArray = generateTrend(fulfilledTrend);

  // Calculate changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const percent = (((current - previous) / previous) * 100).toFixed(1);
    return (percent.startsWith("-") ? "" : "+") + percent + "%";
  };

  const cardData = [
    {
      title: "Total Orders",
      value: totalOrdersThisWeek.toString(),
      change:
        calculateChange(totalOrdersThisWeek, totalOrdersLastWeek) +
        " last week",
      trend: totalOrdersTrendArray,
    },
    {
      title: "Order items over time",
      value: itemsThisWeek.toString(),
      change: calculateChange(itemsThisWeek, itemsLastWeek) + " last week",
      trend: itemsTrendArray,
    },
    {
      title: "Returns Orders",
      value: returnsThisWeek.toString(),
      change: calculateChange(returnsThisWeek, returnsLastWeek) + " last week",
      trend: returnsTrendArray,
      stroke: "#ef4444",
    },
    {
      title: "Fulfilled orders over time",
      value: fulfilledThisWeek.toString(),
      change:
        calculateChange(fulfilledThisWeek, fulfilledLastWeek) + " last week",
      trend: fulfilledTrendArray,
    },
  ];

  return <OrdersPageClient cardData={cardData} />;
}
