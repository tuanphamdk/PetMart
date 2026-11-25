import { SERVICES } from '../data/storedata';

export default function ServicesPage({ onNavigate, onOpenBooking }) {
  return (
    <main className="w-full bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="text-xs text-slate-500 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#071f5c] cursor-pointer"
          >
            Trang chủ
          </button>{' '}
          / <span className="text-[#071f5c] font-semibold">Dịch vụ chăm sóc & Spa</span>
        </div>

        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 mb-8">
          <span className="inline-block bg-[#e8f1ff] text-[#071f5c] text-xs font-bold px-3.5 py-1 rounded-full mb-2">
            Chăm sóc thú cưng tại cửa hàng
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071f5c]">
            Dịch vụ Tắm & Spa cho Chó Mèo
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
            Chọn gói dịch vụ phù hợp với nhu cầu vệ sinh hằng ngày hoặc thư giãn chuyên sâu
            cho thú cưng của bạn.
          </p>
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
                    <span className="w-12 h-12 rounded-2xl bg-[#e8f1ff] flex items-center justify-center text-2xl">
                      {srv.emoji}
                    </span>
                    <div>
                      <span className="inline-block text-[11px] font-bold text-[#071f5c] bg-[#e8f1ff] px-2.5 py-0.5 rounded-full mb-1">
                        {srv.highlight}
                      </span>
                      <h2 className="font-extrabold text-lg sm:text-xl text-[#071f5c]">
                        {srv.name}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-slate-400">Chỉ từ</div>
                    <div className="font-extrabold text-lg text-[#071f5c]">
                      {srv.priceFrom}
                    </div>
                    <div className="text-[11px] text-slate-500">{srv.duration}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-4">{srv.subtitle}</p>

                <div className="space-y-2 mb-6">
                  {srv.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <span className="text-[#071f5c] font-bold mt-0.5">✓</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate(`service-${srv.id}`)}
                  className="px-4 py-2 rounded-full bg-sky-50 hover:bg-[#e8f1ff] text-[#071f5c] text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  Chi tiết quy trình & giá
                </button>
                <button
                  onClick={() => onOpenBooking(srv.id)}
                  className="px-5 py-2.5 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  Đặt lịch ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}