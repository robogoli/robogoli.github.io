import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Compass,
  Brain,
  Wand2,
  Scale,
  Search,
  Trophy,
  CheckCircle2,
  GitBranch,
  Play,
  Layers,
  Award,
  ChevronRight,
  Clock,
  User,
  Zap,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const HomeView: React.FC = () => {
  const {
    state,
    currentLevel,
    nextLevel,
    levelProgressPercent,
    setCurrentView,
    openDailyModal,
    openCertificate,
    navigateToChallenges,
    openSearch,
    openOnboarding,
  } = useGame();

  // Determine next recommended mission
  const getNextRecommendedMission = () => {
    if (!state.completedMissions.includes('mission_1')) {
      return {
        id: 'mission_1',
        title: 'Mission 1: Understand AI',
        actionLabel: 'Launch Mission 1',
        xpReward: 50,
        desc: 'Learn neural network basics and play “AI or Not AI”.',
        onClick: () => {
          sound.playClick();
          setCurrentView('learn');
        },
      };
    }
    if (!state.completedMissions.includes('mission_2')) {
      return {
        id: 'mission_2',
        title: 'Mission 2: AI Skills & Prompts',
        actionLabel: 'Launch Mission 2',
        xpReward: 100,
        desc: 'Master the 4 Pillars of prompting and craft custom prompts.',
        onClick: () => {
          sound.playClick();
          navigateToChallenges('prompt');
        },
      };
    }
    if (!state.completedMissions.includes('mission_3')) {
      return {
        id: 'mission_3',
        title: 'Mission 3: AI Ethics Arena',
        actionLabel: 'Launch Mission 3',
        xpReward: 100,
        desc: 'Solve critical dilemmas on homework integrity, deepfakes, and privacy.',
        onClick: () => {
          sound.playClick();
          navigateToChallenges('ethics');
        },
      };
    }
    if (!state.completedMissions.includes('detective')) {
      return {
        id: 'detective',
        title: 'Bonus: AI Detective',
        actionLabel: 'Launch AI Detective',
        xpReward: 100,
        desc: 'Inspect confident AI texts and catch dangerous hallucinations.',
        onClick: () => {
          sound.playClick();
          setCurrentView('detective');
        },
      };
    }
    return {
      id: 'skilltree',
      title: 'Academy Skill Tree Mastered!',
      actionLabel: 'Explore Neural Skill Tree',
      xpReward: 0,
      desc: 'You completed all core tracks. Inspect your visual topology and claim your diploma.',
      onClick: () => {
        sound.playClick();
        setCurrentView('skilltree');
      },
    };
  };

  const nextMission = getNextRecommendedMission();

  const handleStartMission = () => {
    nextMission.onClick();
  };

  // Quick Portal Links to every page
  const quickPortals = [
    {
      id: 'learn',
      title: 'Mission 1: Learn AI',
      subtitle: 'Neural nets & “AI or Not AI”',
      icon: Brain,
      tag: 'FOUNDATIONS',
      badge: state.completedMissions.includes('mission_1') ? 'COMPLETED' : '+50 XP',
      isCompleted: state.completedMissions.includes('mission_1'),
      color: 'border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20',
      tagColor: 'text-cyan-400',
      onClick: () => {
        sound.playClick();
        setCurrentView('learn');
      },
    },
    {
      id: 'prompt',
      title: 'Mission 2: AI Skills',
      subtitle: 'Prompt engineering & 4 Pillars',
      icon: Wand2,
      tag: 'PROMPTS',
      badge: state.completedMissions.includes('mission_2') ? 'COMPLETED' : '+100 XP',
      isCompleted: state.completedMissions.includes('mission_2'),
      color: 'border-teal-500/40 hover:border-teal-400 bg-teal-950/20',
      tagColor: 'text-teal-400',
      onClick: () => {
        sound.playClick();
        navigateToChallenges('prompt');
      },
    },
    {
      id: 'ethics',
      title: 'Mission 3: AI Ethics',
      subtitle: '“What Would You Do?” Dilemmas',
      icon: Scale,
      tag: 'ETHICS',
      badge: state.completedMissions.includes('mission_3') ? 'COMPLETED' : '+100 XP',
      isCompleted: state.completedMissions.includes('mission_3'),
      color: 'border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/20',
      tagColor: 'text-indigo-400',
      onClick: () => {
        sound.playClick();
        navigateToChallenges('ethics');
      },
    },
    {
      id: 'detective',
      title: 'Bonus: AI Detective',
      subtitle: 'Catch confident AI hallucinations',
      icon: Search,
      tag: 'AUDITING',
      badge: state.completedMissions.includes('detective') ? 'COMPLETED' : '+100 XP',
      isCompleted: state.completedMissions.includes('detective'),
      color: 'border-amber-500/40 hover:border-amber-400 bg-amber-950/20',
      tagColor: 'text-amber-400',
      onClick: () => {
        sound.playClick();
        setCurrentView('detective');
      },
    },
    {
      id: 'skilltree',
      title: 'Neural Skill Tree',
      subtitle: 'Visual knowledge topology & branches',
      icon: GitBranch,
      tag: 'VISUAL TREE',
      badge: 'TOPOLOGY',
      isCompleted: false,
      color: 'border-purple-500/40 hover:border-purple-400 bg-purple-950/20',
      tagColor: 'text-purple-400',
      onClick: () => {
        sound.playClick();
        setCurrentView('skilltree');
      },
    },
    {
      id: 'progress',
      title: 'Dashboard & Badges',
      subtitle: 'Trophy wall, levels & milestones',
      icon: Trophy,
      tag: 'PROGRESSION',
      badge: `${state.unlockedBadges.length} BADGES`,
      isCompleted: false,
      color: 'border-blue-500/40 hover:border-blue-400 bg-blue-950/20',
      tagColor: 'text-blue-400',
      onClick: () => {
        sound.playClick();
        setCurrentView('progress');
      },
    },
    {
      id: 'daily',
      title: 'Daily Challenge',
      subtitle: 'Which AI response should you trust?',
      icon: Sparkles,
      tag: 'DAILY HABIT',
      badge: '+25 XP',
      isCompleted: state.lastDailyChallengeDate === new Date().toISOString().split('T')[0],
      color: 'border-orange-500/40 hover:border-orange-400 bg-orange-950/20',
      tagColor: 'text-orange-400',
      onClick: openDailyModal,
    },
    {
      id: 'diploma',
      title: 'Official Diploma',
      subtitle: 'Print or export AI Master Certificate',
      icon: Award,
      tag: 'CREDENTIAL',
      badge: 'DIPLOMA',
      isCompleted: false,
      color: 'border-amber-400/40 hover:border-amber-300 bg-amber-950/20',
      tagColor: 'text-amber-300',
      onClick: openCertificate,
    },
  ];

  // 6-Step Learning Progression Pipeline
  const journeySteps = [
    {
      num: 1,
      name: 'Understand AI',
      view: 'learn' as const,
      isDone: state.completedMissions.includes('mission_1'),
    },
    {
      num: 2,
      name: 'Prompt Craft',
      view: 'challenges' as const,
      tab: 'prompt' as const,
      isDone: state.completedMissions.includes('mission_2'),
    },
    {
      num: 3,
      name: 'Ethics Arena',
      view: 'challenges' as const,
      tab: 'ethics' as const,
      isDone: state.completedMissions.includes('mission_3'),
    },
    {
      num: 4,
      name: 'AI Detective',
      view: 'detective' as const,
      isDone: state.completedMissions.includes('detective'),
    },
    {
      num: 5,
      name: 'Skill Tree',
      view: 'skilltree' as const,
      isDone: state.completedMissions.length >= 4,
    },
    {
      num: 6,
      name: 'Master Diploma',
      view: 'progress' as const,
      isDone: state.unlockedBadges.includes('ai-master'),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Welcome Container */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0e162e] via-[#0a1022] to-[#070b18] p-8 sm:p-14 shadow-2xl">
        {/* Background artwork */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
          <img
            src="/src/assets/images/hero_ai_academy_1791140964442.jpg"
            alt="AI Academy Command Center"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient radial lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI QUEST ACADEMY
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase font-sans">
            WELCOME, <br />
            <span
              onClick={openOnboarding}
              className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
              title="Click to edit profile name"
            >
              <span>{state.studentName || 'CADET'}.</span>
              <span className="text-xs font-mono font-normal tracking-wider lowercase text-slate-500 hover:text-cyan-400">
                ✎
              </span>
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Your mission is to learn how AI works, master AI tools, and learn how to use AI responsibly.
          </p>

          {/* Start Mission CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartMission}
              className="px-8 py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:opacity-90 transition-all shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] flex items-center gap-3 text-sm tracking-wider uppercase group cursor-pointer"
            >
              <span>🚀 START MISSION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={openSearch}
              className="px-6 py-4 rounded-xl font-bold text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2 text-sm tracking-wider uppercase cursor-pointer"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>🔍 SEARCH</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('skilltree');
              }}
              className="px-6 py-4 rounded-xl font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/60 transition-colors flex items-center gap-2 text-sm tracking-wider uppercase cursor-pointer"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>🌳 SKILL TREE</span>
            </button>

            <button
              onClick={openDailyModal}
              className="px-5 py-4 rounded-xl font-bold text-amber-300 bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/60 transition-colors flex items-center gap-2 text-sm tracking-wider uppercase cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>⚡ DAILY CHALLENGE (+25 XP)</span>
            </button>
          </div>
        </div>

        {/* Current Level & XP Display Box */}
        <div className="relative z-10 mt-10 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Level Title */}
            <div
              onClick={() => {
                sound.playClick();
                setCurrentView('progress');
              }}
              className="cursor-pointer group"
              title="Click to view progress dashboard"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1 group-hover:text-cyan-300">
                <span>CURRENT CADET RANK</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-wide text-white uppercase flex items-center gap-2 group-hover:text-cyan-200">
                <span>LEVEL {currentLevel.level} — {currentLevel.title.toUpperCase()}</span>
              </div>
            </div>

            {/* XP Total */}
            <div
              onClick={() => {
                sound.playClick();
                setCurrentView('progress');
              }}
              className="cursor-pointer group"
              title="Click to view experience tally"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1 group-hover:text-cyan-300">
                <span>ACADEMY EXPERIENCE</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums group-hover:text-amber-300 transition-colors">
                ⭐ {state.xp} XP
              </div>
            </div>

            {/* Level Progression Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Next: {nextLevel ? nextLevel.title : 'Supreme Master'}</span>
                <span className="text-cyan-400 font-bold">{levelProgressPercent}%</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-700 ease-out"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Banner */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-[#0b1328] p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-400">
                RECOMMENDED NEXT STEP
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {nextMission.title}
              </h3>
              <p className="text-xs text-slate-300">
                {nextMission.desc}
              </p>
            </div>
          </div>

          <button
            onClick={nextMission.onClick}
            className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-95 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
          >
            <span>{nextMission.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACADEMY QUICK JUMP PORTALS (EASILY NAVIGABLE TO ALL PAGES) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              ACADEMY NAVIGATION HUB
            </h2>
            <p className="text-xs text-slate-400">
              One-click direct access to all academy missions, skill tree, daily challenges, and dashboard.
            </p>
          </div>
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-white transition-all text-xs font-mono shrink-0 shadow-sm cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search Curriculum...</span>
            <kbd className="rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPortals.map((portal) => {
            const Icon = portal.icon;

            return (
              <div
                key={portal.id}
                onClick={portal.onClick}
                className={`group rounded-2xl border p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${portal.color}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 group-hover:text-cyan-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        portal.isCompleted
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-900 text-amber-300 border-slate-800'
                      }`}
                    >
                      {portal.badge}
                    </span>
                  </div>

                  <div className={`text-[10px] font-mono uppercase font-bold tracking-wider mb-0.5 ${portal.tagColor}`}>
                    {portal.tag}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {portal.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 group-hover:text-slate-200">
                    Open Page
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>ENTER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP-BY-STEP ACADEMY LEARNING PIPELINE */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-slate-800 bg-[#080d1e] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              RECOMMENDED CADET PATHWAY
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Interactive Academy Roadmap
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click any step to jump directly to that lesson
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {journeySteps.map((step) => {
            const handleStepClick = () => {
              sound.playClick();
              if (step.tab) {
                navigateToChallenges(step.tab);
              } else {
                setCurrentView(step.view);
              }
            };

            return (
              <div
                key={step.num}
                onClick={handleStepClick}
                className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 ${
                  step.isDone
                    ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-200 shadow-sm'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-500/60'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    STEP {step.num}
                  </span>
                  {step.isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold truncate">{step.name}</div>
                <div className="text-[10px] font-mono mt-1 text-cyan-400">
                  {step.isDone ? '✓ Mastered' : 'Jump →'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Spotlight: Neural Skill Tree & AI Detective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Skill Tree Spotlight */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-slate-900/70 to-slate-950 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase">
              <GitBranch className="w-3.5 h-3.5" /> NEURAL TOPOLOGY
            </div>
            <h3 className="text-lg font-bold text-white">Visual AI Skill Tree</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore your branching knowledge network from Core Foundations up to Deep Learning, Prompt Craft, and Algorithmic Ethics.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('skilltree');
              }}
              className="w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider text-slate-950 bg-gradient-to-r from-purple-400 to-cyan-300 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>INSPECT SKILL TREE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: AI Detective Spotlight */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900/70 to-slate-950 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              <Search className="w-3.5 h-3.5" /> AUDIT CHALLENGE
            </div>
            <h3 className="text-lg font-bold text-white">Can You Catch The AI?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI sounds 100% confident even when hallucinating complete falsehoods! Inspect historical reports and expose the AI’s mistakes.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('detective');
              }}
              className="w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PLAY AI DETECTIVE (+100 XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
