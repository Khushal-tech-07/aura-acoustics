import React, { useState, useEffect } from 'react';
import { PageRoute, Product } from './types';
import { api } from './services/api';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('spk-001');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toastMessage } = useCart();

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data.products);
      if (data.products.length > 0 && !selectedProductId) {
        setSelectedProductId(data.products[0].id);
      }
    } catch (err) {
      console.error('Failed to load initial products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (route: PageRoute) => {
    setCurrentPage(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0B1222] border border-blue-500/60 rounded-xl shadow-2xl shadow-black/80 text-xs font-semibold text-white animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Page Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Checkout Processing Modal */}
      <CheckoutModal />

      {/* Global Footer */}
      <Footer setCurrentPage={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
