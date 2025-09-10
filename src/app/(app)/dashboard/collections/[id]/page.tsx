import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { CollectionForm } from "../collection-form";
import { handleUpdate } from "./action";

interface EditCollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCollection(id: string) {
  try {
    const collection = await prisma.productCollection.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        active: true,
        description: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!collection) {
      notFound();
    }

    return {
      ...collection,
      productIds: collection.products.map((p) => p.id),
    };
  } catch (error) {
    console.error("Error fetching collection:", error);
    notFound();
  }
}

export const metadata = {
  title: "Edit Collection",
  description: "Edit an existing product collection",
};

export default async function EditCollectionPage({
  params,
}: EditCollectionPageProps) {
  const param = await params;
  const collection = await getCollection(param.id);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Collection</h2>
          <p className="text-muted-foreground">
            Update the collection details below
          </p>
        </div>
      </div>

      <CollectionForm
        collection={{
          ...collection,
          description: collection.description ?? undefined,
          productIds: collection.productIds,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
