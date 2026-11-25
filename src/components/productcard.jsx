import { formatVND } from '../data/storedata';

export default function ProductCard({ product, onSelectProduct }) {
  const minPrice = product.variants[0].price;
  const maxPrice = product.variants[product.variants.length - 1].price;
  const hasRange = product.variants.length > 1 && minPrice !== maxPrice;

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden flex flex-col hover:border-[#9a5b28] hover:shadow-md transition group">
      <div
        className={`relative aspect-square bg-gradient-to-br ${product.color} flex items-center justify-center p-4`}
      >
        <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">
          {product.emoji}
        </span>

        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#9a5b28] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}

        {product.badge && (
          <span className="absolute top-3 right-3 bg-[#143d2b] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}

        <span className="absolute bottom-2.5 left-3 bg-white/95 text-[#143d2b] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
          {product.brand}
        </span>
      </div>

      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
          <div className="text-sm sm:text-base font-extrabold text-[#143d2b] mb-3">
            {hasRange
              ? `${formatVND(minPrice)} – ${formatVND(maxPrice)}`
              : formatVND(minPrice)}
          </div>
        </div>

        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-2.5 px-3 rounded-full text-xs sm:text-sm font-bold bg-[#f4efe8] text-[#143d2b] hover:bg-[#143d2b] hover:text-white transition cursor-pointer"
        >
          {product.variants.length > 1 ? 'Chọn tùy chọn' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}