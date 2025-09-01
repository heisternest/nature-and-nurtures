import prisma from "@/lib/db";
import { OrderDetailsClient } from "./client";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const orderDetail = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              images: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!orderDetail) {
    throw new Error("Order not found");
  }

  return (
    <div>
      <OrderDetailsClient data={orderDetail} />
    </div>
  );
}
