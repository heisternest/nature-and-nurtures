export default function Hero() {
  return (
    <section className="w-full bg-brand">
      <div className=" mx-auto grid md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="p-10 space-y-6 px-12 md:px-24 lg:px-32">
          <div className="flex items-center space-x-2">
            <span className="text-6xl">✦</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light">
            <span className="italic">True</span>{" "}
            <span className="font-bold">to Oneself</span>
            <br />
            kind to <span className="italic">Nature.</span>
          </h1>
          <p className="text-sm max-w-md">
            UNRESERVEDLY HONEST PRODUCTS THAT TRULY WORK, AND BE KIND TO SKIN
            AND THE PLANET – NO EXCEPTIONS!
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-white rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider
                       transform transition-transform duration-200 hover:scale-105 hover:bg-gray-100"
          >
            EXPLORE ALL PRODUCTS
            <span
              className="ml-2 inline-flex justify-center items-center w-6 h-6 bg-black text-white rounded-full
                             transform transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <img
          src="hero.webp"
          alt="Hero"
          className="w-full object-cover md:object-contain"
        />
      </div>
    </section>
  );
}
