import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  ShieldCheck,
  Flame,
  Star,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LEVELS } from '../data/gameData';
import { Badge } from '../types/game';
import { sound } from '../utils/sound';

export const ProgressView: React.FC = () => {
  const {
    state,
    currentLevel,
    nextLevel,
    levelProgressPercent,
    badges,
    setCurrentView,
    openCertificate,
    triggerConfetti,
  } = useGame();

  const handleBadgeClick = (badge: Badge) => {
    sound.playClick();
    if (badge.unlocked) {
      triggerConfetti();
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const isMasterReady = state.unlockedBadges.includes('ai-master');

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-[#0d162f] via-[#091024] to-[#070b18] p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>ACADEMY CADET PROGRESSION RECORD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            YOUR AI JOURNEY
          </h1>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Current Standing</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide">
                Level {currentLevel.level} — {currentLevel.title}
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <div className="text-xs font-mono text-slate-400 uppercase">Total Experience</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tabular-nums">
                ⭐ {state.xp} XP
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <div className="text-xs font-mono text-slate-400 uppercase">Daily Habit Streak</div>
              <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono tabular-nums flex items-center gap-1.5">
                <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
                <span>{state.dailyStreak} Days</span>
              </div>
            </div>
          </div>

          {/* Graphical Progress Bar */}
          <div className="pt-4 space-y-2 max-w-2xl">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">
                {nextLevel
                  ? `${nextLevel.minXp - state.xp} XP to ${nextLevel.title}`
                  : 'MAX LEVEL ATTAINED!'}
              </span>
              <span className="text-cyan-400 font-bold">{levelProgressPercent}%</span>
            </div>

            {/* Visual ASCII-style & fill gauge */}
            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-700 ease-out"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Graduation Certificate Callout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-cyan-950/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Official AI Academy Diploma & Certificate
            </h3>
            <p className="text-xs text-slate-300">
              Verify your credentials, inspect official seal, and print or export as PDF for your portfolio.
            </p>
          </div>
        </div>

        <button
          onClick={openCertificate}
          className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-95 text-xs font-mono uppercase tracking-wider whitespace-nowrap shadow-lg"
        >
          🎓 VIEW & PRINT DIPLOMA
        </button>
      </div>

      {/* Badges Trophy Wall */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              BADGES TROPHY WALL
            </h2>
            <p className="text-xs text-slate-400">
              Click any badge to inspect requirements and skill specifications.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-lg">
            Unlocked: {unlockedCount} / {badges.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all cursor-pointer ${
                  badge.unlocked
                    ? 'border-cyan-500/50 bg-[#091326] hover:border-cyan-400 shadow-[0_0_25px_-5px_rgba(6,182,212,0.15)]'
                    : 'border-slate-800/80 bg-slate-900/40 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl border ${
                        badge.unlocked
                          ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-200'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-500" />}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                        <span>{badge.name}</span>
                        {badge.unlocked && (
                          <span className="text-emerald-400 text-sm">✅</span>
                        )}
                        {!badge.unlocked && (
                          <span className="text-slate-500 text-xs">🔒</span>
                        )}
                      </h4>
                      <span className="text-[11px] font-mono text-amber-300">
                        ⭐ +{badge.xpValue} XP
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  {badge.description}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono">
                  {badge.unlocked ? (
                    <span className="text-emerald-400 font-bold">STATUS: UNLOCKED</span>
                  ) : (
                    <span className="text-slate-500">STATUS: LOCKED (Complete Track)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academy Level Tiers Roadmap */}
      <div className="rounded-2xl border border-slate-800 bg-[#080d1c] p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Cadet Rank Ladder & Milestones
        </h3>

        <div className="space-y-3">
          {LEVELS.map((lvl) => {
            const isCurrent = lvl.level === currentLevel.level;
            const isAchieved = state.xp >= lvl.minXp;

            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isCurrent
                    ? 'border-cyan-500/80 bg-cyan-950/30'
                    : isAchieved
                    ? 'border-slate-800 bg-slate-900/60'
                    : 'border-slate-800/40 bg-slate-950/40 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
                      isAchieved
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    L{lvl.level}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Level {lvl.level}: {lvl.title}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      XP Range: {lvl.minXp} – {lvl.maxXp} XP
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  {isCurrent && (
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold">
                      ACTIVE RANK
                    </span>
                  )}
                  {!isCurrent && isAchieved && (
                    <span className="text-emerald-400 font-bold">COMPLETED</span>
                  )}
                  {!isAchieved && (
                    <span className="text-slate-500">LOCKED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
