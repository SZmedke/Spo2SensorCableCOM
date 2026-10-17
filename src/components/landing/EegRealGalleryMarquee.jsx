import React from 'react';
import { eegLandingData } from '../../data/landing/eeg-data';

export default function EegRealGalleryMarquee({ onPrefillModel }) {
  const { realGallery } = eegLandingData;
  // Duplicate for seamless 0% to -50% continuous infinite loop
  const marqueeItems = [...realGallery, ...realGallery];

  return (
    <section id="real-gallery" className="py-14 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-block px-3 py-1 bg-[#E8EBF7] text-[#243181] font-bold text-xs uppercase tracking-wider rounded mb-2">
          Authentic Manufacturing Archive
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243181] tracking-tight">
          Real Production Photo Gallery &amp; Finish Details
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Genuine high-resolution cleanroom studio photography of Medke's complete 10-model EEG cable and electrode portfolio, verified under ISO 13485:2016 quality standards. Hover to pause carousel.
        </p>
      </div>

      {/* Infinite Carousel Outer Mask Container */}
      <div className="mask-fade-edges overflow-hidden py-4">
        <div className="animate-marquee flex items-center gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-72 sm:w-80 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm p-3 shrink-0 group hover:shadow-md transition"
            >
              <div className="h-52 w-full rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-bold uppercase ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h4 className="text-xs font-bold text-[#243181] truncate max-w-[180px] sm:max-w-[200px]">
                    {item.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => onPrefillModel && onPrefillModel(item.quoteModel, item.prefillBrand)}
                  className="px-2.5 py-1 rounded bg-[#0047FF]/10 hover:bg-[#0047FF] hover:text-white text-[#0047FF] text-[11px] font-bold transition cursor-pointer shrink-0"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
