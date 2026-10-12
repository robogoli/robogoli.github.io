import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ViewMode } from '../types/game';

export const Footer: React.FC = () => {
  const { setCurrentView, openDailyModal } = useGame();

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060a14] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">
                AI QUEST
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              “Learn AI. Beat the Challenges. Master the Future.” An interactive training academy empowering students to master machine learning principles, prompt engineering, AI ethics, and hallucination fact-checking.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span>Interactive Simulator</span>
              <span aria-hidden="true">·</span>
              <span>K-12 & College Ready</span>
              <span aria-hidden="true">·</span>
              <span>Responsible AI Standard</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Academy Tracks
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('learn')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Mission 1: Understand AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('challenges')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Mission 2: Fix the Prompt
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('challenges')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Mission 3: AI Ethics Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('detective')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Bonus: AI Detective
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Cadet Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('skilltree')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Neural Skill Tree
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('progress')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Master Journey & Badges
                </button>
              </li>
              <li>
                <button
                  onClick={openDailyModal}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Today's AI Challenge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('profile')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Cadet Credentials & ID
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Quest Academy. Built for students, educators, and future AI pioneers.
          </div>
          <div className="flex items-center gap-6">
            <span>Critical Thinking First</span>
            <span aria-hidden="true">·</span>
            <span>Fact-Check Generative Outputs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
