import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#06080F] text-slate-400 text-sm">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs sm:text-sm">Complimentary Freight</div>
              <div className="text-xs text-slate-400">Insured express delivery over $250</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs sm:text-sm">5-Year Master Warranty</div>
              <div className="text-xs text-slate-400">Full acoustic driver & amplifier coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 text-blue-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs sm:text-sm">60-Day Home Trial</div>
              <div className="text-xs text-slate-400">Experience in your own listening room</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 text-blue-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs sm:text-sm">Acoustic Concierge</div>
              <div className="text-xs text-slate-400">Direct support from sound engineers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="font-['Space_Grotesk'] text-lg font-bold tracking-tight text-white">
            AURA ACOUSTICS
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Architects of uncompromised sound. We engineer audiophile loudspeakers, home theatre transducers, and portable reference systems with zero artificial coloration.
          </p>
          <div className="pt-2 text-xs text-slate-500">
            Acoustic Research Lab & Atelier · San Francisco, CA
          </div>
        </div>

        <div>
          <div className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Sound Systems</div>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-blue-400 transition-colors">
                Floorstanding Towers
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-blue-400 transition-colors">
                Studio Monitors
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-blue-400 transition-colors">
                Dolby Atmos Soundbars
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-blue-400 transition-colors">
                Subwoofers & Bass
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-blue-400 transition-colors">
                Tactical Portables
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Atelier & Brand</div>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors">
                Acoustic Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors">
                Anechoic Chamber
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors">
                Engineering Team
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-blue-400 transition-colors">
                Custom Installation
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="text-slate-500 hover:text-blue-400 transition-colors">
                Admin Console
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Support & Legal</div>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-blue-400 transition-colors">
                Contact Acoustic Care
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="hover:text-blue-400 transition-colors">
                Order Tracking
              </button>
            </li>
            <li>
              <span className="text-slate-500">Shipping Policy</span>
            </li>
            <li>
              <span className="text-slate-500">Warranty Registration</span>
            </li>
            <li>
              <span className="text-slate-500">Privacy & Terms</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} AURA ACOUSTICS Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>High-Fidelity Audio Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Dolby Atmos® Certified Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
