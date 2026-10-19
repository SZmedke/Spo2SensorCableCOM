import React from 'react';

export default function IbpEngineeringAdvantages({ advantages }) {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-medkeBlue uppercase tracking-widest block">
            ENGINEERING INTEGRITY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight mt-1">
            Why Biomedical Engineers (HTM) Choose Medke IBP Cables
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Designed specifically to overcome the common failure modes of OEM and low-cost generic cables in high-acuity surgical environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-medkeBlue/40 transition space-y-3"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${item.iconBg}`}>
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-medkeNavy">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
