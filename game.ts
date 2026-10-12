export type ViewMode = 'home' | 'learn' | 'challenges' | 'detective' | 'skilltree' | 'progress' | 'profile';

export type SkillBranch = 'foundations' | 'machine_learning' | 'prompt_engineering' | 'ai_ethics' | 'ai_detective' | 'apex';

export interface SkillNode {
  id: string;
  title: string;
  branch: SkillBranch;
  tier: number; // 0: Root, 1: Core, 2: Advanced, 3: Apex Master
  icon: string;
  shortDesc: string;
  fullExplanation: string;
  realWorldApplication: string;
  unlockedByMissionId?: string;
  requiredXp?: number;
  parentIds: string[];
  keyConcept: string;
  practicalDrill: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'knowledge' | 'skills' | 'ethics' | 'detective' | 'master';
  unlocked: boolean;
  unlockedAt?: string;
  xpValue: number;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  nextLevelTitle?: string;
  color: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  question: string;
  promptTopic: string;
  responseA: {
    id: 'A';
    text: string;
    isTrustworthy: boolean;
    critique: string;
  };
  responseB: {
    id: 'B';
    text: string;
    isTrustworthy: boolean;
    critique: string;
  };
  keyTakeaway: string;
}

export interface DetectiveCase {
  id: string;
  title: string;
  brief: string;
  aiPrompt: string;
  aiResponseSentences: {
    id: string;
    text: string;
    isError: boolean;
    correction?: string;
    explanation?: string;
  }[];
  verdictTip: string;
}

export interface EthicsScenario {
  id: string;
  title: string;
  scenario: string;
  options: {
    id: 'A' | 'B' | 'C';
    text: string;
    isBestChoice: boolean;
    score: number;
    feedback: string;
    guideline: string;
  }[];
}

export interface PromptChallengeStage {
  id: string;
  label: string;
  weakPrompt: string;
  pillars: {
    task: string;
    details: string;
    audience: string;
    format: string;
  };
  improvedPrompt: string;
  sampleOutput: string;
}

export interface GameState {
  xp: number;
  studentName: string;
  studentAvatar: string;
  completedMissions: string[];
  unlockedBadges: string[];
  dailyStreak: number;
  lastDailyChallengeDate: string | null;
  soundEnabled: boolean;
  hasSeenIntro: boolean;
}
