import React, { useState } from 'react';
import { ShoppingBag, Menu, X, SlidersHorizontal } from 'lucide-react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  onSelectProduct?: (productId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Products', route: 'products' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
    { label: 'Admin', route: 'admin' }
  ];

  const handleNavClick = (route: PageRoute) => {
    setCurrentPage(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070A12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-['Space_Grotesk'] text-lg sm:text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap"
        >
          AURA ACOUSTICS
        </button>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`whitespace-nowrap transition-colors relative py-1 ${
                  isActive
                    ? 'text-blue-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions (Cart Drawer Trigger & Shop Now Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Cart"
            className="relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">Cart</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('products')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-blue-900/30"
          >
            Explore Systems
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B0F19] px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => handleNavClick(link.route)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                currentPage === link.route
                  ? 'bg-blue-600/15 text-blue-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                handleNavClick('cart');
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                Shopping Cart
              </span>
              <span className="text-xs bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full tabular-nums">
                {totalItems} items
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
