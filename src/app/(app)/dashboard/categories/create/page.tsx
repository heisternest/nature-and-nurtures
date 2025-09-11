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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateCategory } from "./action";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().optional().nullable(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoryCreate() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: CategoryFormValues) {
    try {
      const save = await CreateCategory(values);
      if (save.success) {
        toast("Category Created Successfully");
        router.push("/dashboard/categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    }
  }

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="mb-4 text-2xl font-semibold">Create Category</h1>

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
                  <Textarea placeholder="Short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FileUpload
            name="imageUrl"
            control={form.control}
            bucketName="ecom"
            value={form.watch("imageUrl") ?? undefined}
            type="single"
          />

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
