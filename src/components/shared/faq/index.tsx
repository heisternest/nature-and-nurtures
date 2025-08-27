import prisma from "@/lib/db";
import { FAQSectionClient } from "./faq-client";

export async function FAQSection() {
  const faqData = await prisma.pageContent.findUnique({
    where: { pageType: "FAQ" },
  });

  return (
    <div>
      <FAQSectionClient data={faqData?.content} />
    </div>
  );
}
