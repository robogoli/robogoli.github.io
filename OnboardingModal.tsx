import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, User, ShieldCheck, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, state } = useGame();
  const [name, setName] = useState(state.studentName === 'Cadet Nova' ? '' : state.studentName);
  const [avatar, setAvatar] = useState(state.studentAvatar || '🚀');
  const inputRef = useRef<HTMLInputElement>(null);

  const emblemList = ['🚀', '🧠', '🤖', '⚡', '🛸', '👾', '🌟', '🛡️'];

  useEffect(() => {
    if (isOnboardingOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOnboardingOpen]);

  if (!isOnboardingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const finalName = name.trim() || 'Cadet Nova';
    completeOnboarding(finalName, avatar);
  };

  const handleSkip = () => {
    sound.playClick();
    completeOnboarding('Cadet Nova', avatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-[#091124] shadow-[0_0_80px_-10px_rgba(6,182,212,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Top Accent Header */}
        <div className="relative border-b border-slate-800 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-amber-950/60 px-6 py-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI QUEST ACADEMY</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Enter Your Profile Name
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            Welcome, future AI Master! Enter your name to personalize your missions, dashboard, and graduation diploma.
          </p>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Call-sign input */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Cadet Call-Sign / Student Name</span>
              <span className="text-cyan-400 text-[11px]">Required</span>
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                placeholder="e.g. Alex, Maya, Nova, CyberPioneer..."
                className="w-full px-4 py-3.5 rounded-xl border-2 border-cyan-500/40 bg-slate-950 text-slate-100 placeholder:text-slate-600 text-base font-semibold focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          {/* Emblem selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
              Choose Cadet Emblem
            </label>
            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
              {emblemList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setAvatar(item);
                  }}
                  className={`h-11 w-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                    avatar === item
                      ? 'border-cyan-400 bg-cyan-500/20 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#060a16] p-4 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
              HOMEPAGE HEADLINE PREVIEW:
            </span>
            <div className="text-xs text-slate-400 font-mono">
              WELCOME,
            </div>
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent uppercase truncate">
              {avatar} {name.trim() || 'CADET NOVA'}.
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:opacity-95 transition-opacity shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 INITIALIZE PROFILE & ENTER ACADEMY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              Or continue with default "Cadet Nova"
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
