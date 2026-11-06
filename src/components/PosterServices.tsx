import React from 'react';
import { Globe, Laptop, Code2, Wifi, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PosterConfig, ServiceItem } from '../config/posterConfig';

interface PosterServicesProps {
  config: PosterConfig;
  onOpenConsult: (service: ServiceItem) => void;
  reducedMotion: boolean;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
};

const serviceAccents = [
  {
    themeColor: '#1E5BFF',
    bg: 'bg-[#EAF1FF]',
    iconColor: 'text-[#1E5BFF]',
    badgeBg: 'bg-[#1E5BFF]/10 text-[#1E5BFF]',
    glow: 'hover:shadow-[0_10px_35px_rgba(30,91,255,0.18)]',
    border: 'hover:border-[#1E5BFF]/50',
  },
  {
    themeColor: '#FF3D9A',
    bg: 'bg-[#FFE6F2]',
    iconColor: 'text-[#FF3D9A]',
    badgeBg: 'bg-[#FF3D9A]/10 text-[#FF3D9A]',
    glow: 'hover:shadow-[0_10px_35px_rgba(255,61,154,0.18)]',
    border: 'hover:border-[#FF3D9A]/50',
  },
  {
    themeColor: '#22C55E',
    bg: 'bg-[#E3F9EA]',
    iconColor: 'text-[#22C55E]',
    badgeBg: 'bg-[#22C55E]/10 text-[#22C55E]',
    glow: 'hover:shadow-[0_10px_35px_rgba(34,197,94,0.18)]',
    border: 'hover:border-[#22C55E]/50',
  },
  {
    themeColor: '#1E5BFF',
    bg: 'bg-[#EAF1FF]',
    iconColor: 'text-[#1E5BFF]',
    badgeBg: 'bg-[#1E5BFF]/10 text-[#1E5BFF]',
    glow: 'hover:shadow-[0_10px_35px_rgba(30,91,255,0.18)]',
    border: 'hover:border-[#1E5BFF]/50',
  },
];

export const PosterServices: React.FC<PosterServicesProps> = ({
  config,
  onOpenConsult,
  reducedMotion,
}) => {
  return (
    <section className="py-8 px-4 sm:px-8 bg-white border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#1E5BFF] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F4D] tracking-tight font-['Poppins']">
            {config.services.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1F4D]/70 max-w-xl mt-1">
            {config.services.subheading}
          </p>
        </div>
        <div className="text-xs font-medium text-[#0B1F4D]/70 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/80">
          Available for Local & International Contracts
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {config.services.items.map((service, index) => {
          const accent = serviceAccents[index % serviceAccents.length];
          return (
            <motion.div
              key={service.title}
              whileHover={reducedMotion ? {} : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOpenConsult(service)}
              className={`p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between ${accent.glow} ${accent.border} group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${accent.bg} ${accent.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}
                  >
                    {serviceIcons[service.iconName] || <Globe className="w-6 h-6" />}
                  </div>
                  <span className="p-2 rounded-lg bg-slate-50 group-hover:bg-slate-100 text-[#0B1F4D]/60 group-hover:text-[#1E5BFF] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B1F4D] group-hover:text-[#1E5BFF] transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#0B1F4D]/75 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Deliverable bullets */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-bold text-[#0B1F4D]/60 uppercase tracking-wider mb-2">
                  Key Deliverables
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-[#0B1F4D]/80"
                    >
                      <Check className="w-3 h-3 text-[#22C55E]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
