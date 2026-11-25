import { useState, useEffect, useCallback } from 'react';
import { formatVND } from '../data/storedata';

const API_BASE = 'http://localhost:4000/api';

export default function HistoryPage({ onNavigate, onShowToast }) {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (!res.ok) throw new Error('Không thể tải dữ liệu từ backend');
      const data = await res.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch {
      setErrorMsg(
        'Chưa kết nối được tới Backend (http://localhost:4000). Hãy kiểm tra cửa sổ chạy node server.js.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDeleteOrder = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev.filter((item) => item.id !== id));
      onShowToast('Đã xóa đơn hàng khỏi lịch sử.', 'success');
    } catch {
      onShowToast('Không xóa được đơn hàng.', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((item) => item.id !== id));
      onShowToast('Đã xóa lịch dịch vụ khỏi lịch sử.', 'success');
    } catch {
      onShowToast('Không xóa được lịch dịch vụ.', 'error');
    }
  };

  return (
    <main className="w-full bg-white flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="text-xs text-slate-500 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#071f5c] cursor-pointer"
          >
            Trang chủ
          </button>{' '}
          / <span className="text-[#071f5c] font-semibold">Lịch sử đơn hàng & Dịch vụ</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071f5c]">
              Lịch sử đã đặt
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dữ liệu lưu trên backend (backend/db.json) — tải lại trang vẫn còn nguyên.
            </p>
          </div>

          <button
            onClick={fetchHistory}
            className="self-start sm:self-auto px-4 py-2 rounded-full border border-slate-200 bg-sky-50 hover:bg-[#e8f1ff] text-xs sm:text-sm font-bold text-[#071f5c] transition cursor-pointer"
          >
            🔄 Tải lại dữ liệu
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-6">
          <button
            onClick={() => setTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition cursor-pointer ${
              tab === 'orders'
                ? 'bg-[#071f5c] text-white border-[#071f5c]'
                : 'bg-white text-[#071f5c] border-slate-200 hover:border-[#071f5c]'
            }`}
          >
            🛍️ Đơn hàng đã đặt ({orders.length})
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition cursor-pointer ${
              tab === 'bookings'
                ? 'bg-[#071f5c] text-white border-[#071f5c]'
                : 'bg-white text-[#071f5c] border-slate-200 hover:border-[#071f5c]'
            }`}
          >
            🛁 Dịch vụ đã đặt ({bookings.length})
          </button>
        </div>

        {loading && (
          <div className="bg-[#f8fafc] rounded-3xl border border-slate-200/80 p-8 text-center text-sm text-slate-500">
            Đang tải dữ liệu từ backend...
          </div>
        )}

        {!loading && errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 text-sm">
            ⚠️ {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && tab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#f8fafc] rounded-3xl border border-slate-200/80 p-10 text-center">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-sm font-semibold text-slate-700">
                  Chưa có đơn hàng nào được lưu.
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Đi mua sản phẩm
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <span className="font-bold text-sm text-[#071f5c]">{order.id}</span>
                      <span className="text-xs text-slate-400 ml-2.5">{order.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold bg-[#e8f1ff] text-[#071f5c] px-3 py-1 rounded-full">
                        {order.status}
                      </span>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <strong>Người nhận:</strong> {order.fullName} ({order.phone})
                    </div>
                    <div>
                      <strong>Hình thức:</strong>{' '}
                      {order.deliveryMethod === 'pickup' ? 'Tự đến lấy' : 'Giao tận nơi'}
                    </div>
                    <div className="sm:col-span-2">
                      <strong>Địa chỉ:</strong> {order.address}
                    </div>
                    {order.note && (
                      <div className="sm:col-span-2">
                        <strong>Ghi chú:</strong> {order.note}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#f8fafc] rounded-2xl p-3.5 space-y-1.5">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs text-slate-700"
                      >
                        <span>
                          {item.emoji} {item.name} ({item.variantLabel}) ×{' '}
                          <strong>{item.qty}</strong>
                        </span>
                        <span className="font-semibold text-[#071f5c]">
                          {formatVND(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500">Tổng đơn:</span>
                    <span className="text-base font-extrabold text-[#071f5c]">
                      {formatVND(order.totalPrice)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {!loading && !errorMsg && tab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-[#f8fafc] rounded-3xl border border-slate-200/80 p-10 text-center">
                <div className="text-4xl mb-2">🛁</div>
                <p className="text-sm font-semibold text-slate-700">
                  Chưa có lịch dịch vụ nào được đặt.
                </p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#071f5c] hover:bg-[#0d2d7a] text-white text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Xem gói dịch vụ & Đặt lịch
                </button>
              </div>
            ) : (
              bookings.map((bk) => (
                <div
                  key={bk.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="font-bold text-sm text-[#071f5c]">
                        {bk.serviceName}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">({bk.id})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold bg-[#e8f1ff] text-[#071f5c] px-3 py-1 rounded-full">
                        {bk.status}
                      </span>
                      <button
                        onClick={() => handleDeleteBooking(bk.id)}
                        className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <strong>Khách hàng:</strong> {bk.ownerName} ({bk.phone})
                    </div>
                    <div>
                      <strong>Thú cưng:</strong> {bk.petType} • {bk.weightRange}
                    </div>
                    <div>
                      <strong>Ngày & Giờ hẹn:</strong> {bk.date} lúc {bk.timeSlot}
                    </div>
                    <div>
                      <strong>Tạo lúc:</strong> {bk.createdAt}
                    </div>
                    {bk.note && (
                      <div className="sm:col-span-2">
                        <strong>Ghi chú:</strong> {bk.note}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}