import { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, DOG_SUBCATEGORIES, CAT_SUBCATEGORIES } from '../data/storedata';
import ProductCard from '../components/productcard';

export default function PetCategoryPage({
  petType, // 'dog' | 'cat'
  onNavigate,
  onSelectProduct,
}) {
  const [subCategory, setSubCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setSubCategory('all');
    setSearch('');
    setSortBy('default');
  }, [petType]);

  const isDog = petType === 'dog';
  const subCategories = isDog ? DOG_SUBCATEGORIES : CAT_SUBCATEGORIES;

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (p.category !== petType) return false;
      if (subCategory !== 'all' && p.subCategory !== subCategory) return false;
      const q = search.trim().toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [petType, subCategory, search, sortBy]);

  return (
    <main className="w-full bg-white flex-1"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">bg-[#071f5c] hover:bg-[#0d2d7a]</div>
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-3">
        <button onClick={() => onNavigate('home')} className="hover:text-orange-600 cursor-pointer">
          Trang chủ
        </button>{' '}
        /{' '}
        <button onClick={() => onNavigate('shop')} className="hover:text-orange-600 cursor-pointer">
          Sản phẩm
        </button>{' '}
        /{' '}
        <span className="text-slate-800 font-semibold">
          {isDog ? 'Đồ cho chó' : 'Đồ cho mèo'}
        </span>
      </div>

      {/* Banner riêng của Chó / Mèo */}
      <div
        className={`rounded-3xl p-6 sm:p-8 mb-6 border ${
          isDog
            ? 'bg-gradient-to-r from-amber-50 to-orange-100/70 border-orange-200'
            : 'bg-gradient-to-r from-sky-50 to-indigo-100/70 border-sky-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl">
              {isDog ? '🐶' : '🐱'}
            </span>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                {isDog ? 'Thế giới đồ dùng cho Chó' : 'Thế giới đồ dùng cho Mèo'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isDog
                  ? 'Chọn lọc hạt dinh dưỡng, xương gặm sạch răng, chuồng quây và sữa tắm chuyên biệt cho cún.'
                  : 'Đầy đủ pate cá ngừ, thức ăn hạt, cát vệ sinh siêu vón và nhà đệm êm ái cho mèo.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate(isDog ? 'cat' : 'dog')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Chuyển sang {isDog ? '🐱 Đồ cho mèo' : '🐶 Đồ cho chó'} →
          </button>
        </div>
      </div>

      {/* Các mục con (Đồ ăn, Chuồng, Vệ sinh...) + Tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubCategory(sub.id)}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition cursor-pointer ${
                subCategory === sub.id
                  ? 'bg-[#071f5c] hover:bg-[#0d2d7a] text-white border-orange-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-orange-400'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isDog ? 'Tìm đồ cho chó...' : 'Tìm đồ cho mèo...'}
            className="w-full sm:w-48 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-orange-500"
          >
            <option value="default">Sắp xếp</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-slate-500 mb-4">
        Hiển thị <strong>{items.length}</strong> sản phẩm
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <p className="text-sm text-slate-600">Chưa có sản phẩm trong mục này.</p>
          <button
            onClick={() => {
              setSubCategory('all');
              setSearch('');
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold cursor-pointer"
          >
            Xem tất cả {isDog ? 'đồ cho chó' : 'đồ cho mèo'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </main>
  );
}