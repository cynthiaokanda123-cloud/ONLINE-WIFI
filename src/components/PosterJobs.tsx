import React from 'react';
import {
  Briefcase,
  Code2,
  Globe,
  Laptop,
  Users,
  Clock,
  ArrowRight,
  Wifi,
  QrCode,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PosterConfig, JobOpportunity } from '../config/posterConfig';

interface PosterJobsProps {
  config: PosterConfig;
  onSelectJob: (job: JobOpportunity) => void;
  onOpenQR: () => void;
  reducedMotion: boolean;
}

// Icon mapper for job opportunities
const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
};

// Color accents cycling between blue, pink, and green
const accentStyles = [
  {
    bg: 'bg-[#EAF1FF]',
    iconColor: 'text-[#1E5BFF]',
    glow: 'hover:shadow-[0_8px_30px_rgba(30,91,255,0.18)]',
    tagBg: 'bg-[#1E5BFF]/10 text-[#1E5BFF]',
    borderHover: 'hover:border-[#1E5BFF]/40',
  },
  {
    bg: 'bg-[#FFE6F2]',
    iconColor: 'text-[#FF3D9A]',
    glow: 'hover:shadow-[0_8px_30px_rgba(255,61,154,0.18)]',
    tagBg: 'bg-[#FF3D9A]/10 text-[#FF3D9A]',
    borderHover: 'hover:border-[#FF3D9A]/40',
  },
  {
    bg: 'bg-[#E3F9EA]',
    iconColor: 'text-[#22C55E]',
    glow: 'hover:shadow-[0_8px_30px_rgba(34,197,94,0.18)]',
    tagBg: 'bg-[#22C55E]/10 text-[#22C55E]',
    borderHover: 'hover:border-[#22C55E]/40',
  },
];

export const PosterJobs: React.FC<PosterJobsProps> = ({
  config,
  onSelectJob,
  onOpenQR,
  reducedMotion,
}) => {
  return (
    <section className="py-8 px-4 sm:px-8 bg-white">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE6F2] text-[#FF3D9A] text-xs font-bold tracking-wide uppercase mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Earn While You Browse</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F4D] tracking-tight font-['Poppins']">
            {config.jobs.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1F4D]/70 max-w-xl mt-1">
            {config.jobs.subheading}
          </p>
        </div>
        <div className="text-xs font-semibold text-[#1E5BFF] flex items-center gap-1.5 self-start sm:self-auto bg-[#EAF1FF] px-3 py-1.5 rounded-lg border border-[#1E5BFF]/20">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>Active Postings Today</span>
        </div>
      </div>

      {/* Grid of 6 Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {config.jobs.list.map((job, index) => {
          const style = accentStyles[index % accentStyles.length];
          return (
            <motion.div
              key={job.id}
              whileHover={reducedMotion ? {} : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectJob(job)}
              className={`group relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between ${style.glow} ${style.borderHover}`}
            >
              <div>
                {/* Card Top: Icon & Pay estimate */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${style.bg} ${style.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}
                  >
                    {iconMap[job.iconName] || <Briefcase className="w-5 h-5" />}
                  </div>
                  {job.payEstimate && (
                    <span className="text-[11px] font-bold font-mono text-[#0B1F4D] bg-slate-100 group-hover:bg-[#EAF1FF] px-2.5 py-1 rounded-md border border-slate-200/60 transition-colors">
                      {job.payEstimate}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F4D] group-hover:text-[#1E5BFF] transition-colors leading-snug">
                  {job.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs text-[#0B1F4D]/75 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${style.tagBg}`}>
                  {job.category}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#1E5BFF] group-hover:translate-x-1 transition-transform">
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pink "How to Apply" Strip with 3 Numbered Steps */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#FF3D9A] via-[#ff56a8] to-[#1E5BFF] p-[2px] shadow-lg">
        <div className="rounded-[14px] bg-[#FFE6F2] p-4 sm:p-6 text-[#0B1F4D]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF3D9A] animate-ping" />
              <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-[#0B1F4D]">
                How to Apply in 3 Quick Steps
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpenQR}
              className="text-xs font-bold text-[#FF3D9A] bg-white hover:bg-white/90 border border-[#FF3D9A]/30 px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Open Fast-Apply QR</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.jobs.howToApplySteps.map((step) => (
              <div
                key={step.step}
                className="bg-white/90 backdrop-blur-sm p-3.5 rounded-xl border border-pink-200/60 shadow-xs flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF3D9A] text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {step.step}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#0B1F4D]">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-[#0B1F4D]/75 mt-0.5 leading-tight">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
