import prisma from "@/lib/db";
import { FAQSectionClient } from "./faq-client";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
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
