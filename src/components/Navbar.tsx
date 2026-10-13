import React from 'react';
import { Sparkles, Volume2, VolumeX, ShieldAlert, Award, Search } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ViewMode } from '../types/game';
import { sound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    state,
    currentLevel,
    toggleSound,
    openDailyModal,
    openSearch,
  } = useGame();

  const navItems: { id: ViewMode; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'learn', label: 'LEARN' },
    { id: 'challenges', label: 'CHALLENGES' },
    { id: 'detective', label: 'AI DETECTIVE' },
    { id: 'skilltree', label: 'SKILL TREE' },
    { id: 'progress', label: 'PROGRESS' },
    { id: 'profile', label: 'PROFILE' },
  ];

  const handleNavClick = (view: ViewMode) => {
    sound.playClick();
    setCurrentView(view);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const isDailyDone = state.lastDailyChallengeDate === todayStr;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-[#080d1a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            AI QUEST
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold hidden sm:inline-block">
            ACADEMY
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium tracking-wider">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-2 relative whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Universal Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-slate-200 transition-colors"
            title="Search curriculum & topics (⌘K)"
            aria-label="Search curriculum"
          >
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="hidden xl:inline text-xs text-slate-400 font-normal">Search...</span>
            <kbd className="hidden sm:inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Daily Challenge Trigger */}
          <button
            onClick={openDailyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
              isDailyDone
                ? 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 hover:border-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)] animate-pulse'
            }`}
            title="Today's AI Challenge (+25 XP)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">DAILY CHALLENGE</span>
            <span className="sm:hidden">DAILY</span>
            {isDailyDone ? (
              <span className="text-[10px] text-emerald-400 font-mono">✓</span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>

          {/* Cadet XP & Level Badge */}
          <button
            onClick={() => handleNavClick('progress')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 hover:border-cyan-500/60 transition-colors text-left"
            title="View AI Master Dashboard"
          >
            <div className="hidden lg:block text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                LVL {currentLevel.level}
              </div>
              <div className="text-xs font-bold text-cyan-300 font-mono tabular-nums leading-none">
                ⭐ {state.xp} XP
              </div>
            </div>
            <div className="lg:hidden text-xs font-bold text-cyan-300 font-mono tabular-nums">
              ⭐ {state.xp}
            </div>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-800 transition-colors"
            title={state.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle sound"
          >
            {state.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/60 px-4 py-2 gap-2 bg-[#060a14]/95 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              currentView === item.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
