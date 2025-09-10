"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Category } from "@prisma/client";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductData } from "./create/type";

export function ProductForm({
  categories,
  product,
  SaveProduct,
}: {
  categories: Category[];
  product?: ProductData;
  SaveProduct: any;
}) {
  const router = useRouter();

  const form = useForm<ProductData>({
    defaultValues: {
      ...product,
      category: product
        ? (product.category as unknown as { id: string }).id
        : "",
    },
  });

  const { control, register, handleSubmit, formState } = form;

  const colors = useFieldArray({ control, name: "colors" });
  const sizes = useFieldArray({ control, name: "sizes" });
  const features = useFieldArray({ control, name: "features" });
  const specifications = useFieldArray({ control, name: "specifications" });
  const params = useParams<{ product_id: string }>();
  const onSubmit = async (values: ProductData) => {
    try {
      const payload = { ...values };
      const result = await SaveProduct(payload, params.product_id);
      if (!result.ok) throw new Error("Failed to save product");
      if (params?.product_id) {
        toast("Product Updated Successfully");
      } else {
        toast("Product Created Successfully");
      }
      router.push("/dashboard/products");
    } catch (err) {
      toast.error("Error submitting product");
      console.error("Error submitting product:", err);
    }
  };

  return (
    <Card className="w-full  mx-auto rounded-none">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Fill in the essential details to create a new product. All fields
          marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name *
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter product name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category *
              </label>

              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          className="flex"
                          key={category.id}
                          value={category.id}
                        >
                          {category.imageUrl ? (
                            <img
                              src={category.imageUrl}
                              alt={category.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 mr-2 object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 mr-2 bg-muted rounded-full" />
                          )}
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                placeholder="Describe your product..."
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Provide a detailed description of your product
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price *
                </label>
                <input
                  id="price"
                  {...register("price", { required: true })}
                  type="text"
                  placeholder="0.00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Current selling price
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="originalPrice" className="text-sm font-medium">
                  Original Price
                </label>
                <input
                  id="originalPrice"
                  {...register("originalPrice")}
                  type="text"
                  placeholder="0.00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Original price (if on sale)
                </p>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Inventory</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="sku" className="text-sm font-medium">
                  SKU *
                </label>
                <input
                  id="sku"
                  {...register("sku", { required: true })}
                  type="text"
                  placeholder="PROD-001"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Unique product identifier
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="stockQuantity" className="text-sm font-medium">
                  Stock Quantity
                </label>
                <input
                  id="stockQuantity"
                  {...register("stockQuantity")}
                  type="number"
                  placeholder="0"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Available quantity
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="inStock" className="text-base font-medium">
                  In Stock
                </label>
                <p className="text-sm text-muted-foreground">
                  Is this product currently available for purchase?
                </p>
              </div>
              <input
                id="inStock"
                type="checkbox"
                {...register("inStock")}
                className="h-4 w-4 rounded border border-input bg-background"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="active" className="text-base font-medium">
                  Active
                </label>
                <p className="text-sm text-muted-foreground">
                  Toggle whether the product is active (visible in storefront)
                </p>
              </div>
              <Controller
                control={control}
                name="active"
                defaultValue={
                  product && product.active !== undefined
                    ? product.active
                    : true
                }
                render={({ field: { value, onChange } }) => (
                  <Toggle
                    pressed={!!value}
                    onPressedChange={(v) => onChange(!!v)}
                    aria-label={value ? "Active" : "Inactive"}
                  >
                    {value ? "Active" : "Inactive"}
                  </Toggle>
                )}
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Product Images</h3>
            </div>

            <FileUpload
              control={form.control}
              name="images"
              bucketName="ecom"
              // value={product.images}
              value={product?.images || []}
              type="multiple"
            />
          </div>

          {/* Available Colors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Available Colors</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => colors.append({ name: "", hexColor: "#000000" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Color
              </Button>
            </div>
            {colors.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-center p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Color name (e.g., Navy Blue)"
                    {...register(`colors.${index}.name` as const)}
                    defaultValue={field.name}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    {...register(`colors.${index}.hexColor` as const)}
                    defaultValue={field.hexColor}
                    className="h-10 w-16 rounded border border-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => colors.remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Available Sizes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Available Sizes</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => sizes.append({ size: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Size
              </Button>
            </div>
            {sizes.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-center p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Size (e.g., XL, 42, Large)"
                    {...register(`sizes.${index}.size` as const)}
                    defaultValue={field.size}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => sizes.remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Product Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Product Features</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => features.append({ title: "", description: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
            {features.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Feature description"
                    {...register(`features.${index}.description` as const)}
                    defaultValue={field.description}
                    className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => features.remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Specifications</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => specifications.append({ key: "", value: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </div>
            {specifications.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-center p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Specification name (e.g., Weight)"
                    {...register(`specifications.${index}.key` as const)}
                    defaultValue={field.key}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Value (e.g., 2.5 kg)"
                    {...register(`specifications.${index}.value` as const)}
                    defaultValue={field.value}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => specifications.remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">SEO Specifications</h3>
            </div>
            <div className="space-y-2">
              <label htmlFor="metaTitle" className="text-sm font-medium">
                Meta Title
              </label>
              <Input
                id="metaTitle"
                {...register("metaTitle")}
                type="text"
                placeholder="SEO meta title"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Title for search engines (max 60 characters)
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="metaDescription" className="text-sm font-medium">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                {...register("metaDescription")}
                placeholder="SEO meta description"
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Description for search engines (max 160 characters)
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="metaKeywords" className="text-sm font-medium">
                Meta Keywords
              </label>
              <p className="text-xs text-muted-foreground">
                Keywords for search engines (comma separated)
              </p>
              <Input
                id="metaKeywords"
                {...register("metaKeywords")}
                type="text"
                placeholder="e.g., organic, natural, skincare"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Updating Product..." : "Update Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
