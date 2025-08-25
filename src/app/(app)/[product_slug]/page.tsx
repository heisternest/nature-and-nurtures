import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ProductPage } from "./client";

export const metadata = {
  title: "Mesh Shirt - Nature Nurtures",
  description: "Shop the latest Mesh Shirt from Nature Nurtures.",
  openGraph: {
    title: "Mesh Shirt - Nature Nurtures",
    description: "Shop the latest Mesh Shirt from Nature Nurtures.",
    url: "https://www.naturenurtures.com/product/mesh-shirt",
    images: [
      {
        url: "https://www.naturenurtures.com/product/mesh-shirt/1.webp",
        width: 800,
        height: 600,
        alt: "Mesh Shirt - Nature Nurtures",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Header />
      <ProductPage />
      <Footer />
    </>
  );
}
