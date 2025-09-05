"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { saveFooterSocialLinks } from "./action";

const socialMediaSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  url: z.string().url("Invalid URL"),
});

const footerSchema = z.object({
  socialLinks: z.array(socialMediaSchema),
});

type FooterFormData = z.infer<typeof footerSchema>;

const socialIcons = [
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "github", label: "GitHub", icon: Github },
];

interface FooterFormProps {
  initialData: FooterFormData["socialLinks"];
}

export function FooterForm({ initialData }: FooterFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FooterFormData>({
    resolver: zodResolver(footerSchema),
    defaultValues: {
      socialLinks:
        initialData.length > 0 ? initialData : [{ icon: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      form.reset({
        socialLinks: initialData,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: FooterFormData) => {
    setIsSaving(true);
    try {
      const result = await saveFooterSocialLinks(data.socialLinks);
      console.log("Footer data saved successfully:", result);
      toast.success("Footer data saved successfully!");
    } catch (error) {
      console.error("Error saving footer data:", error);
      toast.error("Failed to save footer data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Footer Social Media Links</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end gap-4 p-4 border rounded-lg"
            >
              <FormField
                control={form.control}
                name={`socialLinks.${index}.icon`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Icon</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {socialIcons.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center gap-2">
                              <icon.icon className="w-4 h-4" />
                              {icon.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1 || isSaving}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ icon: "", url: "" })}
              disabled={isSaving}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Social Link
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Footer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
