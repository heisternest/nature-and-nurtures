"use client";

import { FileUpload } from "@/components/file-upload";
import { RichTextEditor } from "@/components/text-editor/text-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FAQFormData, FAQSchema } from "./schema";
// import { SaveFAQ } from "./action";

const defaultFAQ: FAQFormData = {
  headline: "",
  imageUrl: "/hero.webp",
  accordionItems: [
    { title: "First question", content: "Answer for the first question." },
    { title: "Second question", content: "Answer for the second question." },
  ],
};

export function FAQBuilderForm({
  data,
  onsave,
}: {
  data?: FAQFormData | null;
  onsave?: (data: FAQFormData) => Promise<{ success: boolean }>;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FAQFormData>({
    resolver: zodResolver(FAQSchema),
    defaultValues: data ?? defaultFAQ,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "accordionItems",
  });

  const saveFaq = async (values: FAQFormData) => {
    setLoading(true);
    try {
      if (onsave) {
        const save = await onsave(values);
        if (save.success) toast.success("Successfully saved");
        else throw new Error("Failed to save FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error("Error saving FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 font-sans flex flex-col lg:flex-row">
      {/* Form Panel */}
      <aside className="w-full lg:w-2/5 xl:w-2/5 h-screen bg-white border-r flex flex-col">
        <div className="flex items-center px-8 py-4 border-b border-gray-200 flex-shrink-0">
          <Edit className="text-gray-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800 ml-3">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="flex-grow overflow-y-auto  py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(saveFaq)}
              className="flex flex-col h-full"
            >
              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Headlines */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Media */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value}
                            bucketName="ecom"
                            type="single"
                            control={form.control}
                            name="imageUrl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Accordion Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">FAQ Items</h3>
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          title: "New Question",
                          content: "Answer for the new question.",
                        })
                      }
                    >
                      Add Accordion Item
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 border rounded-md relative space-y-4"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>

                      <FormField
                        control={form.control}
                        name={`accordionItems.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item {index + 1} Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`accordionItems.${index}.content`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item {index + 1} Content</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Bottom Save Button */}
              <div className="border-t border-gray-200 bg-white px-10 py-4 sticky bottom-0 z-10">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Saving..." : "Save FAQ"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </aside>

      {/* Live Preview */}
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <FAQSectionDisplay data={form.watch()} />
      </main>
    </div>
  );
}

interface FAQSectionDisplayProps {
  data: FAQFormData;
}

function FAQSectionDisplay({ data }: FAQSectionDisplayProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden w-full rounded-lg">
          <img
            src={data.imageUrl === "" ? "/hero.webp" : data.imageUrl}
            alt="FAQ Image"
            width={1200}
            height={800}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div dangerouslySetInnerHTML={{ __html: data.headline }} />

          <Accordion type="multiple" className="space-y-2">
            {data.accordionItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  <p>{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
