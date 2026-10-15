import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types';
import { SpeakerIllustration } from './SpeakerIllustration';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    shipping,
    tax,
    total,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleGoToProducts = () => {
    setIsCartOpen(false);
    onNavigate('products');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0B0F19] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight font-['Space_Grotesk']">
                Acoustic Hardware Bag
              </h2>
              <span className="text-xs text-slate-400 font-mono">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Tag className="w-8 h-8 text-blue-500/50" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Your bag is empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Explore our precision reference speakers, studio monitors, and immersive sound systems.
                  </p>
                </div>
                <button
                  onClick={handleGoToProducts}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Browse Sound Systems
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-lg bg-[#0E1424] border border-slate-800/80"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <SpeakerIllustration
                      category={item.product.category}
                      name={item.product.name}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                        {item.product.category}
                      </div>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-slate-300 font-mono mt-0.5 tabular-nums">
                        ${item.product.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center border border-slate-700 rounded-md overflow-hidden bg-slate-900">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#080C16] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCode} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. AUDIO10)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <div
                    className={`text-[11px] ${
                      promoFeedback.success ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {promoFeedback.message}
                  </div>
                )}
                {promoCode && (
                  <div className="flex items-center justify-between text-xs text-blue-400 bg-blue-950/40 border border-blue-900/50 rounded px-2.5 py-1">
                    <span>Applied: <strong>{promoCode}</strong></span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-slate-400 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Insured Shipping</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    ${tax.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-semibold text-white">
                  <span>Total</span>
                  <span className="font-mono text-blue-400 tabular-nums text-base">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>256-bit encrypted checkout · 5-year warranty</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('cart');
                  }}
                  className="w-full py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors text-center"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
