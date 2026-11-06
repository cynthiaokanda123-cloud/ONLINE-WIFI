import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Code2, Cpu, Smartphone, Layers, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PosterConfig } from '../config/posterConfig';

interface PosterSkillsProps {
  config: PosterConfig;
  reducedMotion: boolean;
}

export const PosterSkills: React.FC<PosterSkillsProps> = ({ config, reducedMotion }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [animateFill, setAnimateFill] = useState(false);

  useEffect(() => {
    if (isInView || reducedMotion) {
      setAnimateFill(true);
    }
  }, [isInView, reducedMotion]);

  return (
    <section ref={ref} className="py-8 px-4 sm:px-8 bg-white border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#1E5BFF] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F4D] tracking-tight font-['Poppins']">
            {config.skills.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1F4D]/70 max-w-xl mt-1">
            {config.skills.subheading}
          </p>
        </div>
        <div className="text-xs font-mono text-[#0B1F4D]/60 self-start sm:self-auto">
          Audit Verified · 2026 Production Standards
        </div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {config.skills.items.map((skill, index) => {
          // Color bar variant
          const gradientClass =
            index % 3 === 0
              ? 'from-[#1E5BFF] via-[#3d74ff] to-[#FF3D9A]'
              : index % 3 === 1
              ? 'from-[#FF3D9A] via-[#ff65ad] to-[#22C55E]'
              : 'from-[#22C55E] via-[#4ade80] to-[#1E5BFF]';

          return (
            <div
              key={skill.name}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-[#EAF1FF]/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#0B1F4D]">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="hidden md:inline-block text-[11px] text-[#0B1F4D]/60 font-normal">
                      · {skill.highlight}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-mono text-[#0B1F4D] tabular-nums">
                  <span>{skill.percentage}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 sm:h-3.5 bg-slate-200/70 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: animateFill ? `${skill.percentage}%` : '0%',
                  }}
                  transition={{
                    duration: reducedMotion ? 0.1 : 1.2,
                    delay: reducedMotion ? 0 : index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${gradientClass} shadow-xs relative`}
                >
                  {/* Subtle inner highlight */}
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
