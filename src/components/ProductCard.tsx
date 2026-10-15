import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { SpeakerIllustration } from './SpeakerIllustration';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-[#0B0F19] rounded-xl border border-slate-800/80 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-300 overflow-hidden"
    >
      {/* Visual Slot - 65% to 70% of upper presence */}
      <div className="relative aspect-[4/3] w-full bg-[#080C14] overflow-hidden border-b border-slate-800/60">
        <SpeakerIllustration
          category={product.category}
          name={product.name}
          badge={product.badge}
          isHovered={isHovered}
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.id);
            }}
            className="pointer-events-auto px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Details</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`pointer-events-auto px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md transition-all ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : product.inStock
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Added' : product.inStock ? 'Quick Add' : 'Sold Out'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Quiet Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-blue-400 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{product.specifications.wattage.split(' ')[0]}</span>
            {product.specifications.batteryLife && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">{product.specifications.batteryLife.split(' ')[0]}</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Bottom Baseline: Price, Rating & Stock */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white text-base tabular-nums font-mono">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through tabular-nums font-mono">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-200 tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
