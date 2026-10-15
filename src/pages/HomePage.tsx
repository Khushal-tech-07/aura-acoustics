import React, { useState, useEffect } from 'react';
import { Product, PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SpeakerIllustration } from '../components/SpeakerIllustration';
import { ArrowRight, Volume2, ShieldCheck, Cpu, Sparkles, Check, Play, Pause } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, onSelectProduct, onNavigate }) => {
  const { addToCart } = useCart();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isPlayingAudioDemo, setIsPlayingAudioDemo] = useState(false);
  const [audioProfile, setAudioProfile] = useState<'bass' | 'vocals' | 'spatial' | 'studio'>('spatial');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // 2 Hero Slides featuring Flagship Systems
  const heroProducts = products.filter((p) => p.featured).slice(0, 2);
  const currentHero = heroProducts[activeHeroSlide] || products[0];

  // Auto rotate hero slide every 7 seconds if not manually paused
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroProducts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please provide a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const msg = await api.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterMessage(msg || 'Subscribed successfully!');
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterStatus('error');
      setNewsletterMessage(err.message || 'Subscription failed. Please try again.');
    }
  };

  const featuredList = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION WITH BANNER/SLIDER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#090E1A] via-[#070A12] to-[#05070D] border-b border-slate-800/80 pt-8 pb-16 sm:py-20">
        {/* Ambient background light grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
                <span>Acoustic Precision 2026 Collection</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Flagship Reference Hardware</span>
              </div>

              {/* Headline with balanced wrap */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-['Space_Grotesk'] text-balance">
                Sound as the artist sculpted it. Pure. Visceral. Uncolored.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Precision-milled aerospace aluminum enclosures, pure beryllium dome drivers, and proprietary lossless DSP. AURA systems deliver spatial realism with zero acoustic distortion.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
                >
                  <span>Explore All Speakers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {currentHero && (
                  <button
                    onClick={() => onSelectProduct(currentHero.id)}
                    className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors"
                  >
                    View Spotlight: {currentHero.name.split(' ')[1] || 'Zenith'}
                  </button>
                )}
              </div>

              {/* Key Specs Bar for Spotlight */}
              {currentHero && (
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
                  <div>
                    <div className="text-[11px] text-slate-400">Power Rating</div>
                    <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                      {currentHero.specifications.wattage.split(' ')[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Acoustic Range</div>
                    <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                      {currentHero.specifications.frequencyResponse.split(' ')[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Priced From</div>
                    <div className="text-xs sm:text-sm font-semibold text-blue-400 font-mono mt-0.5 tabular-nums">
                      ${currentHero.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Hero Spotlight Visual Showcase & Slider */}
            <div className="lg:col-span-5 relative">
              {currentHero && (
                <div
                  onClick={() => onSelectProduct(currentHero.id)}
                  className="group cursor-pointer relative rounded-2xl bg-[#0B101D] border border-slate-800 hover:border-blue-500/60 transition-all duration-300 p-4 shadow-2xl shadow-black/80"
                >
                  {/* Spotlight Image/SVG Canvas */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#070A12] border border-slate-800/70">
                    <SpeakerIllustration
                      category={currentHero.category}
                      name={currentHero.name}
                      badge={currentHero.badge || 'Acoustic Spotlight'}
                      isHovered={true}
                    />

                    {/* Floating pill-free price tag */}
                    <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-baseline gap-2 shadow-lg">
                      <span className="text-xs text-slate-400">Reference:</span>
                      <span className="text-sm font-bold text-white font-mono tabular-nums">
                        ${currentHero.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Spotlight Caption */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-blue-400 uppercase font-semibold tracking-wider">
                        {currentHero.category}
                      </div>
                      <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {currentHero.name}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(currentHero, 1);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              )}

              {/* Slider Dots */}
              {heroProducts.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveHeroSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeHeroSlide === idx ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SOUND SIMULATOR / ACOUSTIC LAB PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0C1222] via-[#0B0F19] to-[#0A0D17] border border-slate-800 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>Interactive Acoustic Frequency Tester</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk']">
                Experience Acoustic Dispersion
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Toggle frequency bands below to simulate how AURA's custom beryllium tweeters and dual carbon subwoofers handle complex spatial layers.
              </p>

              {/* Frequency Band Selector (interactive button controls) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { id: 'spatial', label: '3D Spatial Atmos', note: 'Surround sound staging' },
                  { id: 'bass', label: 'Subterranean Bass (24Hz)', note: 'Dual carbon woofers' },
                  { id: 'vocals', label: 'Vocal Presence (1kHz)', note: 'Pure ceramic midrange' },
                  { id: 'studio', label: 'Studio Flat Master', note: 'Reference monitoring' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAudioProfile(item.id as any);
                      setIsPlayingAudioDemo(true);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      audioProfile === item.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-100">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Equalizer / Soundwave Waveform */}
            <div className="lg:col-span-7 bg-[#070A12] border border-slate-800 rounded-xl p-6 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isPlayingAudioDemo ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="text-xs font-mono text-slate-300">
                    Active DSP Profile: <strong className="text-blue-400 uppercase">{audioProfile}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingAudioDemo(!isPlayingAudioDemo)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  {isPlayingAudioDemo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudioDemo ? 'Pause Wave' : 'Engage DSP'}</span>
                </button>
              </div>

              {/* Animated Equalizer bars */}
              <div className="py-6 flex items-end justify-between gap-1.5 h-28">
                {[
                  35, 60, 85, 95, 80, 50, 40, 65, 90, 75, 55, 45, 70, 88, 62, 50, 78, 92, 40, 65, 80, 60, 45, 85,
                  70, 50, 60, 75
                ].map((val, idx) => {
                  let multiplier = 1;
                  if (audioProfile === 'bass' && idx < 10) multiplier = 1.6;
                  if (audioProfile === 'vocals' && idx >= 8 && idx <= 18) multiplier = 1.5;
                  if (audioProfile === 'spatial') multiplier = 1.2 + Math.sin(idx) * 0.3;
                  const finalHeight = isPlayingAudioDemo
                    ? Math.min(100, Math.max(15, val * multiplier * (0.8 + (idx % 3) * 0.15)))
                    : 20;

                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-blue-700 via-blue-500 to-sky-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${finalHeight}%` }}
                    />
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                <span>20Hz (Sub-Bass)</span>
                <span>1kHz (Vocal Presence)</span>
                <span>20kHz (Ultra-High Harmonics)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Curated Selection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
              Featured Speaker Systems
            </h2>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>View All ({products.length}) Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. BRAND HIGHLIGHTS / WHY CHOOSE US */}
      <section className="bg-[#080C16] border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Acoustic Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              Why Audiophiles Choose AURA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every curve, driver suspension, and circuit trace is engineered to preserve musical emotion with surgical fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Pure Beryllium Domes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seven times stiffer than titanium with three times the velocity of sound, extending flat harmonic response past 42kHz without harsh breakup.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Lossless 32-Bit DSP
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proprietary digital crossover filters align phase at the microsecond level so every acoustic instrument arrives at your ears simultaneously.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Anechoic Chamber Tested
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every production unit is frequency-swept inside our reference chamber. Each speaker ships with its individually serialized calibration graph.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                CNC Aluminum Monocoque
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rigid solid-billet chassis eliminates sympathetic cabinet vibrations, converting 100% of amplifier energy into pure acoustic pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUDIOPHILE TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Professional Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            Mastering Engineers & Press
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The Zenith Reference 9 reveals transient textures in orchestral strings that had previously only appeared on our $20,000 reference monitors."
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white">David Kelling</div>
              <div className="text-[11px] text-slate-400">Mastering Engineer, Sunset Sound Lab</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The CinemaSphere 7.1.4 Dolby Atmos system created a height dome in our living room that genuinely rivaled our premier commercial multiplex."
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white">Sarah Lin</div>
              <div className="text-[11px] text-slate-400">Senior Audio Editor, High-Res Audio Journal</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "Nomad Pro Explorer survived a four-day torrential river kayak trip without skipping a single beat. Visceral bass from an indestructible cylinder."
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white">Marcus Vance</div>
              <div className="text-[11px] text-slate-400">Field Recordist & Sound Designer</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER SIGNUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B101D] to-[#080C14] border border-blue-900/40 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Volume2 className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
              Join the Acoustic Inner Circle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Receive private invitations to limited engineering batch runs, custom master calibrations, and direct-from-lab firmware updates.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shadow-md shadow-blue-900/30"
              >
                {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </div>

            {newsletterMessage && (
              <div
                className={`text-xs ${
                  newsletterStatus === 'success' ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {newsletterMessage}
              </div>
            )}
          </form>

          <div className="text-[11px] text-slate-500">
            Strict no-spam policy. Unsubscribe anytime with 1-click.
          </div>
        </div>
      </section>
    </div>
  );
};
