"use server";

import prisma from "@/lib/db";
import { BlogClient } from "./client";

export default async function Page() {
  const blogs = await prisma.blog.findMany();
  return <BlogClient data={blogs} />;
}
