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
        take: 3,
      },
    },
    skip: 0,
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const collections = await prisma.productCollection.findMany({
    where: { active: true },
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return <HeaderClient data={data} collections={collections} />;
}
