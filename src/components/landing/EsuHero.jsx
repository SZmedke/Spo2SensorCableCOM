import React from 'react';

export default function EsuHero({ data, onOpenBrochure, onScrollToForm }) {
  const { trustBadges, hero } = data;

  return (
    <section id="hero" className="relative pt-10 pb-14 lg:pt-14 lg:pb-20 bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Trust Badges Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {trustBadges.map((badge, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medkeNavy text-xs font-bold border border-slate-200 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
              {badge.text}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-[.13em] uppercase text-medkeBlue block">
                {hero.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-medkeNavy leading-tight tracking-tight">
                {hero.title} <span className="text-medkeBlue">{hero.titleAccent}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {hero.subtitle}
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
              {hero.checklist.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                type="button"
                onClick={onScrollToForm}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-bold shadow-glow-cta cursor-pointer transition-all"
              >
                Request a Compatible Factory Quote
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-medkeNavy text-sm font-bold border border-slate-300 shadow-sm cursor-pointer transition-all"
              >
                <svg className="w-4 h-4 text-medkeBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
                Download 2026 ESU Catalog
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {hero.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="font-bold text-medkeNavy whitespace-nowrap text-sm lg:text-base">{m.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right CAD Schematic */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/95 rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-medkeBlue animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-medkeNavy uppercase tracking-wider">
                    Reusable silicone patient plate
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Engineering schematic
                </span>
              </div>

              {/* Desktop SVG */}
              <svg
                viewBox="0 0 520 400"
                className="hidden sm:block w-full h-auto mt-2"
                role="img"
                aria-label="Reusable conductive silicone patient plate with strain relief, coiled lead and dual safety plugs"
              >
                <defs>
                  <pattern id="esuGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="#EEF2F7" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="plateCarbon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#111827" />
                    <stop offset=".55" stopColor="#253247" />
                    <stop offset="1" stopColor="#0B1220" />
                  </linearGradient>
                  <linearGradient id="bootCarbon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#0F172A" />
                    <stop offset=".5" stopColor="#475569" />
                    <stop offset="1" stopColor="#111827" />
                  </linearGradient>
                  <filter id="cadShadow" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#243181" floodOpacity=".18" />
                  </filter>
                </defs>
                <rect width="520" height="400" rx="18" fill="url(#esuGrid)" />
                <g fontFamily="monospace">
                  <rect x="18" y="14" width="224" height="54" rx="10" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
                  <text x="31" y="36" fontSize="15" fontWeight="800" fill="#1E40AF">CONDUCTIVE SILICONE</text>
                  <text x="31" y="54" fontSize="14.5" fontWeight="600" fill="#475569">Flexible carbon · 4.5mm</text>
                  <polyline points="130,68 130,105 184,153" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="184" cy="153" r="4" fill="#2563EB" />

                  <rect x="278" y="14" width="224" height="54" rx="10" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
                  <text x="291" y="36" fontSize="15" fontWeight="800" fill="#047857">HIGH-FLEX SHIELDED LEAD</text>
                  <text x="291" y="54" fontSize="14.5" fontWeight="600" fill="#475569">Coiled · 3.0 / 5.0 m</text>
                  <polyline points="390,68 390,75 375,84" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="375" cy="84" r="4" fill="#059669" />
                </g>
                <g filter="url(#cadShadow)">
                  <path d="M122 155 C122 146 132 139 144 139 H412 C423 139 431 147 431 158 V241 C431 252 423 260 412 260 H144 C132 260 122 253 122 244Z" fill="url(#plateCarbon)" stroke="#334155" strokeWidth="2" />
                  <path d="M122 171 H102 C94 171 89 177 82 182 L58 197 L82 212 C89 217 94 223 102 223 H122Z" fill="url(#bootCarbon)" stroke="#334155" strokeWidth="2" />
                  <path d="M58 197 C28 197 27 158 46 139 C62 123 88 118 109 113" fill="none" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
                  <path d="M109 113 C137 98 175 90 216 91 C257 92 274 116 251 128 C229 140 189 124 202 101 C217 75 278 68 326 76 C371 84 382 111 353 125 C325 139 284 119 296 94 C307 72 358 67 394 77" fill="none" stroke="#1F2937" strokeWidth="7" strokeLinecap="round" />
                  <path d="M394 77 C424 82 438 91 452 105" fill="none" stroke="#1F2937" strokeWidth="7" strokeLinecap="round" />
                  <path d="M452 105 L469 121" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
                  <path d="M451 107 L457 139" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
                  <rect x="465" y="115" width="19" height="9" rx="4" transform="rotate(41 465 115)" fill="#334155" />
                  <line x1="478" y1="130" x2="491" y2="142" stroke="#C0C8D2" strokeWidth="4" strokeLinecap="round" />
                  <rect x="451" y="134" width="19" height="9" rx="4" transform="rotate(80 451 134)" fill="#334155" />
                  <line x1="455" y1="151" x2="458" y2="167" stroke="#C0C8D2" strokeWidth="4" strokeLinecap="round" />
                  <path d="M149 157 H404" stroke="#64748B" strokeWidth="1" opacity=".45" />
                  <path d="M149 242 H404" stroke="#020617" strokeWidth="1" opacity=".65" />
                </g>
                <g fontFamily="monospace">
                  <rect x="18" y="276" width="224" height="56" rx="10" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
                  <text x="31" y="298" fontSize="15" fontWeight="800" fill="#C2410C">WIDENED MOLDED SR BOOT</text>
                  <text x="31" y="317" fontSize="14.5" fontWeight="600" fill="#475569">Molded pull protection</text>
                  <polyline points="112,276 112,248 92,217" fill="none" stroke="#EA580C" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="92" cy="217" r="4" fill="#EA580C" />

                  <rect x="278" y="276" width="224" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
                  <text x="291" y="298" fontSize="15" fontWeight="800" fill="#1E40AF">DUAL 4.0 mm SAFETY PLUGS</text>
                  <text x="291" y="317" fontSize="14.5" fontWeight="600" fill="#475569">Separated dual leads</text>
                  <polyline points="390,276 482,246 482,143" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="482" cy="143" r="4" fill="#2563EB" />
                </g>
                <rect x="18" y="342" width="484" height="40" rx="9" fill="#243181" />
                <text x="260" y="359" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="800" fill="white">
                  134°C AUTOCLAVE TARGET · 50 CYCLES
                </text>
                <text x="260" y="375" textAnchor="middle" fontFamily="monospace" fontSize="14.5" fontWeight="700" fill="#BFDBFE">
                  3000 V AC DESIGN · ≥10,000 FLEX CYCLES
                </text>
              </svg>

              {/* Mobile SVG */}
              <svg
                viewBox="0 0 520 245"
                className="sm:hidden w-full h-auto mt-3 rounded-xl bg-slate-50"
                role="img"
                aria-label="Mobile schematic of reusable silicone patient plate and dual safety plugs"
              >
                <defs>
                  <linearGradient id="mobilePlateCarbon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#111827" />
                    <stop offset=".55" stopColor="#253247" />
                    <stop offset="1" stopColor="#0B1220" />
                  </linearGradient>
                </defs>
                <path d="M104 116 C104 104 116 96 130 96 H402 C415 96 424 105 424 118 V204 C424 217 415 226 402 226 H130 C116 226 104 218 104 205Z" fill="url(#mobilePlateCarbon)" stroke="#334155" strokeWidth="3" />
                <path d="M104 132 H84 C75 132 69 138 61 144 L32 162 L61 180 C69 186 75 192 84 192 H104Z" fill="#1F2937" stroke="#334155" strokeWidth="3" />
                <path d="M32 162 C8 162 13 122 40 104 C62 90 91 83 126 78" fill="none" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
                <path d="M126 78 C163 58 218 51 262 59 C303 67 305 94 273 99 C241 104 217 82 237 63 C260 40 327 42 373 53 C407 61 425 73 443 90" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
                <path d="M443 90 L467 111 M441 92 L448 129" fill="none" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
                <rect x="459" y="104" width="22" height="11" rx="5" transform="rotate(40 459 104)" fill="#334155" />
                <line x1="475" y1="121" x2="491" y2="136" stroke="#B8C2CE" strokeWidth="5" strokeLinecap="round" />
                <rect x="442" y="123" width="22" height="11" rx="5" transform="rotate(80 442 123)" fill="#334155" />
                <line x1="447" y1="143" x2="450" y2="162" stroke="#B8C2CE" strokeWidth="5" strokeLinecap="round" />
              </svg>

              {/* Mobile Spec Grid */}
              <div className="sm:hidden grid grid-cols-2 gap-2 mt-3 text-xs leading-snug">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                  <strong className="block text-blue-800">Conductive silicone matrix</strong>
                  <span className="text-slate-600">Flexible 4.5 mm body</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                  <strong className="block text-emerald-800">High-flex shielded lead</strong>
                  <span className="text-slate-600">3.0 m standard</span>
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-100">
                  <strong className="block text-orange-800">Widened molded SR boot</strong>
                  <span className="text-slate-600">Overmoulded protection</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="block text-medkeNavy">Dual 4.0 mm safety plugs</strong>
                  <span className="text-slate-600">Separated connectors</span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-medkeNavy border border-blue-900 text-center">
                  <strong className="block text-white">134°C autoclave target · 50 cycles</strong>
                  <span className="text-blue-200">3000 V AC · ≥10,000 flex cycles</span>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-500 text-center mt-2">
                Concept schematic for engineering communication; final specifications follow the approved SKU file.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
