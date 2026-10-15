import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AedBrandMarquee({ brands, guarantee }) {
  // Double list to create seamless infinite marquee loop
  const marqueeList = [...brands, ...brands];

  return (
    <section className="bg-white border-y border-slate-200/80 py-10 sm:py-12 overflow-hidden">
      <style>{`
        @keyframes aedMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex !important;
          width: max-content !important;
          animation: aedMarquee 35s linear infinite !important;
        }
        .animate-marquee:hover {
          animation-play-state: paused !important;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-medkeBlue text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Multi-Brand Defibrillator Compatibility</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-medkeNavy tracking-tight">
            100% Compatible with World's Leading Defibrillator Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Direct replacement electrode pads &amp; adapter cables precision-molded for OEM clinical accuracy.
          </p>
        </div>

        {/* Continuous Single-Row CSS Infinite Marquee Strip (Uncropped Machine + Logo) */}
        <div className="relative w-full overflow-hidden mask-fade-edges py-2">
          <div className="animate-marquee flex items-center gap-4 sm:gap-6">
            {marqueeList.map((b, idx) => (
              <div
                key={`${b.id}-${idx}`}
                className="inline-flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-medkeBlue hover:shadow-lg transition duration-200 shrink-0 group w-[220px] sm:w-[250px] cursor-default"
              >
                {/* Full Uncropped Machine + Logo Combination Banner */}
                <div className="w-full h-24 sm:h-28 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                  <img
                    src={b.logo}
                    alt={`${b.name} Compatible Defibrillator & Electrode Pads`}
                    className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name & Compatible Machine Series */}
                <div className="mt-2 text-center w-full border-t border-slate-100 pt-1.5">
                  <span className="block text-xs font-extrabold text-slate-800 uppercase tracking-tight group-hover:text-medkeBlue transition-colors">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap block mt-0.5">
                    {b.series}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Guarantee Assurance Bar */}
        {guarantee && guarantee.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            {guarantee.map((text, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-medkeBlue shrink-0" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
