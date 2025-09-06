import prisma from "@/lib/db";
import { Metadata } from "next";
import { FAQBuilderForm } from "./faq-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Dashboard - FAQ Page Builder",
  description: "Build and edit the FAQ page content in the dashboard.",
};

export default async function FAQBuilder() {
  const data = await prisma.pageContent.findUnique({
    where: { pageType: "FAQ" },
  });

  return <FAQBuilderForm data={data ? (data.content as any) : null} />;
}
