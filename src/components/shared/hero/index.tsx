"use server";

import prisma from "@/lib/db";
import HeroClient from "./hero-client";

export async function HeroSection() {
  const heroSection = await prisma.pageContent.findUnique({
    where: {
      pageType: "HERO",
    },
  });

  return <HeroClient data={heroSection?.content} />;
}
