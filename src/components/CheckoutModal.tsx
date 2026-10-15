import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, AlertCircle, Copy, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Valid phone number is required for freight delivery';
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      errs.postalCode = 'Postal code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim()
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        subtotal,
        discount,
        shipping,
        tax,
        total,
        paymentMethod: formData.paymentMethod
      };

      const order = await api.createOrder(orderPayload);
      setCompletedOrder(order);
      clearCart();
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(err.message || 'Payment processing error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = () => {
    if (completedOrder) {
      navigator.clipboard.writeText(completedOrder.id);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight font-['Space_Grotesk']">
                {completedOrder ? 'Order Confirmed' : 'Audiophile Direct Checkout'}
              </h2>
              <div className="text-xs text-slate-400">
                {completedOrder
                  ? 'White-glove acoustic shipment initiated'
                  : 'Encrypted transaction with 5-year master guarantee'}
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {completedOrder ? (
            /* Order Success Receipt */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-600/40 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Thank You, {completedOrder.customer.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                  Your order has been verified and registered with our acoustic testing facility. An official certificate of acoustic authenticity and tracking number will be dispatched to <strong>{completedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order ID Banner */}
              <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-4 flex items-center justify-between max-w-md mx-auto">
                <div className="text-left">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Tracking Reference</div>
                  <div className="font-mono text-sm font-bold text-blue-400 tabular-nums">
                    {completedOrder.id}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOrderId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Summary Items Table */}
              <div className="text-left bg-[#080C14] border border-slate-800/80 rounded-xl p-4 text-xs space-y-2">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Shipment Manifest
                </div>
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-800/40">
                    <span className="text-slate-200">
                      {it.quantity}x {it.name}
                    </span>
                    <span className="font-mono text-slate-300 tabular-nums">
                      ${(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-white text-sm">
                  <span>Total Paid</span>
                  <span className="font-mono text-blue-400 tabular-nums">
                    ${completedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. White-Glove Delivery Destination</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julian Hayes"
                      className={`w-full bg-[#080C14] border ${
                        errors.name ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email for Certificate & Tracking *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      className={`w-full bg-[#080C14] border ${
                        errors.email ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="742 Evergreen Terrace, Suite 4B"
                      className={`w-full bg-[#080C14] border ${
                        errors.address ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className={`w-full bg-[#080C14] border ${
                        errors.phone ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="San Francisco"
                      className={`w-full bg-[#080C14] border ${
                        errors.city ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="94107"
                      className={`w-full bg-[#080C14] border ${
                        errors.postalCode ? 'border-red-500' : 'border-slate-700'
                      } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {errors.postalCode && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Payment Arrangement</span>
                </div>

                {/* Payment Options Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'credit-card', label: 'Credit Card' },
                    { id: 'apple-pay', label: 'Apple / Google Pay' },
                    { id: 'cod', label: 'Cash on Delivery / Wire' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-950/40 text-white font-semibold shadow-sm'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'credit-card' ? (
                  <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Card Number (Demo Sandbox Active)
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Expires</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">CVC</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : formData.paymentMethod === 'cod' ? (
                  <div className="p-3 bg-blue-950/30 border border-blue-900/40 rounded-lg text-xs text-slate-300 leading-relaxed">
                    <strong>Cash on Delivery & Direct Wire:</strong> For orders over $1,000, our bonded courier can collect certified bank check upon delivery, inspection, and room placement.
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    Instant 1-Click Biometric Authentication will verify when you click submit.
                  </div>
                )}
              </div>

              {/* Order Calculation Preview */}
              <div className="p-4 bg-[#080C14] border border-slate-800 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Cart Items ({cart.length})</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Audiophile Privilege Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Insured Express Shipping</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    ${tax.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-base text-white">
                  <span>Final Authorized Total</span>
                  <span className="font-mono text-blue-400 tabular-nums">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <span>Authorize & Place Order (${total.toLocaleString()})</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
