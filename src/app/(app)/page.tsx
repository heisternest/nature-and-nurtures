import { CategoryShowcase } from "@/components/shared/category/category-showcase.server";
import { FAQSection } from "@/components/shared/faq";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { HeroSection } from "@/components/shared/hero";
import { SkincareSection } from "@/components/shared/info/skincare";
import { Newsletter } from "@/components/shared/newsletter";
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
      <SkincareSection />
      <ProductShowcase />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
