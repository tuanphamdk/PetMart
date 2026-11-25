export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#071f5c] text-blue-100 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="text-white font-black text-lg tracking-wider mb-2">
            🐾 PET MART
          </div>
          <p className="text-blue-200/80 leading-relaxed">
            Hệ thống cửa hàng thức ăn, chuồng phụ kiện và dịch vụ Spa chăm sóc thú cưng tiêu chuẩn.
          </p>
        </div>
        <div>
          <div className="text-white font-bold text-sm mb-2.5">Sản phẩm</div>
          <ul className="space-y-2 text-blue-200/80">
            <li>
              <button onClick={() => onNavigate('shop')} className="hover:text-white cursor-pointer">
                Tất cả sản phẩm
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dog')} className="hover:text-white cursor-pointer">
                Đồ dùng cho Chó
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cat')} className="hover:text-white cursor-pointer">
                Đồ dùng cho Mèo
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-white font-bold text-sm mb-2.5">Dịch vụ & Tiện ích</div>
          <ul className="space-y-2 text-blue-200/80">
            <li>
              <button
                onClick={() => onNavigate('service-standard')}
                className="hover:text-white cursor-pointer"
              >
                Gói Tắm vệ sinh tiêu chuẩn
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('service-spa')}
                className="hover:text-white cursor-pointer"
              >
                Gói Spa thư giãn nhẹ
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('history')}
                className="hover:text-white cursor-pointer"
              >
                Tra cứu lịch sử đơn & dịch vụ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}