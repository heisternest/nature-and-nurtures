"use client";

import { cn } from "@/lib/utils";
import { Edit, Image as ImageIcon, Link2, Type } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SaveHero } from "./action";

interface EditorSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const EditorSection = ({ title, icon, children }: EditorSectionProps) => (
  <div className=" rounded-lg p-4 mb-4 border border-white/10">
    <div className="flex items-center text-white/80 mb-3">
      {icon}
      <h3 className="font-semibold ml-2">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => (
  <div>
    <label className="text-xs text-white/60 block mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
  </div>
);

type HeroData = {
  icon: string;
  title_italic_1: string;
  title_bold_1: string;
  title_normal_1: string;
  title_italic_2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
};

interface HeroDisplayProps {
  data: HeroData;
}

function HeroDisplay({ data }: HeroDisplayProps) {
  return (
    <section
      className={cn("w-full")}
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
          <h1 className="text-4xl md:text-6xl font-light">
            <span className="italic">{data.title_italic_1}</span>{" "}
            <span className="font-bold">{data.title_bold_1}</span>
            <br />
            {data.title_normal_1}{" "}
            <span className="italic">{data.title_italic_2}</span>
          </h1>
          <p className="text-sm max-w-md">{data.description}</p>
          <a
            href="#"
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
          </a>
        </div>

        <div className="w-full h-full">
          <img
            src={data.imageUrl}
            alt="Hero"
            className="w-full object-cover md:object-contain h-full"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </section>
  );
}

// Main App component acting as the page builder
export function HeroFormBuilder({ data }: { data?: any }) {
  // Default data used when no `data` prop is provided so the builder never
  // initializes with null values.
  const defaultHero: HeroData = {
    icon: "✦",
    title_italic_1: "True",
    title_bold_1: "to Oneself",
    title_normal_1: "kind to",
    title_italic_2: "Nature.",
    description:
      "UNRESERVEDLY HONEST PRODUCTS THAT TRULY WORK, AND BE KIND TO SKIN AND THE PLANET – NO EXCEPTIONS!",
    buttonText: "EXPLORE ALL PRODUCTS",
    buttonLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    backgroundColor: "#f3f4f6",
  };

  // State to hold all editable content of the hero section. Always non-null.
  const [heroData, setHeroData] = useState<HeroData>(data ?? defaultHero);
  const [loading, setLoading] = useState(false);

  // A single handler to update the state for any input field
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHeroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData((prevData) => ({
      ...prevData,
      backgroundColor: e.target.value,
    }));
  };

  return (
    <div className="w-full h-full bg-slate-900 font-sans flex flex-col lg:flex-row">
      {/* Editor Panel */}
      <aside className="w-full lg:w-1/3 xl:w-1/4 p-6 bg-slate-800/50 backdrop-blur-sm overflow-y-auto">
        <div className="flex items-center mb-6 pb-4 border-b border-white/10">
          <Edit className="text-indigo-400" size={24} />
          <h2 className="text-xl font-bold text-white ml-3">
            Hero Section Editor
          </h2>
          <div className="ml-auto flex items-center space-x-2">
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await SaveHero(heroData);
                  if ((res as any)?.success) {
                    toast("Successfully saved");
                  } else {
                    toast("Error saving hero section");
                  }
                } catch {
                  toast("Error saving hero section");
                }
                setLoading(false);
              }}
              disabled={loading}
              className="py-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-50 text-sm rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <EditorSection title="Headline" icon={<Type size={16} />}>
          <InputField
            label="Icon"
            name="icon"
            value={heroData.icon}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Title Italic (1)"
              name="title_italic_1"
              value={heroData.title_italic_1}
              onChange={handleInputChange}
            />
            <InputField
              label="Title Bold (1)"
              name="title_bold_1"
              value={heroData.title_bold_1}
              onChange={handleInputChange}
            />
            <InputField
              label="Title Normal"
              name="title_normal_1"
              value={heroData.title_normal_1}
              onChange={handleInputChange}
            />
            <InputField
              label="Title Italic (2)"
              name="title_italic_2"
              value={heroData.title_italic_2}
              onChange={handleInputChange}
            />
          </div>
        </EditorSection>

        <EditorSection title="Content" icon={<Type size={16} />}>
          <div>
            <label className="text-xs text-white/60 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={heroData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </EditorSection>

        <EditorSection title="Button" icon={<Link2 size={16} />}>
          <InputField
            label="Button Text"
            name="buttonText"
            value={heroData.buttonText}
            onChange={handleInputChange}
          />
        </EditorSection>

        <EditorSection title="Media & Style" icon={<ImageIcon size={16} />}>
          <InputField
            label="Image URL"
            name="imageUrl"
            value={heroData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
          <div>
            <label className="text-xs text-white/60 block mb-1">
              Background Color
            </label>
            <div className="relative">
              <input
                type="color"
                value={heroData.backgroundColor}
                onChange={handleColorChange}
                className="w-full h-10 p-1 bg-slate-800/60 border border-white/10 rounded-md cursor-pointer"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
                {heroData.backgroundColor}
              </span>
            </div>
          </div>
        </EditorSection>
      </aside>

      {/* Live Preview */}
      <main className="w-full lg:w-2/3 xl:w-3/4 flex-grow">
        <div className="h-full w-full flex items-center justify-center">
          <HeroDisplay data={heroData} />
        </div>
      </main>
    </div>
  );
}
