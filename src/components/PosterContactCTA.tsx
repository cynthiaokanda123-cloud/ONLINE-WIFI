import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Globe,
  Linkedin,
  Github,
  MapPin,
  ArrowRight,
  Sparkles,
  QrCode,
  CheckCircle2,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PosterConfig } from '../config/posterConfig';
import { QRCodeSVG } from '../utils/qrCodeGenerator';

interface PosterContactCTAProps {
  config: PosterConfig;
  onOpenApply: () => void;
  reducedMotion: boolean;
}

export const PosterContactCTA: React.FC<PosterContactCTAProps> = ({
  config,
  onOpenApply,
  reducedMotion,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(config.developer.website);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  return (
    <footer className="py-10 px-4 sm:px-8 bg-gradient-to-b from-white via-[#FFE6F2]/30 to-[#EAF1FF]/40 border-t border-slate-100 rounded-b-3xl">
      <div className="max-w-4xl mx-auto">
        {/* Large Hot Pink Pulsing CTA Button */}
        <div className="text-center mb-10">
          <motion.button
            type="button"
            onClick={onOpenApply}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative group px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#FF3D9A] via-[#ff54a3] to-[#FF3D9A] text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-wide uppercase shadow-[0_10px_35px_rgba(255,61,154,0.35)] hover:shadow-[0_15px_45px_rgba(255,61,154,0.45)] transition-all cursor-pointer inline-flex items-center gap-3"
          >
            {/* Pulsing ring aura */}
            {!reducedMotion && (
              <span className="absolute -inset-1 rounded-2xl bg-[#FF3D9A] opacity-40 blur-md group-hover:opacity-75 animate-pulse transition-opacity pointer-events-none" />
            )}
            <span className="relative z-10 flex items-center gap-3">
              <span>{config.cta.buttonText}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </motion.button>

          <p className="mt-3 text-xs sm:text-sm text-[#0B1F4D]/70 font-medium">
            Immediate access · Zero cost · Apply in under 2 minutes
          </p>
        </div>

        {/* Contact Grid & QR Code Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Contact details with icons */}
          <div className="md:col-span-8 space-y-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E5BFF]" />
              <h3 className="text-base sm:text-lg font-black text-[#0B1F4D] tracking-tight uppercase">
                Get in Touch & Connect
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {/* Phone */}
              <a
                href={`tel:${config.developer.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-[#EAF1FF] text-[#0B1F4D] hover:text-[#1E5BFF] border border-slate-200/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAF1FF] text-[#1E5BFF] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">Phone / WhatsApp</div>
                  <div className="font-bold truncate">{config.developer.phone}</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${config.developer.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-[#FFE6F2] text-[#0B1F4D] hover:text-[#FF3D9A] border border-slate-200/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FFE6F2] text-[#FF3D9A] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">Email</div>
                  <div className="font-bold truncate">{config.developer.email}</div>
                </div>
              </a>

              {/* Website */}
              <a
                href={config.developer.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-[#EAF1FF] text-[#0B1F4D] hover:text-[#1E5BFF] border border-slate-200/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAF1FF] text-[#1E5BFF] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">Portfolio Website</div>
                  <div className="font-bold truncate">{config.developer.website.replace('https://', '')}</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={config.developer.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-[#EAF1FF] text-[#0B1F4D] hover:text-[#1E5BFF] border border-slate-200/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAF1FF] text-[#1E5BFF] flex items-center justify-center shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">LinkedIn Profile</div>
                  <div className="font-bold truncate">in/cynthia-okanda</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={config.developer.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0B1F4D] border border-slate-200/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-200 text-[#0B1F4D] flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">GitHub Code</div>
                  <div className="font-bold truncate">github.com/cynthiaokanda</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 text-[#0B1F4D] border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-[#E3F9EA] text-[#22C55E] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#0B1F4D]/50 uppercase font-semibold">Base Location</div>
                  <div className="font-bold truncate">{config.developer.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Resolution Scannable QR Code */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-gradient-to-b from-[#EAF1FF]/60 to-[#FFE6F2]/40 border border-slate-200/80">
            <div className="p-2.5 bg-white rounded-xl shadow-md border border-slate-200">
              <QRCodeSVG
                value={config.developer.applyUrl || config.developer.website}
                size={120}
                fgColor="#0B1F4D"
              />
            </div>
            <div className="mt-2.5 text-xs font-bold text-[#0B1F4D]">
              Scan to Apply Instantly
            </div>
            <div className="text-[11px] text-[#0B1F4D]/60 mt-0.5">
              Opens digital portal on your phone
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-[11px] font-semibold text-[#1E5BFF] border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Portal URL'}</span>
            </button>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="mt-8 text-center pt-6 border-t border-slate-200/80">
          <p className="text-xs sm:text-sm font-bold text-[#0B1F4D]/70 tracking-wide">
            {config.cta.footerText}
          </p>
          <p className="text-[11px] text-[#0B1F4D]/50 mt-1">
            Engineered with modern React, Tailwind CSS & Motion · Designed for print and screen
          </p>
        </div>
      </div>
    </footer>
  );
};
