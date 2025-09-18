import { imageThumbnailUrl } from "@/utils/image-otf";
import Link from "next/link";

export const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link href={`/products/${product.slug}`} className="p-4 group">
    <div
      className="rounded-lg relative flex flex-col justify-end aspect-square bg-center bg-cover text-left overflow-hidden
                 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg"
      style={{
        ...(product.productImages.length > 0
          ? {
              backgroundImage: `url(${imageThumbnailUrl(
                product.productImages[0].url,
                400,
                400 // request square thumbnails
              )})`,
            }
          : {}),
      }}
    >
      {product.category && (
        <div
          className="absolute top-4 left-4 text-xs font-semibold tracking-widest bg-white/80 px-3 py-1 rounded
                        transition duration-300 group-hover:bg-white"
        >
          {product.category.title}
        </div>
      )}

      <div
        className="relative z-10 p-4 bg-gradient-to-t from-white/90 via-white/60 to-transparent
                      transition-opacity duration-300 group-hover:from-white"
      >
        <h3 className="font-semibold text-sm tracking-widest text-gray-900">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs tracking-widest">{product.type}</p>
        <p className="mt-2 font-semibold text-sm text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  </Link>
);
