"use client";

import { AccordionItem } from "@/components/page-builder/accordion";
import { EditorSection } from "@/components/page-builder/editor-section";
import { InputField } from "@/components/page-builder/input-field";
import { TextAreaField } from "@/components/page-builder/text-area-field";
import {
  Edit,
  Image as ImageIcon,
  List,
  Plus,
  Trash2,
  Type,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SaveFAQ } from "./action";

type AccordionItemType = {
  id: number;
  title: string;
  content: string;
};

type FAQData = {
  headline_part1: string;
  headline_part2: string;
  headline_part3_italic: string;
  imageUrl: string;
  accordionItems: AccordionItemType[];
};

const defaultFAQ: FAQData = {
  headline_part1: "",
  headline_part2: "",
  headline_part3_italic: "",
  imageUrl: "/hero.webp",
  accordionItems: [
    {
      id: 1,
      title: "First question",
      content: "Answer for the first question.",
    },
    {
      id: 2,
      title: "Second question",
      content: "Answer for the second question.",
    },
  ],
};

interface FAQSectionDisplayProps {
  data: FAQData;
}

function FAQSectionDisplay({ data }: FAQSectionDisplayProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initialOpenState: Record<string, boolean> = {};
    data.accordionItems.forEach((item, index) => {
      if (index === 0 || index === 2) {
        initialOpenState[item.title] = true;
      }
    });
    setOpenSections(initialOpenState);
  }, [data.accordionItems]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8 w-full">
      <main className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Product Image */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isMounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="overflow-hidden w-full">
              <Image
                src={data.imageUrl}
                alt="Skincare Product"
                className="rounded-lg w-full h-full object-cover"
                width={1200}
                height={800}
                priority
              />
            </div>
          </div>

          {/* Right Column: Content & Accordion */}
          <div
            className={`transition-all duration-1000 ease-out delay-200 ${
              isMounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="p-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-8 leading-tight">
                {data.headline_part1}
                <br />
                {data.headline_part2}{" "}
                <span className="font-serif italic">
                  {data.headline_part3_italic}
                </span>
              </h1>
              <div>
                {data.accordionItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    title={item.title}
                    isOpen={!!openSections[item.title]}
                    onClick={() => toggleSection(item.title)}
                  >
                    <p>{item.content}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Main Page Builder Component ---

export function FAQBuilderForm({ data }: { data?: FAQData | null }) {
  // ensure the builder state is never null by falling back to defaults
  const [faqData, setFaqData] = useState<FAQData>(data ?? defaultFAQ);
  const [loading, setLoading] = useState(false);

  const saveFaq = async () => {
    setLoading(true);
    const save = await SaveFAQ(faqData);
    if (save.success) {
      toast("Successfully saved");
    } else {
      toast("Error Saving");
    }
    setLoading(false);
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFaqData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccordionChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const newItems: AccordionItemType[] = [...faqData.accordionItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    } as AccordionItemType;
    setFaqData((prev) => ({ ...prev, accordionItems: newItems }));
  };

  const addAccordionItem = () => {
    const newItem: AccordionItemType = {
      id: Date.now(), // Use timestamp for a unique key
      title: "NEW ITEM",
      content:
        "This is the default content for the new accordion item. Click to edit.",
    };
    setFaqData((prev) => ({
      ...prev,
      accordionItems: [...prev.accordionItems, newItem],
    }));
  };

  const removeAccordionItem = (index: number) => {
    const newItems = faqData.accordionItems.filter((_, i) => i !== index);
    setFaqData((prev) => ({ ...prev, accordionItems: newItems }));
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 font-sans flex flex-col lg:flex-row">
      {/* Editor Panel */}
      <aside className="w-full lg:w-1/3 xl:w-1/4 p-6 bg-slate-800/50 backdrop-blur-sm overflow-y-auto">
        <div className="flex items-center mb-6 pb-4 border-b border-white/10">
          <Edit className="text-indigo-400" size={24} />
          <h2 className="text-xl font-bold text-white ml-3">
            FAQ Section Editor
          </h2>
          <div className="ml-auto flex items-center space-x-2">
            <button
              onClick={saveFaq}
              disabled={loading}
              className="py-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-50 text-sm rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <EditorSection title="Headline" icon={<Type size={16} />}>
          <InputField
            label="Line 1"
            name="headline_part1"
            value={faqData.headline_part1}
            onChange={handleInputChange}
          />
          <InputField
            label="Line 2 (Normal)"
            name="headline_part2"
            value={faqData.headline_part2}
            onChange={handleInputChange}
          />
          <InputField
            label="Line 2 (Italic)"
            name="headline_part3_italic"
            value={faqData.headline_part3_italic}
            onChange={handleInputChange}
          />
        </EditorSection>

        <EditorSection title="Media" icon={<ImageIcon size={16} />}>
          <InputField
            label="Image URL"
            name="imageUrl"
            value={faqData.imageUrl}
            onChange={handleInputChange}
          />
        </EditorSection>

        <EditorSection title="Accordion Items" icon={<List size={16} />}>
          {faqData.accordionItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-slate-800/70 p-3 rounded-md border border-white/10 space-y-2 relative"
            >
              <button
                onClick={() => removeAccordionItem(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <InputField
                name={`accordionItems[${index}].title`}
                label={`Item ${index + 1} Title`}
                value={item.title}
                onChange={(e) =>
                  handleAccordionChange(index, "title", e.target.value)
                }
              />
              <TextAreaField
                name={`accordionItems[${index}].content`}
                label={`Item ${index + 1} Content`}
                value={item.content}
                onChange={(e) =>
                  handleAccordionChange(index, "content", e.target.value)
                }
              />
            </div>
          ))}
          <button
            onClick={addAccordionItem}
            className="w-full flex items-center justify-center mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-md transition"
          >
            <Plus size={16} className="mr-2" /> Add Item
          </button>
        </EditorSection>
      </aside>

      {/* Live Preview */}
      <main className="w-full lg:w-2/3 xl:w-3/4 flex-grow bg-gray-100">
        <div className="h-full w-full flex items-center justify-center">
          <FAQSectionDisplay data={faqData} />
        </div>
      </main>
    </div>
  );
}
