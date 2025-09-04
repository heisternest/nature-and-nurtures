import Link from "next/link";

export const SkincareSection: React.FC = () => (
  <section className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 relative">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
            Clean, Beyond Reproach{" "}
            <em className="italic font-serif">Skincare.</em>
          </h2>
          <p className="mt-8 max-w-md text-neutral-600 text-sm uppercase tracking-wide">
            WE LOVE IT FOR MODERN UI DESIGN BECAUSE OF ITS SIMPLE, CLEAN, AND
            DISTINCTIVE GEOMETRIC STYLE AND THE DESIGNERS ACTIVELY WORK.
            FEATHERLIGHT FEEL EXPERIENCE UNPARALLELED COMFORT WITH OUR
            BREATHABLE HIJABS, PERFECT FOR ANY SEASON.
          </p>
          <Link
            href={"/products"}
            className="mt-12 border border-neutral-800 rounded-full px-8 py-3 text-sm font-semibold hover:bg-neutral-800 hover:text-white transition-colors duration-300"
          >
            EXPLORE PRODUCTS
          </Link>
        </div>

        {/* Left Image - Product in hands */}
        <div className="lg:col-span-3 flex justify-center">
          <img
            src="feature-1.webp"
            alt="Skincare product in hand"
            className="rounded-xl object-cover w-full max-w-sm aspect-[3/4]"
          />
        </div>

        {/* Right Image - Products with flowers */}
        <div className="lg:col-span-4 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1974&auto=format&fit=crop"
            alt="Skincare bottle with flower"
            className="rounded-xl object-cover w-full aspect-video"
          />
        </div>
      </div>
    </div>
  </section>
);
