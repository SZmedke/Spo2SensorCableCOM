import React from 'react';

export default function EsuOrSupplies({ orSupplies, onPrefill, onOpenLightbox }) {
  return (
    <section id="turnkey-supply" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-9">
          <span className="text-xs font-bold tracking-wider uppercase text-medkeBlue">
            Consolidated B2B ordering
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-2">
            Operating Room Consumables — Complementary Supply
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Consolidate routine OR accessories with your grounding-pad or cable shipment. Flexible MOQ, one PO for inspection and documentation, and fewer split international shipments for distributor replenishment orders.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {orSupplies.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <button
                  type="button"
                  onClick={() => onOpenLightbox(item.imgSrc, item.title)}
                  className="w-full h-48 bg-white border border-slate-200 rounded-xl overflow-hidden cursor-zoom-in relative block"
                  aria-label={`Enlarge ${item.title}`}
                >
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="w-full h-full object-contain photo-zoom transition-transform duration-350 hover:scale-105"
                    loading="lazy"
                  />
                </button>

                <span className="text-xs font-bold text-slate-500 uppercase mt-4 block">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold text-medkeNavy mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onPrefill('Complementary OR Supply', item.prefillItem)}
                className="mt-5 text-sm font-bold text-medkeBlue hover:text-medkeBlueHover text-left flex items-center gap-1 cursor-pointer transition-colors"
              >
                Add to RFQ →
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
