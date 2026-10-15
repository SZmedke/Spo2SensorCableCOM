import React from 'react';

export default function AedHero({ data, onOpenBrochure, onPrefillModel }) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-blue-500/30', 'border-blue-500');
          setTimeout(() => {
            card.classList.remove('ring-4', 'ring-blue-500/30', 'border-blue-500');
          }, 1200);
        }
      }
    }
  };

  const handleInquireModel = (modelText) => {
    if (onPrefillModel) {
      onPrefillModel(modelText);
    } else {
      scrollToForm();
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Pill Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            TÜV SÜD ISO 13485:2016 Certified
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            EU MDR 2017/745 Class I (DoC Ref: 697101811AEDJY)
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            German Hamburg EC Rep Registered
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            24-Month Long Shelf Life Hydrogel
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded">
                Direct Source Manufacturer · Defibrillation Electrodes Since 2008
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-medkeNavy leading-snug sm:leading-[1.28] lg:leading-[1.3] tracking-tight">
                <span className="block mb-1 sm:mb-2">Medical-Grade AED Defibrillation</span>
                <span className="text-medkeBlue block">Electrode Pads &amp; Adapter Cables</span>
              </h1>
              <p className="text-lg text-slate-600 font-medium max-w-2xl">
                100% compatible with ZOLL, Philips, Physio-Control LIFEPAK, Mindray, and Nihon Kohden. Direct factory wholesale pricing, 69 cm² / 60 cm² conductive hydrogel, EN 60601-2-4 defibrillation safety certified for hospitals, EMS fleets, and regional distributor partners.
              </p>
            </div>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              {data.featureChecklist.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: feat }} />
                </div>
              ))}
            </div>

            {/* Dual Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-base font-bold shadow-glow-cta transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Direct Factory Quote</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-medkeSoft text-medkeNavy text-base font-semibold border-2 border-medkeNavy/20 shadow-sm transition cursor-pointer"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
                <span>Download 2026 Medke Brochure (PDF)</span>
              </button>
            </div>

            {/* Micro-Trust Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1 font-medium border-t border-slate-200/80">
              <span className="flex items-center gap-1.5"><span className="text-medkeBlue font-bold">⚡</span> Avg. Response: &lt; 2.4 Hours</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">📦</span> Free Testing Samples for Qualified Buyers</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">🤝</span> Low MOQ for OEM / Regional Dealers</span>
            </div>
          </div>

          {/* Hero Right Visual Card: 1:1 Matching HTML Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white rounded-2xl p-6 shadow-card-subtle border border-slate-200/80">
              {/* Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <span className="text-xs font-bold text-medkeBlue uppercase tracking-wider">
                    {data.heroCard.seriesTag}
                  </span>
                  <h3 className="text-lg font-bold text-medkeNavy">
                    {data.heroCard.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
                  {data.heroCard.badge}
                </span>
              </div>

              {/* Graphic Schematic Box: Precision AED Dual-Pad Schematic */}
              <div className="relative h-60 bg-gradient-to-tr from-[#F1F5F9] to-[#E2E8F0] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-slate-200">
                <svg className="w-full h-full max-h-52 text-medkeNavy" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dual Cable Leads from Connector */}
                  <path d="M 40 120 C 70 120, 90 70, 150 70" stroke="#243181" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M 40 120 C 70 120, 90 170, 150 170" stroke="#243181" strokeWidth="5" strokeLinecap="round"/>
                  
                  {/* Connector Left (Molded 2-Pin Quick Connect) */}
                  <rect x="12" y="102" width="34" height="36" rx="6" fill="#1E293B"/>
                  <rect x="6" y="110" width="8" height="8" rx="2" fill="#F59E0B"/>
                  <rect x="6" y="122" width="8" height="8" rx="2" fill="#F59E0B"/>
                  <circle cx="28" cy="120" r="4" fill="#0047FF"/>

                  {/* Pad 1: Upper Pad (Right Anterior Chest) */}
                  <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))">
                    <rect x="150" y="25" width="105" height="90" rx="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2"/>
                    <rect x="162" y="35" width="81" height="70" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5"/>
                    <circle cx="202" cy="55" r="8" fill="#243181"/>
                    <path d="M 194 75 C 194 67, 210 67, 210 75 Z" fill="#243181"/>
                    <text x="202" y="93" fontSize="9" fontWeight="bold" fill="#0369A1" textAnchor="middle">69 cm² ADULT</text>
                    <circle cx="150" cy="70" r="5" fill="#64748B"/>
                    <circle cx="150" cy="70" r="2" fill="#FFFFFF"/>
                  </g>

                  {/* Pad 2: Lower Pad (Left Lateral Chest) */}
                  <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))">
                    <rect x="150" y="125" width="105" height="90" rx="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2"/>
                    <rect x="162" y="135" width="81" height="70" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5"/>
                    <circle cx="202" cy="155" r="8" fill="#243181"/>
                    <path d="M 194 175 C 194 167, 210 167, 210 175 Z" fill="#243181"/>
                    <text x="202" y="193" fontSize="9" fontWeight="bold" fill="#0369A1" textAnchor="middle">ANTERO-LATERAL</text>
                    <circle cx="150" cy="170" r="5" fill="#64748B"/>
                    <circle cx="150" cy="170" r="2" fill="#FFFFFF"/>
                  </g>

                  {/* Label Callout Badges */}
                  <rect x="270" y="45" width="118" height="26" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
                  <text x="280" y="62" fontSize="10" fontWeight="bold" fill="#243181">Anti-Dry Hydrogel</text>
                  <line x1="255" y1="58" x2="270" y2="58" stroke="#0047FF" strokeWidth="1.5" strokeDasharray="2 2"/>

                  <rect x="270" y="145" width="118" height="26" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
                  <text x="280" y="162" fontSize="10" fontWeight="bold" fill="#0E8345">EN 60601-2-4 Pass</text>
                  <line x1="255" y1="158" x2="270" y2="158" stroke="#0E8345" strokeWidth="1.5" strokeDasharray="2 2"/>
                </svg>
              </div>

              {/* Quick Specs Table */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {data.heroCard.specs.map((sp, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">{sp.label}</span>
                    <span className="font-bold text-medkeNavy text-[11px] sm:text-xs">{sp.value}</span>
                  </div>
                ))}
              </div>

              {/* Sample / Wholesale Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">OEM Pouch &amp; Private Label:</span>
                <button
                  type="button"
                  onClick={() => handleInquireModel('Adult Defibrillation Electrode Pads (69 cm²)')}
                  className="text-xs font-bold text-medkeBlue hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Samples &rarr;</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
