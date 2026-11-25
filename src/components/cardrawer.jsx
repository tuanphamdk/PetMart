import { useState, useEffect } from 'react';
import { formatVND } from '../data/storedata';

const PICKUP_STORE_ADDRESS = '124 Trần Duy Hưng, Cầu Giấy, Hà Nội';
const API_BASE = 'http://localhost:4000/api';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onCheckoutSuccess,
  onShowError,
}) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen || cart.length === 0) {
      setShowCheckoutForm(false);
      setErrors({});
    }
  }, [isOpen, cart.length]);

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleFieldChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.fullName.trim()) {
      newErrors.fullName = 'Bạn chưa nhập tên người nhận.';
    }

    const cleanPhone = customer.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Bạn chưa nhập số điện thoại liên hệ.';
    } else if (!/^0\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Số điện thoại chưa đúng (cần đủ 10 số, bắt đầu bằng số 0).';
    }

    if (deliveryMethod === 'delivery' && !customer.address.trim()) {
      newErrors.address = 'Bạn chưa nhập địa chỉ nhận hàng.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (onShowError) {
        onShowError('Vui lòng kiểm tra lại các thông tin báo đỏ bên dưới!');
      }
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: customer.fullName.trim(),
          phone: customer.phone.replace(/\s+/g, ''),
          deliveryMethod,
          address: deliveryMethod === 'delivery' ? customer.address.trim() : PICKUP_STORE_ADDRESS,
          note: customer.note.trim(),
          items: cart,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không lưu được đơn hàng.');
      }

      const summary =
        deliveryMethod === 'pickup'
          ? `Đặt hàng thành công (${data.id})! Tự đến lấy tại ${PICKUP_STORE_ADDRESS}.`
          : `Đặt hàng thành công (${data.id})! Giao tới ${customer.address.trim()}.`;

      onCheckoutSuccess(summary);
      setCustomer({ fullName: '', phone: '', address: '', note: '' });
      setErrors({});
      setShowCheckoutForm(false);
    } catch (err) {
      if (onShowError) {
        onShowError(
          err.message || 'Không kết nối được backend. Hãy kiểm tra node server.js đang chạy.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-base text-[#071f5c]">🛒 Giỏ hàng ({totalItems})</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 py-16">
              <div className="text-4xl mb-2">🛍️</div>
              <p className="text-sm">Chưa có sản phẩm trong giỏ hàng.</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200/90 bg-white"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{item.variantLabel}</div>
                    <div className="text-sm font-extrabold text-[#071f5c] mt-0.5">
                      {formatVND(item.price * item.qty)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateQty(item.key, -1)}
                      className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center text-sm font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.key, 1)}
                      className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {showCheckoutForm && (
                <form
                  onSubmit={handleConfirmOrder}
                  noValidate
                  className="mt-4 p-4 rounded-2xl bg-sky-50 border border-[#d3e4ff] space-y-3"
                >
                  <div className="font-bold text-sm text-[#071f5c]">
                    📋 Thông tin nhận hàng
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryMethod('delivery');
                        setErrors((prev) => ({ ...prev, address: '' }));
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        deliveryMethod === 'delivery'
                          ? 'bg-[#071f5c] text-white border-[#071f5c]'
                          : 'bg-white text-[#071f5c] border-slate-300'
                      }`}
                    >
                      🚚 Giao tận nơi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryMethod('pickup');
                        setErrors((prev) => ({ ...prev, address: '' }));
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        deliveryMethod === 'pickup'
                          ? 'bg-[#071f5c] text-white border-[#071f5c]'
                          : 'bg-white text-[#071f5c] border-slate-300'
                      }`}
                    >
                      🏪 Tự đến lấy
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên người nhận <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="Ví dụ: Phạm Minh Tuấn"
                      className={`w-full px-3 py-2 rounded-xl border bg-white text-xs sm:text-sm focus:outline-none ${
                        errors.fullName
                          ? 'border-red-500 ring-1 ring-red-200'
                          : 'border-slate-300 focus:border-[#071f5c]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] font-medium text-red-600 mt-1">
                        ⚠️ {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="09xx xxx xxx"
                      className={`w-full px-3 py-2 rounded-xl border bg-white text-xs sm:text-sm focus:outline-none ${
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

                  {deliveryMethod === 'delivery' ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Địa chỉ giao hàng <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        placeholder="Số nhà, ngõ/đường, phường/xã, quận/huyện..."
                        className={`w-full px-3 py-2 rounded-xl border bg-white text-xs sm:text-sm focus:outline-none ${
                          errors.address
                            ? 'border-red-500 ring-1 ring-red-200'
                            : 'border-slate-300 focus:border-[#071f5c]'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-[11px] font-medium text-red-600 mt-1">
                          ⚠️ {errors.address}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-white border border-[#d3e4ff] text-xs text-slate-700">
                      <div className="font-semibold text-[#071f5c] mb-0.5">
                        Địa chỉ cửa hàng tự đến lấy:
                      </div>
                      <div>{PICKUP_STORE_ADDRESS}</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ghi chú đơn hàng (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={customer.note}
                      onChange={(e) => handleFieldChange('note', e.target.value)}
                      placeholder="Ví dụ: Gọi trước khi giao, giao buổi chiều..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#071f5c]"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCheckoutForm(false);
                        setErrors({});
                      }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#071f5c] hover:bg-[#0d2d7a] disabled:opacity-60 text-white text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      {submitting
                        ? 'Đang lưu...'
                        : `Xác nhận đặt hàng (${formatVND(totalPrice)})`}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && !showCheckoutForm && (
          <div className="p-4 border-t border-slate-200 bg-sky-50/60 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Tạm tính:</span>
              <span className="text-lg font-extrabold text-[#071f5c]">
                {formatVND(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => setShowCheckoutForm(true)}
              className="w-full py-3 rounded-xl bg-[#071f5c] hover:bg-[#0d2d7a] text-white font-bold text-sm cursor-pointer"
            >
              Đặt hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}