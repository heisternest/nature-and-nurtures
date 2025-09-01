"use client";

import { deleteCategory } from "@/actions/dashboard";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.imageUrl ?? ""}
          alt={row.getValue("name")}
          className="h-10 w-10"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground w-60 block overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("description")}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <span>{createdAt.toLocaleDateString()}</span>;
    },
  },
  // add edit which redirects to /edit
  {
    id: "edit",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/categories/${row.original.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>

          <DeleteCategoryButton category={row.original} />
        </div>
      );
    },
  },
];

function DeleteCategoryButton({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCategory(category.id);
      if (result.success) {
        toast.success("Category deleted successfully");
        // Revalidation is handled server-side, but we refresh for immediate UI update
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete category");
      }
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{category.name}&quot;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CategoriesPageClient({ data }: { data: Category[] }) {
  return (
    <div className="container mx-auto py-8 px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your product categories with ease
          </p>
        </div>
        <Link href="/dashboard/categories/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Category
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
