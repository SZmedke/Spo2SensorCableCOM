import React, { useState } from 'react';

export default function IbpInterconnectHub({
  monitorSystems,
  transducerStandards,
  selectedMonitorId,
  selectedTransducerId,
  onSelectMonitor,
  onSelectTransducer,
  onInquire
}) {
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Fallback defaults
  const currentMonitor = monitorSystems.find((m) => m.id === selectedMonitorId) || monitorSystems[0];
  const currentTransducer = transducerStandards.find((t) => t.id === selectedTransducerId) || transducerStandards[0];

  const partNumber = `${currentTransducer.prefix}${currentMonitor.code}`;
  const cableTitle = `${currentMonitor.name} to ${currentTransducer.name} Compatible IBP Cable`;
  const monitorEndLabel = `${currentMonitor.name} (${currentMonitor.conn})`;
  const transducerEndLabel = `${currentTransducer.name} Interface`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(partNumber).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      });
    }
  };

  const handleApplyToRfq = () => {
    if (onInquire) {
      onInquire({
        sku: partNumber,
        desc: cableTitle,
        monitorBrand: currentMonitor.name,
        sensorStandard: currentTransducer.name
      });
    }
  };

  return (
    <section id="interconnect-hub" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-medkeSoft text-medkeNavy text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-medkeBlue animate-pulse"></span> Core Interactive Sizing Tool
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight mt-2.5">
            Dual-End Interconnect Hub
            <span className="block text-xl sm:text-2xl font-bold text-medkeBlue mt-1">
              Instant Monitor × Transducer Cable Cross-Matching
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Select your bedside patient monitor brand on the left and clinical transducer interface on the right. The engine instantly computes the exact Medke B Series part number, interface pinout, and wholesale specifications.
          </p>
        </div>

        {/* Main Hub Container */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Step 1 - Monitor Brand Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-medkeNavy text-white text-xs font-extrabold flex items-center justify-center">1</span>
                  <h3 className="text-sm font-bold text-medkeNavy uppercase tracking-wide">Select Bedside Monitor</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">20+ BRANDS</span>
              </div>

              {/* Monitor Options List */}
              <div className="space-y-2">
                {monitorSystems.map((m) => {
                  const isSelected = currentMonitor.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => onSelectMonitor && onSelectMonitor(m.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 border-medkeBlue ring-1 ring-medkeBlue shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-medkeNavy' : 'text-slate-800'}`}>
                          {m.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{m.sub}</div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isSelected ? 'bg-medkeBlue text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {m.conn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Step 2 - Transducer Standard Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-medkeBlue text-white text-xs font-extrabold flex items-center justify-center">2</span>
                  <h3 className="text-sm font-bold text-medkeNavy uppercase tracking-wide">Select Transducer Interface</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">10 STANDARDS</span>
              </div>

              {/* Transducer Options List */}
              <div className="space-y-2">
                {transducerStandards.map((t) => {
                  const isSelected = currentTransducer.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => onSelectTransducer && onSelectTransducer(t.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 border-medkeBlue ring-1 ring-medkeBlue shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-medkeNavy' : 'text-slate-800'}`}>
                          {t.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{t.sub}</div>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-medkeNavy text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.prefix}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Computed Result Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-2xl p-6 border-2 border-medkeBlue/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-medkeBlue text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Instant Match Result
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Medke SKU</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-medkeNavy font-mono tracking-tight">{partNumber}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">In Stock</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 mt-1 leading-snug">
                      {cableTitle}
                    </p>
                  </div>

                  {/* Dual End Connector Badges */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Monitor End:</span>
                      <span className="font-bold text-medkeNavy font-mono text-right">{monitorEndLabel}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-medium">Transducer End:</span>
                      <span className="font-bold text-medkeBlue font-mono text-right">{transducerEndLabel}</span>
                    </div>
                  </div>

                  {/* Specification Key Attributes */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Standard Length:</span>
                      <span className="font-semibold text-slate-800">3.0m (3.5m optional)</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Jacket Material:</span>
                      <span className="font-semibold text-slate-800">Medical Gray TPU (Anti-Kink)</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Shielding:</span>
                      <span className="font-semibold text-slate-800">&gt;95% Tinned Copper Braid</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Compliance:</span>
                      <span className="font-semibold text-emerald-700">CE MDR Class I · SFDA · ISO 13485</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Factory Warranty:</span>
                      <span className="font-bold text-medkeNavy">6 Months Free Replacement</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400">Standard MOQ:</span>
                      <span className="font-semibold text-slate-800">10 pcs (Samples Available)</span>
                    </div>
                  </div>

                  {/* Action CTA in Card */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleApplyToRfq}
                      className="w-full py-3 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-sm font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Inquire This Cable Model ⚡</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{copyFeedback ? 'Copied to Clipboard! ✓' : 'Copy Part Number'}</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
