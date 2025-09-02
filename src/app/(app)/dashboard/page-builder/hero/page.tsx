import prisma from "@/lib/db";
import { Metadata } from "next";
import { HeroFormBuilder } from "./hero-builder";

export const metadata: Metadata = {
  title: "Dashboard - Hero Page Builder",
  description: "Build and edit the hero section content in the dashboard.",
};

export default async function HeroBuilder() {
  const heroData = await prisma.pageContent.findUnique({
    where: {
      pageType: "HERO",
    },
  });

  return <HeroFormBuilder data={heroData?.content} />;
}
