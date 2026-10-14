import React from 'react';

export const SPO2_PRODUCT_CATEGORIES = {
  headingTitle: 'Core SpO2 Product Lines & Technical Specifications',
  headingSubtitle: 'Direct factory pricing with comprehensive OEM/ODM customization. High flex-life cables, gold-plated connectors, and ISO 10993 biocompatible patient-contact materials.',
  categories: [
    {
      title: 'Disposable SpO2 Sensor',
      tag: 'Single-Patient Infection Control',
      tagColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-disposable.jpg',
      description: 'Single-use adhesive sensors designed for OR, ICU, and emergency wards to eliminate hospital-acquired cross-infection (HAIs).',
      specs: [
        'Adhesive Material: Medical 3M porous fabric, foam, or transore tape',
        'Patient Sizes: Adult, pediatric, infant & neonatal wrapping styles',
        'Packaging: Sterile individual pouch, latex-free formulation'
      ],
      prefillText: 'Disposable SpO2 Sensor (Adult / Pediatric / Neonate Single-Use)'
    },
    {
      title: 'Reusable SpO2 Sensor',
      tag: 'Durable Daily ICU Monitoring',
      tagColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-reusable.jpg',
      description: 'Heavy-duty finger clip and soft silicone tip sensors for routine patient vital sign checks and long-term bed monitoring.',
      specs: [
        'Sensor Formats: Adult finger clip, pediatric soft tip, neonatal Y-type',
        'Flex Resistance: Over 10,000 bending cycles with flexible TPU jacket',
        'Signal Accuracy: Gold-plated connector pins ensure zero signal drift'
      ],
      prefillText: 'Reusable SpO2 Sensor (Adult Finger Clip / Pediatric Soft Tip / Neonatal Wrap)'
    },
    {
      title: 'SpO2 Adapter Cable',
      tag: 'Trunk & Intermediary Bridges',
      tagColor: 'text-indigo-600',
      dotColor: 'bg-indigo-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-adapter-cable.jpg',
      description: 'Bridge OEM patient monitors (Philips, GE, Mindray, Nellcor) to versatile disposable/reusable sensors. Gold-plated pins ensure lossless optical signal transmission.',
      specs: [
        'Connectors: 8-Pin, 11-Pin, 12-Pin, MultiMed, DB9',
        'Cable Length: 2.2m / 3.0m Custom Options',
        'Mold: Dual-molded strain relief collar'
      ],
      prefillText: 'SpO2 Adapter Cable (Philips/GE/Mindray/Nellcor Trunk)'
    },
    {
      title: 'SpO2 Accessories',
      tag: 'Components & Spare Parts',
      tagColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-accessories.jpg',
      description: 'Complete accessory inventory: SpO2 ear clips, veterinary tongue clips, neonate wrap silicone tapes, extension splitters, and custom tester fixtures.',
      specs: [
        'Accessory Types: Ear Clips, Neonate Wraps',
        'Components: Replacement Springs, Silicone Cushions',
        'Custom Mold: OEM Connector Shells & Pinouts'
      ],
      prefillText: 'SpO2 Accessories (Ear Clips, Silicone Wraps, Fixation Straps)'
    }
  ]
};

export const ECG_PRODUCT_CATEGORIES = {
  headingTitle: 'Core ECG & EKG Product Lines & Technical Specifications',
  headingSubtitle: 'Full clinical range: 3-lead, 5-lead, 10-lead and 12-lead cable assemblies engineered for low noise, defibrillator shock resistance, and maximum clinical durability.',
  categories: [
    {
      title: 'ECG / EKG Cables',
      tag: 'One-Piece Patient Cables',
      tagColor: 'text-blue-600',
      dotColor: 'bg-blue-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-cables.jpg',
      description: 'One-piece integrated patient monitoring cables with built-in defib-proof current limiting resistors. High-density braided dual silver shielding prevents RF noise in ORs.',
      specs: [
        'Resistors: 1kΩ / 10kΩ / 20kΩ built-in defibrillator protection',
        'Configurations: 3-Lead, 5-Lead, 10-Lead patient cables',
        'Color Code: AHA (US) and IEC (European) dual color-coding'
      ],
      prefillText: 'One-Piece ECG / EKG Cables (3-Lead, 5-Lead, 10-Lead One-Piece Sets)'
    },
    {
      title: 'ECG Trunk Cable & Leadwires',
      tag: 'Modular Bedside Systems',
      tagColor: 'text-purple-600',
      dotColor: 'bg-purple-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-trunk-leadwires.jpg',
      description: 'Detachable master trunk cables paired with replaceable branch leadwire sets. Reduces hospital replacement costs by allowing individual lead replacements upon wear.',
      specs: [
        'Trunk Types: 3-Lead / 5-Lead / 10-Lead master trunks with yoke hub',
        'Lead Terminations: Snap, Grabber (Pinch), 4.0mm Banana, Din 3.0',
        'Core Wire: Kevlar-reinforced multi-strand tinsel conductor'
      ],
      prefillText: 'ECG Trunk Cables & Detachable Leadwire Sets (Snap / Pinch / Banana)'
    },
    {
      title: 'Disposable ECG Leadwires',
      tag: 'ICU & Infection Control',
      tagColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
      image: 'https://sc02.alicdn.com/kf/H71fa4f971b3e404b9015c724734e628eH.jpg',
      description: 'Single-patient-use leadwire ribbons engineered to halt cross-contamination across ICU, CCU, and surgical suites. Push-button peelable ribbon cable for rapid patient sizing.',
      specs: [
        'Infection Control: Single-patient-use eliminates cleaning overhead',
        'Ribbon Cable: Pre-wired peelable ribbon with molded connector block',
        'Compatibility: Philips IntelliVue, GE Multi-Link & Mindray systems'
      ],
      prefillText: 'Disposable ECG Leadwires (Single-Patient ICU / OR Infection Prevention)'
    },
    {
      title: 'Multi-Parameter Patient Cables',
      tag: 'Integrated Patient Monitoring',
      tagColor: 'text-indigo-600',
      dotColor: 'bg-indigo-500',
      image: 'https://sc02.alicdn.com/kf/Hfbb4c353791c42848e30f8024c5545cfV.jpg',
      description: 'All-in-one multi-parameter cable pods integrating ECG leads, SpO2 sensor input, and Dual-Temperature probes into one streamlined patient connection to eliminate bedside clutter.',
      specs: [
        'Multi-Modal: Combines ECG + SpO2 + Dual Temp in 1 Pod',
        'Compatibility: Dräger MultiMed Pod, Siemens, Philips Quad',
        'Construction: Kevlar-reinforced core & gold-plated pins'
      ],
      prefillText: 'Multi-Parameter Patient Cables & Pod Combinations (Drager MultiMed / Philips)'
    },
    {
      title: 'Holter Recorder ECG',
      tag: '24-48h Ambulatory Cardiology',
      tagColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      image: 'https://sc02.alicdn.com/kf/Ac1eaac1c4e09462a8d8bd07438170799b.png',
      description: 'Ultra-flexible, low-motion-noise cables and leadwires engineered for 24-hour to 7-day ambulatory Holter recorders. Shielded against baseline drift during active patient movement.',
      specs: [
        'Recorder Interfaces: DMS 26-Pin, DB15, Din Style Connector',
        'Channel Options: 3-Channel (5-Lead), 7-Lead, 10-Lead',
        'Motion Artifacts: High-density braided low-noise shielding'
      ],
      prefillText: 'Holter Recorder ECG Cables & Leadwires (DMS / Rozinn / Mortara / Schiller)'
    },
    {
      title: 'EKG Accessories',
      tag: 'Electrodes & Hardware',
      tagColor: 'text-rose-600',
      dotColor: 'bg-rose-500',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-accessories.jpg',
      description: 'Complete clinical accessory suite: adult & pediatric suction chest bulbs, 4-color limb clamps, banana 4.0mm to snap/alligator adapters, and leadwire organizers.',
      specs: [
        'Suction Chest Bulbs: Medical silicone with Ag/AgCl plating',
        'Limb Clamps: Color-coded 4-piece set (AHA & IEC)',
        'Adapters: 4.0mm Banana to Snap / Pinch alligator convertors'
      ],
      prefillText: 'EKG Accessories (Chest Suction Bulbs, Limb Clamps & Alligator Adapters)'
    }
  ]
};

export default function ProductCategoryGrid({ data, categories, onSelectCategory, categoryType = 'SpO2' }) {
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

  const handleQuoteClick = (cat) => {
    const text = cat.prefillText || cat.title;
    if (onSelectCategory) {
      onSelectCategory(text);
    }
    scrollToForm();
  };

  // Determine configuration source
  let config = null;
  if (data && data.categories) {
    config = data;
  } else if (categories && Array.isArray(categories)) {
    config = {
      headingTitle: categoryType === 'ECG'
        ? ECG_PRODUCT_CATEGORIES.headingTitle
        : SPO2_PRODUCT_CATEGORIES.headingTitle,
      headingSubtitle: categoryType === 'ECG'
        ? ECG_PRODUCT_CATEGORIES.headingSubtitle
        : SPO2_PRODUCT_CATEGORIES.headingSubtitle,
      categories: categories
    };
  } else {
    config = categoryType === 'ECG' ? ECG_PRODUCT_CATEGORIES : SPO2_PRODUCT_CATEGORIES;
  }

  const isSixCols = config.categories.length === 6;

  return (
    <section id="product-categories" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Clinical Grade Quality
          </div>
          <h2 className="text-3xl font-extrabold text-medkeNavy tracking-tight sm:text-4xl">
            {config.headingTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {config.headingSubtitle}
          </p>
        </div>

        {/* Product Cards Grid: 1:1 Matching HTML Preview */}
        <div className={`grid grid-cols-1 ${isSixCols ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
          {config.categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-medkeBlue/40 transition duration-300 overflow-hidden group"
            >
              <div>
                {/* Seamless Image Header */}
                <div className="h-48 w-full bg-slate-50/80 border-b border-slate-100 flex items-center justify-center p-4 relative group-hover:bg-blue-50/20 transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${cat.tagColor || 'text-blue-600'}`}>
                    {cat.tag}
                  </span>
                  <h3 className="text-base font-bold text-medkeNavy mt-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {cat.description || cat.desc}
                  </p>

                  <ul className="mt-3.5 text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                    {cat.specs && cat.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor || 'bg-blue-500'}`}></span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleQuoteClick(cat)}
                  className="w-full py-2.5 rounded-xl bg-medkeSoft hover:bg-medkeBlue hover:text-white text-medkeNavy text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Request Quote & Free Sample &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
