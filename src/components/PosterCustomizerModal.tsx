import React, { useState } from 'react';
import { X, RotateCcw, Check, Settings, Wifi, User, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { PosterConfig, initialPosterConfig } from '../config/posterConfig';

interface PosterCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PosterConfig;
  onUpdateConfig: (newConfig: PosterConfig) => void;
}

export const PosterCustomizerModal: React.FC<PosterCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [formState, setFormState] = useState<PosterConfig>(config);

  if (!isOpen) return null;

  const handleChange = (
    section: 'wifi' | 'developer' | 'hero',
    field: string,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formState);
    onClose();
  };

  const handleReset = () => {
    setFormState(initialPosterConfig);
    onUpdateConfig(initialPosterConfig);
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F4D]/75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-[#0B1F4D] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B1F4D] p-5 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF3D9A] text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Customize Poster Placeholders</h3>
              <p className="text-xs text-white/60">
                Update Wi-Fi details, contact info, and links in real-time
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Wi-Fi Section */}
          <div className="p-4 rounded-2xl bg-[#EAF1FF]/50 border border-[#1E5BFF]/20 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1E5BFF]">
              <Wifi className="w-4 h-4" />
              <span>1. Wi-Fi Access Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Wi-Fi Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={formState.wifi.ssid}
                  onChange={(e) => handleChange('wifi', 'ssid', e.target.value)}
                  placeholder="e.g. Cynthia-Guest-5G"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={formState.wifi.password}
                  onChange={(e) => handleChange('wifi', 'password', e.target.value)}
                  placeholder="e.g. FreeConnect2026 or No password needed"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>
            </div>
          </div>

          {/* Developer Information */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0B1F4D]">
              <User className="w-4 h-4 text-[#FF3D9A]" />
              <span>2. Developer Identity & Bio</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Developer Name
                </label>
                <input
                  type="text"
                  value={formState.developer.name}
                  onChange={(e) => handleChange('developer', 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formState.developer.roleTitle}
                  onChange={(e) => handleChange('developer', 'roleTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                Short Bio
              </label>
              <textarea
                rows={2}
                value={formState.developer.bio}
                onChange={(e) => handleChange('developer', 'bio', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF] resize-none"
              />
            </div>
          </div>

          {/* Contact Details & Links */}
          <div className="p-4 rounded-2xl bg-[#FFE6F2]/40 border border-[#FF3D9A]/20 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#FF3D9A]">
              <Mail className="w-4 h-4" />
              <span>3. Contact Channels & Socials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={formState.developer.phone}
                  onChange={(e) => handleChange('developer', 'phone', e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.developer.email}
                  onChange={(e) => handleChange('developer', 'email', e.target.value)}
                  placeholder="cynthiaokanda123@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Website / Portfolio URL
                </label>
                <input
                  type="text"
                  value={formState.developer.website}
                  onChange={(e) => handleChange('developer', 'website', e.target.value)}
                  placeholder="https://cynthiaokanda.dev"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  Location (City / Town)
                </label>
                <input
                  type="text"
                  value={formState.developer.location}
                  onChange={(e) => handleChange('developer', 'location', e.target.value)}
                  placeholder="Nairobi, Kenya"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={formState.developer.linkedin}
                  onChange={(e) => handleChange('developer', 'linkedin', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={formState.developer.github}
                  onChange={(e) => handleChange('developer', 'github', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0B1F4D]/70 uppercase tracking-wider mb-1">
                Apply / QR Code Destination URL
              </label>
              <input
                type="text"
                value={formState.developer.applyUrl}
                onChange={(e) => handleChange('developer', 'applyUrl', e.target.value)}
                placeholder="https://cynthiaokanda.dev/jobs-apply"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#1E5BFF]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#0B1F4D]/70 hover:text-[#0B1F4D] hover:bg-slate-100 transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1E5BFF] hover:bg-[#1848cc] text-white font-bold transition-all shadow-sm cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save & Update Poster</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
