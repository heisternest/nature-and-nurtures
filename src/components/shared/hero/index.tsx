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

  const normalizedTitle = data.title.replace(
    /(>)™/g,
    ' style="font-size: inherit;">™'
  );

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: data.backgroundColor,
      }}
    >
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="p-6 sm:p-10 md:px-16 lg:px-24 space-y-6 text-center md:text-left">
          {/* Icon */}
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <span className="text-4xl sm:text-5xl md:text-6xl">
              {data.icon}
            </span>
          </div>

          {/* Title */}
          <div
            className="prose  break-words overflow-hidden [&_*]:max-w-full   [&_img]:w-full [&_img]:object-cover"
            dangerouslySetInnerHTML={{ __html: normalizedTitle }}
          />

          {/* Description */}
          <div
            className="prose  break-words overflow-hidden [&_*]:max-w-full   [&_img]:w-full [&_img]:object-cover"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* CTA Button */}
          <Link
            href="/products"
            className="inline-flex items-center bg-brand rounded-full px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider
                       transform transition-transform duration-200 hover:scale-105 hover:bg-brand/90"
          >
            {data.buttonText}
            <span
              className="ml-2 inline-flex justify-center items-center w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full
                             transform transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Right Content (Video or Image) */}
        <div className="p-6 sm:p-10 flex justify-center">
          {data.videoUrl ? (
            <div className="w-full max-w-lg md:aspect-video">
              <iframe
                className="w-full h-auto md:h-full rounded-lg"
                src={data.videoUrl}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          ) : (
            <img
              src={data.imageUrl}
              alt="Hero"
              className="w-full max-w-lg object-cover md:object-contain rounded-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
}
