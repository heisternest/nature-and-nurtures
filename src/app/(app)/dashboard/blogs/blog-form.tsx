import { FileUpload } from "@/components/file-upload";
import { RichTextEditor } from "@/components/text-editor/text-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Eye,
  FileText,
  FolderOpen,
  Globe,
  ImageIcon,
  Lock,
  Plus,
  Save,
  Send,
  Settings,
  Tag,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BlogFormValues, blogSchema } from "./blog.schema";

const supabase = createClient();

export function BlogForm() {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      categories: [],
      tags: [],
      featuredImage: "",
      status: "draft",
      metaDescription: "",
      slug: "",
      visibility: "public",
    },
  });

  const [showPreview, setShowPreview] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");
  const [newTag, setNewTag] = React.useState("");

  const availableCategories = [
    // diaper related categories
    "Diapering Tips",
    "Baby Care",
    "Parenting Advice",
    "Child Development",
    "Health and Safety",
    "Feeding and Nutrition",
    "Sleep and Routines",
  ];

  const { slug: id } = useParams();

  const onSubmit = async (data: BlogFormValues) => {
    // const { error } = await supabase
    //   .from("Blog")
    //   .upsert([
    //     {
    //       title: data.title,
    //       content: data.content,
    //       excerpt: data.excerpt,
    //       categories: data.categories,
    //       tags: data.tags,
    //       featuredImage: data.featuredImage,
    //       status: data.status,
    //       metaDescription: data.metaDescription,
    //       slug: data.slug,
    //       visibility: data.visibility,
    //     },
    //   ])
    //   .eq("slug", data.slug)
    //   .select("*")
    //   .single();
    // if id is available then update else insert
    const { error } = await supabase.from("Blog").upsert({
      id: id || undefined,
      ...data,
    });
    if (error) {
      toast.error(`Error saving post: ${error.message}`);
    } else {
      toast.success(`Post saved as ${data.status}`);
    }
  };

  const addCategory = (category: string) => {
    const currentCategories = form.getValues("categories");
    if (category && !currentCategories.includes(category)) {
      form.setValue("categories", [...currentCategories, category], {
        shouldValidate: true,
      });
    }
    setNewCategory("");
  };

  // Only keep the correct versions below

  const removeCategory = (category: string, currentCategories: string[]) => {
    form.setValue(
      "categories",
      currentCategories.filter((c) => c !== category),
      { shouldValidate: true }
    );
  };

  const removeTag = (tag: string, currentTags: string[]) => {
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const addTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    if (tag && !currentTags.includes(tag)) {
      form.setValue("tags", [...currentTags, tag]);
    }
    setNewTag("");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Auto-generate slug from title
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && value.title && !form.getValues("slug")) {
        form.setValue("slug", generateSlug(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;
      const { data, error } = await supabase
        .from("Blog")
        .select("*")
        .eq("id", id)
        .single();
      if (data && !error) {
        form.reset({
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          categories: data.categories || [],
          tags: data.tags || [],
          featuredImage: data.featuredImage || "",
          status: data.status || "draft",
          metaDescription: data.metaDescription || "",
          slug: data.slug || generateSlug(data.title || ""),
          visibility: data.visibility || "public",
        });
      }
    }
    fetchBlog();
  }, [form, id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-brand-primary">
                  {/* Create New Post */}
                  {id ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Write and publish your blog post
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    form.setValue("status", "draft");
                    form.handleSubmit(onSubmit)();
                  }}
                  type="button"
                  className="border-gray-300"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={() => {
                    form.setValue("status", "published");
                    form.handleSubmit(onSubmit)();
                  }}
                  type="button"
                  className="bg-brand-secondary hover:bg-brand-secondary/80"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
            {/* Main Content */}
            <div className="w-full lg:flex-1 space-y-6">
              {/* Title */}
              <Card>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Add title"
                            {...field}
                            className="!text-3xl font-bold border-none p-0 focus-visible:ring-0 placeholder:text-gray-400 h-auto leading-tight text-brand-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-sm text-gray-600">
                          Permalink
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">
                              yoursite.com/
                            </span>
                            <Input
                              placeholder="post-slug"
                              {...field}
                              className="border-none p-0 focus-visible:ring-0 text-blue-600"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
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
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Excerpt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Write an excerpt..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-2">
                          Excerpts are optional hand-crafted summaries of your
                          content.
                        </p>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24">
              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Publish
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm text-gray-600">
                            Status:
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">
                                  Published
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm text-gray-600">
                            Visibility:
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">
                                  <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Public
                                  </div>
                                </SelectItem>
                                <SelectItem value="private">
                                  <div className="flex items-center">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Private
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Publish immediately
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Featured Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <FileUpload
                              bucketName="ecom"
                              control={form.control}
                              type="single"
                              value={field.value}
                              name="featuredImage"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FolderOpen className="w-5 h-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((category) => (
                              <div
                                key={category}
                                className="relative inline-flex"
                              >
                                <Badge
                                  variant="secondary"
                                  className="pr-6 flex items-center gap-1"
                                >
                                  {category}
                                </Badge>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCategory(category, field.value);
                                  }}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addCategory(newCategory))
                                }
                              />
                              <Button
                                type="button"
                                size="sm"
                                className="bg-brand-secondary"
                                onClick={() => addCategory(newCategory)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="text-xs text-gray-500">
                              Popular categories:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {availableCategories.map((category) => (
                                <Button
                                  key={category}
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2 bg-brand-gray hover:bg-brand-gray/80 text-white hover:text-white"
                                  onClick={() => addCategory(category)}
                                >
                                  {category}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Tag className="w-5 h-5 mr-2" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {(field.value || []).map((tag) => (
                              <div className="relative inline-flex" key={tag}>
                                <Badge variant="outline" className="pr-6">
                                  {tag}
                                </Badge>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(tag, field.value || []);
                                  }}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Input
                              placeholder="Add tags"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addTag(newTag))
                              }
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="bg-brand-secondary"
                              onClick={() => addTag(newTag)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Separate tags with commas or press Enter
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    SEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Meta Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a meta description..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between items-center mt-1">
                          <FormMessage />
                          <span
                            className={`text-xs ${
                              (field.value?.length || 0) > 160
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            {field.value?.length || 0}/160
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="min-w-4xl w-full max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Preview</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <div className="p-6">
                {form.watch("featuredImage") && (
                  <img
                    src={
                      form.watch("featuredImage") ||
                      "/placeholder.svg?height=256&width=1024"
                    }
                    alt="Featured"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {form.watch("categories").map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {form.watch("title") || "Untitled Post"}
                </h1>
                {form.watch("excerpt") && (
                  <p className="text-lg text-gray-600 mb-6 italic">
                    {form.watch("excerpt")}
                  </p>
                )}
                <Separator className="mb-6" />
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: form.watch("content") || "<p>No content</p>",
                    }}
                  />
                </div>
                {(form.watch("tags") || []).length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Tags:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(form.watch("tags") || []).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
}
