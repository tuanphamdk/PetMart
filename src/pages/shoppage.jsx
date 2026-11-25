import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/storedata';
import ProductCard from '../components/productcard';

export default function ShopPage({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onNavigateHome,
  onSelectProduct,
}) {
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [search, category, sortBy]);

  return (
    <main className="w-full bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="md:hidden mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm sản phẩm cho chó, mèo..."
            className="w-full pl-4 pr-9 py-2.5 rounded-full border border-stone-300 bg-white focus:outline-none focus:border-[#143d2b] text-sm"
          />
        </div>

        <div className="mb-5">
          <div className="text-xs text-stone-500 mb-1.5">
            <button onClick={onNavigateHome} className="hover:text-[#143d2b] cursor-pointer">
              Trang chủ
            </button>{' '}
            / <span className="text-[#143d2b] font-semibold">Cửa hàng trực tuyến</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143d2b]">
              Cửa hàng trực tuyến
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'dog', label: 'Đồ dùng cho chó' },
                { id: 'cat', label: 'Đồ dùng cho mèo' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onCategoryChange(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition cursor-pointer ${
                    category === tab.id
                      ? 'bg-[#143d2b] text-white border-[#143d2b]'
                      : 'bg-white text-[#143d2b] border-stone-200 hover:border-[#143d2b]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-auto sm:ml-2 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:border-[#143d2b] cursor-pointer"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-xs text-stone-500 mb-5">
          Hiển thị <strong className="text-[#143d2b]">{filteredProducts.length}</strong> sản phẩm
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#faf8f5] rounded-3xl border border-stone-200/80 p-10 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="font-semibold text-stone-700">Không tìm thấy sản phẩm phù hợp</p>
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#143d2b] text-white text-xs sm:text-sm font-bold hover:bg-[#1f543c] cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}