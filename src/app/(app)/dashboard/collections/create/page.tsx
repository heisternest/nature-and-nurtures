import prisma from "@/lib/db";
import { CollectionData, CollectionForm } from "../collection-form";

async function createCollection(data: CollectionData) {
  try {
    const collection = await prisma.productCollection.create({
      data: {
        name: data.name,
        description: data.description,
        products: {
          connect: data.productIds?.map((id) => ({ id })) || [],
        },
      },
    });

    return { ok: true, collection };
  } catch (error: any) {
    console.error("Error creating collection:", error);

    // Handle unique constraint violation
    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      return { ok: false, error: "A collection with this name already exists" };
    }

    return { ok: false, error: "Failed to create collection" };
  }
}

export const metadata = {
  title: "Create Collection",
  description: "Add a new product collection",
};

export default function CreateCollectionPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Create Collection
          </h2>
          <p className="text-muted-foreground">
            Add a new product collection to organize your products
          </p>
        </div>
      </div>

      <CollectionForm onSubmit={createCollection} />
    </div>
  );
}
