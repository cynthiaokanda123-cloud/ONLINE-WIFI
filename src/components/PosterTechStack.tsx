import React, { useState } from 'react';
import { Layers, Terminal, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PosterConfig, TechItem } from '../config/posterConfig';

interface PosterTechStackProps {
  config: PosterConfig;
  reducedMotion: boolean;
}

// Custom clean SVG icons for standard tech stack logos
const techLogos: Record<string, React.ReactNode> = {
  html5: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M4 2L5.8 19.4L12 21.1L18.2 19.4L20 2H4Z" fill="#E44D26" />
      <path d="M12 3.8V19.3L16.7 18L18.2 3.8H12Z" fill="#F16529" />
      <path d="M12 7.7H8.5L8.7 10.3H12V12.7H8.9L9.3 16.5L12 17.3V15L11.5 14.8L11.3 12.8H12V7.7Z" fill="white" />
      <path d="M12 7.7V10.3H15.2L15 12.8H12V15.1L14.7 14.3L14.9 12.8H12V10.3H15.5L15.2 13.9L12 14.8V17.3L15.7 16.5L16.2 10.3H12V7.7Z" fill="#EBEBEB" />
    </svg>
  ),
  css3: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M4 2L5.8 19.4L12 21.1L18.2 19.4L20 2H4Z" fill="#1572B6" />
      <path d="M12 3.8V19.3L16.7 18L18.2 3.8H12Z" fill="#33A9DC" />
      <path d="M12 7.7H8.5L9 14.2H12V16.7L9.3 15.9L9.1 14.2H6.9L7.3 18.2L12 19.5V7.7Z" fill="white" />
      <path d="M12 7.7V10.2H15.5L15.3 12.7H12V15.2L14.7 14.4L14.9 12.7H17.2L16.7 18.2L12 19.5V7.7Z" fill="#EBEBEB" />
    </svg>
  ),
  javascript: (
    <div className="w-5 h-5 rounded bg-[#F7DF1E] flex items-center justify-center font-bold text-[10px] text-black">
      JS
    </div>
  ),
  typescript: (
    <div className="w-5 h-5 rounded bg-[#3178C6] flex items-center justify-center font-bold text-[10px] text-white">
      TS
    </div>
  ),
  react: (
    <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  nodejs: (
    <svg className="w-5 h-5 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2ZM12 4.4L18.8 8.3V15.7L12 19.6L5.2 15.7V8.3L12 4.4Z" />
    </svg>
  ),
  tailwindcss: (
    <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6c-2.4 0-4 1.2-4.8 3.6 1-1.2 2.2-1.6 3.6-1.2 1 .3 1.8 1.1 2.6 1.9C14.7 11.6 16.2 13 19.2 13c2.4 0 4-1.2 4.8-3.6-1 1.2-2.2 1.6-3.6 1.2-1-.3-1.8-1.1-2.6-1.9C16.5 7.4 15 6 12 6zm-7.2 7c-2.4 0-4 1.2-4.8 3.6 1-1.2 2.2-1.6 3.6-1.2 1 .3 1.8 1.1 2.6 1.9C7.5 18.6 9 20 12 20c2.4 0 4-1.2 4.8-3.6-1 1.2-2.2 1.6-3.6 1.2-1-.3-1.8-1.1-2.6-1.9C9.3 14.4 7.8 13 4.8 13z" />
    </svg>
  ),
  git: (
    <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4 12 6.6c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.6 2.6c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.4-2.4v5.3c.2.2.4.4.4.7 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.4-1.2 1-1.4V9c-.6-.2-1-.8-1-1.4 0-.4.2-.8.5-1.1L8.3 4.9 2.4 10.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z" />
    </svg>
  ),
  figma: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="7" height="7" rx="3.5" fill="#F24E1E" />
      <rect x="12" y="2" width="7" height="7" rx="3.5" fill="#FF7262" />
      <rect x="5" y="9" width="7" height="7" rx="3.5" fill="#A259FF" />
      <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
      <path d="M5 16C5 14.07 6.57 12.5 8.5 12.5H12V19.5C12 21.43 10.43 23 8.5 23C6.57 23 5 21.43 5 19.5V16Z" fill="#0ACF83" />
    </svg>
  ),
  api: (
    <div className="w-5 h-5 rounded bg-[#1E5BFF] flex items-center justify-center font-bold text-[9px] text-white">
      API
    </div>
  ),
  database: (
    <svg className="w-5 h-5 text-[#FF3D9A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  ai: (
    <div className="w-5 h-5 rounded bg-gradient-to-tr from-[#1E5BFF] via-[#FF3D9A] to-[#22C55E] flex items-center justify-center text-white font-extrabold text-[9px]">
      AI
    </div>
  ),
};

export const PosterTechStack: React.FC<PosterTechStackProps> = ({ config, reducedMotion }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless continuous marquee loop
  const marqueeItems = [...config.technologies.items, ...config.technologies.items];

  return (
    <section className="py-8 px-4 sm:px-8 bg-slate-50/60 border-t border-slate-100 overflow-hidden">
      <div className="max-w-4xl mx-auto mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F9EA] text-[#22C55E] text-xs font-bold uppercase tracking-wider mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>Production Tech Stack</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F4D] tracking-tight font-['Poppins']">
          {config.technologies.heading}
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1F4D]/70 max-w-lg mx-auto mt-1">
          {config.technologies.subheading}
        </p>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge fade scrims */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={
            reducedMotion || isPaused
              ? {}
              : {
                  x: ['0%', '-50%'],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-3 w-max"
        >
          {marqueeItems.map((tech, idx) => (
            <motion.div
              key={`${tech.name}-${idx}`}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1E5BFF]/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="shrink-0 transition-transform group-hover:scale-110">
                {techLogos[tech.iconKey] || <Layers className="w-5 h-5 text-[#1E5BFF]" />}
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-[#0B1F4D] whitespace-nowrap group-hover:text-[#1E5BFF] transition-colors">
                  {tech.name}
                </div>
                <div className="text-[10px] text-[#0B1F4D]/50 font-medium whitespace-nowrap">
                  {tech.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile/Tablet Grid View */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
        {config.technologies.items.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#0B1F4D] shadow-2xs hover:border-[#FF3D9A]/50 hover:shadow-xs transition-all cursor-default"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              {techLogos[tech.iconKey] || <Layers className="w-4 h-4 text-[#1E5BFF]" />}
            </span>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
