import React from 'react';
import { X, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const BadgeModal: React.FC = () => {
  const { activeBadgeCelebration, closeBadgeCelebration, setCurrentView } = useGame();

  if (!activeBadgeCelebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/50 bg-[#0c1224] p-8 text-center shadow-[0_0_60px_-10px_rgba(245,158,11,0.4)]">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            closeBadgeCelebration();
          }}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow Halo */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
          {activeBadgeCelebration.id === 'ai-master' ? (
            <img
              src="/src/assets/images/badge_ai_master_1791140974547.jpg"
              alt="AI Master Insignia"
              className="h-full w-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-5xl animate-bounce">{activeBadgeCelebration.icon}</span>
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> BADGE UNLOCKED
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          {activeBadgeCelebration.name}
        </h3>

        <div className="text-sm font-semibold text-cyan-400 font-mono mb-4">
          ⭐ +{activeBadgeCelebration.xpValue} XP AWARDED
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {activeBadgeCelebration.description}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              sound.playClick();
              closeBadgeCelebration();
              setCurrentView('progress');
            }}
            className="w-full py-3 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            <span>View Trophy Wall in Progress</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              closeBadgeCelebration();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Keep Exploring Academy
          </button>
        </div>
      </div>
    </div>
  );
};
