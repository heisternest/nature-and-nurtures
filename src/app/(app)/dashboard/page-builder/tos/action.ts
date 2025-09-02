"use server";

import prisma from "@/lib/db";

export async function SaveTOS(data: any) {
  try {
    const tos = await prisma.pageContent.upsert({
      where: {
        pageType: "TOS",
      },
      update: {
        content: data,
      },
      create: {
        pageType: "TOS",
        content: data,
      },
    });
    return {
      success: true,
      tos,
    };
  } catch {
    return {
      success: false,
    };
  }
}
