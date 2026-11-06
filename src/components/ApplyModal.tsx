import React, { useState } from 'react';
import { X, Send, CheckCircle2, Briefcase, Sparkles, Mail, Phone, User, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PosterConfig, JobOpportunity } from '../config/posterConfig';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PosterConfig;
  selectedJob: JobOpportunity | null;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  config,
  selectedJob,
}) => {
  const [role, setRole] = useState(selectedJob?.title || config.jobs.list[0].title);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync role when selectedJob changes
  React.useEffect(() => {
    if (selectedJob) {
      setRole(selectedJob.title);
    }
  }, [selectedJob]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#1E5BFF', '#FF3D9A', '#22C55E', '#FFFFFF'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setPortfolio('');
    setMessage('');
    onClose();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F4D]/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-[#0B1F4D]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF3D9A] via-[#1E5BFF] to-[#22C55E] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              Direct Application Portal
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Apply for Online Opportunities
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Connect with active gigs and client projects curated by {config.developer.name}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E3F9EA] text-[#22C55E] flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-[#0B1F4D]">
                Application Successfully Received!
              </h4>
              <p className="text-xs sm:text-sm text-[#0B1F4D]/75 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-[#1E5BFF]">{name || 'Applicant'}</span>. Your profile for <span className="font-bold text-[#FF3D9A]">{role}</span> has been submitted to {config.developer.name}&apos;s review queue.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-[#0B1F4D]/70 text-left">
                <div className="font-bold text-[#0B1F4D] mb-1">What happens next:</div>
                <div className="space-y-1">
                  <div>1. Initial suitability & portfolio check within 24 hours.</div>
                  <div>2. Invitation to introductory WhatsApp / Google Meet chat.</div>
                  <div>3. Onboarding to active client gig or project.</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-[#1E5BFF] hover:bg-[#1848cc] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Done / Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Role Select */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Position / Role of Interest *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors"
                  required
                >
                  {config.jobs.list.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title} {job.payEstimate ? `(${job.payEstimate})` : ''}
                    </option>
                  ))}
                  <option value="Direct Contract with Developer">
                    Consultation / Project with Cynthia Okanda
                  </option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Kimani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="alex@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+254 7..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Portfolio or Social Link */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Portfolio / LinkedIn / GitHub (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors"
                  />
                </div>
              </div>

              {/* Short Note */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Brief Note / Skills Overview
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a sentence about your background or availability..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E5BFF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF3D9A] via-[#ff54a3] to-[#1E5BFF] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
