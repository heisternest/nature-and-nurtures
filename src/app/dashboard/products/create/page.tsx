"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import { useState } from "react";

interface Variant {
  id: string;
  option: string;
  value: string;
  price: string;
}

export default function AddProductsPage() {
  const [inStock, setInStock] = useState(true);
  const [chargeTax, setChargeTax] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", option: "", value: "", price: "" },
    { id: "2", option: "", value: "", price: "" },
  ]);

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      option: "",
      value: "",
      price: "",
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter((variant) => variant.id !== id));
    }
  };

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Add Products</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Discard</Button>
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    className="mt-2 min-h-[120px]"
                    placeholder=""
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Set a description to the product for better visibility.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Images</CardTitle>
                <Button variant="outline" size="sm">
                  Add media from URL
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drop your images here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    PNG or JPG (max. 5MB)
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Select images
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-4">Options</div>
                    <div className="col-span-4">Value</div>
                    <div className="col-span-3">Price</div>
                    <div className="col-span-1"></div>
                  </div>

                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-4">
                        <Select
                          value={variant.option}
                          onValueChange={(value) =>
                            updateVariant(variant.id, "option", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="size">Size</SelectItem>
                            <SelectItem value="color">Color</SelectItem>
                            <SelectItem value="material">Material</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4">
                        <Input
                          value={variant.value}
                          onChange={(e) =>
                            updateVariant(variant.id, "value", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          value={variant.price}
                          onChange={(e) =>
                            updateVariant(variant.id, "price", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-1">
                        {variants.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariant(variant.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addVariant}
                    className="w-full mt-4 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="basePrice">Base Price</Label>
                  <Input id="basePrice" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="discountedPrice">Discounted Price</Label>
                  <Input id="discountedPrice" className="mt-2" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chargeTax"
                    checked={chargeTax}
                    onCheckedChange={(checked) =>
                      setChargeTax(checked === true)
                    }
                  />
                  <Label htmlFor="chargeTax">Charge tax on this product</Label>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock">In stock</Label>
                  <Switch
                    id="inStock"
                    checked={inStock}
                    onCheckedChange={setInStock}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Draft
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Published
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Set the product status.
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Select defaultValue="electronics">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
