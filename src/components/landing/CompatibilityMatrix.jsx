import React, { useState } from 'react';
import { Layers, ArrowRight, Zap, Check } from 'lucide-react';

export default function CompatibilityMatrix({ data, onSelectModel }) {
  const [activeBrand, setActiveBrand] = useState(data.brands[0]?.id || 'philips');

  const currentItems = data.items[activeBrand] || [];

  const handleQuoteClick = (item) => {
    const modelText = `${item.model} [OEM P/N: ${item.oemPn}]`;
    if (onSelectModel) {
      onSelectModel(modelText);
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Cross-Reference Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Direct OEM Compatibility Cross-Reference
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Select your monitor brand to verify exact pin configurations, cable lengths, and compatible part numbers.
          </p>
        </div>

        {/* Brand Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {data.brands.map((b) => {
            const isActive = b.id === activeBrand;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBrand(b.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-600'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {b.name}
              </button>
            );
          })}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Monitor Model / Series</th>
                  <th scope="col" className="px-5 py-3.5">Type & Spec</th>
                  <th scope="col" className="px-5 py-3.5">Connector / Pinout</th>
                  <th scope="col" className="px-5 py-3.5">OEM Equivalent P/N</th>
                  <th scope="col" className="px-5 py-3.5 hidden md:table-cell">Medke Advantage</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {item.model}
                    </td>
                    <td className="px-5 py-4 text-slate-700 font-medium">
                      {item.sensorType}
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-xs">
                      {item.pinout}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-xs font-semibold">
                        {item.oemPn}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-xs text-slate-600">
                      <div className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleQuoteClick(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-bold transition-all duration-150 cursor-pointer shadow-sm group-hover:bg-blue-600 group-hover:text-white"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Get Quote</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Prompt */}
          <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <span className="font-medium">
              Can't find your specific monitor brand or OEM part number? We manufacture custom pinout adapters.
            </span>
            <button
              type="button"
              onClick={() => onSelectModel && onSelectModel('Custom / Unlisted Model')}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
            >
              <span>Consult Engineering Team</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
