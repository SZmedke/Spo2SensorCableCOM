import React from 'react';
import { ShieldCheck, Download, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function LandingHero({ data, onOpenBrochure }) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-blue-500', 'transition-all');
          setTimeout(() => {
            card.classList.remove('ring-4', 'ring-blue-500');
          }, 1500);
        }
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Regulatory Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{data.eyebrow}</span>
            </div>

            {/* Main Headline & Lead */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-[1.25] lg:leading-[1.28]">
                {data.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {data.lead}
              </p>
            </div>

            {/* Stat Counters Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-700/60 bg-slate-800/40 rounded-2xl px-5 backdrop-blur-sm">
              {data.metrics.map((m, idx) => (
                <div key={idx} className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-blue-400 tracking-tight">{m.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-blue-200 animate-pulse" />
                <span>Get Direct Factory Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download 2026 Medke Brochure (PDF)</span>
              </button>
            </div>

            {/* Trust assurances */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400">
              {data.trustBadges.map((badge, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Product Spec Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md">
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{data.heroCard.badge}</span>
              </div>

              {/* Product Visual Showcase */}
              <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-800/60 border border-slate-700/50 flex items-center justify-center p-4 group">
                <img
                  src={data.heroCard.image}
                  alt={data.heroCard.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Card Meta */}
              <div className="mt-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{data.heroCard.title}</h3>
                  <p className="text-xs text-slate-400">{data.heroCard.subtitle}</p>
                </div>

                {/* Specs list */}
                <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs">
                  {data.heroCard.specs.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-medium shrink-0">{item.label}</span>
                      <span className="text-slate-200 text-right font-mono text-[11px] sm:text-xs">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Custom Pinout & Spec Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
