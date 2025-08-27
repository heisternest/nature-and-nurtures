import { CategoryShowcase } from "@/components/shared/category/category-showcase.server";
import { FAQSection } from "@/components/shared/faq";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { HeroSection } from "@/components/shared/hero";
import { SkincareSection } from "@/components/shared/info/skincare";
import { Newsletter } from "@/components/shared/newsletter";
import { ProductShowcase } from "@/components/shared/product/product-showcase";

// Page metadata for Next.js App Router
export const metadata = {
  title: "Nature and Nurtures – Natural Skincare & Wellness",
  description:
    "Explore Nature and Nurtures for natural skincare, wellness products, and tips to nurture your skin and body naturally.",
  openGraph: {
    title: "Nature and Nurtures – Natural Skincare & Wellness",
    description:
      "Explore Nature and Nurtures for natural skincare, wellness products, and tips to nurture your skin and body naturally.",
    url: "https://yourdomain.com",
    siteName: "Nature and Nurtures",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nature and Nurtures",
      },
    ],
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
