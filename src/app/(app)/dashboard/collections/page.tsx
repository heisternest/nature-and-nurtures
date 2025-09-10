import prisma from "@/lib/db";
import { CollectionPageClient } from ".";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    products: number;
  };
}

async function getCollections(): Promise<Collection[]> {
  try {
    const collections = await prisma.productCollection.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        active: true,
        updatedAt: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export const metadata = {
  title: "Product Collections",
  description: "Manage your product collections",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return <CollectionPageClient collections={collections} />;
}
