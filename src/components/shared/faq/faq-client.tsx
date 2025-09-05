"use client";

import React, { useEffect, useState } from "react";

// Helper component for Plus/Minus icons
const Icon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={open ? "M5 12h14" : "M12 4.5v15m7.5-7.5h-15"}
    />
  </svg>
);

// Reusable Accordion Item Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-sm font-semibold tracking-widest text-gray-800">
          {title}
        </h3>
        <div className="text-gray-500">
          <Icon open={isOpen} />
        </div>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 text-gray-600 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQSectionClient = ({ data }: any) => {
  // State to manage which accordion sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    data.accordionItems.reduce((acc: any, item: any, index: number) => {
      acc[item.title] = index === 0 || index === 2;
      return acc;
    }, {})
  );

  // State to trigger animations on component mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to toggle accordion sections
  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative">
          {/* Left Column: Product Image */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isMounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className=" overflow-hidden w-full">
              <img
                src="feature-3.webp"
                alt="Venus Skincare Product"
                className="rounded-lg"
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
                {data.accordionItems.map((item: any) => (
                  <AccordionItem
                    key={item.title}
                    title={item.title}
                    isOpen={openSections[item.title]}
                    onClick={() => toggleSection(item.title)}
                  >
                    <p>{item.content}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Animated SVG Line */}
          <div className="absolute top-[-5%] left-[45%] w-1/4 h-1/4 -z-10 hidden lg:block">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 90 10 C 40 20, 40 80, 10 90"
                stroke="black"
                fill="transparent"
                strokeWidth="0.5"
                strokeDasharray={200}
                className={`transition-all duration-[2000ms] ease-out ${
                  isMounted ? "stroke-dashoffset-0" : "stroke-dashoffset-[200]"
                }`}
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
};
