"use client";

import prisma from "@/lib/db";

export async function saveFooterSocialLinks(
  socialLinks: Array<{ icon: string; url: string }>
) {
  try {
    await prisma.pageContent.upsert({
      where: {
        pageType: "footer",
      },
      update: {
        content: socialLinks,
      },
      create: {
        pageType: "footer",
        content: socialLinks,
      },
    });

    return { success: true, message: "Footer social links saved successfully" };
  } catch (error) {
    console.error("Error saving footer social links:", error);
    throw new Error("Failed to save footer social links");
  }
}

export async function getFooterSocialLinks() {
  try {
    const footerContent = await prisma.pageContent.findUnique({
      where: {
        pageType: "footer",
      },
    });

    if (footerContent && footerContent.content) {
      return footerContent.content as Array<{ icon: string; url: string }>;
    }

    return [];
  } catch (error) {
    console.error("Error fetching footer social links:", error);
    throw new Error("Failed to fetch footer social links");
  }
}
