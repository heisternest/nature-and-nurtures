"use server";

import prisma from "@/lib/db";
import { HeroFormBuilder } from "./hero-builder";

export default async function HeroBuilder() {
  const heroData = await prisma.pageContent.findUnique({
    where: {
      pageType: "HERO",
    },
  });
  console.log(heroData);

  return <HeroFormBuilder data={heroData?.content} />;
}
