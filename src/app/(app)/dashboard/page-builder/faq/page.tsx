import prisma from "@/lib/db";
import { FAQBuilderForm } from "./faq-builder";

export default async function FAQBuilder() {
  const data = await prisma.pageContent.findUnique({
    where: { pageType: "FAQ" },
  });

  return <FAQBuilderForm data={data ? (data.content as any) : null} />;
}
