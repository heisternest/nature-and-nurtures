import prisma from "@/lib/db";
import { HeaderClient } from "./client";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
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
