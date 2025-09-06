import prisma from "@/lib/db";
import HeroClient from "./hero-client";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function HeroSection() {
  const heroSection = await prisma.pageContent.findUnique({
    where: {
      pageType: "HERO",
    },
  });

  return <HeroClient data={heroSection?.content} />;
}
