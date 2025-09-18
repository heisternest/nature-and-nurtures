"use client";

import { cn, getEmbedUrl } from "@/lib/utils";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { herobuilderSchema, HeroData } from "./schema";

function HeroDisplay({ data }: { data: HeroData }) {
  return (
    <section
      className={cn("w-full")}
      style={{ backgroundColor: data.backgroundColor }}
    >
      <div className="mx-auto grid md:grid-cols-2 items-center">
        <div className="p-10 space-y-6 px-12 md:px-24 lg:px-32">
          <div
            className="prose prose-lg max-w-none text-4xl md:text-6xl font-light whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          <div
            className="prose prose-sm  text-sm max-w-md"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <a
            href="#"
            className="inline-flex items-center bg-black text-white rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider
                       transform transition-transform duration-200 hover:scale-105 hover:bg-gray-800"
          >
            {data.buttonText}
            <span className="ml-2 inline-flex justify-center items-center w-6 h-6 bg-white text-black rounded-full">
              →
            </span>
          </a>
        </div>

        {/* Right */}
        <div className="w-full h-full flex items-center justify-center">
          {data.mediaType === "image" && data.imageUrl && (
            <img
              src={data.imageUrl}
              alt="Hero"
              className="w-full object-cover md:object-contain h-full"
              width={1200}
              height={800}
            />
          )}
          {data.mediaType === "video" && data.videoUrl && (
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(data.videoUrl)}
                title="Hero Video"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HeroFormBuilder({
  data,
  onSave,
}: {
  data?: Partial<HeroData>;
  onSave?: (data: HeroData) => Promise<{
    success: boolean;
  }>;
}) {
  const [loading, setLoading] = useState(false);

  const defaultHero: HeroData = {
    title: "True to Oneself, kind to Nature.",
    description:
      "UNRESERVEDLY HONEST PRODUCTS THAT TRULY WORK, AND BE KIND TO SKIN AND THE PLANET – NO EXCEPTIONS!",
    buttonText: "EXPLORE ALL PRODUCTS",
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "",
    backgroundColor: "#ffffff",
    ...data,
  };

  const form = useForm<HeroData>({
    resolver: zodResolver(herobuilderSchema),
    defaultValues: defaultHero,
  });

  const onSubmit = async (values: HeroData) => {
    try {
      setLoading(true);
      if (onSave) {
        const { success } = await onSave(values);
        if (success) {
          toast.success("Hero saved successfully");
        } else {
          toast.error("Failed to save hero");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const heroData = form.watch();

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col lg:flex-row">
      {/* Editor Panel */}
      <aside className="w-full lg:w-2/5 xl:w-1/3 h-screen bg-white border-r flex flex-col">
        {/* Header */}
        <div className="flex items-center px-8 py-4 border-b border-gray-200 flex-shrink-0">
          <Edit className="text-gray-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800 ml-3">
            Hero Section Editor
          </h2>
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
                        // onChange={(value) => form.setValue("title", value)}
                        onChange={(value) => field.onChange(value)}
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
                render={({}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={heroData.description}
                        onChange={(value) =>
                          form.setValue("description", value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Button Text */}
              <FormField
                control={form.control}
                name="buttonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Media Tabs */}
              <FormField
                control={form.control}
                name="mediaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media</FormLabel>
                    <FormControl>
                      <Tabs
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                          if (v === "image") {
                            form.setValue("videoUrl", undefined); // clear video
                          } else {
                            form.setValue("imageUrl", undefined); // clear image
                          }
                        }}
                      >
                        <TabsList className="grid grid-cols-2 mb-2">
                          <TabsTrigger value="image">Image</TabsTrigger>
                          <TabsTrigger value="video">Video</TabsTrigger>
                        </TabsList>

                        <TabsContent value="image">
                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                  <FileUpload
                                    bucketName="ecom"
                                    control={form.control}
                                    type="single"
                                    value={field.value}
                                    name="imageUrl"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent value="video">
                          <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>YouTube/Vimeo URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://youtube.com/embed/xyz"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Background Color */}
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <Input type="color" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Fixed Save Button */}
        <div className="px-8 py-4 border-t border-gray-200 flex-shrink-0">
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </aside>

      {/* Live Preview */}
      <main className="w-full lg:w-3/5 xl:w-2/3 flex-grow bg-gray-50 flex items-center justify-center overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="transform scale-75 origin-top w-[133%]">
            <HeroDisplay data={heroData} />
          </div>
        </div>
      </main>
    </div>
  );
}
