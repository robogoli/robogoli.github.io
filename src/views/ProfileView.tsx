import React, { useState, useEffect } from 'react';
import { User, Shield, Sparkles, Award, RotateCcw, Check, Save } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const ProfileView: React.FC = () => {
  const { state, currentLevel, updateProfile, resetProgress } = useGame();
  const [name, setName] = useState(state.studentName);
  const [avatar, setAvatar] = useState(state.studentAvatar);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setName(state.studentName);
    setAvatar(state.studentAvatar);
  }, [state.studentName, state.studentAvatar]);

  const avatarOptions = ['🚀', '🧠', '🤖', '⚡', '🛸', '🛰️', '👾', '🌟'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, avatar);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1">
          CADET RECORD & IDENTITY
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase">
          Cadet Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your Academy credentials, inspect telemetry stats, or manage cadet profile settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Holographic Cadet ID Card */}
        <div className="md:col-span-1">
          <div className="rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-b from-[#0e1730] to-[#070b18] p-6 text-center space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300" />

            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              AI QUEST ACADEMY
            </div>

            <div className="mx-auto h-24 w-24 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              {avatar}
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">{name}</h3>
              <div className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                LEVEL {currentLevel.level}: {currentLevel.title.toUpperCase()}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Total XP:</span>
                <span className="text-cyan-300 font-bold tabular-nums">⭐ {state.xp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Badges:</span>
                <span className="text-amber-300 font-bold tabular-nums">{state.unlockedBadges.length} Earned</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Streak:</span>
                <span className="text-orange-400 font-bold tabular-nums">{state.dailyStreak} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">Active Cadet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Editor & Reset Settings */}
        <div className="md:col-span-2 space-y-6">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-slate-800 bg-[#080d1c] p-6 space-y-6"
          >
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Edit Cadet Credentials
            </h3>

            {/* Name Input */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
                Cadet Call-Sign / Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
                Select Cadet Emblem
              </label>
              <div className="flex flex-wrap gap-3">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setAvatar(opt);
                    }}
                    className={`h-11 w-11 rounded-xl text-xl flex items-center justify-center border transition-all ${
                      avatar === opt
                        ? 'border-cyan-400 bg-cyan-500/20 shadow-md scale-105'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Cadet Profile</span>
              </button>
            </div>
          </form>

          {/* Reset Progress Section */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-rose-300">
                  Reset Academy Progression
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Wipe earned XP, badges, and progress to experience the tutorial missions from the beginning.
                </p>
              </div>

              {!showResetConfirm ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setShowResetConfirm(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-500/40 hover:bg-rose-900/60 transition-colors whitespace-nowrap"
                >
                  Reset Progress
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-950 bg-rose-500 hover:bg-rose-400 transition-colors"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
