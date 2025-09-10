interface ProductColor {
  name: string;
  hexColor: string;
}

interface ProductSize {
  size: string;
}

interface ProductFeature {
  title: string;
  description: string;
}

interface ProductSpecification {
  key: string;
  value: string;
}

export type ProductData = {
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  description: string;
  sku: string;
  stockQuantity: number | string;
  inStock: boolean;
  // whether the product is active (visible/available in storefront)
  active?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};
