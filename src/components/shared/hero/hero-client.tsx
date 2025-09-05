import Link from "next/link";

export default function HeroClient({ data }: any) {
  return (
    <section
      className="w-full "
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
          <Link
            href={"/products"}
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
          </Link>
        </div>

        <img
          src={data.imageUrl}
          alt="Hero"
          className="w-full object-cover md:object-contain"
        />
      </div>
    </section>
  );
}
