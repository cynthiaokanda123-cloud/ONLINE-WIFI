import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Laptop, Briefcase, Code2, Copy, Check, Sparkles, Key, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PosterConfig } from '../config/posterConfig';

interface PosterHeroProps {
  config: PosterConfig;
  onOpenWifiModal: () => void;
  reducedMotion: boolean;
}

export const PosterHero: React.FC<PosterHeroProps> = ({ config, onOpenWifiModal, reducedMotion }) => {
  const [copied, setCopied] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for "Connect. Work. Earn."
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(config.hero.typewriterWords.join(' '));
      return;
    }

    const words = config.hero.typewriterWords;
    const currentWord = words[typewriterIndex % words.length];

    let timer: NodeJS.Timeout;
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setTypewriterIndex((prev) => (prev + 1) % words.length);
        }
      }, 70);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        if (displayedText.length === currentWord.length) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1800);
        }
      }, 120);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typewriterIndex, config.hero.typewriterWords, reducedMotion]);

  const handleCopyPassword = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(config.wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-8 text-center bg-gradient-to-b from-[#EAF1FF] via-white to-white rounded-t-3xl border-b border-slate-100">
      {/* Floating Decorative Blobs and Drifting Icons */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle gradient blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#1E5BFF]/10 blur-3xl" />
          <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-[#FF3D9A]/10 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-60 h-60 rounded-full bg-[#22C55E]/10 blur-3xl" />

          {/* Drifting background tech icons */}
          <motion.div
            animate={{ y: [0, -16, 0], x: [0, 8, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-[10%] opacity-20 text-[#1E5BFF]"
          >
            <Laptop className="w-9 h-9" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-24 right-[12%] opacity-20 text-[#FF3D9A]"
          >
            <Briefcase className="w-8 h-8" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0], x: [0, -6, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-12 left-[15%] opacity-20 text-[#22C55E]"
          >
            <Code2 className="w-8 h-8" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-16 right-[14%] opacity-20 text-[#1E5BFF]"
          >
            <Signal className="w-8 h-8" />
          </motion.div>
        </div>
      )}

      {/* Top Banner Tag */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-5">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E3F9EA] border border-[#22C55E]/40 text-[#22C55E] text-xs font-bold tracking-wide shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
          <span>{config.hero.badgeText}</span>
        </motion.div>
        <span className="text-xs font-medium text-[#0B1F4D]/70 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200">
          5G Fiber High-Speed
        </span>
      </div>

      {/* Giant Animated Wi-Fi Icon with Expanding Waves */}
      <div className="relative z-10 my-4 flex justify-center items-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Concentric wave pulses */}
          {!reducedMotion && (
            <>
              <div
                className="absolute inset-0 rounded-full border-2 border-[#1E5BFF]/40 animate-wifi-pulse pointer-events-none"
                style={{ animationDelay: '0s' }}
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-[#FF3D9A]/40 animate-wifi-pulse pointer-events-none"
                style={{ animationDelay: '0.8s' }}
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-[#22C55E]/30 animate-wifi-pulse pointer-events-none"
                style={{ animationDelay: '1.6s' }}
              />
            </>
          )}

          {/* Central Wi-Fi Orb */}
          <motion.button
            type="button"
            onClick={onOpenWifiModal}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#1E5BFF] via-[#FF3D9A] to-[#22C55E] p-[3px] shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
            title="Click to view Wi-Fi connection card"
          >
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-[#1E5BFF] group-hover:bg-[#EAF1FF]/60 transition-colors">
              <Wifi className="w-9 h-9 sm:w-11 sm:h-11 text-[#1E5BFF] transition-transform group-hover:scale-110" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Huge Bold Headline with Gradient Shimmer */}
      <div className="relative z-10 max-w-2xl mx-auto mt-2">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B1F4D] uppercase leading-none font-['Poppins']">
          <span className="bg-gradient-to-r from-[#1E5BFF] via-[#FF3D9A] to-[#1E5BFF] bg-clip-text text-transparent animate-shimmer-text">
            {config.hero.headline}
          </span>
        </h1>

        {/* Sub-headline with Typewriter Effect */}
        <div className="mt-3 h-9 flex items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1F4D] tracking-tight">
            <span>{displayedText}</span>
            <span className="inline-block w-1 h-6 ml-1 bg-[#FF3D9A] animate-pulse align-middle" />
          </p>
        </div>

        {/* Short value statement */}
        <p className="mt-3 text-sm sm:text-base text-[#0B1F4D]/80 max-w-lg mx-auto leading-relaxed font-normal">
          {config.hero.subtext}
        </p>
      </div>

      {/* Network Info Chip Bar */}
      <div className="relative z-10 mt-6 max-w-xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 transition-all hover:border-[#1E5BFF]/40">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#1E5BFF] flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <div className="text-[#0B1F4D]/60 text-[11px] font-medium uppercase tracking-wider">Network SSID</div>
              <div className="font-bold text-[#0B1F4D] font-mono tracking-tight">{config.wifi.ssid}</div>
            </div>
          </div>

          <div className="h-px sm:h-8 w-full sm:w-px bg-slate-200 shrink-0" />

          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="text-left text-xs sm:text-sm">
              <div className="text-[#0B1F4D]/60 text-[11px] font-medium uppercase tracking-wider">Password</div>
              <div className="font-semibold text-[#0B1F4D] font-mono">
                {config.wifi.password === 'No password needed' ? (
                  <span className="text-[#22C55E] font-bold">Open · No password</span>
                ) : (
                  <span>{config.wifi.password}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {config.wifi.password !== 'No password needed' && (
                <button
                  type="button"
                  onClick={handleCopyPassword}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-[#EAF1FF] text-[#1E5BFF] text-xs font-medium transition-colors cursor-pointer"
                  title="Copy password"
                >
                  {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={onOpenWifiModal}
                className="px-3 py-1.5 rounded-lg bg-[#1E5BFF] hover:bg-[#1848cc] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Connect QR
              </button>
            </div>
          </div>
        </div>

        {/* Speed note */}
        <div className="mt-2 text-[11px] text-[#0B1F4D]/60 flex items-center justify-center gap-2">
          <span>{config.wifi.speedDescription}</span>
          <span>•</span>
          <span className="text-[#22C55E] font-medium">Free for all visitors</span>
        </div>
      </div>
    </section>
  );
};
