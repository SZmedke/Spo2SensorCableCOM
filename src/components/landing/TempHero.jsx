import React from 'react';

export default function TempHero({ data, onOpenBrochure, onScrollToForm }) {
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
                  High-precision NTC thermistor technology engineered for perioperative anesthesia, ICU infection control, NICU radiant warmers, and TurboTemp predictive vitals. Delivering <strong>±0.1°C continuous clinical accuracy</strong> across the core physiological range (25.0°C ~ 45.0°C) with fast thermal balance (τ &lt; 10s) and IPX7 immersion disinfection durability.
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
                  onClick={onScrollToForm}
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
                  <span>Download 2026 Temp Catalog (PDF)</span>
                </button>
              </div>

              {/* 4 Compact Metric Badges */}
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

            {/* Hero Right CAD Schematic: Single Reusable Temperature Probe */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white/95 backdrop-blur rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/90 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-medkeBlue animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-medkeNavy uppercase tracking-wider">Reusable Probe Anatomy · T2306</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-2xs">
                    ✓ FDA 510(k) K243000
                  </span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 520 400" className="w-full h-auto max-w-[460px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="T2306 reusable temperature probe cutaway engineering drawing">
                    <defs>
                      <pattern id="cadGridTemp" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M20 0H0V20" stroke="#EEF2F7" strokeWidth="1"/>
                      </pattern>
                      <linearGradient id="steelTip" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#F8FAFC"/>
                        <stop offset="0.45" stopColor="#CBD5E1"/>
                        <stop offset="1" stopColor="#94A3B8"/>
                      </linearGradient>
                      <linearGradient id="tpuJacket" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F8FAFC"/>
                        <stop offset="1" stopColor="#CBD5E1"/>
                      </linearGradient>
                    </defs>
                    <rect width="520" height="400" rx="18" fill="url(#cadGridTemp)"/>

                    {/* Upper callouts */}
                    <g fontFamily="monospace">
                      <rect x="22" y="24" width="148" height="42" rx="8" fill="#EFF6FF" stroke="#BFDBFE"/>
                      <text x="34" y="41" fontSize="10" fontWeight="700" fill="#1E40AF">316L BULLET TIP</text>
                      <text x="34" y="56" fontSize="8.5" fill="#64748B">Smooth φ4.0 mm profile</text>
                      <polyline points="102,66 102,112 82,156" stroke="#2563EB" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="82" cy="156" r="3" fill="#2563EB"/>

                      <rect x="188" y="24" width="150" height="42" rx="8" fill="#FFF7ED" stroke="#FED7AA"/>
                      <text x="200" y="41" fontSize="10" fontWeight="700" fill="#C2410C">NTC 2.252 kΩ CHIP</text>
                      <text x="200" y="56" fontSize="8.5" fill="#64748B">±0.1°C clinical accuracy</text>
                      <polyline points="263,66 263,104 123,171" stroke="#EA580C" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="123" cy="171" r="3" fill="#EA580C"/>

                      <rect x="354" y="24" width="144" height="42" rx="8" fill="#ECFDF5" stroke="#A7F3D0"/>
                      <text x="366" y="41" fontSize="10" fontWeight="700" fill="#047857">IPX7 DUAL SEAL</text>
                      <text x="366" y="56" fontSize="8.5" fill="#64748B">1 m / 30 min immersion</text>
                      <polyline points="426,66 426,104 176,166" stroke="#059669" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="176" cy="166" r="3" fill="#059669"/>
                    </g>

                    {/* Main T2306 reusable probe */}
                    <path d="M42 178 C42 153 61 138 88 138 H148 V202 H88 C61 202 42 187 42 178Z" fill="url(#steelTip)" stroke="#475569" strokeWidth="2"/>
                    <path d="M58 178 C58 162 71 153 91 153 H142 V187 H91 C71 187 58 181 58 178Z" fill="#E2E8F0" stroke="#94A3B8"/>
                    <rect x="101" y="158" width="30" height="25" rx="5" fill="#0F172A" stroke="#0047FF" strokeWidth="1.5"/>
                    <circle cx="116" cy="170.5" r="6" fill="#F97316" stroke="#C2410C"/>
                    <path d="M131 164 H151 M131 177 H151" stroke="#F59E0B" strokeWidth="2"/>
                    <text x="115" y="219" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#475569" textAnchor="middle">MEDICAL EPOXY ENCAPSULATION</text>

                    {/* Dual waterproof rings */}
                    <rect x="148" y="143" width="9" height="54" rx="3" fill="#0EA5E9" stroke="#0369A1"/>
                    <rect x="160" y="143" width="9" height="54" rx="3" fill="#38BDF8" stroke="#0369A1"/>

                    {/* Extended stepped strain relief boot */}
                    <path d="M169 147 L216 156 L216 184 L169 193Z" fill="#334155" stroke="#1E293B" strokeWidth="1.5"/>
                    <path d="M181 150 V190 M193 153 V187 M205 155 V185" stroke="#64748B" strokeWidth="2"/>

                    {/* TPU cable body */}
                    <rect x="216" y="157" width="174" height="26" rx="13" fill="url(#tpuJacket)" stroke="#64748B" strokeWidth="1.5"/>

                    {/* Cable cutaway window */}
                    <rect x="248" y="160" width="112" height="20" rx="8" fill="#0F172A"/>
                    <g stroke="#94A3B8" strokeWidth="1" opacity="0.75">
                      <path d="M252 161 L270 179 M262 161 L280 179 M272 161 L290 179 M282 161 L300 179 M292 161 L310 179 M302 161 L320 179 M312 161 L330 179 M322 161 L340 179 M332 161 L350 179"/>
                      <path d="M270 161 L252 179 M280 161 L262 179 M290 161 L272 179 M300 161 L282 179 M310 161 L292 179 M320 161 L302 179 M330 161 L312 179 M340 161 L322 179 M350 161 L332 179"/>
                    </g>
                    <path d="M252 166 Q264 175 276 166 T300 166 T324 166 T348 166" stroke="#38BDF8" strokeWidth="2"/>
                    <path d="M252 175 Q264 166 276 175 T300 175 T324 175 T348 175" stroke="#F97316" strokeWidth="2"/>
                    <line x1="252" y1="170.5" x2="354" y2="170.5" stroke="#FACC15" strokeWidth="2.5"/>

                    {/* Molded waterproof connector */}
                    <path d="M390 147 H457 Q468 147 468 158 V182 Q468 193 457 193 H390Z" fill="#243181" stroke="#0047FF" strokeWidth="2"/>
                    <path d="M390 153 L373 158 V182 L390 187Z" fill="#334155" stroke="#475569"/>
                    <path d="M379 159 V181 M385 156 V184" stroke="#64748B" strokeWidth="1.5"/>
                    <rect x="468" y="154" width="16" height="32" rx="4" fill="#64748B" stroke="#334155"/>
                    <line x1="484" y1="163" x2="503" y2="163" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                    <line x1="484" y1="177" x2="503" y2="177" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                    <text x="429" y="174" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#DBEAFE" textAnchor="middle">MOLDED 2-PIN</text>

                    {/* Lower callouts */}
                    <g fontFamily="monospace">
                      <polyline points="205,193 205,248 108,276" stroke="#475569" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="205" cy="193" r="3" fill="#475569"/>
                      <rect x="22" y="276" width="162" height="48" rx="8" fill="#F8FAFC" stroke="#CBD5E1"/>
                      <text x="34" y="294" fontSize="10" fontWeight="700" fill="#334155">STEPPED STRAIN RELIEF</text>
                      <text x="34" y="310" fontSize="8.5" fill="#64748B">&gt;10,000 flex cycles at ±90°</text>

                      <polyline points="302,181 302,246 278,276" stroke="#D97706" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="302" cy="181" r="3" fill="#D97706"/>
                      <rect x="194" y="276" width="164" height="48" rx="8" fill="#FFFBEB" stroke="#FDE68A"/>
                      <text x="206" y="294" fontSize="10" fontWeight="700" fill="#92400E">SHIELDED TPU CABLE</text>
                      <text x="206" y="310" fontSize="8.5" fill="#64748B">Twisted pair + Kevlar tensile core</text>

                      <polyline points="493,184 493,245 437,276" stroke="#2563EB" strokeWidth="1.3" strokeDasharray="4 3"/>
                      <circle cx="493" cy="184" r="3" fill="#2563EB"/>
                      <rect x="368" y="276" width="130" height="48" rx="8" fill="#EFF6FF" stroke="#BFDBFE"/>
                      <text x="380" y="294" fontSize="10" fontWeight="700" fill="#1E40AF">GOLD CONTACTS</text>
                      <text x="380" y="310" fontSize="8.5" fill="#64748B">Stable low-resistance signal</text>
                    </g>

                    {/* Technical performance strip */}
                    <rect x="22" y="346" width="476" height="32" rx="8" fill="#243181"/>
                    <text x="260" y="366" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                      ±0.1°C ACCURACY  ·  IPX7 WATERPROOF  ·  τ &lt; 10s  ·  10,000+ FLEX CYCLES
                    </text>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}
