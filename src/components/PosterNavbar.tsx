import React from 'react';
import { Download, Printer, Settings, Sparkles, Eye, ShieldCheck, Wifi } from 'lucide-react';

interface PosterNavbarProps {
  viewMode: 'poster' | 'full' | 'kiosk';
  setViewMode: (mode: 'poster' | 'full' | 'kiosk') => void;
  onDownloadPNG: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
  onOpenCustomizer: () => void;
  onOpenWifiModal: () => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  isDownloading: boolean;
}

export const PosterNavbar: React.FC<PosterNavbarProps> = ({
  viewMode,
  setViewMode,
  onDownloadPNG,
  onDownloadPDF,
  onPrint,
  onOpenCustomizer,
  onOpenWifiModal,
  reducedMotion,
  setReducedMotion,
  isDownloading,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full bg-[#0B1F4D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E5BFF] via-[#FF3D9A] to-[#22C55E] flex items-center justify-center p-[2px] shadow-sm">
            <div className="w-full h-full bg-[#0B1F4D] rounded-[10px] flex items-center justify-center">
              <Wifi className="w-4 h-4 text-[#22C55E]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              Cynthia Okanda
              <span className="hidden sm:inline-block text-[11px] font-medium text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                Live Hotspot & Jobs
              </span>
            </span>
            <span className="text-xs text-white/60">Software Engineer & Web Developer</span>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="hidden lg:flex items-center p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('poster')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'poster'
                ? 'bg-[#1E5BFF] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            A3/A4 Poster (3:4)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('full')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'full'
                ? 'bg-[#1E5BFF] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Full Width Web
          </button>
          <button
            type="button"
            onClick={() => setViewMode('kiosk')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'kiosk'
                ? 'bg-[#1E5BFF] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Kiosk Screen
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onOpenWifiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#22C55E]/20 hover:bg-[#22C55E]/30 border border-[#22C55E]/40 rounded-lg transition-colors cursor-pointer"
            title="Scan Wi-Fi QR"
          >
            <Wifi className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="hidden sm:inline">Wi-Fi Access</span>
          </button>

          <button
            type="button"
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors cursor-pointer"
            title="Edit Poster Details & Placeholders"
          >
            <Settings className="w-3.5 h-3.5 text-[#FF3D9A]" />
            <span>Customize</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* Download Buttons */}
          <button
            type="button"
            onClick={onDownloadPNG}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E5BFF] hover:bg-[#1848cc] rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Exporting...' : 'PNG'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#FF3D9A] hover:bg-[#e03184] rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
            title="Print A4 / A3"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </header>
  );
};
