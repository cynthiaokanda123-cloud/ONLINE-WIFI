import React, { useState } from 'react';
import { User, CheckCircle2, ShieldCheck, Sparkles, MapPin, Award, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { PosterConfig } from '../config/posterConfig';

interface PosterAboutProps {
  config: PosterConfig;
  reducedMotion: boolean;
}

export const PosterAbout: React.FC<PosterAboutProps> = ({ config, reducedMotion }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-8 px-4 sm:px-8 bg-gradient-to-b from-white via-[#EAF1FF]/40 to-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* Round Profile Photo with Animated Gradient Ring */}
        <div className="relative shrink-0">
          {/* Animated gradient spinning halo */}
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full p-[4px] bg-gradient-to-tr from-[#1E5BFF] via-[#FF3D9A] to-[#22C55E] shadow-xl ${
              reducedMotion ? '' : 'animate-spin'
            }`}
            style={{ animationDuration: '9s' }}
          >
            <div className="w-full h-full rounded-full bg-white p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={config.developer.photoUrl}
                    alt={config.developer.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1E5BFF] to-[#0B1F4D] flex flex-col items-center justify-center text-white">
                    <User className="w-16 h-16 text-white/90" />
                    <span className="text-xs font-bold mt-1">Cynthia Okanda</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="absolute -bottom-2 -right-2 bg-white text-[#22C55E] p-1.5 rounded-full shadow-lg border border-slate-200">
            <CheckCircle2 className="w-6 h-6 fill-[#22C55E] text-white" />
          </div>
        </div>

        {/* Developer Bio & Credentials */}
        <div className="text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#1E5BFF] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Lead Engineer & Designer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F4D] tracking-tight font-['Poppins']">
            {config.developer.name}
          </h2>

          <p className="mt-1 text-sm sm:text-base font-bold text-[#1E5BFF] tracking-tight">
            {config.developer.roleTitle}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#0B1F4D]/80 leading-relaxed font-normal">
            {config.developer.bio}
          </p>

          {/* Quick trust metrics */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-[#0B1F4D]/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span className="font-semibold">Verified Tech Professional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF3D9A]" />
              <span className="font-semibold">{config.developer.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#1E5BFF]" />
              <span className="font-semibold">Available for Hire & Consults</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
