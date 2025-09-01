"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  orderId: string,
  deliveryStatus: string
) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        deliveryStatus: deliveryStatus as any,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/dashboard/orders/${orderId}`);
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
