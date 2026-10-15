import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types';
import { SpeakerIllustration } from '../components/SpeakerIllustration';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  RotateCcw,
  Truck,
  ArrowLeft,
  Check
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
    if (res.success) setInputCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#0B0F19] border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-10 h-10 text-blue-500/60" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
            Your Acoustic Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            You haven't reserved any reference speakers or sound systems yet. Explore our handcrafted collection to configure your soundstage.
          </p>
        </div>

        <div>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-900/30 inline-flex items-center gap-2"
          >
            <span>Browse Acoustic Systems</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Bag</span>
            <span aria-hidden="true">·</span>
            <span>Hardware Reservation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            Shopping Cart ({cart.length} distinct systems)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items Table/List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-slate-800/80 flex flex-col sm:flex-row items-center gap-5 hover:border-slate-700 transition-colors"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(item.product.id)}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#080C14] border border-slate-800 shrink-0 cursor-pointer"
              >
                <SpeakerIllustration
                  category={item.product.category}
                  name={item.product.name}
                  className="w-full h-full"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                  {item.product.category}
                </div>
                <h2
                  onClick={() => onSelectProduct(item.product.id)}
                  className="text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {item.product.name}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {item.product.shortDescription}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-between gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-[#080C14]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-white font-mono tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price breakdown */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">
                        ${item.product.price.toLocaleString()} each
                      </div>
                      <div className="text-sm font-bold text-white font-mono tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery & Warranty Badges */}
          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Free freight above $250</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>5-Year master warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-400 shrink-0" />
              <span>60-day home trial</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-5 shadow-xl">
            <h2 className="text-base font-bold text-white font-['Space_Grotesk'] border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                Promo or VIP Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Code (e.g. AUDIO10)"
                  className="flex-1 bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
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
                <div className="flex items-center justify-between text-xs text-blue-400 bg-blue-950/40 border border-blue-900/50 rounded px-2.5 py-1.5 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied: <strong>{promoCode}</strong></span>
                  </div>
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

            {/* Price lines */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Audiophile Discount</span>
                  <span className="font-mono tabular-nums">-${discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Insured Freight Delivery</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `$${shipping}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  ${tax.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-bold text-white">
                <span>Total Amount</span>
                <span className="font-mono text-blue-400 tabular-nums text-lg">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified 256-bit AES encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
