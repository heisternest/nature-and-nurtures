import { CategoryShowcase } from "@/components/shared/category/category-showcase.server";
import { FAQSection } from "@/components/shared/faq";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { HeroSection } from "@/components/shared/hero";
import { InfoSection } from "@/components/shared/info";
import { ProductShowcase } from "@/components/shared/product/product-showcase";

export const revalidate = 0;

// Page metadata for Next.js App Router
export const metadata = {
  title: "Nature and Nurtures – Natural Skincare & Wellness",
  description:
    "Explore Nature and Nurtures for natural skincare, wellness products, and tips to nurture your skin and body naturally.",
  openGraph: {
    title: "Nature and Nurtures – Natural Skincare & Wellness",
    description:
      "Explore Nature and Nurtures for natural skincare, wellness products, and tips to nurture your skin and body naturally.",
    siteName: "Nature and Nurtures",

    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CategoryShowcase />
      <InfoSection />
      <ProductShowcase />
      <FAQSection />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
