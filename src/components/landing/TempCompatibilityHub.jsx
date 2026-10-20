import React, { useState } from 'react';

export default function TempCompatibilityHub({
  monitorSystems,
  sensorTypes,
  onInquire
}) {
  const [selectedMonitorId, setSelectedMonitorId] = useState('philips');
  const [selectedSensorId, setSelectedSensorId] = useState('adult_cavity');
  const [copied, setCopied] = useState(false);

  const currentSelectedMonitor = monitorSystems.find((m) => m.id === selectedMonitorId) || monitorSystems[0];
  const currentSelectedSensor = sensorTypes.find((s) => s.id === selectedSensorId) || sensorTypes[0];

  let standard = 'YSI 400 (2.252 kΩ @ 25°C)';
  if (currentSelectedMonitor.id === 'ysi700') {
    standard = 'YSI 700 (6kΩ/30kΩ Dual NTC)';
  } else if (currentSelectedMonitor.id === 'ge_ohmeda') {
    standard = '10K NTC Thermistor System';
  }

  let partNumber = '';
  if (currentSelectedSensor.id === 'adapter_cable') {
    partNumber = `T02${currentSelectedMonitor.code}`;
  } else if (currentSelectedSensor.id === 'turbotemp') {
    partNumber = currentSelectedMonitor.id === 'welch_allyn' ? 'T7164' : 'T7125';
  } else if (currentSelectedSensor.id === 'disp_skin') {
    partNumber = 'T5106'; // Universal FDA 510(k) cleared disposable skin
  } else if (currentSelectedSensor.id === 'disp_cavity') {
    partNumber = 'T6106'; // Universal FDA 510(k) cleared disposable cavity
  } else {
    partNumber = `T${currentSelectedSensor.typeCode}3${currentSelectedMonitor.code}`;
  }

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(partNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleInquire = () => {
    if (onInquire) {
      onInquire({
        sku: partNumber,
        desc: `${currentSelectedSensor.cat} for ${currentSelectedMonitor.name}`,
        monitorBrand: currentSelectedMonitor.name,
        category: currentSelectedSensor.cat
      });
    }
  };

  return (
    <section id="compatibility-hub" className="py-16 lg:py-20 bg-gradient-to-b from-[#F8FAFC] via-[#EDF2FE]/40 to-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest uppercase text-medkeBlue block mb-2">
            INTERACTIVE SELECTION ENGINE · CROSS-REFERENCE DATABASE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight">
            Universal Temperature Compatibility Hub
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Select your monitor system and clinical application. Instantly retrieve Medke's exact part number, resistance standard, connector code, and OEM replacement cross-reference.
          </p>
        </div>

        {/* 3-Column Interactive Selector Console */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Step 1 - Select Monitor Brand (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-medkeBlue text-white font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-medkeNavy uppercase tracking-wider">Select Patient Monitor</h4>
              </div>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                {monitorSystems.map((m) => {
                  const isSelected = selectedMonitorId === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMonitorId(m.id)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
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
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected ? 'bg-medkeBlue text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {m.conn.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              * 20+ clinical systems supported.
            </div>
          </div>

          {/* Column 2: Step 2 - Select Probe Type / Anatomy (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-medkeBlue text-white font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-medkeNavy uppercase tracking-wider">Select Sensor Type</h4>
              </div>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                {sensorTypes.map((s) => {
                  const isSelected = selectedSensorId === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSensorId(s.id)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 border-medkeBlue ring-1 ring-medkeBlue shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-medkeNavy' : 'text-slate-800'}`}>
                          {s.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{s.sub}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-medkeNavy text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Type {s.typeCode}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              * Adult, Pediatric, Disposable &amp; Adapter.
            </div>
          </div>

          {/* Column 3: Step 3 - Real-Time Calculated Solution (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-gradient-to-b from-[#F8FAFC] to-white rounded-2xl p-5 border border-slate-200">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="text-xs font-mono font-bold text-medkeBlue uppercase">3. Matched Solution</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Verified Fit ✓
                </span>
              </div>

              {/* Calculated Part Number Display */}
              <div className="text-center py-3 bg-white rounded-xl border border-blue-100 shadow-xs mb-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">Medke Model Number</span>
                <span className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">{partNumber}</span>
              </div>

              {/* Configuration Specification Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Product Category:</span>
                  <span className="font-bold text-slate-800 text-right">{currentSelectedSensor.cat}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Target Monitor:</span>
                  <span className="font-bold text-slate-800 text-right">{currentSelectedMonitor.name}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Connector &amp; Standard:</span>
                  <span className="font-mono font-bold text-medkeNavy text-right">{currentSelectedMonitor.conn}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Thermistor Curve:</span>
                  <span className="font-mono font-bold text-slate-800 text-right">{standard}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 font-medium">OEM Cross-Ref:</span>
                  <span className="font-mono text-emerald-700 font-bold text-right">{currentSelectedMonitor.oemRef}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons in Card */}
            <div className="pt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleInquire}
                className="w-full py-3 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-bold text-xs shadow-md transition hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Inquire This Probe Model ⚡</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Part Number 📋'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
