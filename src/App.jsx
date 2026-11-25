import { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import VariantModal from './components/VariantModal';
import CartDrawer from './components/cardrawer';
import BookingModal from './components/BookingModal';
import Toast from './components/toast';
import HomePage from './pages/homepage';
import ShopPage from './pages/shoppage';
import PetCategoryPage from './pages/PetCategoryPage';
import ServicesPage from './pages/servicespage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import HistoryPage from './pages/historypage';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [search, setSearch] = useState('');
  const [shopCategory, setShopCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingModal, setBookingModal] = useState({ open: false, serviceId: 'spa' });
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    if (page === 'shop') setShopCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    if (activePage !== 'shop') {
      setActivePage('shop');
    }
  };

  const addToCart = (product, variant) => {
    const key = `${product.id}-${variant.label}`;
    setCart((prev) => {
      const exists = prev.find((item) => item.key === key);
      if (exists) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          variantLabel: variant.label,
          price: variant.price,
          emoji: product.emoji,
          qty: 1,
        },
      ];
    });
    showToast(`Đã thêm "${product.name}" (${variant.label})`, 'success');
  };

  const handleSelectProduct = (product) => {
    if (product.variants.length === 1) {
      addToCart(product, product.variants[0]);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleUpdateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleCheckoutSuccess = (summaryMessage) => {
    setCart([]);
    setCartOpen(false);
    showToast(summaryMessage || 'Đặt hàng thành công!', 'success');
  };

  const openBookingDialog = (serviceId = 'spa') => {
    setBookingModal({ open: true, serviceId });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col">
      {/* Thanh topbar trên cùng */}
      <div className="w-full bg-[#041540] text-sky-200 text-xs py-1.5 px-4 sm:px-8 lg:px-14">
        <div className="w-full flex items-center justify-between">
          <span>🐾 Pet Mart - Siêu thị thú cưng & Spa chăm sóc chuyên nghiệp</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>Hotline: 1900 2100</span>
            <span>Miễn phí giao hàng đơn từ 300.000₫</span>
          </div>
        </div>
      </div>

      <Header
        activePage={activePage}
        onNavigate={navigateTo}
        search={search}
        onSearchChange={handleSearchChange}
        totalItems={totalItems}
        onOpenCart={() => setCartOpen(true)}
      />

      {activePage === 'home' && (
        <HomePage
          onNavigate={navigateTo}
          onSelectProduct={handleSelectProduct}
          onOpenBooking={openBookingDialog}
        />
      )}

      {activePage === 'shop' && (
        <ShopPage
          search={search}
          onSearchChange={setSearch}
          category={shopCategory}
          onCategoryChange={setShopCategory}
          onNavigateHome={() => navigateTo('home')}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {activePage === 'dog' && (
        <PetCategoryPage
          petType="dog"
          onNavigate={navigateTo}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {activePage === 'cat' && (
        <PetCategoryPage
          petType="cat"
          onNavigate={navigateTo}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {activePage === 'services' && (
        <ServicesPage
          onNavigate={navigateTo}
          onOpenBooking={openBookingDialog}
        />
      )}

      {activePage === 'service-standard' && (
        <ServiceDetailPage
          serviceId="standard"
          onNavigate={navigateTo}
          onOpenBooking={openBookingDialog}
        />
      )}

      {activePage === 'service-spa' && (
        <ServiceDetailPage
          serviceId="spa"
          onNavigate={navigateTo}
          onOpenBooking={openBookingDialog}
        />
      )}

      {activePage === 'history' && (
        <HistoryPage
          onNavigate={navigateTo}
          onShowToast={showToast}
        />
      )}

      <Footer onNavigate={navigateTo} />

      <VariantModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onCheckoutSuccess={handleCheckoutSuccess}
        onShowError={(errMsg) => showToast(errMsg, 'error')}
      />

      <BookingModal
        isOpen={bookingModal.open}
        onClose={() => setBookingModal((prev) => ({ ...prev, open: false }))}
        defaultServiceId={bookingModal.serviceId}
        onSuccess={(msg) => showToast(msg, 'success')}
        onError={(errMsg) => showToast(errMsg, 'error')}
      />

      {/* Hai nút tròn nổi góc dưới phải */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
        <button
          onClick={() => showToast('Hotline tư vấn & đặt hàng: 1900 2100', 'success')}
          title="Gọi Hotline 1900 2100"
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center text-xl transition hover:scale-105 cursor-pointer"
        >
          📞
        </button>
        <button
          onClick={() => openBookingDialog('spa')}
          title="Đặt lịch Spa & Tư vấn nhanh"
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg flex items-center justify-center text-xl transition hover:scale-105 cursor-pointer"
        >
          💬
        </button>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}