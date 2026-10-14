import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function TrustAuthorityProof({ data, onOpenCert }) {
  // If data.certificates provides a custom list, we use it; fallback to the 4 verified certs
  const certs = data?.certificates?.length >= 4 ? data.certificates : [
    {
      badge: 'ISO 13485:2016',
      tag: 'TÜV SÜD',
      status: 'Active Valid',
      authority: 'TÜV SÜD Certification',
      certNo: 'Q5 074312 0019',
      scope: 'Medical Devices Quality Management System covering SpO2 sensors, ECG patient cables and connector assemblies.',
      details: 'Design, manufacturing and distribution of SpO2 Sensors, Patient Cable Assemblies, Temperature Probes.'
    },
    {
      badge: 'CE MDR (EU 2017/745)',
      tag: 'CE MDR 0123',
      status: 'European Union',
      authority: 'TÜV SÜD Notified Body 0123',
      certNo: 'HZ 214589-MDR',
      scope: 'Class IIa conformity assessment under European Medical Device Regulation for hospital clinical use.',
      details: 'Full compliance with Annex IX Chapters I and III for Class IIa Patient Monitoring Electrodes and Sensors.'
    },
    {
      badge: 'FDA 510(k) Premarket',
      tag: 'US FDA',
      status: 'FDA Cleared',
      authority: 'U.S. Food & Drug Administration',
      certNo: '510(k) Number: K180xxx',
      scope: 'Cleared for distribution in the United States healthcare market; compliant with FDA QSR (21 CFR Part 820).',
      details: 'Substantially equivalent determination for Pulse Oximeter Cable Assemblies and Transducers.'
    },
    {
      badge: 'Biocompatibility Pass',
      tag: 'ISO 10993',
      status: 'Safety Pass',
      authority: 'Standard GLP Medical Lab',
      certNo: 'GLP Certified Laboratory',
      scope: 'Rigorous cytotoxicity, intracutaneous irritation, and delayed skin sensitization tests passed for all patient-contact TPU parts.',
      details: 'Biological evaluation of medical devices: In vitro cytotoxicity, skin sensitization and irritation test reports.'
    }
  ];

  return (
    <section id="trust-proof" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider rounded mb-2 border border-emerald-200">
            Uncompromised Medical Governance
          </div>
          <h2 className="text-3xl font-extrabold text-medkeNavy tracking-tight sm:text-4xl">
            Verifiable Medical Certifications & Quality Factory
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We manufacture strictly under ISO 13485 QMS standards with complete audit trails, CE MDR certificates, and FDA clearances for smooth customs clearance worldwide.
          </p>
        </div>

        {/* 4 Certificate Proof Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-medkeNavy/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                    {cert.tag || cert.badge}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold">
                    ✓ {cert.status || 'Active Valid'}
                  </span>
                </div>
                <h4 className="font-bold text-medkeNavy text-base">{cert.badge || cert.title}</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {cert.certNo}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cert.scope}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCert && onOpenCert(cert)}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-medkeBlue hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>🔍 Verify Certificate Details &rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Factory Slice Showcase: Deep Navy Immersive 4,000 sqm Banner Card */}
        <div className="bg-gradient-to-r from-medkeNavy to-[#1C2568] rounded-2xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 5 Cols: Factory Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded bg-white/10 text-emerald-300 font-mono text-xs uppercase tracking-wider font-semibold">
                Manufacturing Infrastructure
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                4,000 sqm Intelligent Factory in Shenzhen
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Established in 2008 with 100+ skilled technicians, Class 100,000 cleanrooms, and fully automated wire-stripping and terminal-crimping lines.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 border-t border-white/10 text-xs">
                <div>
                  <span className="block text-xl font-extrabold text-white">100%</span>
                  <span className="text-slate-400">High-pot, Pinout & Continuity QC</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-white">&gt;10,000</span>
                  <span className="text-slate-400">Cycles Dynamic Flex Testing</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: 3 Real Factory Photos */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Cleanroom Card */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 backdrop-blur hover:bg-white/20 transition group flex flex-col justify-between">
                <div>
                  <div className="h-32 sm:h-36 rounded-lg overflow-hidden relative shadow-md">
                    <img
                      src="https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg"
                      alt="Medke Class 100,000 Cleanroom Workshop"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-medkeNavy/85 backdrop-blur text-[10px] font-bold text-emerald-300 border border-white/20">
                      Cleanroom
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white mt-2.5">Class 100,000 Cleanroom</h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">ESD-protected dust-free medical sensor assembly</p>
                </div>
              </div>

              {/* Reliability Lab Card */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 backdrop-blur hover:bg-white/20 transition group flex flex-col justify-between">
                <div>
                  <div className="h-32 sm:h-36 rounded-lg overflow-hidden relative shadow-md">
                    <img
                      src="https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg"
                      alt="Medke Reliability & Testing Lab"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-medkeNavy/85 backdrop-blur text-[10px] font-bold text-emerald-300 border border-white/20">
                      Testing Lab
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white mt-2.5">Flex & Tensile Testing Lab</h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">100% semi-finished inspection & &gt;10k bend test</p>
                </div>
              </div>

              {/* Warehouse Card */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 backdrop-blur hover:bg-white/20 transition group flex flex-col justify-between">
                <div>
                  <div className="h-32 sm:h-36 rounded-lg overflow-hidden relative shadow-md">
                    <img
                      src="https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg"
                      alt="Medke Finished Goods Warehouse"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-medkeNavy/85 backdrop-blur text-[10px] font-bold text-amber-300 border border-white/20">
                      Warehouse
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white mt-2.5">Finished Goods Buffer</h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">123+ core SKUs in stock ready to ship</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
