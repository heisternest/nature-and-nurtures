import prisma from "@/lib/db";
import { FooterClient } from "./client";

export async function Footer() {
  const footerContent = await prisma.pageContent.findUnique({
    where: {
      pageType: "footer",
    },
  });

  // Extract social links from the content JSON
  const socialLinks =
    (footerContent?.content as Array<{ icon: string; url: string }>) || [];

  const footerData = {
    socialLinks,
  };

  return <FooterClient footerData={footerData} />;
}
