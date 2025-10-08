import { imageThumbnailUrl } from "@/utils/image-otf";
import Link from "next/link";

export const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link href={`/products/${product.slug}`} className="group">
    <div className="flex flex-col">
      {/* Image Container */}
      <div
        className="rounded-lg relative aspect-square bg-center bg-cover overflow-hidden
                   transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-xl"
        style={{
          ...(product.productImages.length > 0
            ? {
                backgroundImage: `url(${imageThumbnailUrl(
                  product.productImages[0].url,
                  400,
                  400
                )})`,
              }
            : { backgroundColor: "#f3f4f6" }),
        }}
      >
        {/* Category Badge - stays on image */}
        {product.category && (
          <div
            className="absolute top-3 left-3 text-xs font-semibold tracking-widest bg-white/90 backdrop-blur-sm 
                       px-3 py-1.5 rounded shadow-sm transition duration-300 group-hover:bg-white"
          >
            {product.category.name}
          </div>
        )}
      </div>

      {/* Product Info - Below Image */}
      <div className="pt-3 px-1">
        <h3 className="font-semibold text-sm tracking-wide text-gray-900 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs tracking-wide mt-0.5">
          {product.type}
        </p>
        <p className="mt-2 font-bold text-base text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  </Link>
);
