import prisma from "@/lib/db";
import { OrdersPageClient } from "./client";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  console.log(orders);

  return <OrdersPageClient data={orders} />;
}
