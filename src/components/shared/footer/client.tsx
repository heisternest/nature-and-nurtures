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

export function FooterClient({ footerData }: { footerData: any }) {
  const socialLinks = footerData?.socialLinks || [];

  return (
    <footer className="bg-white rounded-b-2xl pt-12 pb-4 px-8 border-t mt-20">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-wrap justify-between items-start mb-8">
          {/* Logo */}
          <div className="flex-1 min-w-[180px] flex flex-col justify-between h-full">
            <div className="mb-8">
              <img src="/logo.png" alt="BitPan Logo" className="h-10" />
            </div>
          </div>
          {/* Columns */}
          <div className="flex-[3] grid grid-cols-4 gap-12 min-w-[600px] justify-end">
            <div>
              <div className="font-semibold mb-4">COMPANY</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="cursor-pointer">
                  <Link href="/blogs">BLOG</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">LEGAL</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="">
                  <Link href="/tos">TERMS OF SERVICE</Link>
                </li>
                <li className="">
                  <Link href="/privacy">PRIVACY POLICY</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xs text-gray-500">
            © 2025 NATURE AND NURTURES COMPANY, INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            {/* Social Icons */}
            {socialLinks.map(
              (link: { icon: string; url: string }, index: number) => {
                const IconComponent =
                  socialIconMap[link.icon as keyof typeof socialIconMap];
                if (!IconComponent) return null;

                return (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
