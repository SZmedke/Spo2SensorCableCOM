import React from 'react';

export default function TempTrustProof({ data, onOpenCert }) {
  return (
    <section id="trust-proof" className="py-16 lg:py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EDF2FE]/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest uppercase text-medkeBlue block mb-2">
            {data.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 3 Equal-Height Real Factory Photos (Strictly aspect-[16/10] h-56 sm:h-60 w-full object-cover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.factories.map((factory, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="h-56 sm:h-60 w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100 aspect-[16/10]">
                  <img
                    src={factory.imgSrc}
                    alt={factory.alt}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-sm font-bold text-medkeNavy">{factory.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {factory.desc}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{factory.tag1}</span>
                <span className="text-medkeNavy font-bold">{factory.tag2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Regulatory Credential Cards (Interactive Click to View) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {data.certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onOpenCert(cert.id)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-medkeBlue cursor-pointer transition shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full ${cert.badgeColor} font-bold text-[11px]`}>
                    {cert.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{cert.sub}</span>
                </div>
                <h4 className="text-base font-bold text-medkeNavy mb-1">{cert.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {cert.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-medkeBlue font-semibold">
                <span>{cert.linkText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Boundary Statement */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          <strong>Official Compliance Notice:</strong> {data.transparencyNotice}
        </div>

      </div>
    </section>
  );
}
