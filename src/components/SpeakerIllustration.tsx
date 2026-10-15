import React from 'react';

interface SpeakerIllustrationProps {
  category: string;
  name: string;
  className?: string;
  badge?: string;
  isHovered?: boolean;
}

export const SpeakerIllustration: React.FC<SpeakerIllustrationProps> = ({
  category,
  name,
  className = '',
  badge,
  isHovered = false
}) => {
  const isFloorstanding = name.toLowerCase().includes('zenith') || name.toLowerCase().includes('grand stage');
  const isSubwoofer = name.toLowerCase().includes('sub') || name.toLowerCase().includes('carbon');
  const isSoundbar = name.toLowerCase().includes('cinemasphere') || name.toLowerCase().includes('soundbar') || name.toLowerCase().includes('horizon');
  const isPortable = category === 'Portable' || name.toLowerCase().includes('nomad') || name.toLowerCase().includes('pebble') || name.toLowerCase().includes('trekker');
  const isSmart = category === 'Smart Speaker' || name.toLowerCase().includes('pulse') || name.toLowerCase().includes('orbit');

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c1220] via-[#090d18] to-[#06080f] select-none ${className}`}>
      {/* Background acoustic grid pattern */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Subtle electric blue ambient glow */}
      <div
        className={`absolute rounded-full filter blur-3xl transition-all duration-700 pointer-events-none ${
          isHovered
            ? 'w-48 h-48 bg-blue-500/25 scale-125'
            : 'w-36 h-36 bg-blue-600/15 scale-100'
        }`}
      />

      {/* Category Specific Acoustic Hardware SVG Renderings */}
      {isFloorstanding ? (
        // Flagship Floorstanding Architectural Tower
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="towerBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a2233" />
              <stop offset="30%" stopColor="#111723" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0b0f19" />
            </linearGradient>
            <linearGradient id="coneGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="carbonCone">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>

          {/* Tower Base Plinth */}
          <rect x="52" y="218" width="96" height="12" rx="2" fill="#0b101c" stroke="#1e293b" strokeWidth="1" />
          <line x1="60" y1="230" x2="60" y2="236" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="230" x2="140" y2="236" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

          {/* Main Tower Cabinet */}
          <path d="M 64 25 L 136 25 L 142 218 L 58 218 Z" fill="url(#towerBody)" stroke="#334155" strokeWidth="1.2" />

          {/* Beveled Side Chamfers */}
          <path d="M 64 25 L 72 32 L 68 218 L 58 218 Z" fill="#0d131f" opacity="0.8" />
          <path d="M 136 25 L 128 32 L 132 218 L 142 218 Z" fill="#2d3748" opacity="0.3" />

          {/* Tweeter (Beryllium dome with wave guide) */}
          <circle cx="100" cy="55" r="16" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <circle cx="100" cy="55" r="10" fill="#070a11" />
          <circle cx="100" cy="55" r="5" fill="#38bdf8" opacity={isHovered ? '0.9' : '0.6'} />

          {/* Ceramic Midrange */}
          <circle cx="100" cy="98" r="22" fill="#0f172a" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="100" cy="98" r="18" fill="url(#carbonCone)" />
          <circle cx="100" cy="98" r="7" fill="#090d16" stroke="#60a5fa" strokeWidth="0.8" />

          {/* Dual 8" Bass Woofers */}
          <circle cx="100" cy="148" r="28" fill="#0b0f19" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="100" cy="148" r="24" fill="url(#carbonCone)" />
          <circle cx="100" cy="148" r="10" fill="#050811" stroke="#3b82f6" strokeWidth="1" />
          {isHovered && <circle cx="100" cy="148" r="24" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" />}

          <circle cx="100" cy="195" r="18" fill="#0b0f19" stroke="#1e293b" strokeWidth="1.2" />
          <circle cx="100" cy="195" r="14" fill="url(#carbonCone)" />
          <circle cx="100" cy="195" r="6" fill="#050811" stroke="#3b82f6" strokeWidth="1" />

          {/* Acoustic Halo Accent */}
          <line x1="72" y1="214" x2="128" y2="214" stroke="#3b82f6" strokeWidth="1.5" opacity={isHovered ? '1' : '0.6'} />
        </svg>
      ) : isSoundbar ? (
        // CinemaSphere / Horizon Soundbar System
        <svg viewBox="0 0 240 180" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a3447" />
              <stop offset="50%" stopColor="#141c2c" />
              <stop offset="100%" stopColor="#0a0e17" />
            </linearGradient>
            <linearGradient id="subGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0b0f19" />
            </linearGradient>
          </defs>

          {/* Companion Subwoofer in background */}
          <rect x="145" y="42" width="70" height="90" rx="6" fill="url(#subGradient)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="180" cy="87" r="28" fill="#080c14" stroke="#2563eb" strokeWidth="1" />
          <circle cx="180" cy="87" r="22" fill="#111827" stroke="#1e293b" strokeWidth="1" />
          <circle cx="180" cy="87" r="9" fill="#030712" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
          <rect x="155" y="124" width="50" height="4" rx="2" fill="#3b82f6" opacity={isHovered ? '0.9' : '0.5'} />

          {/* Main Soundbar Chassis Foreground */}
          <rect x="18" y="102" width="204" height="38" rx="6" fill="url(#barGradient)" stroke="#475569" strokeWidth="1.2" />

          {/* Acoustic Micro-Mesh Grille lines */}
          <line x1="28" y1="121" x2="212" y2="121" stroke="#334155" strokeWidth="18" strokeDasharray="2 3" opacity="0.5" />

          {/* Center LED Display & Up-firing elevation caps */}
          <rect x="105" y="116" width="30" height="10" rx="3" fill="#080e1a" stroke="#1d4ed8" strokeWidth="0.8" />
          <text x="120" y="124" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle">ATMOS</text>

          {/* Up-firing height transducers */}
          <ellipse cx="50" cy="104" rx="14" ry="4" fill="#090e17" stroke="#3b82f6" strokeWidth="1" opacity={isHovered ? '1' : '0.5'} />
          <ellipse cx="190" cy="104" rx="14" ry="4" fill="#090e17" stroke="#3b82f6" strokeWidth="1" opacity={isHovered ? '1' : '0.5'} />

          {/* Ambient Downlight glow */}
          <ellipse cx="120" cy="142" rx="90" ry="4" fill="#2563eb" opacity={isHovered ? '0.4' : '0.2'} />
        </svg>
      ) : isSubwoofer ? (
        // High-Excursion Powered Subwoofer
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="subCabinet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#080c14" />
            </linearGradient>
          </defs>

          {/* Cabinet Cube */}
          <rect x="36" y="30" width="128" height="136" rx="8" fill="url(#subCabinet)" stroke="#334155" strokeWidth="1.5" />

          {/* Massive 12" Carbon Driver */}
          <circle cx="100" cy="98" r="52" fill="#070b13" stroke="#1e293b" strokeWidth="3" />
          <circle cx="100" cy="98" r="44" fill="#0f172a" stroke="#2563eb" strokeWidth="1.2" strokeOpacity={isHovered ? '0.9' : '0.5'} />
          <circle cx="100" cy="98" r="34" fill="#080d16" />
          <circle cx="100" cy="98" r="16" fill="#04070e" stroke="#38bdf8" strokeWidth="1" />

          {/* Rubberized Inverted Surround */}
          <circle cx="100" cy="98" r="48" fill="none" stroke="#1f2937" strokeWidth="4" />

          {/* Power Status & Tuning Indicator */}
          <circle cx="100" cy="154" r="3" fill="#3b82f6" />
          {isHovered && (
            <circle cx="100" cy="154" r="6" fill="none" stroke="#60a5fa" strokeWidth="1" className="animate-ping" />
          )}

          {/* Isolating Feet */}
          <rect x="46" y="166" width="16" height="8" rx="2" fill="#0f172a" stroke="#334155" />
          <rect x="138" y="166" width="16" height="8" rx="2" fill="#0f172a" stroke="#334155" />
        </svg>
      ) : isPortable ? (
        // Tactical Outdoor / Portable Rugged Speaker
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="nomadBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="30%" stopColor="#0f172a" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0a0f1d" />
            </linearGradient>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Carabiner & Carry Lanyard */}
          <path d="M 40 50 Q 55 18 100 20 Q 145 18 160 50" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          <rect x="92" y="14" width="16" height="10" rx="3" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />

          {/* Rugged Cylindrical Body */}
          <rect x="52" y="44" width="96" height="124" rx="26" fill="url(#nomadBody)" stroke="#334155" strokeWidth="1.5" />

          {/* Tactile Ballistic Mesh Pattern */}
          <rect x="62" y="58" width="76" height="96" rx="14" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <line x1="68" y1="72" x2="132" y2="72" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="68" y1="88" x2="132" y2="88" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="68" y1="104" x2="132" y2="104" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="68" y1="120" x2="132" y2="120" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="68" y1="136" x2="132" y2="136" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />

          {/* Central Logo / Pulse Ring */}
          <circle cx="100" cy="106" r="18" fill="#050811" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="100" cy="106" r="10" fill="#0b1329" stroke="#60a5fa" strokeWidth="1" />
          <path d="M 96 101 L 106 106 L 96 111 Z" fill="#38bdf8" opacity="0.9" />

          {/* Top & Bottom CNC Aluminum Shock Absorbers */}
          <ellipse cx="100" cy="46" rx="36" ry="7" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <ellipse cx="100" cy="166" rx="36" ry="7" fill="#1e293b" stroke="#475569" strokeWidth="1" />

          {/* Passive Bass Radiator Ring Pulsing */}
          {isHovered && (
            <ellipse cx="100" cy="166" rx="42" ry="9" fill="none" stroke="#3b82f6" strokeWidth="1.2" opacity="0.8" />
          )}
        </svg>
      ) : isSmart ? (
        // Smart Sphere / Multi-Room Acoustic Node
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <radialGradient id="sphereGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#2c3a58" />
              <stop offset="45%" stopColor="#141c2c" />
              <stop offset="90%" stopColor="#080c14" />
              <stop offset="100%" stopColor="#04060a" />
            </radialGradient>
          </defs>

          {/* Floating Base Ring */}
          <ellipse cx="100" cy="160" rx="38" ry="8" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          <line x1="72" y1="160" x2="128" y2="160" stroke="#3b82f6" strokeWidth="1.5" opacity={isHovered ? '1' : '0.5'} />

          {/* Acoustic Sphere Body */}
          <circle cx="100" cy="100" r="62" fill="url(#sphereGrad)" stroke="#334155" strokeWidth="1.2" />

          {/* Top Capacitive Touch Glass Dial */}
          <ellipse cx="100" cy="50" rx="28" ry="10" fill="#0a0f1d" stroke="#3b82f6" strokeWidth="1" />
          <ellipse cx="100" cy="50" rx="16" ry="5" fill="#0f172a" />
          <circle cx="100" cy="50" r="2.5" fill="#60a5fa" />

          {/* 360-degree Micro-perforated Acoustic Waveband */}
          <path d="M 40 102 Q 100 120 160 102" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.6" />
          <path d="M 44 112 Q 100 130 156 112" fill="none" stroke="#1d4ed8" strokeWidth="1" opacity="0.4" />

          {/* Wave Ripple on Hover */}
          {isHovered && (
            <circle cx="100" cy="100" r="70" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" className="animate-pulse" />
          )}
        </svg>
      ) : (
        // Active Studio Monitor Pair / Bookshelf Speaker
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="monitorBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
            <radialGradient id="kevlarYellow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="70%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>

          {/* Main Monitor Cabinet */}
          <rect x="44" y="24" width="112" height="152" rx="10" fill="url(#monitorBody)" stroke="#334155" strokeWidth="1.4" />

          {/* Front Baffle Chamfer */}
          <rect x="52" y="32" width="96" height="136" rx="6" fill="#090d16" stroke="#1e293b" strokeWidth="1" />

          {/* High-frequency Waveguide & Silk Dome */}
          <ellipse cx="100" cy="62" rx="20" ry="16" fill="#0d1422" stroke="#334155" strokeWidth="1" />
          <circle cx="100" cy="62" r="8" fill="#050811" stroke="#38bdf8" strokeWidth="1" opacity={isHovered ? '0.9' : '0.6'} />

          {/* 5.25" Active Woofer */}
          <circle cx="100" cy="116" r="32" fill="#070b12" stroke="#1e293b" strokeWidth="2" />
          <circle cx="100" cy="116" r="26" fill="url(#kevlarYellow)" stroke="#3b82f6" strokeWidth="1" opacity={isHovered ? '0.95' : '0.75'} />
          <circle cx="100" cy="116" r="10" fill="#070a12" stroke="#93c5fd" strokeWidth="0.8" />

          {/* Front Bass Reflex Port Slot */}
          <rect x="74" y="152" width="52" height="6" rx="3" fill="#04060a" stroke="#1e293b" strokeWidth="0.8" />

          {/* Active Power LED */}
          <circle cx="58" cy="155" r="2" fill="#3b82f6" />
        </svg>
      )}

      {/* Subtle bottom gradient shadow */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#070a12] to-transparent pointer-events-none" />

      {/* Subtle Corner Badge if provided */}
      {badge && (
        <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-blue-300 bg-blue-950/60 border border-blue-800/40 rounded px-2 py-0.5 pointer-events-none">
          {badge}
        </div>
      )}
    </div>
  );
};
