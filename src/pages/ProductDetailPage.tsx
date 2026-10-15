import React, { useState, useEffect } from 'react';
import { Product, PageRoute } from '../types';
import { api } from '../services/api';
import { SpeakerIllustration } from '../components/SpeakerIllustration';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Activity,
  Layers,
  Zap
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onSelectProduct,
  onNavigate
}) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeAngle, setActiveAngle] = useState<'front' | 'drivers' | 'mesh' | 'schematic'>('front');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api
      .getProductById(productId)
      .then((res) => {
        if (isMounted) {
          setProduct(res.product);
          setRelated(res.related);
          setQuantity(1);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
      .catch((err) => {
        console.error('Error loading product details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="text-xs font-mono text-slate-400">Loading Acoustic Calibration Profile...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Record Not Found</h2>
        <p className="text-xs text-slate-400">This acoustic system may have been decommissioned or moved.</p>
        <button
          onClick={() => onNavigate('products')}
          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
        >
          Return to All Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span>Products</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-400 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid: Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Gallery & Angle Selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#090D17] border border-slate-800 overflow-hidden shadow-2xl">
            <SpeakerIllustration
              category={product.category}
              name={product.name}
              badge={product.badge}
              isHovered={true}
              className="w-full h-full"
            />

            {/* Angle Indicator Overlay */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300">
              Perspective: <span className="text-blue-400 uppercase">{activeAngle}</span>
            </div>
          </div>

          {/* Interactive Thumbnails / Viewing Angles */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'front', label: 'Front Baffle' },
              { id: 'drivers', label: 'Driver Array' },
              { id: 'mesh', label: 'Acoustic Mesh' },
              { id: 'schematic', label: 'Cross-Section' }
            ].map((angle) => (
              <button
                key={angle.id}
                onClick={() => setActiveAngle(angle.id as any)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  activeAngle === angle.id
                    ? 'bg-blue-950/40 border-blue-500 text-white font-semibold shadow-sm'
                    : 'bg-[#0B0F19] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-xs">{angle.label}</div>
              </button>
            ))}
          </div>

          {/* Acoustic Driver Highlights */}
          <div className="rounded-xl bg-[#0B0F19] border border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Acoustic Profile Analysis</span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-1 text-center">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                <div className="text-[11px] text-slate-400">Total Harmonic Distortion</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">&lt; 0.05% THD+N</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                <div className="text-[11px] text-slate-400">Acoustic Dispersion</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">120° Horizontal</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                <div className="text-[11px] text-slate-400">Cabinet Material</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">CNC 6061-T6 Aluminum</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (Sticky on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-6 shadow-xl">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-blue-400 uppercase tracking-wider text-[11px]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500 text-[11px]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                {product.name}
              </h1>

              {/* Price Tag with Tabular Numerals */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium ml-auto">
                  {product.inStock ? 'In Stock · Ready for Dispatch' : 'Backorder Available'}
                </span>
              </div>
            </div>

            {/* Product Prose Description */}
            <div className="border-t border-slate-800/80 pt-4 space-y-2">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Acoustic Highlights */}
            <div className="space-y-2 bg-[#080C14] border border-slate-800/80 rounded-xl p-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Power Handling</span>
                <span className="font-mono text-slate-200">{product.specifications.wattage}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Frequency Response</span>
                <span className="font-mono text-slate-200">{product.specifications.frequencyResponse}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Connectivity</span>
                <span className="font-mono text-slate-200 text-right max-w-[200px] truncate">
                  {product.specifications.connectivity}
                </span>
              </div>
            </div>

            {/* Quantity Stepper & Buy Action */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-400">Quantity:</span>
                <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-[#080C14]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-white font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {product.stock} units remaining in San Francisco atelier
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedToast
                    ? 'Added to Your Bag!'
                    : `Add to Cart — $${(product.price * quantity).toLocaleString()}`}
                </span>
              </button>
            </div>

            {/* Trust and Assurances */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Complimentary insured freight dispatch in reinforced flight crate</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>5-Year comprehensive master warranty on drivers & amplification</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-400" />
                <span>60-day in-home acoustic evaluation with prepaid returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table Section */}
      <section className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Acoustic Telemetry
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            Technical Engineering Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-medium">Amplifier Power Rating</span>
              <span className="font-mono text-white text-right">{product.specifications.wattage}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-medium">Frequency Response</span>
              <span className="font-mono text-white text-right">{product.specifications.frequencyResponse}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-medium">Driver Transducers</span>
              <span className="font-mono text-white text-right max-w-xs">{product.specifications.drivers || 'Proprietary AURA Drivers'}</span>
            </div>
            {product.specifications.impedance && (
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Nominal Impedance</span>
                <span className="font-mono text-white text-right">{product.specifications.impedance}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-medium">Audio Connectivity</span>
              <span className="font-mono text-white text-right max-w-xs">{product.specifications.connectivity}</span>
            </div>
            {product.specifications.batteryLife && (
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Rechargeable Battery</span>
                <span className="font-mono text-white text-right">{product.specifications.batteryLife}</span>
              </div>
            )}
            {product.specifications.dimensions && (
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Physical Dimensions</span>
                <span className="font-mono text-white text-right">{product.specifications.dimensions}</span>
              </div>
            )}
            {product.specifications.weight && (
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Net Weight</span>
                <span className="font-mono text-white text-right">{product.specifications.weight}</span>
              </div>
            )}
            {product.specifications.waterproofRating && (
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-medium">Ingress Protection</span>
                <span className="font-mono text-white text-right">{product.specifications.waterproofRating}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Matched Systems
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
              Related Acoustic Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
