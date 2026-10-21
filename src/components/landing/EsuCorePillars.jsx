import React, { useState, useEffect, useRef } from 'react';

export default function EsuCorePillars({ data, onPrefill, onOpenLightbox, onScrollToHub }) {
  const { systemA, systemB } = data;
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % systemA.slides.length);
    }, 3800);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, systemA.slides.length]);

  return (
    <section id="core-pillars" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-bold tracking-wider uppercase text-medkeBlue">
            Core self-manufactured systems
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-2">
            Two Product Systems, Separated by Clinical Function
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Patient return products complete the monopolar current path. Bipolar cables connect the generator directly to bipolar forceps. Each system now has its own selection logic.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* System A Card */}
          <article id="grounding-pads" className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Carousel & Highlights */}
              <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-wider text-medkeBlue uppercase">
                    {systemA.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {systemA.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-medkeNavy mt-3">
                  {systemA.title}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {systemA.description}
                </p>

                {/* System A Carousel */}
                <div
                  className="mt-5"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  <div className="relative h-72 bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    {systemA.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => onOpenLightbox(slide.imgSrc, slide.title)}
                        className={`absolute inset-0 w-full h-full cursor-zoom-in transition-opacity duration-700 ease-in-out ${
                          idx === slideIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                        aria-label={`Enlarge ${slide.title}`}
                      >
                        <img
                          src={slide.imgSrc}
                          alt={slide.alt}
                          className="w-full h-full object-contain photo-zoom transition-transform duration-350 hover:scale-105"
                          loading="eager"
                        />
                      </button>
                    ))}
                    <span className="absolute left-3 top-3 z-10 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-medkeNavy border border-slate-200 shadow-sm pointer-events-none">
                      {systemA.slides[slideIndex]?.label}
                    </span>
                  </div>

                  {/* Carousel Dots */}
                  <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="Select product image">
                    {systemA.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setSlideIndex(idx)}
                        onMouseEnter={() => setSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === slideIndex ? 'w-6 bg-[#0047FF]' : 'w-2 bg-slate-300'
                        }`}
                        aria-label={`Show ${slide.label}`}
                        aria-selected={idx === slideIndex}
                      />
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {systemA.highlights.map((h, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
                      <p className="text-xs font-medium text-slate-500">{h.label}</p>
                      <p className="font-bold text-medkeNavy text-sm mt-0.5">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Selection Matrix */}
              <div id="plate-cables" className="lg:col-span-7 p-6 sm:p-8 scroll-mt-24">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Selection matrix</p>
                    <h4 className="text-sm font-bold text-medkeNavy mt-1">Pad Type → Return Lead → Generator Port</h4>
                  </div>
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    REM / CQM options
                  </span>
                </div>

                <div className="overflow-x-auto no-scrollbar mt-5 rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[680px] text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="text-left px-4 py-3.5">SKU</th>
                        <th className="text-left px-4 py-3.5">Product / interface</th>
                        <th className="text-left px-4 py-3.5">Key specification</th>
                        <th className="text-left px-4 py-3.5">Use case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {systemA.matrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-3.5 font-semibold text-medkeBlue">{row.sku}</td>
                          <td className="px-4 py-3.5 font-semibold text-slate-800">{row.product}</td>
                          <td className="px-4 py-3.5 text-slate-700">{row.spec}</td>
                          <td className="px-4 py-3.5 text-slate-600">{row.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-medkeNavy text-sm">Qualification input</p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Send the generator model, return-port photo, required plate type and current OEM reference. We will review the complete pad-and-lead path before sampling.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onPrefill('Grounding Pads & Return Cables', 'CP1008 / CP1020 / CP1013 patient return system and matching return lead')}
                  className="mt-5 w-full py-3.5 rounded-xl bg-medkeNavy hover:bg-medkeNavyHover text-white font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Request a Pad + Return Lead Match
                </button>
              </div>

            </div>
          </article>

          {/* System B Card */}
          <article id="bipolar-cables" className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Image & Highlights */}
              <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-wider text-indigo-700 uppercase">
                    {systemB.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {systemB.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-medkeNavy mt-3">
                  {systemB.title}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {systemB.description}
                </p>

                {/* System B Product Image */}
                <button
                  type="button"
                  onClick={() => onOpenLightbox(systemB.imgSrc, systemB.titleLightbox)}
                  className="mt-5 h-72 bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-zoom-in relative"
                  aria-label="Enlarge autoclavable bipolar forceps cable configurations"
                >
                  <img
                    src={systemB.imgSrc}
                    alt={systemB.alt}
                    className="w-full h-full object-contain photo-zoom transition-transform duration-350 hover:scale-105"
                    loading="eager"
                  />
                </button>

                {/* Highlights (4 specs) */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {systemB.highlights.map((h, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
                      <p className="text-xs font-medium text-slate-500">{h.label}</p>
                      <p className="font-bold text-medkeNavy text-sm mt-0.5">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Representative Selection Matrix */}
              <div className="lg:col-span-7 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Representative selection matrix</p>
                    <h4 className="text-sm font-bold text-medkeNavy mt-1">Generator Plug → Instrument Connector</h4>
                  </div>
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                    Reusable silicone
                  </span>
                </div>

                <div className="overflow-x-auto no-scrollbar mt-5 rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[680px] text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="text-left px-4 py-3.5">SKU</th>
                        <th className="text-left px-4 py-3.5">Generator side</th>
                        <th className="text-left px-4 py-3.5">Instrument side</th>
                        <th className="text-left px-4 py-3.5">Typical ecosystem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {systemB.matrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-3.5 font-semibold text-medkeBlue">{row.sku}</td>
                          <td className="px-4 py-3.5 font-semibold text-slate-800">{row.genSide}</td>
                          <td className="px-4 py-3.5 text-slate-700">{row.instSide}</td>
                          <td className="px-4 py-3.5 text-slate-600">{row.ecosystem}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-medkeNavy text-sm">Do not select by brand name alone</p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Port geometry can vary within one generator family. Use the Bipolar Cable Hub for a candidate SKU, then confirm with port photos and a sample.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onScrollToHub}
                  className="mt-5 block w-full py-3.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-center font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Open the Bipolar Cable Compatibility Hub
                </button>
              </div>

            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
