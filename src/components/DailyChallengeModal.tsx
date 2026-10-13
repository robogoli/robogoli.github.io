import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { DAILY_CHALLENGES } from '../data/gameData';
import { sound } from '../utils/sound';

export const DailyChallengeModal: React.FC = () => {
  const { isDailyModalOpen, closeDailyModal, completeDailyChallenge, state } = useGame();
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<'A' | 'B' | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!isDailyModalOpen) return null;

  const challenge = DAILY_CHALLENGES[selectedChallengeIndex % DAILY_CHALLENGES.length];

  const handleSelect = (choice: 'A' | 'B') => {
    if (revealed) return;
    sound.playClick();
    setSelectedResponse(choice);
    setRevealed(true);

    const isTrustworthy = choice === 'A' ? challenge.responseA.isTrustworthy : challenge.responseB.isTrustworthy;
    completeDailyChallenge(isTrustworthy);
  };

  const handleNextChallenge = () => {
    sound.playClick();
    setSelectedResponse(null);
    setRevealed(false);
    setSelectedChallengeIndex((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#0b1329] shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)]">
        {/* Glow accent header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-gradient-to-r from-cyan-950/60 via-slate-900/40 to-amber-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  ⚡ TODAY'S CHALLENGE
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono text-cyan-300">Streak: {state.dailyStreak} days</span>
              </div>
              <h3 className="text-lg font-bold text-white">Which AI response should you trust?</h3>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              closeDailyModal();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Question / Prompt scenario */}
          <div className="rounded-xl border border-slate-800 bg-[#070b18] p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Field Scenario: {challenge.promptTopic}
            </div>
            <p className="text-base font-semibold text-slate-100">
              "{challenge.question}"
            </p>
          </div>

          {/* Response Cards Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Response A */}
            <div
              onClick={() => handleSelect('A')}
              className={`rounded-xl border p-5 transition-all cursor-pointer relative ${
                revealed
                  ? challenge.responseA.isTrustworthy
                    ? 'border-emerald-500/80 bg-emerald-950/20'
                    : selectedResponse === 'A'
                    ? 'border-rose-500/80 bg-rose-950/20'
                    : 'border-slate-800 bg-slate-900/30 opacity-60'
                  : 'border-slate-700/60 bg-slate-900/60 hover:border-cyan-500 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
                  RESPONSE A
                </span>
                {revealed && challenge.responseA.isTrustworthy && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> TRUSTWORTHY
                  </span>
                )}
                {revealed && !challenge.responseA.isTrustworthy && (
                  <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" /> HALLUCINATED
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic mb-4">
                "{challenge.responseA.text}"
              </p>

              {revealed && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-100 block mb-1">Audit Breakdown:</span>
                  {challenge.responseA.critique}
                </div>
              )}

              {!revealed && (
                <button className="w-full mt-2 py-2 text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 rounded-lg border border-cyan-800/60 transition-colors">
                  Trust Response A
                </button>
              )}
            </div>

            {/* Response B */}
            <div
              onClick={() => handleSelect('B')}
              className={`rounded-xl border p-5 transition-all cursor-pointer relative ${
                revealed
                  ? challenge.responseB.isTrustworthy
                    ? 'border-emerald-500/80 bg-emerald-950/20'
                    : selectedResponse === 'B'
                    ? 'border-rose-500/80 bg-rose-950/20'
                    : 'border-slate-800 bg-slate-900/30 opacity-60'
                  : 'border-slate-700/60 bg-slate-900/60 hover:border-cyan-500 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono tracking-wider bg-slate-800 text-amber-300 border border-slate-700">
                  RESPONSE B
                </span>
                {revealed && challenge.responseB.isTrustworthy && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> TRUSTWORTHY
                  </span>
                )}
                {revealed && !challenge.responseB.isTrustworthy && (
                  <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" /> HALLUCINATED
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic mb-4">
                "{challenge.responseB.text}"
              </p>

              {revealed && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-100 block mb-1">Audit Breakdown:</span>
                  {challenge.responseB.critique}
                </div>
              )}

              {!revealed && (
                <button className="w-full mt-2 py-2 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 rounded-lg border border-amber-800/60 transition-colors">
                  Trust Response B
                </button>
              )}
            </div>
          </div>

          {/* Outcome banner */}
          {revealed && (
            <div className="rounded-xl border border-cyan-800/60 bg-cyan-950/30 p-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-cyan-200">
                    {selectedResponse &&
                    ((selectedResponse === 'A' && challenge.responseA.isTrustworthy) ||
                      (selectedResponse === 'B' && challenge.responseB.isTrustworthy))
                      ? '⭐ Superb Critical Analysis! You earned +25 XP.'
                      : '⚠️ Be Careful: You trusted an inaccurate AI hallucination.'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {challenge.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800/80 px-6 py-4 bg-[#080d1a]">
          <div className="text-xs text-slate-400">
            {revealed ? 'Challenge completed for today!' : 'Select the response you consider safe & factual.'}
          </div>
          <div className="flex items-center gap-3">
            {revealed && (
              <button
                onClick={handleNextChallenge}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Another Daily Case
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                closeDailyModal();
              }}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-95 rounded-lg transition-opacity"
            >
              Close & Return to Academy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
