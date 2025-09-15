import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import prisma from "@/lib/db";
import type { Metadata } from "next";
export const revalidate = 1;

async function getCollection(collection_slug: string) {
  const collection = await prisma.productCollection.findUnique({
    where: { slug: collection_slug, active: true },
    include: {
      products: {
        where: { active: true },
        include: {
          category: {
            select: { name: true, id: true },
          },
          productImages: { select: { id: true, url: true, alt: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!collection) return null;
  return collection;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection_slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const collection = await prisma.productCollection.findUnique({
    where: { slug: resolvedParams.collection_slug, active: true },
  });

  if (!collection) {
    return {
      title: "Collection Not Found | Nature and Nurtures",
      description: "The collection you're looking for is not available.",
    };
  }

  return {
    title: collection.metaTitle || `${collection.name} | Nature and Nurtures`,
    description:
      collection.metaDescription ||
      collection.description ||
      `Explore our ${collection.name} collection with the best products.`,
    openGraph: {
      title: collection.metaTitle || `${collection.name} | Nature and Nurtures`,
      description:
        collection.metaDescription ||
        collection.description ||
        `Discover amazing products in our ${collection.name} collection.`,
      type: "website",
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection_slug: string }>;
}) {
  const resolvedParams = await params;
  const collection = await getCollection(resolvedParams.collection_slug);

  if (!collection) {
    return (
      <>
        <Header />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center">
            Collection Not Found
          </h1>
          <p className="text-center mt-4">
            The collection you&apos;re looking for is not available.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-center text-gray-600">
              {collection.description}
            </p>
          )}
        </div>
        {collection.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            No products available in this collection.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
