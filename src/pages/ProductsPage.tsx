import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ products, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(3000);

  const categories = ['All', 'Bluetooth', 'Home Theatre', 'Portable', 'Smart Speaker'];

  // Filter and Sort in client memory
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // In-stock match
        if (inStockOnly && (!p.inStock || p.stock <= 0)) {
          return false;
        }
        // Price limit match
        if (p.price > maxPrice) {
          return false;
        }
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.shortDescription.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesWatt = p.specifications.wattage.toLowerCase().includes(q);
          const matchesConn = p.specifications.connectivity.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCat && !matchesWatt && !matchesConn) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Default: featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly, maxPrice]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setMaxPrice(3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Catalog</span>
          <span aria-hidden="true">·</span>
          <span>Acoustic Transducers</span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-400 font-medium">Precision Speakers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Acoustic Loudspeaker Systems
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Engineered for clinical acoustic clarity, zero-resonance dampening, and effortless dynamic headroom across any architectural acoustic space.
        </p>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Row 1: Search & Category Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, driver, or wattage..."
              className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs (No pill clutter, clean segmented buttons) */}
          <div className="flex items-center gap-1 p-1 bg-[#080C14] border border-slate-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Secondary Controls: Sort, Stock Filter, Price Slider, Reset */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#080C14] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured Systems</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (5.0)</option>
                <option value="name">Alphabetical (A–Z)</option>
              </select>
            </div>

            {/* In-Stock Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-slate-700 bg-[#080C14] text-blue-600 focus:ring-0 focus:ring-offset-0 w-4 h-4"
              />
              <span>In-Stock Ready to Ship</span>
            </label>

            {/* Price Cap Slider */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Max Price:</span>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 sm:w-32 accent-blue-500 cursor-pointer"
              />
              <span className="font-mono text-white font-semibold tabular-nums">
                ${maxPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Reset Filters button */}
          <button
            onClick={handleResetFilters}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <strong className="text-white font-mono tabular-nums">{filteredProducts.length}</strong> of{' '}
          <strong className="text-white font-mono tabular-nums">{products.length}</strong> Acoustic Systems
        </div>

        {selectedCategory !== 'All' && (
          <div className="text-blue-400">
            Filtered by: <strong>{selectedCategory}</strong>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4 p-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white">No Acoustic Systems Match Your Search</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms, broadening the category filter, or raising the price ceiling.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
