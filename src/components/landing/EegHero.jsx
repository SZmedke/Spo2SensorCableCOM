import React from 'react';

export default function EegHero({ data, onOpenBrochure, onPrefillModel }) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = el.querySelector('.rounded-3xl');
        if (card) {
          card.classList.remove('highlight-focus');
          void card.offsetWidth;
          card.classList.add('highlight-focus');
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
    <section id="hero" className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badges Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> TÜV SÜD ISO 13485:2016 Certified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> DIN 42802 1.5mm Touchproof Safety Standard
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Ultra-Low Baseline Drift (&lt; 3 mV DC Offset)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> International 10/20 Standard 10-Color Coding
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-medkeBlue block">
                {data.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-medkeNavy leading-tight tracking-tight">
                {data.title}
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeBlue mt-2">
                  {data.subtitle}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl pt-1">
                {data.lead}
              </p>
            </div>

            {/* Feature Checklist Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700">
              {data.featureChecklist.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
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
                <span>Get Wholesale Factory Quote</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-medkeSoft text-medkeNavy text-base font-semibold border-2 border-medkeNavy/20 shadow-sm transition cursor-pointer"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span>Download 2026 EEG Brochure (PDF)</span>
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
              {data.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-black text-medkeNavy">
                    {m.value} <span className="text-sm font-semibold text-medkeBlue">{m.unit}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Visual Card (Precision Technical Vector SVG Schematic) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white rounded-2xl p-6 shadow-card-subtle border border-slate-200/80">
              
              {/* Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <span className="text-xs font-bold text-medkeBlue uppercase tracking-wider">Clinical Engineering Schematic</span>
                  <h3 className="text-lg font-bold text-medkeNavy">Precision EEG Cup &amp; DIN 42802 Assembly</h3>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
                  100% Continuity Tested
                </span>
              </div>

              {/* Graphic Schematic Box with Medical Technical Vector Illustration */}
              <div className="relative h-64 bg-gradient-to-tr from-[#F1F5F9] via-[#E9EEF6] to-[#E2E8F0] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-slate-200">
                <svg className="w-full h-full max-h-56 text-medkeNavy" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="eeg-grid-hero" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E1" strokeWidth="0.5" strokeOpacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="420" height="220" fill="url(#eeg-grid-hero)" />

                  {/* Left: DIN 42802 1.5mm Touchproof Safety Socket */}
                  <rect x="25" y="80" width="55" height="48" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
                  <rect x="28" y="84" width="8" height="40" rx="2" fill="#334155" />
                  <line x1="42" y1="83" x2="42" y2="125" stroke="#475569" strokeWidth="1.5" />
                  <line x1="48" y1="83" x2="48" y2="125" stroke="#475569" strokeWidth="1.5" />
                  <line x1="54" y1="83" x2="54" y2="125" stroke="#475569" strokeWidth="1.5" />
                  <rect x="15" y="93" width="10" height="22" rx="3" fill="#64748B" />
                  <circle cx="20" cy="104" r="3.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                  <path d="M 80 88 L 105 97 L 105 111 L 80 120 Z" fill="#334155" />

                  {/* Flexible Multi-Core TPU Cable Flow */}
                  <path d="M 105 104 C 150 104, 175 48, 235 60 C 290 70, 310 130, 340 125" stroke="#243181" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 105 104 C 150 104, 175 48, 235 60 C 290 70, 310 130, 340 125" stroke="#0047FF" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />

                  {/* Right: Precision Casted Noble Metal Cup Electrode */}
                  <path d="M 338 126 L 360 123 L 363 131 L 341 134 Z" fill="#334155" />
                  <ellipse cx="378" cy="128" rx="24" ry="24" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                  <ellipse cx="378" cy="128" rx="18" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                  <ellipse cx="378" cy="128" rx="14" ry="14" fill="#FEF3C7" />
                  <circle cx="378" cy="128" r="4.5" fill="#1E293B" stroke="#92400E" strokeWidth="1.5" />
                  <circle cx="378" cy="128" r="9" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="378" cy="128" r="16" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />

                  {/* Callout 1: DIN 42802 Safety Socket */}
                  <rect x="15" y="24" width="160" height="26" rx="5" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                  <text x="24" y="41" fontSize="10" fontWeight="bold" fill="#243181">1.5mm DIN 42802 Socket</text>
                  <circle cx="160" cy="37" r="3" fill="#0047FF" />
                  <path d="M 52 50 L 52 76" stroke="#0047FF" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="52" cy="76" r="2.5" fill="#0047FF" />

                  {/* Callout 2: TPU Shielded Leadwire */}
                  <rect x="160" y="172" width="140" height="26" rx="5" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                  <text x="170" y="189" fontSize="10" fontWeight="bold" fill="#0047FF">Medical TPU Jacket</text>
                  <path d="M 230 172 L 230 100" stroke="#0047FF" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="230" cy="100" r="2.5" fill="#0047FF" />

                  {/* Callout 3: Casted Cup & Low Impedance */}
                  <rect x="260" y="24" width="145" height="26" rx="5" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                  <text x="270" y="41" fontSize="10" fontWeight="bold" fill="#0E8345">Impedance &lt; 3 kΩ (Φ10mm)</text>
                  <path d="M 378 50 L 378 100" stroke="#0E8345" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="378" cy="100" r="2.5" fill="#0E8345" />
                </svg>
              </div>

              {/* Quick Specs Table */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {data.schematicSpecs.map((spec, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">{spec.label}</span>
                    <span className="font-bold text-medkeNavy">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Card Bottom Trust Line */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Headbox Standard: DIN 42802 1.5mm</span>
                <button
                  type="button"
                  onClick={() => handleInquireModel('Casted Golden & Ag/AgCl Cup Electrodes')}
                  className="text-xs font-bold text-medkeBlue hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Inquire This Model &rarr;
                </button>
              </div>
            </div>

            {/* Floating Quality Assurance Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-medkeNavy">Defect Rate &lt; 0.15%</p>
                <p className="text-[11px] text-slate-500">100% Continuity &amp; Resistance QC</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
