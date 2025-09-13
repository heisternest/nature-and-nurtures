"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CollectionFormValues, collectionSchema } from "./schema";

export function CollectionForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<CollectionFormValues>;
  onSubmit: (
    values: CollectionFormValues
  ) => Promise<{ success: boolean; message: string }>;
}) {
  const form = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      id: "",
      name: "",
      slug: "",
      description: "",
      active: false,
      imageUrl: "",
      ...defaultValues,
    },
  });

  const nameValue = form.watch("name");
  const slugValue = form.watch("slug");

  useEffect(() => {
    if (nameValue && !slugValue) {
      form.setValue("slug", `${slugify(nameValue)}`);
    }
  }, [nameValue]);

  const router = useRouter();

  async function handleSubmit(values: CollectionFormValues) {
    if (!values.slug && values.name) {
      values.slug = `${slugify(values.name)}`;
    }

    try {
      const res = await onSubmit(values);
      if (res.success) {
        toast.success(res.message || "Collection saved successfully");
        router.push("/dashboard/collections");
      } else {
        toast.error(res.message || "Failed to save collection");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full max-w-3xl"
      >
        {/* ID (hidden field, optional) */}
        <input type="hidden" {...form.register("id")} />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="auto-generated if empty" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Toggle */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1 flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Provide a detailed description of this category (max 500 characters)..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value || ""}
                  control={form.control}
                  name="imageUrl"
                  type="single"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <Button type="submit" className="w-full">
            Save Category
          </Button>
        </div>
      </form>
    </Form>
  );
}
