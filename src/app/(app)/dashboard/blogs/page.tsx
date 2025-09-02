import prisma from "@/lib/db";
import { Metadata } from "next";
import { BlogClient } from "./client";

export const metadata: Metadata = {
  title: "Dashboard - Blogs",
  description: "Manage and view blogs in the dashboard.",
};

export default async function Page() {
  const blogs = await prisma.blog.findMany();
  return <BlogClient data={blogs} />;
}
