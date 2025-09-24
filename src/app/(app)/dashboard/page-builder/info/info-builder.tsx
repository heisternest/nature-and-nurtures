"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FileUpload } from "@/components/file-upload";
import { RichTextEditor } from "@/components/text-editor/text-editor";
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
import { toast } from "sonner";
import { InfoData, infoSchema } from "./schema";

export function InfoDisplay({ data }: { data: InfoData }) {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: data.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text */}
          <div className="lg:col-span-5">
            <div
              className="prose  break-words overflow-hidden [&_*]:max-w-full [&_img]:h-64 [&_img]:w-full [&_img]:object-cover"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
            <div
              className="mt-8 prose  break-words overflow-hidden [&_*]:max-w-full [&_img]:h-64 [&_img]:w-full [&_img]:object-cover"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Image Grid (2x2 square) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {data.image1 && (
              <img
                src={data.image1}
                alt="Image 1"
                className="rounded-xl object-cover w-full aspect-square"
              />
            )}
            {data.image2 && (
              <img
                src={data.image2}
                alt="Image 2"
                className="rounded-xl object-cover w-full aspect-square"
              />
            )}
            {data.image3 && (
              <img
                src={data.image3}
                alt="Image 3"
                className="rounded-xl object-cover w-full aspect-square"
              />
            )}
            {data.image4 && (
              <img
                src={data.image4}
                alt="Image 4"
                className="rounded-xl object-cover w-full aspect-square"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Form Builder ----------------
export function InfoFormBuilder({
  data,
  onSave,
}: {
  data?: Partial<InfoData>;
  onSave?: (data: InfoData) => Promise<{ success: boolean }>;
}) {
  const [loading, setLoading] = useState(false);

  const defaultData: InfoData = {
    title:
      "Clean, Beyond Reproach <em class='italic font-serif'>Skincare.</em>",
    description:
      "WE LOVE IT FOR MODERN UI DESIGN BECAUSE OF ITS SIMPLE, CLEAN, AND DISTINCTIVE GEOMETRIC STYLE...",
    image1: "/placeholder.png",
    image2: "/placeholder.png",
    backgroundColor: "#ffffff",
    ...data,
  };

  const form = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: defaultData,
  });

  const onSubmit = async (values: InfoData) => {
    try {
      setLoading(true);
      if (onSave) {
        const { success } = await onSave(values);
        success
          ? toast.success("Section saved successfully")
          : toast.error("Failed to save section");
      }
    } finally {
      setLoading(false);
    }
  };

  const infoData = form.watch();

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col lg:flex-row">
      {/* Form Panel */}
      <aside className="w-full lg:w-2/5 xl:w-1/3 h-screen bg-white border-r flex flex-col">
        {/* Header with Save Button */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Edit className="text-gray-600" size={24} />
            <h2 className="text-xl font-bold ml-3">Info Section Editor</h2>
          </div>
          <Button
            type="submit"
            size="sm"
            className="bg-black text-white hover:bg-gray-800"
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-grow overflow-y-auto px-8 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={infoData.description}
                        onChange={(value) =>
                          form.setValue("description", value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Left Image */}
              <FormField
                control={form.control}
                name="image1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image 1</FormLabel>
                    <FormControl>
                      <FileUpload
                        bucketName="ecom"
                        control={form.control}
                        type="single"
                        value={field.value}
                        name="image1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Right Image */}
              <FormField
                control={form.control}
                name="image2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image 2</FormLabel>
                    <FormControl>
                      <FileUpload
                        bucketName="ecom"
                        control={form.control}
                        type="single"
                        value={field.value}
                        name="image2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image 3 (Optional) */}
              <FormField
                control={form.control}
                name="image3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image 3 (Optional)</FormLabel>
                    <FormControl>
                      <FileUpload
                        bucketName="ecom"
                        control={form.control}
                        type="single"
                        value={field.value}
                        name="image3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image 4 (Optional) */}
              <FormField
                control={form.control}
                name="image4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image 4 (Optional)</FormLabel>
                    <FormControl>
                      <FileUpload
                        bucketName="ecom"
                        control={form.control}
                        type="single"
                        value={field.value}
                        name="image4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Background */}
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <Input type="color" className="h-12" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </aside>

      {/* Preview */}
      <main className="w-full lg:w-3/5 xl:w-2/3 flex-grow bg-gray-50 flex items-center justify-center overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="transform scale-75 origin-top w-[133%]">
            <InfoDisplay data={infoData as any} />
          </div>
        </div>
      </main>
    </div>
  );
}
