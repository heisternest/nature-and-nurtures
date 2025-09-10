"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface CollectionData {
  name: string;
  description?: string | null;
  productIds?: string[];
  active?: boolean;
}

interface CollectionFormProps {
  collection?: CollectionData & { id: string };
  onSubmit: any;
}

export function CollectionForm({ collection, onSubmit }: CollectionFormProps) {
  const router = useRouter();
  const [products, setProducts] = useState<
    { id: string; name: string; sku: string }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const form = useForm<CollectionData>({
    defaultValues: {
      name: collection?.name || "",
      description: collection?.description ?? "",
      productIds: collection?.productIds || [],
      active: collection?.active ?? true,
    },
  });

  const handleSubmit = async (data: CollectionData) => {
    setIsLoading(true);
    try {
      const result = await onSubmit(data, collection?.id);
      if (result.ok) {
        toast.success(
          collection
            ? "Collection updated successfully"
            : "Collection created successfully"
        );
        router.push("/dashboard/collections");
      } else {
        toast.error(result.error || "Failed to save collection");
      }
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("An error occurred while saving the collection");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(collection);
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {collection ? "Edit Collection" : "Create New Collection"}
        </CardTitle>
        <CardDescription>
          {collection
            ? "Update the collection details below"
            : "Fill in the details to create a new product collection"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Collection name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Name must be less than 100 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter collection name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    A unique name for your product collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{
                maxLength: {
                  value: 500,
                  message: "Description must be less than 500 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your collection..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value ?? ""}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description of what this collection represents
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Enable or disable this collection
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productIds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Products</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                          disabled={isLoading}
                        >
                          {field.value && field.value.length > 0
                            ? `${field.value.length} product${
                                field.value.length > 1 ? "s" : ""
                              } selected`
                            : "Select products..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search products..." />
                        <CommandList>
                          <CommandEmpty>No products found.</CommandEmpty>
                          <CommandGroup>
                            {products.map((product) => (
                              <CommandItem
                                key={product.id}
                                value={product.name}
                                onSelect={() => {
                                  const currentValue = field.value || [];
                                  const isSelected = currentValue.includes(
                                    product.id
                                  );
                                  const newValue = isSelected
                                    ? currentValue.filter(
                                        (id) => id !== product.id
                                      )
                                    : [...currentValue, product.id];
                                  field.onChange(newValue);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    (field.value || []).includes(product.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {product.name} ({product.sku})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the products to include in this collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading
                  ? "Saving..."
                  : collection
                  ? "Update Collection"
                  : "Create Collection"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
