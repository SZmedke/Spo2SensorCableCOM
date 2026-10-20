import React from 'react';

export default function TempFourPillars({ pillars, onSelectPillar }) {
  return (
    <section id="four-pillars" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest uppercase text-medkeBlue block mb-2">
            FOUR CORE PRODUCT PILLARS · CLINICAL TEMPERATURE MONITORING MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight">
            Comprehensive Medical Temperature SENSING for Every Department
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            From continuous core thermometry in surgery and intensive care to neonatal radiant warmers and rapid ward vitals, Medke delivers certified 1:1 OEM-equivalent solutions.
          </p>
        </div>

        {/* 4 Pillars Grid: Single Row 4-Columns in Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-medkeBlue/50 transition duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex flex-col items-start gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full ${pillar.tagColor} text-xs font-bold uppercase tracking-wider`}>
                    {pillar.tag}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${pillar.fdaBadgeColor}`}>
                    {pillar.fdaBadge}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-medkeNavy mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Product Image Container */}
                <div className="h-40 w-full rounded-2xl bg-white border border-slate-200 overflow-hidden mb-5 flex items-center justify-center p-2 relative group">
                  <img
                    src={pillar.imgSrc}
                    alt={pillar.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/70 text-white text-[10px] font-mono">
                    {pillar.label}
                  </span>
                </div>

                {/* Key Specifications Bullet List */}
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  {pillar.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-medkeBlue font-bold mt-0.5">&bull;</span>
                      <span><strong>{spec.label}</strong>: {spec.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col items-stretch gap-3">
                <span className="text-xs font-mono text-slate-500">{pillar.moq}</span>
                <button
                  type="button"
                  onClick={() => onSelectPillar(pillar.productLineName)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-medkeNavy hover:bg-medkeNavyHover text-white text-xs font-bold transition cursor-pointer"
                >
                  <span>{pillar.ctaText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
