import { useState, useEffect } from 'react';
import { SERVICES } from '../data/storedata';

const API_BASE = 'http://localhost:4000/api';

export default function BookingModal({
  isOpen,
  onClose,
  defaultServiceId = 'spa',
  onSuccess,
  onError,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState({
    ownerName: '',
    phone: '',
    petType: 'Chó',
    weightRange: 'Dưới 5 kg',
    serviceId: defaultServiceId,
    date: '',
    timeSlot: '09:30',
    note: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultServiceId) {
      setBooking((prev) => ({ ...prev, serviceId: defaultServiceId }));
    }
    setErrors({});
  }, [defaultServiceId, isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateBooking = () => {
    const newErrors = {};

    if (!booking.ownerName.trim()) {
      newErrors.ownerName = 'Bạn chưa nhập tên của bạn.';
    }

    const cleanPhone = booking.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Bạn chưa nhập số điện thoại.';
    } else if (!/^0\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Số điện thoại chưa đúng (cần đủ 10 số, bắt đầu bằng số 0).';
    }

    if (!booking.date) {
      newErrors.date = 'Bạn chưa chọn ngày hẹn.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBooking()) {
      if (onError) {
        onError('Bạn chưa điền đủ thông tin đặt hẹn!');
      }
      return;
    }

    const chosen = SERVICES.find((s) => s.id === booking.serviceId);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...booking,
          ownerName: booking.ownerName.trim(),
          phone: booking.phone.replace(/\s+/g, ''),
          serviceName: chosen?.name || 'Gói dịch vụ chăm sóc',
          note: booking.note.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không lưu được lịch hẹn.');
      }

      onSuccess(
        `Đã đặt lịch "${data.serviceName}" ngày ${data.date} (${data.timeSlot})!`
      );
      setBooking({
        ownerName: '',
        phone: '',
        petType: 'Chó',
        weightRange: 'Dưới 5 kg',
        serviceId: defaultServiceId || 'spa',
        date: '',
        timeSlot: '09:30',
        note: '',
      });
      setErrors({});
      onClose();
    } catch (err) {
      if (onError) {
        onError(
          err.message || 'Không kết nối được backend. Hãy kiểm tra node server.js đang chạy.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="inline-block text-[11px] font-bold bg-[#e8f1ff] text-[#071f5c] px-2.5 py-0.5 rounded-full mb-1">
              Đặt lịch trực tuyến
            </span>
            <h3 className="text-lg font-extrabold text-[#071f5c]">
              📅 Đặt hẹn dịch vụ chăm sóc
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên của bạn <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={booking.ownerName}
                onChange={(e) => handleFieldChange('ownerName', e.target.value)}
                placeholder="Ví dụ: Phạm Minh Tuấn"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.ownerName
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-slate-300 focus:border-[#071f5c]'
                }`}
              />
              {errors.ownerName && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  ⚠️ {errors.ownerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số điện thoại <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={booking.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="09xx xxx xxx"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.phone
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-slate-300 focus:border-[#071f5c]'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  ⚠️ {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gói dịch vụ
            </label>
            <select
              value={booking.serviceId}
              onChange={(e) => handleFieldChange('serviceId', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#071f5c]"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (từ {s.priceFrom})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Thú cưng
              </label>
              <select
                value={booking.petType}
                onChange={(e) => handleFieldChange('petType', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#071f5c]"
              >
                <option value="Chó">🐶 Chó</option>
                <option value="Mèo">🐱 Mèo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cân nặng dự kiến
              </label>
              <select
                value={booking.weightRange}
                onChange={(e) => handleFieldChange('weightRange', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#071f5c]"
              >
                <option value="Dưới 5 kg">Dưới 5 kg</option>
                <option value="5 – 10 kg">5 – 10 kg</option>
                <option value="10 – 20 kg">10 – 20 kg</option>
                <option value="Trên 20 kg">Trên 20 kg</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày hẹn <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={booking.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.date
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-slate-300 focus:border-[#071f5c]'
                }`}
              />
              {errors.date && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  ⚠️ {errors.date}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Khung giờ
              </label>
              <select
                value={booking.timeSlot}
                onChange={(e) => handleFieldChange('timeSlot', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#071f5c]"
              >
                <option value="09:30">09:30 Sáng</option>
                <option value="11:00">11:00 Trưa</option>
                <option value="14:30">14:30 Chiều</option>
                <option value="16:30">16:30 Chiều</option>
                <option value="18:30">18:30 Tối</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ghi chú cho kỹ thuật viên
            </label>
            <input
              type="text"
              value={booking.note}
              onChange={(e) => handleFieldChange('note', e.target.value)}
              placeholder="Ví dụ: Bé nhát nước, cần tắm nhẹ nhàng..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#071f5c]"
            />
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-2 py-2.5 px-5 rounded-xl bg-[#071f5c] hover:bg-[#0d2d7a] disabled:opacity-60 text-white font-bold text-sm cursor-pointer"
            >
              {submitting ? 'Đang lưu...' : 'Xác nhận đặt hẹn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}