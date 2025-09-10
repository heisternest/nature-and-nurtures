import { CollectionForm } from "../collection-form";
import { createCollection } from "./action";

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

      <CollectionForm submit={createCollection} />
    </div>
  );
}
