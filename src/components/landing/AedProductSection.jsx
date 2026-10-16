import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function AedProductSection({ onPrefillModel, onOpenBrochure }) {
  const playerRef = useRef(null);

  useEffect(() => {
    let timer;

    const initPlayer = () => {
      if (typeof window === 'undefined') return;

      const container = playerRef.current;
      if (!container) return;

      // If player element is already rendered inside, do not duplicate
      if (container.querySelector('.kplayer, .kplayer-popover-placeholder, iframe')) {
        return;
      }

      // If VodPlayer constructor is loaded on window
      if (window.VodPlayer) {
        try {
          if (window.__KINGSWAY_EMBED_INIT_DONE__) {
            window.__KINGSWAY_EMBED_INIT_DONE__ = false;
          }
          if (typeof window.VodPlayer.initEmbed === 'function') {
            window.VodPlayer.initEmbed(window.VodPlayer);
          } else {
            new window.VodPlayer(container, {
              vid: '88290bc0c8',
              width: '100%',
              height: '100%',
              isEmbed: true,
              popoverPlay: true,
              fixedRatio: '16 / 9'
            });
          }
          return;
        } catch (e) {
          console.warn('Kingsway VodPlayer init warning:', e);
        }
      }

      // Ensure script tag exists if not already present
      let script = document.getElementById('kingsway-sdk-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'kingsway-sdk-script';
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = 'https://websdk.kingswayvideo.com/vod-player/latest/vod-player.min.js';
        document.head.appendChild(script);
      }

      const onLoad = () => {
        setTimeout(initPlayer, 50);
      };
      script.addEventListener('load', onLoad);

      timer = setTimeout(initPlayer, 200);
    };

    initPlayer();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section id="product-categories" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Clinical Defibrillation Solutions
          </div>
          <h2 className="text-3xl font-extrabold text-medkeNavy tracking-tight sm:text-4xl">
            Core AED Product Lines: Adult &amp; Pediatric Electrodes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Manufactured in our 4,000 sqm ISO 13485 Shenzhen facility with Class 100,000 cleanrooms. High conductivity, zero edge-burn risks, and hermetically sealed moisture-barrier foil packaging.
          </p>
        </div>

        {/* 2 Core Flagship Lines (Adult vs Pediatric Deep Comparison Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Flagship 1: Adult Defibrillation Electrode Pads */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-medkeBlue hover:shadow-xl transition duration-300 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform"></div>
            
            <div className="relative z-10">
              {/* Badge & Type Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-medkeNavy font-bold text-xs uppercase tracking-wider">
                  Adult Clinical Standard
                </span>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  Weight &gt; 25 kg (Age &gt; 8 yrs)
                </span>
              </div>

              {/* Title & Main Area Metric */}
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-medkeNavy">
                  Adult Defibrillation Pads
                </h3>
                <span className="text-2xl font-black text-medkeBlue">69 cm²</span>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Precision-formulated conductive hydrogel engineered for adults and older pediatric patients. Delivers optimal electrical impedance matching and uniform current dispersion, completely eliminating edge-burn hazards during high-energy 360J bi-phasic discharges and prolonged emergency pacing.
              </p>

              {/* Anatomical Placement & Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50/90 rounded-xl p-4 border border-slate-100 mb-6 text-xs">
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Anatomical Placement</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Antero-Lateral (Apex / Sternum)
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Leadwire &amp; Cable Length</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> 1.2m Heavy-Duty Flexible TPU
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Solid Hydrogel Shelf Life</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 24-Month Anti-Dry Guarantee
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Pacing Endurance</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Up to 50 Hours Non-Invasive Pacing
                  </span>
                </div>
              </div>

              {/* Clinical Features Bullet Points */}
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Multi-Brand Compatible Pinouts:</strong> CN534–CN581 precision terminals compatible with ZOLL, Philips, Physio-Control, Mindray, Nihon Kohden, Schiller, Primedic, Corpuls, etc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Packaging Protection:</strong> Hermetically sealed nitrogen-purged aluminum foil pouch protects gel hydration across global temperature extremes (-30°C to +65°C).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Clear Visual Cues:</strong> High-contrast anatomical diagrams printed directly on liners for zero-hesitation emergency application.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onPrefillModel('Adult Defibrillation Electrode Pads (69 cm²)')}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-medkeNavy hover:bg-medkeNavyHover text-white text-xs sm:text-sm font-bold text-center transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Adult Pads Quote &amp; MOQ</span>
                <span>⚡</span>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Datasheet (PDF)</span>
                <span>⬇</span>
              </button>
            </div>
          </div>

          {/* Flagship 2: Pediatric Defibrillation Electrode Pads */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-medkeBlue hover:shadow-xl transition duration-300 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform"></div>
            
            <div className="relative z-10">
              {/* Badge & Type Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  Pediatric Safety Attenuated
                </span>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  Weight &lt; 25 kg (Age 0–8 yrs)
                </span>
              </div>

              {/* Title & Main Area Metric */}
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-medkeNavy">
                  Pediatric Defibrillation Pads
                </h3>
                <span className="text-2xl font-black text-amber-600">60 cm²</span>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Specifically scaled for pediatric chest geometry with built-in internal energy attenuation circuitry. Safeguards fragile infant and child myocardium by automatically dampening standard adult defibrillation energy down to a safe, guideline-compliant 50 Joules maximum dose.
              </p>

              {/* Anatomical Placement & Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50/90 rounded-xl p-4 border border-slate-100 mb-6 text-xs">
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Anatomical Placement</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Antero-Posterior (Center Chest &amp; Back)
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Energy Attenuation Safety</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Built-in 50J Safe Voltage Divider
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Biocompatibility (ISO 10993)</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Ultra-Gentle Hypoallergenic Gel
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Target Age &amp; Weight Range</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Infants &amp; Children 0 to 8 Years
                  </span>
                </div>
              </div>

              {/* Clinical Features Bullet Points */}
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span><strong>Accidental Shock Protection:</strong> Even if connected to an adult monophasic/biphasic defibrillator set at 200J/360J, internal resistive attenuation restricts delivered myocardial energy to pediatric safe limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span><strong>Pediatric Skin Kindness:</strong> Medical-grade pressure-sensitive adhesive provides immediate strong adhesion while peeling away cleanly without epidermal stripping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span><strong>Intuitive Chest/Back Visuals:</strong> Child anatomy icons printed on protective liner guide first responders under high-stress rescue situations.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onPrefillModel('Pediatric Defibrillation Electrode Pads (60 cm²)')}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-medkeNavy hover:bg-medkeNavyHover text-white text-xs sm:text-sm font-bold text-center transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Pediatric Pads Quote &amp; MOQ</span>
                <span>⚡</span>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Datasheet (PDF)</span>
                <span>⬇</span>
              </button>
            </div>
          </div>

        </div>

        {/* PRODUCT DEMONSTRATION & OFFICIAL VIDEO SHOWCASE */}
        <div className="bg-gradient-to-br from-[#1C2568] via-medkeNavy to-[#0B1238] rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 text-white relative overflow-hidden">
          
          {/* Subtle Glow Accents */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-medkeBlue/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content: Video Headline & Product Demonstration Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 font-mono text-xs uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Official Product Showcase
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AED Defibrillation Electrode Pads Product Showcase &amp; Demonstration
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Take an up-close look at Medke's medical-grade defibrillation electrode pads in action. Watch our product showcase featuring hermetic foil pouch packaging, solid conductive hydrogel quality, flexible TPU leadwires, molded plug-and-play connectors, and clear anatomical placement guides for Adult and Pediatric emergency response.
              </p>

              {/* Video Key Product Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-200">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-mono font-bold text-[11px]">01</span>
                  <span className="font-medium">Hermetic Foil Pouch Packaging &amp; Rapid-Tear Notch Structure</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 font-mono font-bold text-[11px]">02</span>
                  <span className="font-medium">Adult 69cm² Pads &amp; Solid Medical Conductive Hydrogel Texture</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 font-mono font-bold text-[11px]">03</span>
                  <span className="font-medium">Pediatric 60cm² Pads with Clear Anatomical Application Diagrams</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-mono font-bold text-[11px]">04</span>
                  <span className="font-medium">Anti-Kink TPU Leadwires &amp; Precision Molded Direct-Fit Connectors</span>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onPrefillModel('Request Evaluation Sample Box (Adult & Pediatric)')}
                  className="px-5 py-2.5 rounded-xl bg-medkeBlue hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition shadow-glow-cta flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Evaluation Sample Pack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenBrochure}
                  className="text-xs font-semibold text-emerald-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Download Brochure (PDF)</span>
                </button>
              </div>
            </div>

            {/* Right: Embedded Product Demonstration Video Player */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-white/20 shadow-2xl">
                {/* Kingsway Player Embed Code */}
                <div
                  ref={playerRef}
                  data-kingsway-player="88290bc0c8"
                  data-width="100%"
                  data-height="100%"
                  style={{
                    aspectRatio: '16 / 9',
                    backgroundImage: "url('https://static.kingswayvideo.com/102648701945724985585/vod/88290bc0c8/cover.jpg?imageMogr2/format/webp/thumbnail/!30p?t=1792057553407')",
                    backgroundSize: 'auto 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#000'
                  }}
                />
              </div>

              {/* Video Bottom Product Information Bar */}
              <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 px-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-medium text-white">Shenzhen Medke Technology — AED Electrode Pads Demonstration</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">1080P HD · Official Product Showcase</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
