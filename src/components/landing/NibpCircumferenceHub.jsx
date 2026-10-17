import React, { useState } from 'react';

export default function NibpCircumferenceHub({ tierData, onPrefillCode, onPrefillSize }) {
  const [selectedKey, setSelectedKey] = useState('adult');
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);

  const activeData = tierData[selectedKey] || tierData['adult'];
  const tierKeys = ['nicu', 'infant', 'pediatric', 'small-adult', 'adult', 'large-adult', 'thigh'];

  const handleTierClick = (key) => {
    setSelectedKey(key);
  };

  const handleCodeClick = (code) => {
    if (onPrefillCode) {
      onPrefillCode(code, activeData.title);
    }
  };

  const handleInquireSize = () => {
    if (onPrefillSize) {
      onPrefillSize(activeData.prefillKey || 'Reusable PU Bladderless Cuffs (C6)', activeData.title);
    }
  };

  return (
    <section id="circumference-hub" className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            <span className="w-2 h-2 rounded-full bg-medkeBlue animate-pulse"></span>
            Clinical Fit &amp; Order Matrix Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeNavy tracking-tight">
            Interactive Limb Circumference &amp; Order Code Matrix (3cm ~ 66cm)
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Incorrect cuff sizing causes up to 20 mmHg clinical measurement errors. Select any patient demographic below to instantly view exact Single/Double tube order codes, materials, and MOQs for standard hospital fleet specifications.
          </p>
        </div>

        {/* 7-Tier Continuous Circumference Rail Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {tierKeys.map((key) => {
            const item = tierData[key];
            const isActive = selectedKey === key;
            return (
              <div
                key={key}
                onClick={() => handleTierClick(key)}
                className={`tier-card p-3 rounded-2xl border-2 cursor-pointer transition shadow-xs flex flex-col justify-between group ${
                  isActive
                    ? 'bg-blue-50 border-medkeBlue shadow-sm'
                    : 'bg-white border-slate-200 hover:border-medkeBlue'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-medkeBlue text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.tag}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-medkeBlue animate-ping' : 'bg-slate-300'}`}></span>
                  </div>
                  <div className="text-xs font-bold text-medkeNavy">{item.shortTitle}</div>
                  <div className={`text-[11px] font-mono font-semibold mt-0.5 ${isActive ? 'text-medkeBlue font-extrabold' : 'text-slate-600'}`}>
                    {item.range}
                  </div>
                </div>
                <div className={`mt-2 text-[10px] border-t pt-1.5 flex items-center justify-between ${
                  isActive ? 'border-blue-200 text-slate-600 font-bold' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>{item.subtext}</span>
                  <span className={item.subHighlight.includes('FDA') ? 'text-emerald-600 font-bold' : isActive ? 'text-medkeBlue' : 'text-slate-400'}>
                    {item.subHighlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detailed Display Card for Selected Tier with Order Matrix Table */}
        <div id="tierDetailsCard" className="bg-white rounded-3xl p-6 sm:p-8 shadow-card-subtle border border-slate-200 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-5">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-medkeBlue text-white font-bold text-xs uppercase tracking-wider">
                  {activeData.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  ✓ FDA 510(k) K242623 Cleared
                </span>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  100% Water Submersion Tested
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-medkeNavy">
                  {activeData.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {activeData.desc}
                </p>
              </div>

              {/* Standard Core Lines Order Matrix (Compact 3-Row Architecture) */}
              <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-medkeNavy uppercase tracking-wider">Standard Hospital Fleet Specifications (Core Product Lines)</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">TÜV SÜD ISO 13485</span>
                </div>

                {/* Interactive Responsive Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[520px]">
                    <thead>
                      <tr className="text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                        <th className="py-2 px-2.5">Material &amp; Architecture</th>
                        <th className="py-2 px-2.5 font-mono text-medkeNavy">Single Tube P/N</th>
                        <th className="py-2 px-2.5 font-mono text-indigo-700">Double Tube P/N</th>
                        <th className="py-2 px-2 text-right">Standard MOQ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {activeData.matrix.map((row, idx) => (
                        <tr key={idx} className={row.highlight ? 'bg-blue-50/40 hover:bg-blue-50 transition' : 'hover:bg-slate-50 transition'}>
                          <td className="py-2.5 px-2.5 font-medium text-slate-800 text-xs flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${row.highlight ? 'bg-medkeBlue' : 'bg-slate-300'}`}></span>
                            <span>{row.material}</span>
                          </td>
                          <td className="py-2.5 px-2.5 font-mono font-bold text-medkeNavy text-xs">
                            <button
                              type="button"
                              onClick={() => handleCodeClick(row.single)}
                              className="cursor-pointer hover:text-medkeBlue hover:underline font-inherit text-left"
                              title="Click to copy or prefill"
                            >
                              {row.single}
                            </button>
                          </td>
                          <td className="py-2.5 px-2.5 font-mono font-bold text-indigo-700 text-xs">
                            <button
                              type="button"
                              onClick={() => handleCodeClick(row.dual)}
                              className="cursor-pointer hover:text-indigo-900 hover:underline font-inherit text-left"
                              title="Click to copy or prefill"
                            >
                              {row.dual}
                            </button>
                          </td>
                          <td className="py-2.5 px-2 text-right">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">{row.moq}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Collapsible Drawer for Specialty Lines (Welch Allyn, ABPM, Manual Sphygmo) */}
                <div className="pt-2 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-medkeNavy flex items-center justify-between transition shadow-2xs cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Looking for Specialty Configurations? (Welch Allyn, 24h ABPM &amp; Manual D-Ring)</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {isSpecialtyOpen ? '− Collapse' : '+ Expand'}
                    </span>
                  </button>

                  {isSpecialtyOpen && (
                    <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-extrabold uppercase text-amber-700 block mb-0.5">Welch Allyn Dedicated</span>
                          <div className="text-[11px] text-slate-500">Direct bayonet twist fit:</div>
                          <div className="font-mono font-bold text-medkeNavy text-xs mt-0.5">{activeData.specialty?.welchAllyn || '—'}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-extrabold uppercase text-indigo-700 block mb-0.5">24h Ambulatory (ABPM)</span>
                          <div className="text-[11px] text-slate-500">Contoured soft nylon:</div>
                          <div className="font-mono font-bold text-medkeNavy text-xs mt-0.5">{activeData.specialty?.abpm || '—'}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-extrabold uppercase text-teal-700 block mb-0.5">Manual Aneroid Gauges</span>
                          <div className="text-[11px] text-slate-500">Chrome metal D-Ring:</div>
                          <div className="font-mono font-bold text-medkeNavy text-xs mt-0.5">{activeData.specialty?.manual || '—'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Helper Bar under Table */}
                <div className="pt-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓ Direct Factory Supply:</span>
                    <span>Click any Order Code to copy or prefill into RFQ quotation portal.</span>
                  </div>
                  <a href="#connector-hub" className="text-medkeBlue hover:underline font-semibold flex items-center gap-1">
                    Need Monitor Connector Fitting? View 30+ Types &darr;
                  </a>
                </div>
              </div>

              {/* Technical Dimensions & Fastening Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-white rounded-xl border border-slate-200/80 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Cuff Flat Dimension:</span>
                  <strong className="text-medkeNavy font-mono font-bold">{activeData.cuffDim}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Bladder Inflatable Area:</span>
                  <strong className="text-medkeNavy font-mono font-bold">{activeData.bladderDim}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Fastening Lifespan:</span>
                  <strong className="text-emerald-700 font-bold">{activeData.fastening}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Connector Options:</span>
                  <strong className="text-slate-700 font-mono">{activeData.connector}</strong>
                </div>
              </div>

            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-3 p-5 bg-gradient-to-b from-blue-50/70 to-slate-50 rounded-2xl border border-blue-100">
              <div className="text-xs text-slate-700 space-y-1">
                <span className="font-extrabold text-medkeNavy block text-sm">Need Official Pricing or Samples?</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">Select this size specification in our procurement portal or connect directly with Medke factory engineers for instant volume pricing.</p>
              </div>
              <button
                type="button"
                onClick={handleInquireSize}
                className="w-full py-3.5 px-4 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-bold text-xs sm:text-sm shadow-glow-cta transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire This Size Specification ⚡</span>
              </button>
              <a
                href="https://wa.me/8615302654212?text=Hello%20Medke,%20I%20am%20inquiring%20about%20NIBP%20cuffs%20size%20specification."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-300 text-center transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
