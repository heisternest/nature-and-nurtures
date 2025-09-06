import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
type PrivacyData = {
  title: string;
  content: string;
};

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Nature & Nurtures",
};

export default async function PrivacyPage() {
  const privacyData = await prisma.pageContent.findUnique({
    where: { pageType: "PRIVACY" },
  });

  if (!privacyData) {
    notFound();
  }

  const data = privacyData.content as PrivacyData;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              {data.title}
            </h1>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
