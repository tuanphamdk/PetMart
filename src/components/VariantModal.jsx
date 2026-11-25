import { useState, useEffect } from 'react';
import { formatVND } from '../data/storedata';

export default function VariantModal({ product, onClose, onAddToCart }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    setSelectedIdx(0);
  }, [product]);

  if (!product) return null;

  const currentVariant = product.variants[selectedIdx] || product.variants[0];

  const handleConfirm = () => {
    onAddToCart(product, currentVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-2xl bg-[#faf8f5] flex items-center justify-center text-3xl shrink-0">
              {product.emoji}
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#9a5b28] bg-[#f4efe8] px-2.5 py-0.5 rounded-full">
                {product.brand}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 mt-1">
                {product.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-600 mb-2">
            Chọn kích cỡ / phân loại:
          </div>
          <div className="grid grid-cols-1 gap-2">
            {product.variants.map((variant, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm transition cursor-pointer ${
                    active
                      ? 'bg-[#faf8f5] border-[#143d2b] text-[#143d2b] font-bold'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span>{variant.label}</span>
                  <span className="font-extrabold">{formatVND(variant.price)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 gap-3">
          <div>
            <div className="text-[11px] text-stone-400">Giá đã chọn</div>
            <div className="text-lg font-extrabold text-[#143d2b]">
              {formatVND(currentVariant.price)}
            </div>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-[#143d2b] hover:bg-[#1f543c] text-white text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}