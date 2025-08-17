import { Facebook, Instagram } from "lucide-react";

export function Footer() {
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
          <div className="flex-[3] grid grid-cols-4 gap-12 min-w-[600px]">
            <div>
              <div className="font-semibold mb-4">SOLUTIONS</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>MARKETING</li>
                <li>ANALYTICS</li>
                <li>AUTOMATION</li>
                <li>COMMERCE</li>
                <li>INSIGHTS</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">SUPPORT</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>SUBMIT TICKET</li>
                <li>DOCUMENTATION</li>
                <li>GUIDES</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">COMPANY</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>ABOUT</li>
                <li>BLOG</li>
                <li>JOBS</li>
                <li>PRESS</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">LEGAL</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>TERMS OF SERVICE</li>
                <li>PRIVACY POLICY</li>
                <li>LICENSE</li>
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
            <Instagram className="h-6 w-6 text-gray-500 hover:text-black transition-colors" />
            <Facebook className="h-6 w-6 text-gray-500 hover:text-black transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
