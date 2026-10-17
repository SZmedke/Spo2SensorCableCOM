import React, { useState } from 'react';

export default function NibpConnectorHub({ connectorMatrix, brandTabs, onPrefillConnector }) {
  const [activeBrand, setActiveBrand] = useState('all');

  const filteredConnectors = connectorMatrix.filter((item) => {
    if (activeBrand === 'all') return true;
    return item.brandKey && item.brandKey.toLowerCase().includes(activeBrand.toLowerCase());
  });

  const handleAction = (connector) => {
    if (onPrefillConnector) {
      onPrefillConnector(connector.code + ' ' + connector.name, connector.brands);
    }
  };

  return (
    <section id="connector-hub" className="py-16 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Interoperability Directory
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeNavy tracking-tight">
            Universal Pneumatic Connector Cross-Reference Hub (30+ Models)
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Solve monitor fitting mismatch once and for all. Filter by patient monitor OEM brand to verify model codes, locking mechanisms, and tubing configurations. Click <strong>Get Quote ⚡</strong> to auto-attach any connector to your RFQ.
          </p>
        </div>

        {/* Brand Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {brandTabs.map((tab) => {
            const isActive = activeBrand === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveBrand(tab.key)}
                className={`brand-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-medkeNavy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Connector Cross-Reference Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Model P/N &amp; Type</th>
                  <th className="py-3.5 px-4 sm:px-6">Locking Mechanism &amp; Material</th>
                  <th className="py-3.5 px-4 sm:px-6">Compatible Monitor Systems</th>
                  <th className="py-3.5 px-4 sm:px-6">Lumen Circuit</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredConnectors.map((row) => (
                  <tr key={row.code} className="matrix-row hover:bg-blue-50/30 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                          row.color === 'blue' ? 'bg-blue-50 text-medkeBlue' :
                          row.color === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                          row.color === 'amber' ? 'bg-amber-50 text-amber-700' :
                          row.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {row.code}
                        </span>
                        <div>
                          <div className="font-bold text-medkeNavy">{row.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{row.subtext}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="text-xs text-slate-700">{row.locking}</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="font-bold text-medkeNavy">{row.brands}</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${row.lumenBadge || 'bg-blue-50 text-medkeBlue'}`}>
                        {row.lumen}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        type="button"
                        onClick={() => handleAction(row)}
                        className="px-3 py-1.5 rounded-lg bg-medkeBlue hover:bg-medkeBlueHover text-white text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        Get Quote ⚡
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
