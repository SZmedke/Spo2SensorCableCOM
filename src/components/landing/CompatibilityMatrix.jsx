import React, { useState } from 'react';

export const SPO2_COMPATIBILITY_DATA = {
  columnTypeLabel: 'Available Sensor Types',
  tabs: [
    { id: 'philips', label: 'Philips' },
    { id: 'ge', label: 'GE Healthcare' },
    { id: 'mindray', label: 'Mindray' },
    { id: 'masimo', label: 'Masimo' },
    { id: 'nellcor', label: 'Nellcor' },
    { id: 'drager', label: 'Dräger' },
    { id: 'nihon', label: 'Nihon Kohden' }
  ],
  items: [
    {
      brandId: 'philips',
      brandName: 'Philips Medical',
      dotColor: 'bg-blue-600',
      series: 'IntelliVue MP20-MP90, MX400-MX800, SureSigns VM4/VM6, FM20/30',
      pinout: '8-Pin D-Sub Connector / Round 12-Pin Keyed',
      badges: [
        { text: 'Adult Clip', style: 'bg-blue-50 text-blue-700' },
        { text: 'Soft Tip', style: 'bg-slate-100 text-slate-700' },
        { text: 'Adapter Cable', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Philips IntelliVue SpO2 Sensor (8-Pin D-Sub / M1191A)'
    },
    {
      brandId: 'ge',
      brandName: 'GE Healthcare',
      dotColor: 'bg-indigo-600',
      series: 'Dash 2500/3000/4000/5000, Solar 8000, Carescape B650/B850',
      pinout: '11-Pin Rectangle Connector (OxyTip+) / Datex-Ohmeda 7-Pin',
      badges: [
        { text: 'Adult Clip', style: 'bg-blue-50 text-blue-700' },
        { text: 'Pediatric Soft', style: 'bg-slate-100 text-slate-700' },
        { text: 'OxyTip+ Cable', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'GE Healthcare Dash / Carescape SpO2 Sensor (11-Pin OxyTip+)'
    },
    {
      brandId: 'mindray',
      brandName: 'Mindray',
      dotColor: 'bg-red-600',
      series: 'BeneView T5/T8, BeneVision N12/N17, uMEC, iMEC, ePM Series',
      pinout: '6-Pin Circular Keyed / 7-Pin Connector (Mindray Tech / Masimo)',
      badges: [
        { text: 'Adult Clip', style: 'bg-blue-50 text-blue-700' },
        { text: 'Infant Wrap', style: 'bg-slate-100 text-slate-700' },
        { text: 'Ext Cable', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Mindray BeneVision / BeneView SpO2 Sensor (6-Pin / 7-Pin)'
    },
    {
      brandId: 'masimo',
      brandName: 'Masimo Rainbow / SET',
      dotColor: 'bg-orange-500',
      series: 'Radical-7, Rad-57, Pronto, Root, RD SET Series',
      pinout: '20-Pin Rainbow / 14-Pin Red Low-Noise Shielded Connector',
      badges: [
        { text: 'Direct Cable', style: 'bg-blue-50 text-blue-700' },
        { text: 'Adapter Ext', style: 'bg-slate-100 text-slate-700' },
        { text: 'Disposable Tape', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Masimo SET / Rainbow SpO2 Replacement Sensor (20-Pin / 14-Pin)'
    },
    {
      brandId: 'nellcor',
      brandName: 'Nellcor (Covidien)',
      dotColor: 'bg-cyan-600',
      series: 'N-560, N-600x, Bedside SpO2, OxiMax Tech Platforms',
      pinout: 'DB9 Sub-D (Non-OxiMax) / OxiMax 9-Pin with Smart EEPROM',
      badges: [
        { text: 'Adult Clip', style: 'bg-blue-50 text-blue-700' },
        { text: 'Pediatric Soft', style: 'bg-slate-100 text-slate-700' },
        { text: 'DOC-10 Cable', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Nellcor OxiMax Compatible SpO2 Sensor (DS100A / DOC-10)'
    },
    {
      brandId: 'drager',
      brandName: 'Dräger Medical',
      dotColor: 'bg-sky-700',
      series: 'Infinity Delta, Vista 120, Gamma XL, Vista MultiMed',
      pinout: 'MultiMed 7-Pin Connector / Dräger 8-Pin Round',
      badges: [
        { text: 'Adult Reusable', style: 'bg-blue-50 text-blue-700' },
        { text: 'Intermediate Cable', style: 'bg-slate-100 text-slate-700' },
        { text: 'Wrap', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Dräger Infinity Delta / MultiMed SpO2 Sensor & Adapter Cable'
    },
    {
      brandId: 'nihon',
      brandName: 'Nihon Kohden',
      dotColor: 'bg-emerald-600',
      series: 'BSM-2300, BSM-4100, BSM-5100, Life Scope Series',
      pinout: '14-Pin Rectangular Connector / JL-900P Adapter',
      badges: [
        { text: 'Adult Clip', style: 'bg-blue-50 text-blue-700' },
        { text: 'Soft Tip', style: 'bg-slate-100 text-slate-700' },
        { text: 'JL-900P Trunk', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Nihon Kohden Life Scope SpO2 Sensor & JL-900P Adapter Cable'
    }
  ]
};

export const ECG_COMPATIBILITY_DATA = {
  columnTypeLabel: 'Lead Configuration & Termination',
  tabs: [
    { id: 'philips', label: 'Philips' },
    { id: 'ge', label: 'GE Marquette' },
    { id: 'mindray', label: 'Mindray' },
    { id: 'nihon', label: 'Nihon Kohden' },
    { id: 'schiller', label: 'Schiller' },
    { id: 'drager', label: 'Dräger' },
    { id: 'spacelabs', label: 'Spacelabs' }
  ],
  items: [
    {
      brandId: 'philips',
      brandName: 'Philips Medical',
      dotColor: 'bg-blue-600',
      series: 'IntelliVue MP20-MP90, MX400-MX800, HeartStart XL, PageWriter TC series',
      pinout: '12-Pin Round Connector / Built-in 1kΩ Defib Resistors',
      badges: [
        { text: '3-Lead / 5-Lead', style: 'bg-blue-50 text-blue-700' },
        { text: 'Snap / Grabber', style: 'bg-slate-100 text-slate-700' },
        { text: 'AHA & IEC', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Philips IntelliVue 5-Lead ECG Trunk Cable (12-Pin / M1668A)'
    },
    {
      brandId: 'ge',
      brandName: 'GE Healthcare / Marquette',
      dotColor: 'bg-indigo-600',
      series: 'Dash 2000/3000/4000/5000, Solar 8000, Carescape B650/B850, MAC 1200/2000',
      pinout: '11-Pin Rectangle Connector (Multi-Link) / 10kΩ Protection',
      badges: [
        { text: '3/5-Lead Multi-Link', style: 'bg-blue-50 text-blue-700' },
        { text: '10-Lead EKG Banana', style: 'bg-slate-100 text-slate-700' },
        { text: 'Dual Shield', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'GE Marquette Multi-Link 5-Lead ECG Cable (11-Pin / 2021178-001)'
    },
    {
      brandId: 'mindray',
      brandName: 'Mindray',
      dotColor: 'bg-red-600',
      series: 'BeneView T5/T8, BeneVision N12/N17, iMEC, ePM series, BeneHeart D3/D6',
      pinout: '12-Pin Round Connector / 6-Pin Defibrillator Proof (1kΩ / 10kΩ)',
      badges: [
        { text: '3/5-Lead One-Piece', style: 'bg-blue-50 text-blue-700' },
        { text: 'Detachable Trunk', style: 'bg-slate-100 text-slate-700' },
        { text: 'AAMI / IEC', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Mindray BeneVision 5-Lead ECG Trunk Cable (12-Pin / 0010-30-42719)'
    },
    {
      brandId: 'nihon',
      brandName: 'Nihon Kohden',
      dotColor: 'bg-emerald-600',
      series: 'Life Scope BSM-2300, BSM-4100, BSM-5100, cardiofax ECG-1250/1350/2350',
      pinout: '14-Pin Round Connector / DB15 Diagnostic EKG Plug',
      badges: [
        { text: '3-Lead / 6-Lead Cable', style: 'bg-blue-50 text-blue-700' },
        { text: '10-Lead EKG Harness', style: 'bg-slate-100 text-slate-700' },
        { text: 'Pinch / Clip', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Nihon Kohden Life Scope ECG Cable (14-Pin Round / JC-906P)'
    },
    {
      brandId: 'schiller',
      brandName: 'Schiller / Welch Allyn',
      dotColor: 'bg-purple-600',
      series: 'Cardiovit AT-1, AT-2, AT-10 plus, Propaq CS / Encore, PIC 50',
      pinout: 'DB15 Male / Round Multi-pin / Built-in 10kΩ Anti-Defibrillation',
      badges: [
        { text: '10-Lead Patient Cable', style: 'bg-blue-50 text-blue-700' },
        { text: '4.0mm Banana / Snap', style: 'bg-slate-100 text-slate-700' },
        { text: 'Resistor Protected', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Schiller Cardiovit AT-1 / AT-2 10-Lead Patient Cable (DB15 / Banana 4.0)'
    },
    {
      brandId: 'drager',
      brandName: 'Dräger Medical',
      dotColor: 'bg-sky-700',
      series: 'Infinity Delta, Vista 120, MultiMed 5 / 6 Pods, Siemens Sirecust',
      pinout: 'MultiMed Pod Connector / 16-Pin Round / 5000V Dielectric Pass',
      badges: [
        { text: 'MultiMed 5-Lead', style: 'bg-blue-50 text-blue-700' },
        { text: 'Snap / Grabber', style: 'bg-slate-100 text-slate-700' },
        { text: 'Low-Noise TPU', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Dräger MultiMed 5-Lead ECG Cable & Leadwire Set (5950196)'
    },
    {
      brandId: 'spacelabs',
      brandName: 'Spacelabs Healthcare',
      dotColor: 'bg-teal-600',
      series: 'Ultraview, Command Module, 90369, 91369, Qube, Xhibit series',
      pinout: '17-Pin Round Connector / TruLink Technology Compatibility',
      badges: [
        { text: '3-Lead / 5-Lead TruLink', style: 'bg-blue-50 text-blue-700' },
        { text: 'Snap / Pinch Leads', style: 'bg-slate-100 text-slate-700' },
        { text: 'Molded Strain Relief', style: 'bg-slate-100 text-slate-700' }
      ],
      prefillText: 'Spacelabs TruLink 5-Lead ECG Trunk Cable (17-Pin / 012-0126-00)'
    }
  ]
};

export default function CompatibilityMatrix({ data, onSelectModel, categoryType = 'SpO2' }) {
  const [activeBrand, setActiveBrand] = useState('all');

  const matrixData = (data && data.tabs && data.items)
    ? data
    : (categoryType === 'ECG' ? ECG_COMPATIBILITY_DATA : SPO2_COMPATIBILITY_DATA);

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-blue-500/30', 'border-blue-500');
          setTimeout(() => {
            card.classList.remove('ring-4', 'ring-blue-500/30', 'border-blue-500');
          }, 1200);
        }
      }
    }
  };

  const handleQuoteClick = (item) => {
    const prefillText = item.prefillText || `${item.brandName} ${item.series} (${item.pinout})`;
    if (onSelectModel) {
      onSelectModel(prefillText);
    }
    scrollToForm();
  };

  const filteredItems = activeBrand === 'all'
    ? matrixData.items
    : matrixData.items.filter((item) => item.brandId === activeBrand);

  const totalSkusLabel = categoryType === 'ECG' ? 'All Brands (380+ SKUs)' : 'All Brands (472+ SKUs)';

  return (
    <section id="compatibility" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            {categoryType === 'ECG' ? 'Diagnostic & Monitoring Cross-Reference' : 'Fast OEM Cross-Reference'}
          </div>
          <h2 className="text-3xl font-extrabold text-medkeNavy tracking-tight sm:text-4xl">
            {categoryType === 'ECG' ? 'Find Your ECG / EKG Equipment Compatibility' : 'Find Your Patient Monitor Compatibility'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {categoryType === 'ECG'
              ? 'Select your monitor or electrocardiograph brand below to check trunk cable pinouts, leadwire options (Snap/Pinch/Banana), and built-in resistor configurations. Click [Get Quote] to prefill your inquiry instantly.'
              : 'Select your monitor brand to inspect connector types, pin configurations, and exact sensor replacements. Click [Get Quote] to prefill your inquiry instantly.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveBrand('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer whitespace-nowrap ${
              activeBrand === 'all'
                ? 'bg-medkeNavy text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {totalSkusLabel}
          </button>

          {matrixData.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveBrand(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
                activeBrand === tab.id
                  ? 'bg-medkeNavy text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Brand / Manufacturer</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Monitor Series / Models</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Connector &amp; Pin Configuration</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">{matrixData.columnTypeLabel || 'Available Sensor Types'}</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-medkeNavy flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${row.dotColor || 'bg-blue-600'}`}></span>
                      {row.brandName}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-700">
                      {row.series}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-600">
                      {row.pinout}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      {row.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1 ${b.style}`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        type="button"
                        onClick={() => handleQuoteClick(row)}
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

          {/* Custom Mold Banner */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-medkeBlue text-base font-bold">💡</span>
              <span>Can't find your specific monitor connector or OEM part number? We engineer custom mold pinouts in 14 days.</span>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="text-xs font-bold text-medkeNavy hover:text-medkeBlue transition shrink-0 underline cursor-pointer"
            >
              Inquire Custom Mold / Private Labeling &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
