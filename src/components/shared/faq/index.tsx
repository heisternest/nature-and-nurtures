import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabaseClient } from "@/lib/supabase/client";

interface FAQItem {
  title: string;
  content: string;
}

interface FAQData {
  headline: string;
  accordionItems: FAQItem[];
  imageUrl: string;
}

export async function FAQSection() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "FAQ")
    .single();

  const faqData: FAQData = data;

  return (
    <section className="bg-white w-full py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="w-full">
            <img
              src={faqData.imageUrl}
              alt="FAQ Image"
              className="rounded-lg w-full object-cover"
            />
          </div>

          {/* Right Column: Headline & Accordion */}
          <div className="p-4">
            <div
              className="prose  break-words overflow-hidden [&_*]:max-w-full [&_img]:h-64 [&_img]:w-full [&_img]:object-cover"
              dangerouslySetInnerHTML={{ __html: faqData.headline }}
            ></div>

            <Accordion
              type="multiple"
              defaultValue={
                [
                  faqData.accordionItems[0]?.title,
                  faqData.accordionItems[2]?.title,
                ].filter(Boolean) as string[]
              }
            >
              {faqData.accordionItems.map((item) => (
                <AccordionItem key={item.title} value={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
