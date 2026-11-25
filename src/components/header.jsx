import { useState } from 'react';
import { SERVICES } from '../data/storedata';

export default function Header({
  activePage,
  onNavigate,
  search,
  onSearchChange,
  totalItems,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const go = (page) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    onNavigate(page);
  };

  const isProductActive = ['shop', 'dog', 'cat'].includes(activePage);
  const isServiceActive = ['services', 'service-standard', 'service-spa'].includes(activePage);

  return (
    <header className="bg-[#071f5c] text-white sticky top-0 z-30 shadow-md">
      {/* Tầng 1: Logo + Search bar bo tròn + Nút Lịch sử + Giỏ hàng */}
      <div className="max-w-7xl mx-auto px-4 pt-3.5 pb-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            aria-label="Mở menu"
          >
            ☰
          </button>
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <span className="font-black text-xl sm:text-2xl tracking-wider text-white">
              PET MART
            </span>
          </button>
        </div>

        {/* Thanh tìm kiếm trắng bo tròn ở giữa (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, thức ăn, chuồng, dịch vụ tại đây..."
              className="w-full pl-5 pr-10 py-2.5 rounded-full bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm shadow-xs"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => go('shop')}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-sky-300 transition cursor-pointer"
            aria-label="Tìm kiếm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Cụm nút bên phải: Lịch sử đặt hàng (pill trắng) + Giỏ hàng badge đỏ */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go('history')}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer ${
              activePage === 'history'
                ? 'bg-sky-200 text-[#071f5c]'
                : 'bg-white text-[#071f5c] hover:bg-sky-50'
            }`}
          >
            <span>Lịch sử đặt</span>
            <span>📋</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Giỏ hàng"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-red-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm cho Mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm sản phẩm tại đây..."
            className="w-full pl-4 pr-9 py-2 rounded-full bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tầng 2: Menu căn giữa (Trang chủ | Sản phẩm | Dịch vụ | Lịch sử) */}
      <nav className="hidden md:block border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-9 h-11 text-sm font-semibold">
          <button
            onClick={() => go('home')}
            className={`h-full px-2 border-b-2 transition cursor-pointer ${
              activePage === 'home'
                ? 'border-sky-300 text-sky-300'
                : 'border-transparent text-white/95 hover:text-sky-200'
            }`}
          >
            Trang chủ
          </button>

          {/* Sản phẩm + Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('products')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => go('shop')}
              className={`h-full px-2 border-b-2 flex items-center gap-1.5 transition cursor-pointer ${
                isProductActive
                  ? 'border-sky-300 text-sky-300'
                  : 'border-transparent text-white/95 hover:text-sky-200'
              }`}
            >
              <span>Sản phẩm</span>
              <span className="text-[10px] opacity-80">⌄</span>
            </button>

            {openDropdown === 'products' && (
              <div className="absolute left-0 top-full w-64 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 py-2.5 z-40">
                <button
                  onClick={() => go('dog')}
                  className="w-full px-4 py-2.5 text-left hover:bg-sky-50 flex items-center gap-3 transition cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg">
                    🐶
                  </span>
                  <div>
                    <div className="font-bold text-sm text-[#071f5c]">Đồ cho chó</div>
                    
                  </div>
                </button>
                <button
                  onClick={() => go('cat')}
                  className="w-full px-4 py-2.5 text-left hover:bg-sky-50 flex items-center gap-3 transition cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg">
                    🐱
                  </span>
                  <div>
                    <div className="font-bold text-sm text-[#071f5c]">Đồ cho mèo</div>
                    
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Dịch vụ + Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => go('services')}
              className={`h-full px-2 border-b-2 flex items-center gap-1.5 transition cursor-pointer ${
                isServiceActive
                  ? 'border-sky-300 text-sky-300'
                  : 'border-transparent text-white/95 hover:text-sky-200'
              }`}
            >
              <span>Dịch vụ</span>
              <span className="text-[10px] opacity-80">⌄</span>
            </button>

            {openDropdown === 'services' && (
              <div className="absolute left-0 top-full w-80 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 py-2.5 z-40">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => go(`service-${srv.id}`)}
                    className="w-full px-4 py-2.5 text-left hover:bg-sky-50 flex items-start gap-3 transition cursor-pointer"
                  >
                    <span className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg shrink-0">
                      {srv.emoji}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-[#071f5c]">{srv.name}</div>
                      <div className="text-[11px] text-slate-500">
                        
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => go('history')}
            className={`h-full px-2 border-b-2 transition cursor-pointer ${
              activePage === 'history'
                ? 'border-sky-300 text-sky-300'
                : 'border-transparent text-white/95 hover:text-sky-200'
            }`}
          >
            Lịch sử
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-slate-800 border-t border-slate-200 px-4 py-3 space-y-2 shadow-lg">
          <button
            onClick={() => go('home')}
            className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
              activePage === 'home' ? 'bg-sky-50 text-[#071f5c]' : 'text-slate-700'
            }`}
          >
            Trang chủ
          </button>

          <div className="border-t border-slate-100 pt-2">
            <button
              onClick={() => go('shop')}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'shop' ? 'bg-sky-50 text-[#071f5c]' : 'text-slate-700'
              }`}
            >
              Sản phẩm (Tất cả)
            </button>
            <div className="pl-4 mt-1 space-y-1">
              <button
                onClick={() => go('dog')}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-sky-50"
              >
                🐶 Đồ cho chó
              </button>
              <button
                onClick={() => go('cat')}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-sky-50"
              >
                🐱 Đồ cho mèo
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2">
            <button
              onClick={() => go('services')}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'services' ? 'bg-sky-50 text-[#071f5c]' : 'text-slate-700'
              }`}
            >
              Dịch vụ (Tổng quan)
            </button>
            <div className="pl-4 mt-1 space-y-1">
              <button
                onClick={() => go('service-standard')}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-sky-50"
              >
                🛁 Gói Tắm vệ sinh tiêu chuẩn
              </button>
              <button
                onClick={() => go('service-spa')}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-sky-50"
              >
                🌿 Gói Spa thư giãn nhẹ
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2">
            <button
              onClick={() => go('history')}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'history' ? 'bg-sky-50 text-[#071f5c]' : 'text-slate-700'
              }`}
            >
              📋 Lịch sử đơn & dịch vụ
            </button>
          </div>
        </div>
      )}
    </header>
  );
}