import { CategoryShowcase } from "@/components/shared/category-showcase";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import { FAQSection } from "@/components/shared/info/faq";
import { SkincareSection } from "@/components/shared/info/skincare";
import { Newsletter } from "@/components/shared/newsletter";
import { ProductShowcase } from "@/components/shared/product-showcase";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <CategoryShowcase />
      <SkincareSection />
      <ProductShowcase />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
