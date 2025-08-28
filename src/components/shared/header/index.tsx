"use server";

import prisma from "@/lib/db";
import { HeaderClient } from "./client";

export default async function Header() {
  const data = await prisma.category.findMany({
    include: {
      products: {
        where: {
          active: true,
        },
      },
    },
  });
  return <HeaderClient data={data} />;
}
