import React from 'react';
import { eegLandingData } from '../../data/landing/eeg-data';

export default function EegProductSection({ onPrefillModel }) {
  const { products } = eegLandingData;

  return (
    <section id="products-grid" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-[#E8EBF7] text-[#243181] font-bold text-xs uppercase tracking-wider rounded mb-2">
            Balanced 3 &times; 2 Physical Line Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#243181] tracking-tight">
            Medke Clinical EEG Electrodes &amp; Leadwire Portfolio
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Six standardized medical-grade product categories strictly verified against Medke corporate specifications (MEDKE-KB-PROD-EEG-001). 100% physically and electrically compatible with global standard 1.5mm DIN 42802 headboxes.
          </p>
        </div>

        {/* 3x2 Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#0047FF]/40 transition duration-300 overflow-hidden group"
            >
              <div>
                {/* Product Image Area */}
                <div className="h-52 w-full bg-slate-50/80 border-b border-slate-100 flex items-center justify-center p-3 relative group-hover:bg-blue-50/20 transition-colors">
                  {prod.dualImages ? (
                    <div className="grid grid-cols-2 gap-2 w-full h-full items-center justify-center">
                      <div className="h-full flex flex-col items-center justify-center p-1 border-r border-slate-200">
                        <img
                          src={prod.dualImages.optionA.src}
                          alt={prod.dualImages.optionA.alt}
                          className="max-h-36 max-w-full object-contain group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                        <span className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${prod.dualImages.optionA.tagClass}`}>
                          {prod.dualImages.optionA.tag}
                        </span>
                      </div>
                      <div className="h-full flex flex-col items-center justify-center p-1">
                        <img
                          src={prod.dualImages.optionB.src}
                          alt={prod.dualImages.optionB.alt}
                          className="max-h-36 max-w-full object-contain group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                        <span className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${prod.dualImages.optionB.tagClass}`}>
                          {prod.dualImages.optionB.tag}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  )}

                  {prod.badgeTopLeft && (
                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-white font-bold text-[11px] shadow-xs ${prod.badgeTopColor || 'bg-blue-600'}`}>
                      {prod.badgeTopLeft}
                    </span>
                  )}
                  {prod.badgeBottomRight && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/95 text-slate-700 text-[11px] font-mono border border-slate-200">
                      {prod.badgeBottomRight}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-600 uppercase tracking-wider">
                      {prod.modelTag}
                    </span>
                    {prod.statRight && (
                      <span className={`font-semibold ${prod.statRightColor || 'text-emerald-600'}`}>
                        {prod.statRight}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#243181] mt-1">{prod.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Styles or Advantages Box */}
                  {prod.stylesBox && (
                    <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <div className="font-bold text-slate-700 text-[11px]">
                        {prod.stylesBox.title}
                      </div>
                      {prod.stylesBox.items.map((item, i) => (
                        <div key={i} className="text-slate-600 flex items-center gap-1.5 text-[11px]">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`}></span>
                          <span><strong>{item.label}</strong>: {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dual Options Box for Snap & Pinch */}
                  {prod.dualOptionsBox && (
                    <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                      {prod.dualOptionsBox.map((opt, i) => (
                        <div key={i} className={i > 0 ? 'pt-1.5 border-t border-slate-200/60' : ''}>
                          <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${opt.dot}`}></span>
                            <span>{opt.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 pl-3">
                            {opt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Specs */}
                  {prod.specs && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                      {prod.specs.map((spec, i) => (
                        <div key={i}>&bull; {spec}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Inquire CTA */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onPrefillModel && onPrefillModel(prod.queryModel)}
                  className="w-full py-2.5 rounded-xl bg-[#E8EBF7] hover:bg-[#0047FF] hover:text-white text-[#243181] text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {prod.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
