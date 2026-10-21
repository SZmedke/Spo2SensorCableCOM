import React, { useState } from 'react';
import { esuLandingData } from '../data/landing/esu-data';
import EsuHero from '../components/landing/EsuHero';
import EsuCorePillars from '../components/landing/EsuCorePillars';
import EsuCompatibilityHub from '../components/landing/EsuCompatibilityHub';
import EsuOrSupplies from '../components/landing/EsuOrSupplies';
import EsuTrustProof from '../components/landing/EsuTrustProof';
import EsuInquiryForm from '../components/landing/EsuInquiryForm';
import EsuFaqSection from '../components/landing/EsuFaqSection';
import EsuCertificateModal from '../components/landing/EsuCertificateModal';
import EsuLightboxModal from '../components/landing/EsuLightboxModal';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';

export default function EsuLandingPage() {
  const [prefillRfqData, setPrefillRfqData] = useState(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', title: '' });

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

  const scrollToHub = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('compatibility-hub');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrefill = (interest, message) => {
    setPrefillRfqData({ interest, message });
    scrollToForm();
  };

  const handleHubInquire = (payload) => {
    setPrefillRfqData(payload);
    scrollToForm();
  };

  const handleOpenLightbox = (src, title) => {
    setLightbox({ isOpen: true, src, title });
  };

  const handleCloseLightbox = () => {
    setLightbox({ isOpen: false, src: '', title: '' });
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0 overflow-x-hidden">
      
      {/* 1. Hero Section with Trust Badges, Copy, Metrics & CAD Schematic */}
      <EsuHero
        data={esuLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* 2. Core Self-Manufactured Systems (System A & System B) */}
      <EsuCorePillars
        data={esuLandingData}
        onPrefill={handlePrefill}
        onOpenLightbox={handleOpenLightbox}
        onScrollToHub={scrollToHub}
      />

      {/* 3. Bipolar Cable Compatibility Hub (Step 01 & Step 02 Selection Matrix) */}
      <EsuCompatibilityHub
        compatibilityData={esuLandingData.compatibilityData}
        onInquire={handleHubInquire}
      />

      {/* 4. Operating Room Consumables — Complementary Supply */}
      <EsuOrSupplies
        orSupplies={esuLandingData.orSupplies}
        onPrefill={handlePrefill}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 5. Quality Control, Testing Standards & Regulatory Compliance */}
      <EsuTrustProof
        data={esuLandingData.trustProof}
        onOpenCert={(certKey) => setActiveCert(certKey)}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 6. Port-Matched B2B RFQ Lead Portal */}
      <EsuInquiryForm
        prefillData={prefillRfqData}
        onResetPrefill={() => setPrefillRfqData(null)}
      />

      {/* 7. Procurement FAQ Accordion */}
      <EsuFaqSection
        faqs={esuLandingData.faqs}
      />

      {/* 8. Mobile Sticky Conversion Bar (<768px) */}
      <MobileStickyBar onScrollToForm={scrollToForm} />

      {/* Modal 1: 2026 ESU Catalog Brochure Download */}
      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        leadType="ESU Electrosurgical Accessories Catalog Download"
      />

      {/* Modal 2: Regulatory & Qualification Credential Details */}
      <EsuCertificateModal
        isOpen={Boolean(activeCert)}
        certType={activeCert}
        certData={esuLandingData.certData}
        onClose={() => setActiveCert(null)}
      />

      {/* Modal 3: High-Resolution Product Lightbox */}
      <EsuLightboxModal
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        title={lightbox.title}
        onClose={handleCloseLightbox}
      />

    </div>
  );
}
