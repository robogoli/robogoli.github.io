import React, { useRef } from 'react';
import { X, Award, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const CertificateModal: React.FC = () => {
  const { isCertificateOpen, closeCertificate, state, currentLevel } = useGame();
  const certRef = useRef<HTMLDivElement>(null);

  if (!isCertificateOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certId = `AQ-${Math.abs(state.xp * 7919 + 104729).toString(16).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#070c1a] shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)]">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#091124]">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>AI QUEST ACADEMY</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={() => {
                sound.playClick();
                closeCertificate();
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet (Printable) */}
        <div className="p-8 sm:p-12" ref={certRef}>
          <div className="relative rounded-xl border-4 border-double border-amber-500/40 bg-gradient-to-b from-[#0b142c] via-[#090f22] to-[#070b18] p-8 text-center text-slate-200 shadow-2xl">
            {/* Corner geometric ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/80" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400/80" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400/80" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400/80" />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300">
              <Award className="w-8 h-8" />
            </div>

            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold mb-1">
              GLOBAL AI TRAINING ACADEMY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 font-serif">
              Certificate of AI Competency
            </h2>

            <p className="mt-3 text-xs text-slate-400 uppercase tracking-wider">
              THIS CREDENTIAL IS PROUDLY CONFERRED UPON
            </p>

            <div className="my-3 py-2 text-2xl sm:text-3xl font-bold text-white border-b border-cyan-500/30 inline-block px-8">
              {state.studentName}
            </div>

            <p className="max-w-lg mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              For demonstrating mastery in Machine Learning Foundations, Precision Prompt Engineering, Algorithmic Ethics, and Critical Hallucination Fact-Checking.
            </p>

            {/* Badges / Milestones completed */}
            <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400">Track 01</div>
                <div className="text-xs font-bold text-cyan-300">Understand AI</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400">Track 02</div>
                <div className="text-xs font-bold text-teal-300">Prompt Master</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400">Track 03</div>
                <div className="text-xs font-bold text-indigo-300">AI Ethics</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400">Bonus</div>
                <div className="text-xs font-bold text-amber-300">AI Detective</div>
              </div>
            </div>

            {/* Seal & Signatures */}
            <div className="mt-6 flex items-center justify-between text-left text-xs border-t border-slate-800/80 pt-4">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Awarded Standing</div>
                <div className="font-bold text-amber-400 font-mono">
                  LEVEL {currentLevel.level}: {currentLevel.title.toUpperCase()}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Total XP: ⭐ {state.xp}</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 flex items-center justify-center mx-auto text-amber-400 text-xs font-serif font-black bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  SEAL
                </div>
                <div className="text-[9px] font-mono text-amber-400/90 mt-1 uppercase">VERIFIED</div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Issue Date & ID</div>
                <div className="text-slate-300 font-medium">{todayStr}</div>
                <div className="text-[10px] font-mono text-cyan-400">{certId}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-4 bg-[#091124] flex items-center justify-between text-xs text-slate-400">
          <span>Cadets can present this certificate for classroom or competition portfolio credit.</span>
          <button
            onClick={() => {
              sound.playClick();
              closeCertificate();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
