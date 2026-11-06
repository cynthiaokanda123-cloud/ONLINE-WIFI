import React, { useState } from 'react';
import { Wifi, X, Copy, Check, Smartphone, ShieldCheck, Radio, Sparkles } from 'lucide-react';
import { QRCodeSVG } from '../utils/qrCodeGenerator';
import { PosterConfig } from '../config/posterConfig';

interface WifiConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PosterConfig;
}

export const WifiConnectModal: React.FC<WifiConnectModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copiedSSID, setCopiedSSID] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [simulatedConnecting, setSimulatedConnecting] = useState(false);
  const [connectedSuccess, setConnectedSuccess] = useState(false);

  if (!isOpen) return null;

  // Format standard Wi-Fi QR payload string
  // Format: WIFI:S:<SSID>;T:<WPA|WEP|nopass>;P:<PASSWORD>;;
  const wifiQRString = `WIFI:S:${config.wifi.ssid};T:${config.wifi.security};P:${
    config.wifi.password === 'No password needed' ? '' : config.wifi.password
  };;`;

  const copySSID = () => {
    navigator.clipboard?.writeText(config.wifi.ssid);
    setCopiedSSID(true);
    setTimeout(() => setCopiedSSID(false), 2000);
  };

  const copyPass = () => {
    navigator.clipboard?.writeText(config.wifi.password);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const handleSimulateConnect = () => {
    setSimulatedConnecting(true);
    setTimeout(() => {
      setSimulatedConnecting(false);
      setConnectedSuccess(true);
    }, 1500);
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F4D]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-[#0B1F4D]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1E5BFF] via-[#FF3D9A] to-[#1E5BFF] p-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-full bg-white text-[#1E5BFF] flex items-center justify-center mb-3 shadow-lg">
            <Wifi className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Connect to Free Wi-Fi
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Point phone camera to join instantly or use credentials below
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* QR Code Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-5">
            <div className="p-3 bg-white rounded-xl shadow-md border border-slate-200">
              <QRCodeSVG value={wifiQRString} size={150} fgColor="#0B1F4D" />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#1E5BFF]">
              <Smartphone className="w-4 h-4" />
              <span>Scan with iPhone or Android Camera</span>
            </div>
            <p className="text-[11px] text-[#0B1F4D]/60 mt-0.5">
              Automatically prompts &ldquo;Join Network&rdquo; on mobile devices
            </p>
          </div>

          {/* Credentials Display */}
          <div className="space-y-2.5">
            {/* SSID */}
            <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#0B1F4D]/50 uppercase tracking-wider block">
                  Wi-Fi Name (SSID)
                </span>
                <span className="font-mono font-bold text-sm text-[#0B1F4D]">
                  {config.wifi.ssid}
                </span>
              </div>
              <button
                type="button"
                onClick={copySSID}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-[#1E5BFF] border border-slate-200 shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                {copiedSSID ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSSID ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Password */}
            <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#0B1F4D]/50 uppercase tracking-wider block">
                  Password
                </span>
                <span className="font-mono font-bold text-sm text-[#0B1F4D]">
                  {config.wifi.password}
                </span>
              </div>
              {config.wifi.password !== 'No password needed' && (
                <button
                  type="button"
                  onClick={copyPass}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-[#1E5BFF] border border-slate-200 shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedPass ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPass ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Test Connection Action */}
          <div className="mt-5">
            {connectedSuccess ? (
              <div className="p-3 rounded-xl bg-[#E3F9EA] border border-[#22C55E]/40 text-[#22C55E] text-center font-bold text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Connected! You have unlimited high-speed browsing.</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSimulateConnect}
                disabled={simulatedConnecting}
                className="w-full py-2.5 px-4 rounded-xl bg-[#22C55E] hover:bg-[#1db053] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {simulatedConnecting ? 'Connecting to Gateway...' : 'Test Device Connection'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
