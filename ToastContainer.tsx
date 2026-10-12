import React from 'react';
import { Sparkles, Award, ArrowUpCircle, Info } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useGame();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border bg-[#0b1328]/95 backdrop-blur-md shadow-2xl text-slate-100 transition-all animate-slideUp border-cyan-500/40"
        >
          {toast.type === 'xp' && (
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'badge' && (
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
              <Award className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'level' && (
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <ArrowUpCircle className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
              <Info className="w-4 h-4" />
            </div>
          )}
          <div className="text-xs font-semibold leading-snug">
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
};
