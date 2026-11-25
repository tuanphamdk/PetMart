import { PRODUCTS, SERVICES, SELLING_CATEGORIES } from '../data/storedata';
import ProductCard from '../components/productcard';

export default function HomePage({
  onNavigate,
  onSelectProduct,
  onOpenBooking,
}) {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <main className="w-full flex-1 bg-white">
      {/* Khối 1: Hero tràn viền sát lề */}
      <section className="w-full bg-white border-b border-slate-100">
        <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <span className="inline-block bg-[#e0ecff] text-[#071f5c] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl mb-4">
              Pet Mart - Cửa Hàng Thú Cưng & Siêu Thị Chó Mèo
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#071f5c] leading-[1.16] tracking-tight mb-4">
              Tất cả sản phẩm và dịch vụ dành cho thú cưng!
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-2xl">
              Hệ thống <strong>cửa hàng thú cưng</strong> (pet shop) với đầy đủ thức ăn,
              chuồng nệm, phụ kiện đồ dùng và dịch vụ tắm spa chăm sóc chất lượng, giúp bạn
              nuôi dưỡng chó mèo khỏe mạnh, vui vẻ mỗi ngày với sản phẩm chính hãng.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white font-bold text-sm flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <span>🛒</span>
                <span>Mua ngay</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 rounded-full bg-white hover:bg-sky-50 text-[#071f5c] border-2 border-[#d3e4ff] font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <span>🛁</span>
                <span>Đặt lịch Spa & Tắm</span>
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full rounded-tl-[4.5rem] rounded-tr-[2.5rem] rounded-br-[4.5rem] rounded-bl-2xl border-[10px] border-[#d8e8ff] bg-white p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => onNavigate('dog')}
                  className="bg-[#f8fafc] hover:bg-[#f0f6ff] border border-slate-100 rounded-3xl p-5 text-center transition cursor-pointer group"
                >
                  <div className="text-5xl mb-2.5 group-hover:scale-110 transition-transform">
                    🐶
                  </div>
                  <div className="font-extrabold text-sm sm:text-base text-[#071f5c]">
                    Siêu thị cho Cún
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Hạt, xương gặm, chuồng quây
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('cat')}
                  className="bg-[#f8fafc] hover:bg-[#f0f6ff] border border-slate-100 rounded-3xl p-5 text-center transition cursor-pointer group"
                >
                  <div className="text-5xl mb-2.5 group-hover:scale-110 transition-transform">
                    🐱
                  </div>
                  <div className="font-extrabold text-sm sm:text-base text-[#071f5c]">
                    Siêu thị cho Mèo
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Pate, cát vón, nhà đệm êm
                  </div>
                </div>

                <div className="col-span-2 bg-[#071f5c] text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-sky-300 font-bold">
                      Chăm sóc tận tâm
                    </div>
                    <div className="font-bold text-xs sm:text-sm mt-0.5">
                      100% sản phẩm chính hãng • Quy trình Spa nhẹ nhàng cho bé
                    </div>
                  </div>
                  <span className="text-3xl shrink-0">🐾</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 2: Chúng tôi bán những gì */}
      <section className="w-full bg-white border-b border-slate-100 py-10 sm:py-12">
        <div className="w-full px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#071f5c]">
                Chúng tôi bán những gì?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Chọn nhanh danh mục đồ dùng cho chó, mèo hoặc gói dịch vụ chăm sóc
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="self-start sm:self-auto px-5 py-2 rounded-full bg-white border-2 border-[#d3e4ff] text-[#071f5c] hover:bg-sky-50 text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Xem tất cả →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SELLING_CATEGORIES.map((item) => (
              <div
                key={item.title}
                onClick={() => onNavigate(item.targetPage)}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 hover:border-[#071f5c] hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#e0ecff] flex items-center justify-center text-2xl mb-4">
                    {item.emoji}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#071f5c] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 text-xs font-bold text-[#071f5c]">
                  Khám phá ngay →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Khối 3: Sản phẩm nổi bật */}
      <section className="w-full bg-white border-b border-slate-100 py-10 sm:py-12">
        <div className="w-full px-4 sm:px-8 lg:px-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-[#e0ecff] text-[#071f5c] text-[11px] font-bold px-3 py-1 rounded-full mb-1.5">
                Được yêu thích nhất
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#071f5c]">
                Sản phẩm nổi bật
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 rounded-full bg-white hover:bg-sky-50 text-[#071f5c] border border-[#d3e4ff] text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Xem tất cả ({PRODUCTS.length}) →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Khối 4: Dịch vụ của chúng tôi */}
      <section className="w-full bg-white py-10 sm:py-14">
        <div className="w-full px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block bg-[#e0ecff] text-[#071f5c] text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                Pet Spa & Grooming
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#071f5c]">
                Dịch vụ của chúng tôi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hai gói chăm sóc chuyên biệt giúp thú cưng sạch thơm và thư giãn tối đa
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white text-xs sm:text-sm font-bold cursor-pointer"
            >
              Xem trang dịch vụ →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-[#e0ecff] flex items-center justify-center text-2xl">
                        {srv.emoji}
                      </span>
                      <div>
                        <span className="inline-block text-[11px] font-bold text-[#071f5c] bg-[#e0ecff] px-2.5 py-0.5 rounded-full mb-1">
                          {srv.highlight}
                        </span>
                        <h3 className="font-extrabold text-base sm:text-lg text-[#071f5c]">
                          {srv.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] text-slate-400">Chỉ từ</div>
                      <div className="font-extrabold text-base sm:text-lg text-[#071f5c]">
                        {srv.priceFrom}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4">{srv.subtitle}</p>

                  <div className="space-y-2 mb-6">
                    {srv.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="text-[#071f5c] font-bold mt-0.5">✓</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate(`service-${srv.id}`)}
                    className="text-xs sm:text-sm font-bold text-[#071f5c] hover:underline cursor-pointer"
                  >
                    Xem quy trình & giá →
                  </button>
                  <button
                    onClick={() => onOpenBooking(srv.id)}
                    className="px-5 py-2.5 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white text-xs sm:text-sm font-bold transition cursor-pointer"
                  >
                    Đặt hẹn ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}