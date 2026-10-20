import React, { useState } from 'react';
import { tempLandingData } from '../data/landing/temp-data';
import TempHero from '../components/landing/TempHero';
import TempFourPillars from '../components/landing/TempFourPillars';
import TempCompatibilityHub from '../components/landing/TempCompatibilityHub';
import TempTrustProof from '../components/landing/TempTrustProof';
import TempInquiryForm from '../components/landing/TempInquiryForm';
import TempFaqSection from '../components/landing/TempFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import TempCertificateModal from '../components/landing/TempCertificateModal';

export default function TemperatureLandingPage() {
  const [prefillRfqData, setPrefillRfqData] = useState(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-[#0047FF]', 'transition-all');
          setTimeout(() => card.classList.remove('ring-4', 'ring-[#0047FF]'), 1500);
        }
      }
    }
  };

  const handleHubInquire = (inquirePayload) => {
    setPrefillRfqData(inquirePayload);
    scrollToForm();
  };

  const handleSelectPillar = (productLineName) => {
    setPrefillRfqData(productLineName);
    scrollToForm();
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      
      {/* 1. Hero Section with Top Notice Bar, CAD SVG Schematic, Metrics & CTAs */}
      <TempHero
        data={tempLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* 2. Four Core Product Pillars (Single-row 4-column in Desktop) */}
      <TempFourPillars
        pillars={tempLandingData.fourPillars}
        onSelectPillar={handleSelectPillar}
      />

      {/* 3. Universal Temperature Compatibility Hub (Monitor × Sensor Matrix) */}
      <TempCompatibilityHub
        monitorSystems={tempLandingData.tempMonitorSystems}
        sensorTypes={tempLandingData.tempSensorTypes}
        onInquire={handleHubInquire}
      />

      {/* 4. Manufacturing & Quality Trust Proof (3 Equal-Height Plant Photos + 3 Regulatory Credentials) */}
      <TempTrustProof
        data={tempLandingData.trustProof}
        onOpenCert={(certId) => setActiveCert(certId)}
      />

      {/* 5. Wide High-Conversion B2B RFQ Lead Portal */}
      <TempInquiryForm
        prefillData={prefillRfqData}
        onResetPrefill={() => setPrefillRfqData(null)}
      />

      {/* 6. B2B Clinical & Procurement FAQ Accordion */}
      <TempFaqSection
        faqs={tempLandingData.faqs}
      />

      {/* 7. Mobile Sticky Conversion Bar (<768px) */}
      <MobileStickyBar onScrollToForm={scrollToForm} />

      {/* Modal 1: 2026 Medical Cable & Temperature Probes Brochure */}
      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        leadType="Temperature Probes Catalog Download"
      />

      {/* Modal 2: Official Compliance Credential (FDA / ISO 13485 / CE MDR & SFDA) */}
      <TempCertificateModal
        isOpen={Boolean(activeCert)}
        certType={activeCert}
        onClose={() => setActiveCert(null)}
      />

    </div>
  );
}
