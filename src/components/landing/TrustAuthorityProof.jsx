import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Factory, ExternalLink } from 'lucide-react';

export default function TrustAuthorityProof({ data, onOpenCert }) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Audit & Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certified Quality & Production Authority
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            TÜV SÜD audited manufacturing facility in Shenzhen adhering strictly to medical device GMP and ISO 13485.
          </p>
        </div>

        {/* 1. Regulatory Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.certificates.map((cert, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-extrabold text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{cert.badge}</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {cert.authority}
                </div>
                <div className="text-sm font-bold text-slate-900 mb-2 font-mono">
                  {cert.certNo}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cert.scope}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenCert && onOpenCert(cert)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-600 hover:text-blue-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Verify Certificate Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Real Factory Photography Showcase */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Factory className="w-4 h-4 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Inside Our 4,000㎡ Shenzhen Manufacturing Facility
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    Shenzhen Base
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {fac.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
