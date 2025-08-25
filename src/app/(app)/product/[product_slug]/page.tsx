"use server";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductPage } from "./client";

// export const metadata = {
//   title: "Mesh Shirt - Nature Nurtures",
//   description: "Shop the latest Mesh Shirt from Nature Nurtures.",
//   openGraph: {
//     title: "Mesh Shirt - Nature Nurtures",
//     description: "Shop the latest Mesh Shirt from Nature Nurtures.",
//     url: "https://www.naturenurtures.com/product/mesh-shirt",
//     images: [
//       {
//         url: "https://www.naturenurtures.com/product/mesh-shirt/1.webp",
//         width: 800,
//         height: 600,
//         alt: "Mesh Shirt - Nature Nurtures",
//       },
//     ],
//   },
// };

export default async function Page({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}) {
  const { product_slug } = await params;

  const product = await prisma.product.findUnique({
    where: { id: product_slug, active: true },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      sizes: true,
      colors: true,
    },
  });

  if (!product) {
    // Handle product not found
    return notFound();
  }

  console.log(product);

  return (
    <>
      <Header />
      <ProductPage product={product} />
      <Footer />
    </>
  );
}
