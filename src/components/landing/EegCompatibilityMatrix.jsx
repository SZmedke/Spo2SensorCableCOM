import React, { useState } from 'react';

export default function EegCompatibilityMatrix({ data, onSelectModel }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredRows =
    activeTab === 'all'
      ? data.rows
      : data.rows.filter((row) => row.brandKey === activeTab);

  const handleRowClick = (queryModel, brandName) => {
    if (onSelectModel) {
      onSelectModel(queryModel, brandName);
    }
  };

  return (
    <section id="compatibility" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Clinical Engineering Interoperability Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeNavy tracking-tight">
            Compatible Headboxes &amp; Amplifiers by Brand
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            All Medke EEG electrodes and leadwires feature standard 1.5 mm DIN 42802 touchproof safety sockets. Click &ldquo;Get Quote ⚡&rdquo; to auto-fill the inquiry form for your department.
          </p>
        </div>

        {/* Mainstream Brand Filter Tabs (No search box, No Chinese) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {data.brandTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-medkeNavy text-white shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Compatibility Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Host System &amp; Manufacturer</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Compatible Input Box / Headbox</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Terminal Standard</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Recommended Medke Product</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Clinical Advantage</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Instant Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-4 sm:px-6 font-bold text-medkeNavy flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${row.dotColor}`}></span> {row.brandName}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-700">
                    {row.headbox}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-600">
                    {row.standard}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold mr-1 ${row.productBadgeClass}`}>
                      {row.product}
                    </span>
                    <span className="text-xs text-slate-500">{row.productSub}</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs text-slate-600">
                    {row.advantage}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleRowClick(row.queryModel, row.brandName)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-medkeBlue/10 hover:bg-medkeBlue text-medkeBlue hover:text-white font-bold text-xs transition cursor-pointer"
                    >
                      Get Quote ⚡
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Compatibility Notice */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>* Universal DIN 42802 compatibility across EBNeuro, Micromed, Bio-logic, and Brain Products systems.</span>
          <a href="#inquiry-form" className="text-medkeBlue hover:underline font-bold">
            Request Custom Headbox Pinout Match &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
