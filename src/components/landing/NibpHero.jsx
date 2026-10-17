import React from 'react';

export default function NibpHero({ data, onOpenBrochure, onPrefillModel }) {
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

  return (
    <section id="hero" className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badges Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> TÜV SÜD ISO 13485:2016 Certified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> US FDA 510(k) K242623 Cleared
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 100% Water Submersion Leak Tested (300 mmHg)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Extreme Burst Pressure &gt; 600 mmHg Proof
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

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-base font-bold shadow-glow-cta transition hover:-translate-y-0.5 text-center cursor-pointer"
              >
                <span>Get Factory Wholesale Quote 🚀</span>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-medkeNavy text-sm font-bold border-2 border-slate-200 hover:border-medkeNavy/40 transition shadow-xs text-center cursor-pointer"
              >
                <span>Download 2026 NIBP Brochure (PDF)</span>
              </button>
            </div>

            {/* Enterprise Precision Highlights & Clinical Metrics */}
            <div className="pt-5 border-t border-slate-200/90">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center justify-between">
                <span>Verified Manufacturing &amp; Clinical Benchmarks</span>
                <span className="text-medkeBlue font-mono text-[10px]">TÜV SÜD AUDITED</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-medkeBlue/40 transition">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-medkeBlue shrink-0"></span>
                    <span className="text-sm sm:text-base font-extrabold text-medkeNavy tracking-tight whitespace-nowrap">17+ Years</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 whitespace-nowrap">Medical R&amp;D</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Since 2008 Direct Maker</div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-medkeBlue/40 transition">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="text-sm sm:text-base font-extrabold text-medkeNavy tracking-tight whitespace-nowrap">4,000 sqm</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 whitespace-nowrap">Cleanroom Plant</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">ISO 13485 Dust-Free</div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-medkeBlue/40 transition">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="text-sm sm:text-base font-extrabold text-medkeNavy tracking-tight whitespace-nowrap">&gt;600 mmHg</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 whitespace-nowrap">Burst Proof</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">2× Overpressure Proof</div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-medkeBlue/40 transition">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
                    <span className="text-sm sm:text-base font-extrabold text-medkeNavy tracking-tight whitespace-nowrap">100+ Nations</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 whitespace-nowrap">Hospital Supply</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Tender &amp; OEM Fleet</div>
                </div>

              </div>
            </div>

          </div>

          {/* Hero Right CAD Schematic (Vector Precision Engineering) */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Glass Card Container */}
            <div className="relative bg-white/95 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 overflow-hidden">
              
              {/* Non-Obscuring Clean Header with Embedded Badges */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-medkeBlue animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-medkeNavy uppercase tracking-wider">CAD Blueprint · C6 Reusable PU Cuff Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-2xs">
                    ✓ FDA 510(k) K242623
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">SCALE 1:1</span>
                </div>
              </div>

              {/* CAD SVG Engineering Schematic */}
              <div className="w-full flex items-center justify-center py-2">
                <svg viewBox="0 0 460 360" className="w-full h-auto max-w-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background subtle grid */}
                  <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1"/>
                  </pattern>
                  <rect width="460" height="360" fill="url(#cadGrid)" rx="16" />

                  {/* Cuff Main Wrap Body (Curved Ergonomic Medical PU Profile) */}
                  <path d="M 50 80 Q 210 65 370 80 C 385 82 395 95 395 110 L 395 240 C 395 255 385 268 370 270 Q 210 255 50 270 C 35 268 25 255 25 240 L 25 110 C 25 95 35 82 50 80 Z" 
                        fill="#EFF6FF" stroke="#243181" strokeWidth="2.5" />

                  {/* High-Frequency Ultrasonic Welded Edge (Double Seam) */}
                  <path d="M 55 90 Q 210 77 365 90 C 375 91 382 100 382 112 L 382 238 C 382 250 375 259 365 260 Q 210 247 55 260 C 45 259 38 250 38 238 L 38 112 C 38 100 45 91 55 90 Z" 
                        stroke="#0047FF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />

                  {/* Hook & Loop Fastener Zone (Velcro Anchor on Right Flap) */}
                  <rect x="310" y="98" width="65" height="154" rx="8" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                  {/* Velcro micro texture lines */}
                  <g stroke="#3B82F6" strokeWidth="1" opacity="0.6">
                    <line x1="316" y1="110" x2="368" y2="110" strokeDasharray="2 2" />
                    <line x1="316" y1="125" x2="368" y2="125" strokeDasharray="2 2" />
                    <line x1="316" y1="140" x2="368" y2="140" strokeDasharray="2 2" />
                    <line x1="316" y1="155" x2="368" y2="155" strokeDasharray="2 2" />
                    <line x1="316" y1="170" x2="368" y2="170" strokeDasharray="2 2" />
                    <line x1="316" y1="185" x2="368" y2="185" strokeDasharray="2 2" />
                    <line x1="316" y1="200" x2="368" y2="200" strokeDasharray="2 2" />
                    <line x1="316" y1="215" x2="368" y2="215" strokeDasharray="2 2" />
                    <line x1="316" y1="230" x2="368" y2="230" strokeDasharray="2 2" />
                    <line x1="316" y1="242" x2="368" y2="242" strokeDasharray="2 2" />
                  </g>
                  <text x="342" y="180" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E40AF" textAnchor="middle" transform="rotate(-90 342 180)">VELCRO ZONE (10K+ CYCLES)</text>

                  {/* Artery Alignment Marker & Range Index (Clinical Precision Indicator) */}
                  <g id="arteryMarker" transform="translate(190, 115)">
                    {/* Circle Target */}
                    <circle cx="20" cy="20" r="14" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
                    <line x1="20" y1="10" x2="20" y2="30" stroke="#DC2626" strokeWidth="1.5" />
                    <line x1="10" y1="20" x2="30" y2="20" stroke="#DC2626" strokeWidth="1.5" />
                    {/* Downward Pointer Arrow */}
                    <polygon points="20,40 13,30 27,30" fill="#DC2626" />
                    <text x="20" y="55" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#991B1B" textAnchor="middle">ARTERY ▼</text>
                  </g>

                  {/* Range Indicator Bar on Left */}
                  <g id="rangeBar" transform="translate(60, 115)">
                    <rect x="0" y="0" width="105" height="26" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" />
                    <text x="52" y="16" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#15803D" textAnchor="middle">RANGE 25~35 cm OK</text>
                    <line x1="0" y1="0" x2="0" y2="34" stroke="#DC2626" strokeWidth="2" />
                    <text x="0" y="44" fontSize="8" fontFamily="monospace" fill="#DC2626" textAnchor="middle">MIN</text>
                    <line x1="105" y1="0" x2="105" y2="34" stroke="#DC2626" strokeWidth="2" />
                    <text x="105" y="44" fontSize="8" fontFamily="monospace" fill="#DC2626" textAnchor="middle">MAX</text>
                  </g>

                  {/* Size & Brand Silk Screen Mark */}
                  <text x="60" y="195" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#243181">MEDKE C6711 · ADULT</text>
                  <text x="60" y="210" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#475569">LATEX-FREE · DEHP-FREE · ISO 13485</text>
                  <text x="60" y="224" fontSize="9" fontFamily="monospace" fill="#64748B">ARM CIRCUMFERENCE: 25.0 - 35.0 CM</text>

                  {/* Pneumatic Tube Exit & Trapezoidal Strain Relief Boot */}
                  <path d="M 210 262 L 200 290 L 225 290 L 217 262 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />

                  {/* Medical TPU Flexible Hose (Continuous Anti-Kinking Curve) */}
                  <path d="M 212 290 C 212 330, 290 345, 330 315 C 360 295, 380 320, 400 320" 
                        fill="none" stroke="#64748B" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 212 290 C 212 330, 290 345, 330 315 C 360 295, 380 320, 400 320" 
                        fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
                  <path d="M 212 290 C 212 330, 290 345, 330 315 C 360 295, 380 320, 400 320" 
                        fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

                  {/* Metal Quick-Fit Connector (CB03 Precision Nickel-Plated Brass) */}
                  <g id="connectorHead" transform="translate(400, 310)">
                    <rect x="0" y="0" width="34" height="20" rx="3" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
                    <line x1="6" y1="2" x2="6" y2="18" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="10" y1="2" x2="10" y2="18" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="14" y1="2" x2="14" y2="18" stroke="#64748B" strokeWidth="1.5" />
                    <rect x="18" y="2" width="12" height="16" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                    <circle cx="24" cy="10" r="2.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                    <rect x="34" y="5" width="12" height="10" rx="1" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
                    <rect x="37" y="4" width="4" height="12" rx="1" fill="#0F172A" />
                  </g>

                  {/* Technical CAD Dimensions & Pointer Callout Lines */}
                  <g id="callouts" stroke="#0047FF" strokeWidth="1" opacity="0.85">
                    <line x1="280" y1="80" x2="280" y2="40" />
                    <line x1="280" y1="40" x2="220" y2="40" />
                    <circle cx="280" cy="80" r="2.5" fill="#0047FF" />

                    <line x1="270" y1="330" x2="270" y2="355" />
                    <line x1="270" y1="355" x2="190" y2="355" />
                    <circle cx="270" cy="330" r="2.5" fill="#0047FF" />

                    <line x1="420" y1="310" x2="420" y2="280" />
                    <line x1="420" y1="280" x2="350" y2="280" />
                    <circle cx="420" cy="310" r="2.5" fill="#0047FF" />
                  </g>
                  <text x="215" y="37" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#0047FF" textAnchor="end">Ultrasonic Seam &gt;600 mmHg</text>
                  <text x="185" y="352" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#0047FF" textAnchor="end">Medical TPU Anti-Kink Tube</text>
                  <text x="345" y="277" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#0047FF" textAnchor="end">CB03 Ball-Locking Metal Plug</text>
                </svg>
              </div>

              {/* Clean Non-Obscuring Footer Status Strip */}
              <div className="mt-2 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-medkeNavy">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>100% Water Submersion Tested (300 mmHg · &le; 3 mmHg/min drop)</span>
                </div>
                <span className="font-mono text-slate-400 text-[10px]">TÜV SÜD ISO 13485:2016</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
