import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_BADGES, LEVELS } from '../data/gameData';
import { Badge, GameState, LevelInfo, ViewMode } from '../types/game';
import { sound } from '../utils/sound';

interface ToastNotice {
  id: string;
  message: string;
  xp?: number;
  type: 'xp' | 'badge' | 'level' | 'info';
}

interface GameContextType {
  state: GameState;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  levelProgressPercent: number;
  badges: Badge[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  challengesTab: 'prompt' | 'ethics';
  setChallengesTab: (tab: 'prompt' | 'ethics') => void;
  navigateToChallenges: (tab: 'prompt' | 'ethics') => void;
  addXP: (amount: number, reason: string) => void;
  completeMission: (missionId: string, xpReward: number, badgeId?: string) => void;
  unlockBadge: (badgeId: string) => void;
  completeDailyChallenge: (isTrustworthyChosen: boolean) => void;
  toggleSound: () => void;
  updateProfile: (name: string, avatar: string) => void;
  resetProgress: () => void;
  toasts: ToastNotice[];
  activeBadgeCelebration: Badge | null;
  closeBadgeCelebration: () => void;
  isDailyModalOpen: boolean;
  openDailyModal: () => void;
  closeDailyModal: () => void;
  isCertificateOpen: boolean;
  openCertificate: () => void;
  closeCertificate: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  completeOnboarding: (name: string, avatar: string) => void;
  triggerConfetti: () => void;
}

const STORAGE_KEY = 'ai_quest_cadet_state_v1';

const defaultState: GameState = {
  xp: 0,
  studentName: 'Cadet Nova',
  studentAvatar: '🚀',
  completedMissions: [],
  unlockedBadges: [],
  dailyStreak: 0,
  lastDailyChallengeDate: null,
  soundEnabled: true,
  hasSeenIntro: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // LocalStorage unavailable
    }
    return defaultState;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [challengesTab, setChallengesTab] = useState<'prompt' | 'ethics'>('prompt');
  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState<Badge | null>(null);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => !state.hasSeenIntro);

  // Sync sound manager
  useEffect(() => {
    sound.enabled = state.soundEnabled;
  }, [state.soundEnabled]);

  // Global shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  // Compute current level
  const currentLevel = LEVELS.reduce((acc, lvl) => {
    if (state.xp >= lvl.minXp) return lvl;
    return acc;
  }, LEVELS[0]);

  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1) || null;

  const levelProgressPercent = Math.min(
    100,
    Math.max(
      0,
      nextLevel
        ? Math.round(((state.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100)
        : 100
    )
  );

  const badges: Badge[] = INITIAL_BADGES.map((b) => ({
    ...b,
    unlocked: state.unlockedBadges.includes(b.id),
  }));

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const showToast = (message: string, type: ToastNotice['type'] = 'info', xp?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, xp }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const unlockBadge = (badgeId: string) => {
    const badge = INITIAL_BADGES.find((b) => b.id === badgeId);
    if (!badge || state.unlockedBadges.includes(badgeId)) return;

    sound.playLevelUp();
    triggerConfetti();

    setState((prev) => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + badge.xpValue,
    }));

    showToast(`Badge Unlocked: ${badge.name}!`, 'badge', badge.xpValue);
    setActiveBadgeCelebration(badge);
  };

  const addXP = (amount: number, reason: string) => {
    if (amount <= 0) return;

    sound.playSuccess();
    const oldLevel = currentLevel.level;

    setState((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = LEVELS.reduce((acc, lvl) => (newXp >= lvl.minXp ? lvl : acc), LEVELS[0]);

      if (newLevel.level > oldLevel) {
        setTimeout(() => {
          sound.playLevelUp();
          triggerConfetti();
          showToast(`Level Up! You reached Level ${newLevel.level}: ${newLevel.title}!`, 'level');
        }, 500);
      }

      return { ...prev, xp: newXp };
    });

    showToast(`+${amount} XP: ${reason}`, 'xp', amount);
  };

  const completeMission = (missionId: string, xpReward: number, badgeId?: string) => {
    const isNew = !state.completedMissions.includes(missionId);
    if (isNew) {
      setState((prev) => ({
        ...prev,
        completedMissions: [...prev.completedMissions, missionId],
      }));
      addXP(xpReward, `Mission Completed: ${missionId.toUpperCase()}`);
      if (badgeId) {
        setTimeout(() => {
          unlockBadge(badgeId);
        }, 800);
      }
    }
  };

  const completeDailyChallenge = (isTrustworthyChosen: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    if (isTrustworthyChosen) {
      sound.playSuccess();
      const newStreak = (state.dailyStreak || 0) + 1;
      setState((prev) => ({
        ...prev,
        lastDailyChallengeDate: today,
        dailyStreak: newStreak,
      }));
      addXP(25, "Today's AI Challenge Solved");
      if (!state.unlockedBadges.includes('daily-striker')) {
        setTimeout(() => {
          unlockBadge('daily-striker');
        }, 600);
      }
    } else {
      sound.playError();
    }
  };

  // Check Master Badge Unlock: If all 4 core missions completed and XP >= 350
  useEffect(() => {
    const core = ['mission_1', 'mission_2', 'mission_3', 'detective'];
    const allCoreDone = core.every((m) => state.completedMissions.includes(m));
    if (allCoreDone && !state.unlockedBadges.includes('ai-master')) {
      setTimeout(() => {
        unlockBadge('ai-master');
      }, 1200);
    }
  }, [state.completedMissions]);

  const toggleSound = () => {
    setState((prev) => {
      const next = !prev.soundEnabled;
      sound.enabled = next;
      if (next) sound.playClick();
      return { ...prev, soundEnabled: next };
    });
  };

  const updateProfile = (name: string, avatar: string) => {
    sound.playClick();
    setState((prev) => ({
      ...prev,
      studentName: name.trim() || 'Cadet Nova',
      studentAvatar: avatar || '🚀',
    }));
    showToast('Cadet Profile updated successfully!', 'info');
  };

  const resetProgress = () => {
    sound.playClick();
    setState(defaultState);
    setCurrentView('home');
    showToast('Academy progress reset to Rookie state.', 'info');
  };

  const navigateToChallenges = (tab: 'prompt' | 'ethics') => {
    sound.playClick();
    setChallengesTab(tab);
    setCurrentView('challenges');
  };

  const completeOnboarding = (name: string, avatar: string) => {
    const finalName = name.trim() || 'Cadet Nova';
    const finalAvatar = avatar || '🚀';
    sound.playSuccess();
    triggerConfetti();
    setState((prev) => ({
      ...prev,
      studentName: finalName,
      studentAvatar: finalAvatar,
      hasSeenIntro: true,
    }));
    setIsOnboardingOpen(false);
    showToast(`Welcome aboard, ${finalName}! Your academy record is initialized.`, 'info');
  };

  return (
    <GameContext.Provider
      value={{
        state,
        currentLevel,
        nextLevel,
        levelProgressPercent,
        badges,
        currentView,
        setCurrentView,
        challengesTab,
        setChallengesTab,
        navigateToChallenges,
        addXP,
        completeMission,
        unlockBadge,
        completeDailyChallenge,
        toggleSound,
        updateProfile,
        resetProgress,
        toasts,
        activeBadgeCelebration,
        closeBadgeCelebration: () => setActiveBadgeCelebration(null),
        isDailyModalOpen,
        openDailyModal: () => {
          sound.playClick();
          setIsDailyModalOpen(true);
        },
        closeDailyModal: () => setIsDailyModalOpen(false),
        isCertificateOpen,
        openCertificate: () => {
          sound.playClick();
          setIsCertificateOpen(true);
        },
        closeCertificate: () => setIsCertificateOpen(false),
        isSearchOpen,
        openSearch: () => {
          sound.playClick();
          setIsSearchOpen(true);
        },
        closeSearch: () => setIsSearchOpen(false),
        toggleSearch: () => {
          sound.playClick();
          setIsSearchOpen((prev) => !prev);
        },
        isOnboardingOpen,
        openOnboarding: () => {
          sound.playClick();
          setIsOnboardingOpen(true);
        },
        closeOnboarding: () => setIsOnboardingOpen(false),
        completeOnboarding,
        triggerConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
