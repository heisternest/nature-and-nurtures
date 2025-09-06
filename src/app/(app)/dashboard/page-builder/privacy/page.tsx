import prisma from "@/lib/db";
import { Metadata } from "next";
import { PrivacyBuilderForm } from "./privacy-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata: Metadata = {
  title: "Dashboard - Privacy Policy Page Builder",
  description:
    "Build and edit the Privacy Policy page content in the dashboard.",
};

export default async function PrivacyBuilder() {
  const data = await prisma.pageContent.findUnique({
    where: { pageType: "PRIVACY" },
  });

  return <PrivacyBuilderForm data={data ? (data.content as any) : null} />;
}
