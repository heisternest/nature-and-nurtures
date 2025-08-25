"use server";

import prisma from "@/lib/db";

export async function SaveHero(data: any) {
  try {
    const hero = await prisma.pageContent.upsert({
      where: {
        pageType: "HERO",
      },
      update: {
        content: data,
      },
      create: {
        pageType: "HERO",
        content: data,
      },
    });
    return {
      success: true,
      hero,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
