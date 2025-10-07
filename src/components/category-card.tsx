import { imageThumbnailUrl } from "@/utils/image-otf";
import Link from "next/link";

export const CategoryCard: React.FC<{ category: any }> = ({ category }) => (
  <Link href={`/category/${category.slug}`} className="p-4 group">
    <div
      className="rounded-lg relative flex flex-col justify-end aspect-square bg-center bg-cover text-left overflow-hidden
                 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg"
      style={{
        ...(category.imageUrl
          ? {
              backgroundImage: `url(${imageThumbnailUrl(
                category.imageUrl,
                400,
                400 // request square thumbnails
              )})`,
            }
          : {}),
      }}
    >
      <div
        className="relative z-10 p-4 bg-gradient-to-t from-white/90 via-white/60 to-transparent
                      transition-opacity duration-300 group-hover:from-white"
      >
        <h3 className="font-semibold text-sm tracking-widest text-gray-900">
          {category.name}
        </h3>
      </div>
    </div>
  </Link>
);
