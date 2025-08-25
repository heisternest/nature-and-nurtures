"use server";

import prisma from "@/lib/db";

export async function SaveFAQ(data: any) {
  try {
    const faq = await prisma.pageContent.upsert({
      where: {
        pageType: "FAQ",
      },
      update: {
        content: data,
      },
      create: {
        pageType: "FAQ",
        content: data,
      },
    });
    return {
      success: true,
      faq,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
