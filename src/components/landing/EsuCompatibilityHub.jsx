import React, { useState } from 'react';

export default function EsuCompatibilityHub({ compatibilityData, onInquire }) {
  const brandKeys = Object.keys(compatibilityData);
  const [activeBrand, setActiveBrand] = useState(brandKeys[0] || 'Valleylab / Covidien');
  const [activeNeedIndex, setActiveNeedIndex] = useState(0);

  const brandItems = compatibilityData[activeBrand] || [];
  const currentItem = brandItems[activeNeedIndex] || brandItems[0] || {
    sku: 'CPD316',
    title: 'Universal Euro Bipolar Cable',
    generator: '2 × 4.0 mm banana bipolar output',
    instrument: 'Euro 2-pin flat forceps socket',
    length: '3.0 m',
    useClass: 'Reusable · 134°C'
  };

  const handleSelectBrand = (brand) => {
    setActiveBrand(brand);
    setActiveNeedIndex(0);
  };

  const handleApplyToRfq = () => {
    if (onInquire) {
      onInquire({
        interest: 'Bipolar Cables',
        sku: currentItem.sku,
        brand: activeBrand,
        message: `${currentItem.sku} — ${activeBrand}; ${currentItem.generator} to ${currentItem.instrument}; ${currentItem.length}`
      });
    }
  };

  return (
    <section id="compatibility-hub" className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-9">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-wider uppercase text-medkeBlue">
              Bipolar cable selection only
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-2">
              Bipolar Cable Compatibility Hub
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Choose the generator ecosystem, then the forceps or instrument-side connector. The selector returns one candidate bipolar cable for engineering review and sample confirmation.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-200 text-xs font-bold text-medkeNavy shadow-sm self-start lg:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live SKU mapping engine
          </span>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Step 01: Generator Ecosystem */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-medkeBlue uppercase tracking-wider">Step 01</span>
                <h3 className="text-lg font-bold text-medkeNavy">Generator Ecosystem</h3>
              </div>
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-medkeBlue flex items-center justify-center font-bold">
                1
              </span>
            </div>

            <div className="space-y-2 mt-4 flex-1">
              {brandKeys.map((brand) => {
                const isSelected = brand === activeBrand;
                const matchCount = compatibilityData[brand]?.length || 0;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleSelectBrand(brand)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-medkeBlue bg-[#EFF6FF] text-medkeNavy shadow-sm ring-1 ring-medkeBlue'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <span>{brand}</span>
                    <span className="float-right text-xs font-normal text-slate-400">
                      {matchCount} matches
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 02: Forceps Interface */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-medkeBlue uppercase tracking-wider">Step 02</span>
                <h3 className="text-lg font-bold text-medkeNavy">Forceps Interface</h3>
              </div>
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-medkeBlue flex items-center justify-center font-bold">
                2
              </span>
            </div>

            <div className="space-y-2 mt-4 flex-1">
              {brandItems.map((item, idx) => {
                const isSelected = idx === activeNeedIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveNeedIndex(idx)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-medkeBlue bg-[#EFF6FF] text-medkeNavy shadow-sm ring-1 ring-medkeBlue'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span className="block text-sm font-bold">{item.need}</span>
                    <span className="text-xs font-medium text-slate-500 mt-1 block">
                      {item.sku} · {item.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 03: Candidate Mapping Result */}
          <div className="lg:col-span-4 rounded-2xl bg-medkeNavy text-white shadow-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-blue-500/20 blur-2xl pointer-events-none"></div>
            
            <div className="relative">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Candidate mapping
              </span>
              <p className="text-3xl font-bold mt-2 text-white font-mono tracking-tight">
                {currentItem.sku}
              </p>
              <p className="font-bold text-blue-100 mt-1">
                {currentItem.title}
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-blue-200 text-xs uppercase font-bold block">Generator side</span>
                  <p className="font-semibold mt-0.5 text-white">{currentItem.generator}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-blue-200 text-xs uppercase font-bold block">Instrument side</span>
                  <p className="font-semibold mt-0.5 text-white">{currentItem.instrument}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-blue-200 text-xs uppercase font-bold block">Length</span>
                    <p className="font-semibold mt-0.5 text-white">{currentItem.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-blue-200 text-xs uppercase font-bold block">Use class</span>
                    <p className="font-semibold mt-0.5 text-white">{currentItem.useClass}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-6 pt-2">
              <button
                type="button"
                onClick={handleApplyToRfq}
                className="w-full py-3.5 rounded-xl bg-white text-medkeNavy hover:bg-blue-50 font-bold shadow-lg transition-all cursor-pointer"
              >
                Get Quote for This Cable ⚡
              </button>
              <p className="text-xs text-blue-200/90 leading-relaxed mt-3 text-center">
                Compatibility names identify connector ecosystems only. No affiliation or endorsement is implied.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
