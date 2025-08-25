"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SaveCategory } from "./action";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional()
    .nullable(),
  imageUrl: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .optional()
    .nullable(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryEdit({ category }: { category: Category }) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    },
  });

  const router = useRouter();

  const param = useParams<{ category_id: string }>();

  async function onSubmit(values: CategoryFormValues) {
    try {
      const save = await SaveCategory(param.category_id, values);
      if (save.success) {
        toast("Category Updated Successfully");
        router.push("/dashboard/categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  }

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="mb-4 text-2xl font-semibold">Update Category</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 max-w-xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short description"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FileUpload
            name="imageUrl"
            control={form.control}
            bucketName="ecom"
            value={form.watch("imageUrl") as string | undefined}
            type="single"
          />

          <div className="flex items-center gap-2">
            <Button type="submit">Update Category</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
