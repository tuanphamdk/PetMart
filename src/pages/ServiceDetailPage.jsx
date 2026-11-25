import { SERVICES } from '../data/storedata';

export default function ServiceDetailPage({
  serviceId = 'spa',
  onNavigate,
  onOpenBooking,
}) {
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  return (
    <main className="w-full bg-white flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="text-xs text-stone-500 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#143d2b] cursor-pointer"
          >
            Trang chủ
          </button>{' '}
          /{' '}
          <button
            onClick={() => onNavigate('services')}
            className="hover:text-[#143d2b] cursor-pointer"
          >
            Dịch vụ
          </button>{' '}
          / <span className="text-[#143d2b] font-semibold">{service.name}</span>
        </div>

        <div className="bg-[#faf8f5] border border-stone-200/80 rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-[#f4efe8] flex items-center justify-center text-3xl shrink-0">
                {service.emoji}
              </span>
              <div>
                <span className="inline-block bg-[#f4efe8] text-[#9a5b28] text-xs font-bold px-3 py-0.5 rounded-full mb-1.5">
                  {service.highlight} • {service.duration}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143d2b]">
                  {service.name}
                </h1>
                <p className="text-sm text-stone-600 mt-1">{service.subtitle}</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-2xl px-5 py-3.5 text-left sm:text-right shrink-0">
              <div className="text-xs text-stone-500">Giá tham khảo từ</div>
              <div className="text-xl font-extrabold text-[#143d2b]">{service.priceFrom}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-extrabold text-[#143d2b] mb-4">
            Quy trình chăm sóc chi tiết
          </h2>
          <div className="space-y-3">
            {service.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf8f5] border border-stone-100"
              >
                <span className="w-6 h-6 rounded-full bg-[#143d2b] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-stone-700">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('services')}
            className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs sm:text-sm font-bold cursor-pointer"
          >
            ← Quay lại danh sách dịch vụ
          </button>
          <button
            onClick={() => onOpenBooking(service.id)}
            className="px-6 py-3 rounded-full bg-[#143d2b] hover:bg-[#1f543c] text-white text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            Đặt lịch gói này ngay
          </button>
        </div>
      </div>
    </main>
  );
}