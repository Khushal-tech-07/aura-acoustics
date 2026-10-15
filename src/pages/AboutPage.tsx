import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, Compass, Award, Activity, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const team = [
    {
      name: 'Dr. Henrik Lindqvist',
      role: 'Chief Acoustic Architect',
      bio: 'Former lead researcher at Technical University of Denmark. Henrik holds 14 international patents in planar acoustic dispersion and non-resonant cabinet bracing.'
    },
    {
      name: 'Aria Chen',
      role: 'Head of Industrial Design',
      bio: 'Alumna of Royal College of Art, Aria transforms psychoacoustic necessities into sculptural obsidian geometries that elevate architectural spaces.'
    },
    {
      name: 'Marcus Vane',
      role: 'Principal DSP & Crossover Engineer',
      bio: 'Veteran mastering engineer with two decades in London recording studios. Marcus calibrates our 32-bit floating point phase-alignment matrix.'
    },
    {
      name: 'Elena Rostova',
      role: 'Director of Acoustic Quality & Metrology',
      bio: 'Oversees our full-space anechoic test chamber in San Francisco. Every transducer is individually swept and serialized under Elena’s supervision.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. Hero Brand Narrative */}
      <section className="max-w-3xl space-y-6 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>The Atelier</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Founded in 2018</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Space_Grotesk']">
          The Pursuit of Absolute Acoustic Purity
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          AURA ACOUSTICS was founded with a singular conviction: sound should never be synthesized, boosted, or artificially hyped. True luxury audio is an act of transparent transmission — delivering the exact atmospheric decay, vocal breath, and dynamic impact that occurred in the live acoustic hall.
        </p>
      </section>

      {/* 2. Mission & Vision Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            To build heirloom-grade acoustic transducers that bridge the precision of master recording studios and the sanctuary of contemporary residential architecture.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            A world where music lovers experience every nuanced frequency without compromise, listening fatigue, or aesthetic obsolescence.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Acoustic Integrity</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We reject plastic enclosures and hollow claims. From pure beryllium domes to monolithic aluminum plinths, our materials serve sound above all.
          </p>
        </div>
      </section>

      {/* 3. The Sound Lab & Anechoic Chamber Story */}
      <section className="rounded-2xl bg-gradient-to-r from-[#0C1222] via-[#090D18] to-[#070A12] border border-slate-800 p-8 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Engineering Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
            The San Francisco Metrology Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Inside our 40-foot full-space anechoic chamber, fiberglass acoustic wedges absorb 99.9% of sound reflections. Here, free from wall echoes and ambient city noise, our engineering team measures harmonic distortion down to fractions of a decibel.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Before an AURA loudspeaker is crated for delivery, it undergoes a mandatory 48-hour mechanical burn-in and a computerized frequency-sweep comparison against our golden reference curve.
          </p>
        </div>
      </section>

      {/* 4. Acoustic Team */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            The Architects
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            Acoustic Engineering Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-blue-400 font-mono text-sm font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  {member.name}
                </h3>
                <div className="text-xs text-blue-400 font-medium mt-0.5">{member.role}</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Footer */}
      <section className="p-8 rounded-2xl bg-[#080C16] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
            Experience Our Acoustic Flagships
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Discover the 2026 Reference Collection or consult our sound architects.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            Speak with an Engineer
          </button>
        </div>
      </section>
    </div>
  );
};
