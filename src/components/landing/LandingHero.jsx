import React from 'react';

const DEFAULT_SPO2_CHECKLIST = [
  '<strong>Medical-grade TPU</strong> & Dual-layer Shield',
  '<strong>10,000+ Bends</strong> Tested High-Flex Life',
  '<strong>Biocompatible:</strong> Cytotoxicity Tested',
  '<strong>123+ SKUs Ready:</strong> 3-7 Days Delivery'
];

const DEFAULT_ECG_CHECKLIST = [
  '<strong>Defib-Proof Resistors</strong> (1kΩ / 10kΩ built-in)',
  '<strong>Dual Silver Shielding:</strong> Noise &lt; 15μV',
  '<strong>Snap / Pinch / Banana / Din</strong> Terminations',
  '<strong>AHA (AAMI) & IEC</strong> Color Coding Available'
];

const DEFAULT_SPO2_BRANDS = [
  {
    name: 'PHILIPS',
    series: 'IntelliVue & SureSigns',
    logo: 'https://sc02.alicdn.com/kf/H6842b29967f94ac4a247c0939767bdc5H.jpg'
  },
  {
    name: 'GE HealthCare',
    series: 'Dash, Solar & Carescape',
    logo: 'https://sc02.alicdn.com/kf/H2de2fe1bc2874a34b611b4e7763b5646l.jpg'
  },
  {
    name: 'MINDRAY',
    series: 'BeneView & BeneVision',
    logo: 'https://sc02.alicdn.com/kf/He4ee7b61b8f84779a0d8a646e9bf1648r.jpg'
  },
  {
    name: 'MASIMO',
    series: 'Rainbow & RD SET',
    logo: 'https://sc02.alicdn.com/kf/Hcc5f1c546618422693f8dfae8e161d15m.jpg'
  },
  {
    name: 'NELLCOR',
    series: 'OxiMax & Non-OxiMax',
    logo: 'https://sc02.alicdn.com/kf/Hf6a7aac850164833b002b6e934f2ac3cP.jpg'
  },
  {
    name: 'NIHON KOHDEN',
    series: 'Life Scope Series',
    logo: 'https://sc02.alicdn.com/kf/H82a652963c774ed7a864fde37ca63fbfJ.jpg'
  },
  {
    name: 'SCHILLER',
    series: 'AT-Series & Argus',
    logo: 'https://sc02.alicdn.com/kf/H7cbd983568e849a4afd83a596189a6adB.jpg'
  },
  {
    name: 'DRÄGER',
    series: 'Infinity & MultiMed',
    logo: 'https://www.spo2sensorcable.com/assets/images/clients/client-logo-drager.png'
  }
];

const DEFAULT_ECG_BRANDS = [
  {
    name: 'PHILIPS',
    series: 'IntelliVue & PageWriter',
    logo: 'https://sc02.alicdn.com/kf/H6842b29967f94ac4a247c0939767bdc5H.jpg'
  },
  {
    name: 'GE HealthCare',
    series: 'Multi-Link & MAC Series',
    logo: 'https://sc02.alicdn.com/kf/H2de2fe1bc2874a34b611b4e7763b5646l.jpg'
  },
  {
    name: 'MINDRAY',
    series: 'BeneVision & D3/D6',
    logo: 'https://sc02.alicdn.com/kf/He4ee7b61b8f84779a0d8a646e9bf1648r.jpg'
  },
  {
    name: 'NIHON KOHDEN',
    series: 'Life Scope & Cardiofax',
    logo: 'https://sc02.alicdn.com/kf/H82a652963c774ed7a864fde37ca63fbfJ.jpg'
  },
  {
    name: 'SCHILLER',
    series: 'Cardiovit AT-1 / AT-2',
    logo: 'https://sc02.alicdn.com/kf/H7cbd983568e849a4afd83a596189a6adB.jpg'
  },
  {
    name: 'SPACELABS',
    series: 'TruLink Compatible',
    logo: 'https://sc02.alicdn.com/kf/Hcc5f1c546618422693f8dfae8e161d15m.jpg'
  },
  {
    name: 'DRÄGER',
    series: 'Infinity MultiMed Pods',
    logo: 'https://www.spo2sensorcable.com/assets/images/clients/client-logo-drager.png'
  }
];

const DEFAULT_SPO2_GUARANTEES = [
  { dotColor: 'bg-emerald-500', text: '100% Optical Wavelength Matching (660nm / 905nm)' },
  { dotColor: 'bg-blue-500', text: 'Direct 1-to-1 OEM Pinout & Resistor Values' },
  { dotColor: 'bg-medkeNavy', text: 'Free Clinical Evaluation Samples Available' }
];

const DEFAULT_ECG_GUARANTEES = [
  { dotColor: 'bg-emerald-500', text: '5000V High-Pot Tested • Zero Breakdown' },
  { dotColor: 'bg-blue-500', text: 'Defibrillation Proof Resistors (1kΩ / 10kΩ / 20kΩ)' },
  { dotColor: 'bg-medkeNavy', text: 'Free Clinical Evaluation Samples Available' }
];

export default function LandingHero({ data, onOpenBrochure, onPrefillModel }) {
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

  const handleInquireModel = (modelText) => {
    if (onPrefillModel) {
      onPrefillModel(modelText);
    } else {
      scrollToForm();
    }
  };

  const isEcg = data?.categoryType === 'ECG';
  const checklist = data?.featureChecklist || (isEcg ? DEFAULT_ECG_CHECKLIST : DEFAULT_SPO2_CHECKLIST);
  const brandsList = (data?.brands && data.brands.length > 0) ? data.brands : (isEcg ? DEFAULT_ECG_BRANDS : DEFAULT_SPO2_BRANDS);
  const guaranteesList = data?.brandGuarantees || (isEcg ? DEFAULT_ECG_GUARANTEES : DEFAULT_SPO2_GUARANTEES);

  return (
    <section className="relative bg-gradient-to-b from-[#EDF2FE] via-white to-[#F8FAFC] pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Pill Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            TÜV SÜD ISO 13485:2016 Certified
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {isEcg ? 'CE MDR 2017/745 (Class IIa Medical)' : 'CE MDR 2017/745 (Notified Body 0123)'}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-medkeNavy/15 text-medkeNavy text-xs font-semibold shadow-xs">
            <span className={`w-2 h-2 rounded-full ${isEcg ? 'bg-purple-500' : 'bg-amber-500'}`}></span>
            {isEcg ? 'Built-in Defibrillator Protection (1kΩ / 10kΩ)' : 'US FDA 510(k) Cleared'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded">
                {isEcg ? 'High-Precision Signal Transmission • OEM / ODM Since 2008' : 'Direct Source Manufacturer · OEM / ODM Since 2008'}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-medkeNavy leading-snug sm:leading-[1.28] lg:leading-[1.3] tracking-tight">
                {isEcg ? (
                  <>
                    <span className="block mb-1 sm:mb-2">Medical-Grade ECG & EKG</span>
                    <span className="text-medkeBlue block">Cables & Leadwires</span>
                  </>
                ) : (
                  <>
                    <span className="block mb-1 sm:mb-2">Reliable SpO2 Sensors &</span>
                    <span className="text-medkeBlue block">Adapter Cables</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-slate-600 font-medium max-w-2xl">
                {data?.lead || (isEcg
                  ? '100% compatible with leading patient monitors & diagnostic electrocardiographs (Philips, GE Marquette, Mindray, Nihon Kohden, Schiller). Low-noise dual shielding, AHA/IEC color coding, and factory direct pricing.'
                  : '100% compatible with 90%+ global patient monitor brands. Direct factory wholesale pricing, medical-grade TPU materials, and gold-plated low-noise connectors for hospitals, clinics, and distributor partners.')}
              </p>
            </div>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              {checklist.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: feat }} />
                </div>
              ))}
            </div>

            {/* Dual Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-base font-bold shadow-glow-cta transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Direct Factory Quote</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-medkeSoft text-medkeNavy text-base font-semibold border-2 border-medkeNavy/20 shadow-sm transition cursor-pointer"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
                <span>{isEcg ? 'Download 2026 Medke Brochure (PDF)' : 'Download 2026 Catalog (PDF)'}</span>
              </button>
            </div>

            {/* Micro-Trust Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1 font-medium border-t border-slate-200/80">
              <span className="flex items-center gap-1.5"><span className="text-medkeBlue font-bold">⚡</span> Avg. Response: &lt; 2.4 Hours</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">📦</span> Free Testing Sample Available</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">🤝</span> {isEcg ? 'OEM / Private Labeling Supported' : 'Low MOQ for OEM / Regional Dealers'}</span>
            </div>
          </div>

          {/* Hero Right Visual Card: 1:1 Matching HTML Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white rounded-2xl p-6 shadow-card-subtle border border-slate-200/80">
              {/* Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <span className="text-xs font-bold text-medkeBlue uppercase tracking-wider">
                    {isEcg ? 'Premium Series' : 'Flagship Series'}
                  </span>
                  <h3 className="text-lg font-bold text-medkeNavy">
                    {isEcg ? '5-Lead ECG Trunk & Leadwire Set' : 'Adult Reusable SpO2 Sensor'}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
                  isEcg ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {isEcg ? 'Defibrillator-Proof' : 'In Stock • 100% Tested'}
                </span>
              </div>

              {/* Graphic Schematic Box */}
              <div className="relative h-56 bg-gradient-to-tr from-[#F1F5F9] to-[#E2E8F0] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-slate-200">
                {isEcg ? (
                  <svg className="w-full h-full max-h-48 text-medkeNavy" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="25" y="85" width="40" height="50" rx="8" fill="#1E293B"/>
                    <circle cx="45" cy="110" r="14" fill="#243181"/>
                    <circle cx="40" cy="105" r="2.5" fill="#F59E0B"/>
                    <circle cx="50" cy="105" r="2.5" fill="#F59E0B"/>
                    <circle cx="40" cy="115" r="2.5" fill="#F59E0B"/>
                    <circle cx="50" cy="115" r="2.5" fill="#F59E0B"/>
                    <circle cx="45" cy="110" r="2" fill="#F59E0B"/>
                    <path d="M 65 110 L 190 110" stroke="#243181" strokeWidth="10" strokeLinecap="round"/>
                    <path d="M 190 85 L 235 95 L 235 125 L 190 135 Z" fill="#1E293B"/>
                    <circle cx="212" cy="110" r="5" fill="#0047FF"/>
                    <path d="M 235 100 Q 280 40, 340 45" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="345" cy="45" r="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2"/>
                    <text x="341" y="49" fontSize="9" fontWeight="bold" fill="#0F172A">W</text>
                    <path d="M 235 105 Q 280 75, 340 75" stroke="#16A34A" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="345" cy="75" r="8" fill="#16A34A"/>
                    <text x="341" y="79" fontSize="9" fontWeight="bold" fill="#FFFFFF">G</text>
                    <path d="M 235 110 L 340 110" stroke="#854D0E" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="345" cy="110" r="8" fill="#854D0E"/>
                    <text x="342" y="114" fontSize="9" fontWeight="bold" fill="#FFFFFF">V</text>
                    <path d="M 235 115 Q 280 145, 340 145" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="345" cy="145" r="8" fill="#DC2626"/>
                    <text x="342" y="149" fontSize="9" fontWeight="bold" fill="#FFFFFF">R</text>
                    <path d="M 235 120 Q 280 180, 340 175" stroke="#1E293B" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="345" cy="175" r="8" fill="#1E293B"/>
                    <text x="342" y="179" fontSize="9" fontWeight="bold" fill="#FFFFFF">B</text>
                    <rect x="80" y="25" width="135" height="28" rx="6" fill="#FFFFFF"/>
                    <text x="90" y="43" fontSize="11" fontWeight="bold" fill="#243181">Dual-layer Shield TPU</text>
                    <line x1="130" y1="53" x2="140" y2="105" stroke="#0047FF" strokeWidth="1.5" strokeDasharray="2 2"/>
                  </svg>
                ) : (
                  <svg className="w-full h-full max-h-48 text-medkeNavy" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 60 110 C 130 110, 160 50, 240 70 C 290 85, 300 130, 350 130" stroke="#243181" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M 60 110 C 130 110, 160 50, 240 70 C 290 85, 300 130, 350 130" stroke="#0047FF" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 15"/>
                    <rect x="20" y="85" width="45" height="50" rx="8" fill="#1E293B"/>
                    <rect x="12" y="95" width="10" height="30" rx="2" fill="#F59E0B"/>
                    <circle cx="42" cy="110" r="10" fill="#0047FF"/>
                    <rect x="330" y="100" width="55" height="60" rx="14" fill="#243181"/>
                    <path d="M 345 100 L 370 100 L 360 85 Z" fill="#64748B"/>
                    <circle cx="360" cy="130" r="6" fill="#EF4444"/>
                    <circle cx="360" cy="130" r="14" stroke="#EF4444" strokeWidth="2" strokeDasharray="2 4"/>
                    <rect x="80" y="20" width="130" height="28" rx="6" fill="#FFFFFF"/>
                    <text x="90" y="38" fontSize="11" fontWeight="bold" fill="#243181">Medical TPU Jacket</text>
                    <line x1="140" y1="48" x2="160" y2="75" stroke="#0047FF" strokeWidth="1.5" strokeDasharray="2 2"/>
                    <rect x="250" y="170" width="135" height="28" rx="6" fill="#FFFFFF"/>
                    <text x="260" y="188" fontSize="11" fontWeight="bold" fill="#0E8345">High-Accuracy LED Chip</text>
                    <line x1="320" y1="170" x2="350" y2="145" stroke="#0E8345" strokeWidth="1.5" strokeDasharray="2 2"/>
                  </svg>
                )}
              </div>

              {/* Quick Specs Table */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {isEcg ? (
                  <>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Shielding Noise</span>
                      <span className="font-bold text-medkeNavy">&lt; 15μV Peak</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Color Code</span>
                      <span className="font-bold text-medkeNavy">AHA / IEC</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Warranty</span>
                      <span className="font-bold text-medkeGreen">12 Months</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Cable Length</span>
                      <span className="font-bold text-medkeNavy">3.0m / Custom</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Accuracy (70-100%)</span>
                      <span className="font-bold text-medkeNavy">± 2% Medical</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase">Warranty</span>
                      <span className="font-bold text-medkeGreen">12 Months</span>
                    </div>
                  </>
                )}
              </div>

              {/* Card Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {isEcg ? 'Compatible: GE, Philips, Mindray, Schiller' : 'Compatible: Philips, GE, Mindray'}
                </span>
                <button
                  type="button"
                  onClick={() => handleInquireModel(isEcg ? 'GE Marquette / Philips 5-Lead ECG Cable' : 'Philips M1191A Reusable SpO2 Sensor')}
                  className="text-xs font-bold text-medkeBlue hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Inquire This Model &rarr;
                </button>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-medkeNavy">Defect Rate &lt; 0.15%</p>
                <p className="text-[11px] text-slate-500">100% Continuity & Pinout Inspection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compatible Brands Single-Row Capsule Bar: 1:1 Matching HTML Preview */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Trusted OEM Replacement Compatible with Leading Patient Monitor Systems
          </p>
          
          <div className="flex flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {brandsList.map((brand, idx) => (
              <div
                key={idx}
                className="inline-flex flex-col items-center justify-center py-2.5 px-3 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-medkeBlue hover:shadow-md transition shrink-0 group min-w-[118px] sm:min-w-[126px]"
              >
                <div className="w-20 sm:w-24 h-9 sm:h-10 flex items-center justify-center p-0.5">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain transition duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight mt-1 uppercase group-hover:text-medkeBlue transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5 whitespace-nowrap">
                  {brand.series}
                </span>
              </div>
            ))}
          </div>

          {/* Trust & Technical Cross-Reference Reassurance Strip */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-500 font-medium">
            {guaranteesList.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="hidden sm:inline text-slate-300">•</span>}
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                  <span>{item.text}</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
