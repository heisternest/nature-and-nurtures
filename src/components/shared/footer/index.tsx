import { supabaseClient } from "@/lib/supabase/client";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
};

interface SocialLink {
  icon: keyof typeof socialIconMap;
  url: string;
  value: string;
}

interface FooterData {
  socialLinks: SocialLink[];
  copyrightText: string;
  logoUrl: string;
}

export async function Footer() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "footer")
    .single();

  const footerData: FooterData = data;

  return (
    <footer className="bg-white rounded-b-2xl pt-12 pb-4 px-8 border-t mt-20">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-wrap justify-between items-start mb-8">
          {/* Logo */}
          <div className="flex-1 min-w-[180px] flex flex-col justify-between h-full">
            <div className="mb-8">
              <img
                src={footerData.logoUrl || "/logo.png"}
                alt="Logo"
                className="h-10"
              />
            </div>
          </div>

          {/* Columns */}
          <div className="flex-[3] grid grid-cols-4 gap-12 min-w-[600px] justify-end">
            <div>
              <div className="font-semibold mb-4">COMPANY</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link href="/blogs">BLOG</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">LEGAL</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link href="/tos">TERMS OF SERVICE</Link>
                </li>
                <li>
                  <Link href="/privacy">PRIVACY POLICY</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xs text-gray-500">
            {footerData.copyrightText ||
              "© 2025 NATURE AND NURTURES COMPANY, INC. ALL RIGHTS RESERVED."}
          </div>

          <div className="flex items-center space-x-6">
            {footerData.socialLinks?.map((link: SocialLink, index: number) => {
              const IconComponent = socialIconMap[link.icon];
              if (!IconComponent) return null;

              return (
                <Link
                  key={index}
                  // href={link.url}
                  // if link.value is phone or email then use tel: or mailto:
                  href={
                    link.value === "phone"
                      ? `tel:${link.url}`
                      : link.value === "email"
                      ? `mailto:${link.url}`
                      : link.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
