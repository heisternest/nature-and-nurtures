"use server";

import prisma from "@/lib/db";

export async function SavePrivacy(data: any) {
  try {
    const privacy = await prisma.pageContent.upsert({
      where: {
        pageType: "PRIVACY",
      },
      update: {
        content: data,
      },
      create: {
        pageType: "PRIVACY",
        content: data,
      },
    });
    return {
      success: true,
      privacy,
    };
  } catch {
    return {
      success: false,
    };
  }
}
