import React, { useState } from 'react';

export default function NibpProductSection({ families, onSelectProduct }) {
  const [activeFamily, setActiveFamily] = useState('all');

  const familyLabels = {
    disposable: '1. Disposable NIBP Cuffs Series (Infection Prevention)',
    reusable: '2. Reusable Clinical Fleet Cuffs (Bladderless PU & Nylon)',
    hoses: '3. Medical TPU Adapter Hoses (Single & Dual Lumen)',
    connectors: '4. Universal Quick-Fit Air Connectors (30+ Models)'
  };

  const handleFilterClick = (famId) => {
    setActiveFamily(famId);
    if (famId !== 'all' && typeof window !== 'undefined') {
      const el = document.getElementById(`fam-card-${famId}`);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleInquire = (productName) => {
    if (onSelectProduct) {
      onSelectProduct(productName);
    }
  };

  return (
    <section id="products-grid" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Medke NIBP Manufacturing Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeNavy tracking-tight">
            4 Core NIBP Clinical Product Families
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Direct manufacturer engineering covering Disposable infection-prevention cuffs, Reusable clinical fleet cuffs, Medical TPU anti-kinking hoses, and Universal precision quick connectors.
          </p>

          {/* Product Family Filter Tabs (Modern High-Contrast Medical Grade Navigation) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 my-8">
            <button
              type="button"
              onClick={() => handleFilterClick('all')}
              className={`fam-tab px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                activeFamily === 'all'
                  ? 'bg-medkeNavy text-white shadow-md border-medkeNavy hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-medkeNavy hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 4 Product Families</span>
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono font-bold text-white ml-0.5">Full Fleet</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterClick('disposable')}
              className={`fam-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                activeFamily === 'disposable'
                  ? 'bg-medkeNavy text-white shadow-md border-medkeNavy hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-medkeNavy hover:bg-slate-50 border-slate-200 hover:border-purple-300 shadow-2xs'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span>1. Disposable Cuffs</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterClick('reusable')}
              className={`fam-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                activeFamily === 'reusable'
                  ? 'bg-medkeNavy text-white shadow-md border-medkeNavy hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-medkeNavy hover:bg-slate-50 border-slate-200 hover:border-blue-300 shadow-2xs'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-medkeBlue"></span>
              <span>2. Reusable Cuffs</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterClick('hoses')}
              className={`fam-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                activeFamily === 'hoses'
                  ? 'bg-medkeNavy text-white shadow-md border-medkeNavy hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-medkeNavy hover:bg-slate-50 border-slate-200 hover:border-sky-300 shadow-2xs'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span>3. Adapter Hoses</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterClick('connectors')}
              className={`fam-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                activeFamily === 'connectors'
                  ? 'bg-medkeNavy text-white shadow-md border-medkeNavy hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-medkeNavy hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-2xs'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>4. Quick Connectors</span>
            </button>
          </div>

          {/* Filter Status Reset Strip (Appears when viewing single family) */}
          {activeFamily !== 'all' && (
            <div className="max-w-xl mx-auto mb-8 p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-medkeBlue"></span>
                <span className="font-medium">Filtered View: {familyLabels[activeFamily]}</span>
              </div>
              <button
                type="button"
                onClick={() => handleFilterClick('all')}
                className="font-bold text-medkeBlue hover:text-medkeNavy hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Show All 4 Families</span>
                <span>&rarr;</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-12">

          {/* FAMILY 1: DISPOSABLE SERIES */}
          {(activeFamily === 'all' || activeFamily === 'disposable') && (
            <div id="fam-card-disposable" className="family-group bg-gradient-to-b from-slate-50/70 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200/80 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center shrink-0">01</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-medkeNavy">Disposable NIBP Cuffs Series</h3>
                    <p className="text-xs text-slate-500">Infection Control &amp; Hospital-Acquired Infection (HAI) Zero-Transmission Prevention</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                    100% Latex-Free &amp; DEHP-Free
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    FDA 510(k) K242623
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sub-Card 1A: Neonate 5-Color System */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-52 w-full bg-slate-50 flex flex-col items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/Hf8380dca0ace45f2a837eb68da5c81bcj.jpg" alt="Medke NICU Neonatal 5 Color Cuffs" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-300 shadow-2xs" title="Size 1 White (3-6cm)"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#86EFAC] border border-emerald-400 shadow-2xs" title="Size 2 Light Green (4-8cm)"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#93C5FD] border border-blue-400 shadow-2xs" title="Size 3 Light Blue (6-11cm)"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#FDA4AF] border border-rose-400 shadow-2xs" title="Size 4 Light Red (7-13cm)"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#FDE047] border border-amber-400 shadow-2xs" title="Size 5 Yellow (8-15cm)"></span>
                      </div>
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[10px] shadow-2xs">
                        Neonate (Size 1 ~ 5)
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-purple-700 uppercase">Preemie &amp; NICU Specialty</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Neonate 5-Tier Color Cuffs</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Designed for very low birth weight preemies and newborns (3.0~15.0cm). Standard 5-color coded system eliminates staff size confusion. Pre-fitted with CB42 miniature screw luer lock to minimize dead-space error.
                      </p>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div><strong>Single P/N</strong>: <span className="font-mono text-purple-800">C0101 ~ C0105</span></div>
                        <div><strong>Dual P/N</strong>: <span className="font-mono text-purple-800">C0101-44 ~ C0105-44</span></div>
                        <div><strong>Connector</strong>: CB42 Micro Luer Lock</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('NICU Neonatal Disposable Cuffs (Size 1-5)')}
                      className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Neonate Series &rarr;
                    </button>
                  </div>
                </div>

                {/* Sub-Card 1B: Animal Prints */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-52 w-full bg-slate-50 flex items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H1994921c60b143279c9d4f0e7a697159q.jpg" alt="Medke Animal Prints Pediatric NIBP Cuff" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] shadow-2xs">
                        Animal Prints
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-emerald-800 text-[10px] font-mono border border-emerald-200">
                        Anxiety Mitigation
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-emerald-700 uppercase">Pediatric &amp; Children Clinic</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Animal Prints Pediatric Cuffs</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Printed with friendly cartoon animal illustrations (bear, puppy, bunny) to relieve pediatric clinical anxiety and crying, preventing measurement blood pressure spikes and movement artifacts.
                      </p>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div><strong>Material</strong>: Ultra-soft fleece non-woven</div>
                        <div><strong>Circumference</strong>: Infant (10-19cm) / Child (18-26cm)</div>
                        <div><strong>Safety</strong>: 100% Non-sensitizing, Skin-safe</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('Disposable Non-Woven Cuffs')}
                      className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Animal Prints &rarr;
                    </button>
                  </div>
                </div>

                {/* Sub-Card 1C: Standard Body Non-Woven */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-52 w-full bg-slate-50 flex items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H66a240bc498e49eaa36bae4a3011793d3.jpg" alt="Medke Disposable Standard Body NIBP Cuff" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px] shadow-2xs">
                        Standard Body
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                        ICU / OR / Wards
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-blue-700 uppercase">Single-Patient Infection Control</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Standard Body Non-Woven Cuffs</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Silky-soft breathable spunbond non-woven composite laminated with internal TPU bladder film. Dedicated single-patient use prevents cross-transmission of MRSA, VRE, and multi-drug resistant pathogens.
                      </p>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div><strong>Sizes</strong>: Infant to Thigh (10cm to 66cm)</div>
                        <div><strong>Tube Options</strong>: Single Tube / Dual Tube</div>
                        <div><strong>Markings</strong>: Clear Artery &amp; Range Index</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('Disposable Non-Woven Cuffs')}
                      className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-medkeBlue hover:text-white text-medkeBlue text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Standard Body &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* FAMILY 2: REUSABLE SERIES */}
          {(activeFamily === 'all' || activeFamily === 'reusable') && (
            <div id="fam-card-reusable" className="family-group bg-gradient-to-b from-slate-50/70 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200/80 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-medkeSoft text-medkeNavy font-black text-sm flex items-center justify-center shrink-0">02</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-medkeNavy">Reusable NIBP Cuffs Series</h3>
                    <p className="text-xs text-slate-500">Clinical Durability for Patient Monitors, Manual Sphygmomanometers &amp; 24h ABPM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-medkeBlue text-xs font-bold border border-blue-200">
                    &ge; 10,000 Peels Hook &amp; Loop
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                    &gt; 600 mmHg Burst Proof
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sub-Card 2A: Sphygmomanometer Cuff */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-52 w-full bg-slate-50 flex items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H7be6766960354de7b77e932ef633ff3fO.jpg" alt="Medke Cuff for Sphygmomanometers" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-[10px] shadow-2xs">
                        Sphygmomanometer Cuff
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                        With Metal D-Ring
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-amber-700 uppercase">Manual &amp; Aneroid Gauges</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Cuff for Sphygmomanometers</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Designed for desktop mercury and aneroid sphygmomanometers. Features a high-density woven fabric jacket with an electroplated metal D-ring for easy one-handed patient wrapping or clinical doctor use.
                      </p>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div><strong>Material</strong>: <span className="font-bold text-slate-800">Fabric (Cotton / Polyester)</span></div>
                        <div><strong>Hardware</strong>: Heavy-duty chrome metal D-Ring</div>
                        <div><strong>Bladder</strong>: Removable pure TPU or latex-free rubber</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('Sphygmomanometer Fabric Cuffs (D-Ring)')}
                      className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Sphygmo Cuffs &rarr;
                    </button>
                  </div>
                </div>

                {/* Sub-Card 2B: Patient Monitor Cuffs */}
                <div className="bg-white rounded-2xl border-2 border-medkeBlue/30 shadow-2xs hover:shadow-md hover:border-medkeBlue transition duration-300 flex flex-col justify-between overflow-hidden group relative">
                  <div className="absolute top-0 right-0 bg-medkeBlue text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-2xs">
                    Clinical Core
                  </div>
                  <div>
                    <div className="h-52 w-full bg-blue-50/30 flex items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H0deea89245cb4231bf2d2540e91f812e3.jpg" alt="Medke NIBP Cuffs for Patient Monitors" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-medkeBlue text-white font-bold text-[10px] shadow-2xs">
                        Patient Monitors
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-medkeBlue text-[10px] font-mono border border-blue-200">
                        Nylon / PU Options
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-medkeBlue uppercase">ICU · OR · Wards Fleet</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">NIBP Cuffs for Patient Monitors</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Comprehensive multi-parameter monitor cuff fleet. Engineered with flexible material and chamber architecture to meet hospital procurement specifications:
                      </p>
                      <div className="mt-3 p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] space-y-1.5">
                        <div><strong>Material Options</strong>: <span className="font-bold text-medkeNavy">Medical PU (Ultrasonic Sealed) / 210D Heavy Nylon</span></div>
                        <div><strong>Chamber Architecture</strong>: 
                          <span className="text-slate-700"> Available in <strong>Bladderless (C6 Series)</strong> &amp; <strong>Classic with TPU Bladder (C1 Series)</strong></span>
                        </div>
                        <div><strong>Pneumatic Conduits</strong>: 
                          <span className="text-slate-700"> Available in <strong>Single Tube</strong> &amp; <strong>Dual Tube</strong></span>
                        </div>
                        <div><strong>Sizes</strong>: Full clinical continuum (Infant 10cm to Thigh 66cm)</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('Reusable PU Bladderless Cuffs (C6)')}
                      className="w-full py-2.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      Inquire Monitor Cuffs &rarr;
                    </button>
                  </div>
                </div>

                {/* Sub-Card 2C: Ambulatory BP Monitor Cuff (ABPM) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-52 w-full bg-slate-50 flex items-center justify-center p-3 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/Hfbd92442a08946849d10335a6b73f5ebt.jpg" alt="Medke Ambulatory BP Monitor Cuff" className="h-36 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] shadow-2xs">
                        ABPM Series
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                        24h Holter Monitoring
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-indigo-700 uppercase">24-Hour Ambulatory Holter</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Ambulatory BP Monitor Cuff (ABPM)</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Ergonomically contoured for continuous 24-hour ambulatory blood pressure monitoring. Conical cut hugs the upper arm contour to prevent rotational shifting during daytime movement and nocturnal sleep.
                      </p>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div><strong>Material</strong>: <span className="font-bold text-slate-800">High-Grade Soft Nylon</span></div>
                        <div><strong>Fit</strong>: Tapered conical anatomical contour</div>
                        <div><strong>Closure</strong>: Quiet medical loop fastener for sleep</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('Ambulatory BP Monitor Cuffs (ABPM)')}
                      className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire ABPM Cuffs &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* FAMILY 3: HOSES SERIES */}
          {(activeFamily === 'all' || activeFamily === 'hoses') && (
            <div id="fam-card-hoses" className="family-group bg-gradient-to-b from-slate-50/70 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200/80 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-black text-sm flex items-center justify-center shrink-0">03</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-medkeNavy">NIBP Adapter Hoses Series</h3>
                    <p className="text-xs text-slate-500">Medical TPU Extruded Tubing · 1-Second Anti-Kinking Rebound &amp; Heavy Tensile Retention</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                    1s Elastic Anti-Kinking Rebound
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    &ge; 40 N Pull Force Tested
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Sub-Card 3A: Single-Lumen TPU Hoses */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-56 w-full bg-slate-50 flex items-center justify-center p-4 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H49be950ea32047b98a94798713ba4ea6Z.jpg" alt="Medke Single Lumen TPU NIBP Adapter Hose" className="h-44 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-sky-600 text-white font-bold text-[10px] shadow-2xs">
                        Single Lumen System
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                        2.5m / 3.0m Lengths
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-[11px] font-bold text-sky-700 uppercase">Philips · Mindray · Dräger · Colin</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Single-Lumen Medical TPU Adapter Hoses</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Heavy-duty medical polyurethane air tubing engineered to withstand bed-rail crushing and heavy cart rolling. Rebounds instantly in 1 second with 100% pneumatic restoration and zero kink occlusion.
                      </p>
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                        <div><strong>Standard Models</strong>: <span className="font-mono text-sky-800">H0910S (Philips), H1010S (Mindray), H1210S (Dräger), H0304S (Colin)</span></div>
                        <div><strong>Standard Lengths</strong>: 2.5m / 3.0m (custom 1.5m ~ 5.0m available)</div>
                        <div><strong>Finish</strong>: Matte non-stick exterior, resistant to hospital alcohol wipes</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('TPU NIBP Adapter Hoses (Single/Dual)')}
                      className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Single-Lumen Hoses &rarr;
                    </button>
                  </div>
                </div>

                {/* Sub-Card 3B: Dual-Lumen TPU Hoses */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    <div className="h-56 w-full bg-slate-50 flex items-center justify-center p-4 relative border-b border-slate-100 overflow-hidden">
                      <img src="https://sc02.alicdn.com/kf/H4319c4f392644a6c9fb79a8ceda1fc24F.jpg" alt="Medke Dual Lumen TPU NIBP Adapter Hose" className="h-44 w-full object-contain group-hover:scale-105 transition duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] shadow-2xs">
                        Dual Lumen System
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                        GE Dinamap / Marquette
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-[11px] font-bold text-indigo-700 uppercase">GE Healthcare · Critikon · Datex</div>
                      <h4 className="text-base font-bold text-medkeNavy mt-0.5">Dual-Lumen Medical TPU Adapter Hoses</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Parallel twin-conduit tubing featuring independent rapid inflation and high-fidelity arterial pressure sensing circuits. Eliminates airflow turbulence noise in Operating Rooms and ICU hemodynamics.
                      </p>
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                        <div><strong>Standard Models</strong>: <span className="font-mono text-indigo-800">H0707D (Dinamap), H3851D (Marquette), H3707D (Datex-Ohmeda)</span></div>
                        <div><strong>Joint Reliability</strong>: Injection-molded strain relief boots prevent tearing</div>
                        <div><strong>Testing</strong>: 100% submersion leak tested under 300 mmHg pressure</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleInquire('TPU NIBP Adapter Hoses (Single/Dual)')}
                      className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Inquire Dual-Lumen Hoses &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* FAMILY 4: CONNECTORS SERIES */}
          {(activeFamily === 'all' || activeFamily === 'connectors') && (
            <div id="fam-card-connectors" className="family-group bg-gradient-to-b from-slate-50/70 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200/80 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-black text-sm flex items-center justify-center shrink-0">04</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-medkeNavy">Precision Air Connectors Series</h3>
                    <p className="text-xs text-slate-500">30+ Precision Metal &amp; Molded Engineering Polymer Couplers (CB01 ~ CB42)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                    Leak Rate &lt; 0.5 mmHg/min
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    98% Global Monitor Fit
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs font-bold">CB01 / CB03 / CB04</span>
                  </div>
                  <h5 className="text-sm font-bold text-medkeNavy">Nickel Brass Couplers</h5>
                  <p className="text-[11px] text-slate-500 mt-1">High-precision CNC machined nickel-plated brass with ball-bearing snap locking and self-closing valve.</p>
                  <div className="mt-2 text-[10px] font-mono text-slate-600">Colin / Welch Allyn / Nihon Kohden</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold">CB09 / CB10 / CB13</span>
                  </div>
                  <h5 className="text-sm font-bold text-medkeNavy">Medical POM Push Plugs</h5>
                  <p className="text-[11px] text-slate-500 mt-1">Acetal/POM engineered polymer quick disconnect sockets and plugs with fluororubber O-rings.</p>
                  <div className="mt-2 text-[10px] font-mono text-slate-600">Philips / Mindray / Datascope / Edan</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-indigo-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-xs font-bold">CB07 / CB37 / CB38</span>
                  </div>
                  <h5 className="text-sm font-bold text-medkeNavy">Dual-Lumen Keyed Plugs</h5>
                  <p className="text-[11px] text-slate-500 mt-1">Dinaclick dual-pin parallel rectangular plugs &amp; Datex asymmetrical keyed anti-mismatch connectors.</p>
                  <div className="mt-2 text-[10px] font-mono text-slate-600">GE Dinamap / Marquette / Datex</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-xs font-bold">CB12 / CB42</span>
                  </div>
                  <h5 className="text-sm font-bold text-medkeNavy">Threaded &amp; Micro Luers</h5>
                  <p className="text-[11px] text-slate-500 mt-1">Dräger knurled metal screw collars (CB12) and ISO 594 miniature preterm neonatal screw luers (CB42).</p>
                  <div className="mt-2 text-[10px] font-mono text-slate-600">Dräger Infinity / Universal NICU</div>
                </div>

              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-100/70 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-600">
                  <strong className="text-medkeNavy">Need to verify exact connector fit for your patient monitor models?</strong>
                  <p className="text-[11px] text-slate-500">Explore the complete cross-reference directory below or ask our engineering team for instant pin matching.</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <a href="#connector-hub" className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-medkeNavy font-bold text-xs border border-slate-300 transition shadow-2xs">
                    Inspect Cross-Reference Hub &darr;
                  </a>
                  <button
                    type="button"
                    onClick={() => handleInquire('Quick-Fit Air Connectors (30+ Models)')}
                    className="px-4 py-2 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                  >
                    Get Connector Quote ⚡
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
