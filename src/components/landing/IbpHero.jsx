import React from 'react';

export default function IbpHero({ data, onOpenBrochure }) {
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
    <section id="hero" className="relative pt-10 pb-14 lg:pt-14 lg:pb-18 bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badges Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {data.trustBadges.map((badge, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold shadow-xs border border-slate-200">
              <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
              {badge.text}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-medkeBlue block">
                {data.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-medkeNavy leading-tight tracking-tight">
                {data.title}
                <span className="block text-2xl sm:text-3xl font-extrabold text-medkeBlue mt-2">
                  {data.subtitle}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl pt-1">
                {data.lead}
              </p>
            </div>

            {/* Feature Checklist Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-700">
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

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-base font-bold shadow-glow-cta transition hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Factory Wholesale Quote 🚀</span>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-medkeNavy text-sm font-bold border border-slate-300 shadow-sm transition hover:border-medkeBlue cursor-pointer"
              >
                <svg className="w-4 h-4 text-medkeBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download 2026 IBP Catalog (PDF)</span>
              </button>
            </div>

            {/* 4 Compact Metric Badges (Strictly aligned to design) */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {data.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-medkeBlue/40 transition">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${metric.dot} shrink-0`}></span>
                      <span className={`text-xs sm:text-sm lg:text-base font-extrabold text-medkeNavy tracking-tight ${metric.nowrap ? 'whitespace-nowrap' : ''}`}>
                        {metric.value}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5 whitespace-nowrap">{metric.title}</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{metric.sub}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Hero Right CAD Schematic (Vector Precision Engineering) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white/95 backdrop-blur rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/90 overflow-hidden">
              
              {/* Clean Header with Embedded Badges */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-medkeBlue animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-medkeNavy uppercase tracking-wider">B Series Cable Anatomy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-2xs">
                    ✓ CE MDR Class I DoC
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">SCALE 1:1</span>
                </div>
              </div>

              {/* CAD SVG Engineering Schematic */}
              <div className="w-full flex items-center justify-center py-2">
                <svg viewBox="0 0 460 360" className="w-full h-auto max-w-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background subtle grid */}
                  <pattern id="cadGridIbp" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                  <rect width="460" height="360" fill="url(#cadGridIbp)" rx="16" />

                  {/* Monitor Connector (Left) */}
                  <rect x="25" y="140" width="60" height="80" rx="8" fill="#1E293B" stroke="#0047FF" strokeWidth="2" />
                  <rect x="15" y="152" width="12" height="56" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
                  {/* Pin array representation */}
                  <circle cx="21" cy="162" r="2.5" fill="#F59E0B" />
                  <circle cx="21" cy="172" r="2.5" fill="#F59E0B" />
                  <circle cx="21" cy="182" r="2.5" fill="#F59E0B" />
                  <circle cx="21" cy="192" r="2.5" fill="#F59E0B" />

                  {/* Left Strain Relief Boot */}
                  <path d="M 85 150 L 125 160 L 125 200 L 85 210 Z" fill="#334155" stroke="#475569" strokeWidth="1.5" />
                  <line x1="95" y1="155" x2="95" y2="205" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="105" y1="157" x2="105" y2="203" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="115" y1="159" x2="115" y2="201" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Cable Jacket (Outer Medical TPU) */}
                  <rect x="125" y="162" width="210" height="36" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

                  {/* Cutaway Window: Revealing Internal Shielding & Multi-Conductors */}
                  <rect x="150" y="164" width="160" height="32" rx="3" fill="#0F172A" />

                  {/* Shielding Layer 1: Braided Tinned Copper Mesh (>95% ESU Noise Stop) */}
                  <path d="M 152 166 L 200 166 L 195 194 L 152 194 Z" fill="#94A3B8" opacity="0.8" />
                  <g stroke="#CBD5E1" strokeWidth="1" opacity="0.6">
                    <line x1="155" y1="166" x2="180" y2="194" />
                    <line x1="165" y1="166" x2="190" y2="194" />
                    <line x1="175" y1="166" x2="195" y2="188" />
                    <line x1="180" y1="166" x2="155" y2="194" />
                    <line x1="190" y1="166" x2="165" y2="194" />
                    <line x1="195" y1="172" x2="175" y2="194" />
                  </g>

                  {/* Shielding Layer 2: Aluminum Mylar Foil */}
                  <path d="M 198 167 L 235 167 L 230 193 L 196 193 Z" fill="#64748B" />
                  <text x="214" y="183" fontSize="7" fontFamily="monospace" fill="#E2E8F0" textAnchor="middle">AL-FOIL</text>

                  {/* Layer 3: High-Tension Kevlar Aramid Core */}
                  <line x1="235" y1="180" x2="305" y2="180" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3 2" />

                  {/* Layer 4: Twisted Pair Precision Conductors (Color-coded) */}
                  <path d="M 233 173 Q 255 169 275 174 T 305 172" stroke="#EF4444" strokeWidth="2" fill="none" />
                  <path d="M 233 177 Q 255 182 275 177 T 305 178" stroke="#3B82F6" strokeWidth="2" fill="none" />
                  <path d="M 233 183 Q 255 187 275 182 T 305 184" stroke="#10B981" strokeWidth="2" fill="none" />
                  <path d="M 233 187 Q 255 183 275 188 T 305 188" stroke="#F59E0B" strokeWidth="2" fill="none" />

                  {/* Right Strain Relief Boot */}
                  <path d="M 335 160 L 375 150 L 375 210 L 335 200 Z" fill="#334155" stroke="#475569" strokeWidth="1.5" />
                  <line x1="345" y1="159" x2="345" y2="201" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="355" y1="157" x2="355" y2="203" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="365" y1="155" x2="365" y2="205" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Transducer Connector (Right - Edwards TruWave / B.Braun Interface Standard) */}
                  <rect x="375" y="142" width="65" height="76" rx="6" fill="#1E293B" stroke="#0047FF" strokeWidth="2" />
                  {/* Keyed Slot / Latch Mechanism */}
                  <rect x="420" y="156" width="16" height="48" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                  <circle cx="400" cy="165" r="4" fill="#F59E0B" />
                  <circle cx="400" cy="180" r="4" fill="#F59E0B" />
                  <circle cx="400" cy="195" r="4" fill="#F59E0B" />

                  {/* Engineering Callout Annotations */}
                  {/* Callout 1: Monitor End */}
                  <line x1="55" y1="135" x2="55" y2="70" stroke="#0047FF" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="55" cy="135" r="2.5" fill="#0047FF" />
                  <rect x="15" y="42" width="105" height="26" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
                  <text x="67" y="55" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#1E40AF" textAnchor="middle">MONITOR END</text>
                  <text x="67" y="64" fontSize="7.5" fontFamily="monospace" fill="#3B82F6" textAnchor="middle">Philips/GE/Mindray</text>

                  {/* Callout 2: High-Density Shielding */}
                  <line x1="175" y1="165" x2="175" y2="105" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="175" cy="165" r="2.5" fill="#10B981" />
                  <rect x="120" y="75" width="125" height="28" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
                  <text x="182" y="88" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="#065F46" textAnchor="middle">&gt;95% BRAIDED SHIELD</text>
                  <text x="182" y="98" fontSize="7.5" fontFamily="monospace" fill="#047857" textAnchor="middle">ESU Electrocautery Noise</text>

                  {/* Callout 3: Medical TPU Jacket */}
                  <line x1="225" y1="200" x2="225" y2="280" stroke="#64748B" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="225" cy="200" r="2.5" fill="#64748B" />
                  <rect x="160" y="280" width="130" height="28" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                  <text x="225" y="293" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="#334155" textAnchor="middle">MEDICAL GRAY TPU</text>
                  <text x="225" y="303" fontSize="7.5" fontFamily="monospace" fill="#64748B" textAnchor="middle">10,000+ Flex Fatigue Cycles</text>

                  {/* Callout 4: Sensor End */}
                  <line x1="410" y1="138" x2="410" y2="70" stroke="#0047FF" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="410" cy="138" r="2.5" fill="#0047FF" />
                  <rect x="350" y="42" width="105" height="26" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
                  <text x="402" y="55" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#1E40AF" textAnchor="middle">TRANSDUCER END</text>
                  <text x="402" y="64" fontSize="7.5" fontFamily="monospace" fill="#3B82F6" textAnchor="middle">Edwards/BD/B.Braun</text>

                  {/* Gold Pins Annotation Bottom Right */}
                  <line x1="400" y1="220" x2="400" y2="280" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="400" cy="220" r="2.5" fill="#F59E0B" />
                  <rect x="335" y="280" width="115" height="28" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
                  <text x="392" y="293" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="#92400E" textAnchor="middle">GOLD-PLATED PINS</text>
                  <text x="392" y="303" fontSize="7.5" fontFamily="monospace" fill="#B45309" textAnchor="middle">R &lt; 0.1 Ω / 5K+ Insertions</text>

                  {/* Bottom Status Metric */}
                  <rect x="30" y="325" width="400" height="24" rx="6" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
                  <text x="45" y="341" fontSize="8" fontFamily="monospace" fill="#475569">LENGTH: 3.0m - 3.5m STD</text>
                  <text x="210" y="341" fontSize="8" fontFamily="monospace" fill="#0E8345">● DIELECTRIC HIPOT: 1500V PASS</text>
                  <text x="365" y="341" fontSize="8" fontFamily="monospace" fill="#243181">ISO 13485:2016</text>
                </svg>
              </div>

              {/* CAD Footer Spec Strip */}
              <div className="mt-2 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 100% Signal Integrity Tested
                </span>
                <span>DWG NO: MEDKE-IBP-B-REV4</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
