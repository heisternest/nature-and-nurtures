import { supabaseClient } from "@/lib/supabase/client";
import Link from "next/link";

export const revalidate = 1;

export async function HeroSection() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "HERO")
    .single();

  console.log("Hero Data:", data);

  return (
    <section
      className="w-full "
      style={{
        backgroundColor: data.backgroundColor,
      }}
    >
      <div className=" mx-auto grid md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="p-10 space-y-6 px-12 md:px-24 lg:px-32">
          <div className="flex items-center space-x-2">
            <span className="text-6xl">{data.icon}</span>
          </div>
          <div
            className="prose prose-lg max-w-none text-4xl md:text-6xl font-light whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          <div
            className="prose prose-sm  text-sm max-w-md"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <Link
            href={"/products"}
            className="inline-flex items-center bg-white rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider
                       transform transition-transform duration-200 hover:scale-105 hover:bg-gray-100"
          >
            {data.buttonText}
            <span
              className="ml-2 inline-flex justify-center items-center w-6 h-6 bg-black text-white rounded-full
                             transform transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {data.videoUrl ? (
          <div className="p-10">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="560"
                height="315"
                src={data.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        ) : (
          <img
            src={data.imageUrl}
            alt="Hero"
            className="w-full object-cover md:object-contain"
          />
        )}
      </div>
    </section>
  );
}
