import React from 'react';

export default function IbpTrustProof({ data, onOpenCert }) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="trust-proof" className="py-16 lg:py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EDF2FE]/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-medkeBlue text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {data.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight mt-1">
            {data.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {data.description}
          </p>
        </div>

        {/* Factory Real Photos Showcase - 3 Equal Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.factories.map((factory, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-medkeBlue/40 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 sm:h-60 w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100 aspect-[16/10]">
                  <img
                    src={factory.imgSrc}
                    alt={factory.alt}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-semibold">
                    {factory.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-medkeNavy group-hover:text-medkeBlue transition">
                  {factory.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {factory.desc}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{factory.metaLeft}</span>
                <span className="text-emerald-600 font-semibold">{factory.metaRight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.certificates.map((cert) => (
            <div
              key={cert.key}
              onClick={() => onOpenCert && onOpenCert(cert)}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-medkeBlue hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${cert.pillClass}`}>
                    {cert.pill}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{cert.certNo}</span>
                </div>
                <h4 className="text-base font-bold text-medkeNavy group-hover:text-medkeBlue transition">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cert.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-medkeBlue font-bold group-hover:underline flex items-center gap-1">
                  {cert.linkText}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{cert.auditedBy}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Transparency Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>
              <strong>Regulatory Transparency Notice:</strong> {data.transparencyNotice}
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="shrink-0 text-xs font-bold text-medkeBlue hover:underline whitespace-nowrap cursor-pointer"
          >
            Request Tender Pack →
          </button>
        </div>

      </div>
    </section>
  );
}
