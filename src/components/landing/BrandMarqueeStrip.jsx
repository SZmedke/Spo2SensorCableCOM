import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BrandMarqueeStrip({ brands, guarantee }) {
  return (
    <section className="bg-white border-y border-slate-200/80 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Global OEM System Compatibility</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            100% Precision-Engineered to Match Top Monitor Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Direct replacement sensors and cables meeting OEM electrical, mechanical, and clinical parameters.
          </p>
        </div>

        {/* Single-Row Horizontal Brand Capsules */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-200">
          {brands.map((b) => (
            <div
              key={b.id}
              className="flex-shrink-0 w-36 sm:w-44 p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400/80 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group cursor-default"
            >
              {/* Upper Logo Image Container */}
              <div className="h-9 sm:h-10 w-full flex items-center justify-center p-1 bg-white rounded-lg border border-slate-100 mb-2">
                <img
                  src={b.logo}
                  alt={`${b.name} Compatible`}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>

              {/* Middle Bold Brand Title */}
              <div className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide group-hover:text-blue-600 transition-colors">
                {b.name}
              </div>

              {/* Lower Compatible Series Label */}
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium">
                {b.series}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Guarantee Assurance Bar */}
        {guarantee && guarantee.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            {guarantee.map((text, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
