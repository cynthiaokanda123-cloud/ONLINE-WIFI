import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { initialPosterConfig, PosterConfig, JobOpportunity, ServiceItem } from './config/posterConfig';
import { PosterNavbar } from './components/PosterNavbar';
import { PosterHero } from './components/PosterHero';
import { PosterJobs } from './components/PosterJobs';
import { PosterAbout } from './components/PosterAbout';
import { PosterSkills } from './components/PosterSkills';
import { PosterTechStack } from './components/PosterTechStack';
import { PosterServices } from './components/PosterServices';
import { PosterContactCTA } from './components/PosterContactCTA';
import { WifiConnectModal } from './components/WifiConnectModal';
import { ApplyModal } from './components/ApplyModal';
import { PosterCustomizerModal } from './components/PosterCustomizerModal';

export default function App() {
  const [config, setConfig] = useState<PosterConfig>(initialPosterConfig);
  const [viewMode, setViewMode] = useState<'poster' | 'full' | 'kiosk'>('poster');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Modals state
  const [wifiModalOpen, setWifiModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);

  const posterRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion media query on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Download Poster as PNG
  const handleDownloadPNG = async () => {
    if (!posterRef.current || isDownloading) return;
    setIsDownloading(true);
    setDownloadNotice('Rendering high-resolution PNG poster...');

    try {
      const element = posterRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution export
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Free_WiFi_Jobs_Poster_${config.developer.name.replace(/\s+/g, '_')}.png`;
      link.href = image;
      link.click();
      setDownloadNotice('PNG Poster successfully exported!');
    } catch (err) {
      console.error('Failed to export PNG:', err);
      setDownloadNotice('Export notice: Use the Print button to save as PDF or image if browser blocks canvas.');
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadNotice(null), 3500);
    }
  };

  // Download Poster as PDF
  const handleDownloadPDF = async () => {
    if (!posterRef.current || isDownloading) return;
    setIsDownloading(true);
    setDownloadNotice('Rendering print-ready A4 PDF...');

    try {
      const element = posterRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Free_WiFi_Jobs_Poster_${config.developer.name.replace(/\s+/g, '_')}.pdf`);
      setDownloadNotice('PDF Poster successfully exported!');
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setDownloadNotice('Export notice: Use the Print button to save as PDF.');
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadNotice(null), 3500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectJob = (job: JobOpportunity) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const handleOpenConsult = (service: ServiceItem) => {
    // Open apply modal with custom consult role
    setSelectedJob({
      id: 'consult',
      title: `${service.title} Project`,
      description: service.description,
      iconName: service.iconName,
      category: 'Client Project',
    });
    setApplyModalOpen(true);
  };

  // Layout container classes based on viewMode
  const containerClasses =
    viewMode === 'poster'
      ? 'w-full max-w-[960px] mx-auto my-0 sm:my-8 rounded-3xl shadow-[0_25px_70px_rgba(11,31,77,0.45)] border border-white/20 overflow-hidden'
      : viewMode === 'kiosk'
      ? 'w-full max-w-[1200px] mx-auto my-0 sm:my-6 rounded-3xl shadow-2xl border border-white/10 overflow-hidden'
      : 'w-full max-w-6xl mx-auto my-0 sm:my-4 rounded-2xl shadow-xl overflow-hidden';

  return (
    <div className="min-h-screen bg-[#0B1F4D] text-[#0B1F4D] flex flex-col font-['Poppins']">
      {/* Top Navbar */}
      <PosterNavbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onDownloadPNG={handleDownloadPNG}
        onDownloadPDF={handleDownloadPDF}
        onPrint={handlePrint}
        onOpenCustomizer={() => setCustomizerModalOpen(true)}
        onOpenWifiModal={() => setWifiModalOpen(true)}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        isDownloading={isDownloading}
      />

      {/* Download / Export Toast notification */}
      {downloadNotice && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-[#1E5BFF] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-fade-in flex items-center gap-2">
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Main Poster Container */}
      <main className="flex-1 px-0 sm:px-4 py-0 sm:py-4 flex justify-center items-start">
        <div
          ref={posterRef}
          className={`poster-container bg-white transition-all duration-300 ${containerClasses}`}
        >
          {/* Section A: Hero Banner with concentric Wi-Fi pulses */}
          <PosterHero
            config={config}
            onOpenWifiModal={() => setWifiModalOpen(true)}
            reducedMotion={reducedMotion}
          />

          {/* Section B: Online Job Opportunities with 3-step pink strip */}
          <PosterJobs
            config={config}
            onSelectJob={handleSelectJob}
            onOpenQR={() => setApplyModalOpen(true)}
            reducedMotion={reducedMotion}
          />

          {/* Section C: About the Developer (Cynthia Okanda) */}
          <PosterAbout config={config} reducedMotion={reducedMotion} />

          {/* Section D: Core Developer Skills (animated progress bars) */}
          <PosterSkills config={config} reducedMotion={reducedMotion} />

          {/* Section E: Technologies I Use (infinite marquee & interactive badges) */}
          <PosterTechStack config={config} reducedMotion={reducedMotion} />

          {/* Section F: Services I Offer (4 cards) */}
          <PosterServices
            config={config}
            onOpenConsult={handleOpenConsult}
            reducedMotion={reducedMotion}
          />

          {/* Section G: Contact & Call To Action (pulsing pink CTA button & QR code) */}
          <PosterContactCTA
            config={config}
            onOpenApply={() => {
              setSelectedJob(null);
              setApplyModalOpen(true);
            }}
            reducedMotion={reducedMotion}
          />
        </div>
      </main>

      {/* Interactive Modals */}
      <WifiConnectModal
        isOpen={wifiModalOpen}
        onClose={() => setWifiModalOpen(false)}
        config={config}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        config={config}
        selectedJob={selectedJob}
      />

      <PosterCustomizerModal
        isOpen={customizerModalOpen}
        onClose={() => setCustomizerModalOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
      />
    </div>
  );
}
