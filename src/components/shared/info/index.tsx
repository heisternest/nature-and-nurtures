import { supabaseClient } from "@/lib/supabase/client";

export const revalidate = 1;

export async function InfoSection() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "INFO")
    .single();
  return (
    <section
      style={{ backgroundColor: data.backgroundColor }}
      className="py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 ">
            <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
            <div
              className="mt-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
          </div>

          {/* Left Image - Product in hands */}
          <div className="lg:col-span-3 flex justify-center">
            <img
              src={data.leftImage}
              alt="Skincare product in hand"
              className="rounded-xl object-cover w-full max-w-sm aspect-[3/4]"
            />
          </div>

          {/* Right Image - Products with flowers */}
          <div className="lg:col-span-4 flex justify-center">
            <img
              src={data.rightImage}
              alt="Skincare bottle with flower"
              className="rounded-xl object-cover w-full aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
