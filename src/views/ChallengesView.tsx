import React, { useState } from 'react';
import {
  Wand2,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Send,
  RefreshCw,
  Award,
  Play,
  Check,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ETHICS_SCENARIOS, PROMPT_CHALLENGE_STAGES } from '../data/gameData';
import { EthicsScenario } from '../types/game';
import { sound } from '../utils/sound';

export const ChallengesView: React.FC = () => {
  const { state, completeMission, setCurrentView, challengesTab, setChallengesTab } = useGame();
  const activeTab = challengesTab;
  const setActiveTab = setChallengesTab;

  // Mission 2: Prompt Engineering State
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [revealedPillars, setRevealedPillars] = useState<{ [key: string]: boolean }>({});
  const [customPromptText, setCustomPromptText] = useState('');
  const [customGeneratedOutput, setCustomGeneratedOutput] = useState<string | null>(null);
  const [customScore, setCustomScore] = useState<{ task: boolean; details: boolean; audience: boolean; format: boolean } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mission 3: Ethics State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedEthicsChoices, setSelectedEthicsChoices] = useState<Record<string, 'A' | 'B' | 'C'>>({});

  const stage = PROMPT_CHALLENGE_STAGES[activeStageIndex % PROMPT_CHALLENGE_STAGES.length];
  const currentScenario = ETHICS_SCENARIOS[scenarioIndex % ETHICS_SCENARIOS.length];

  const isMission2Done = state.completedMissions.includes('mission_2');
  const isMission3Done = state.completedMissions.includes('mission_3');

  // Pillar toggle
  const togglePillar = (key: string) => {
    sound.playClick();
    setRevealedPillars((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompletePromptStage = () => {
    sound.playSuccess();
    completeMission('mission_2', 100, 'prompt-master');
  };

  // Custom prompt evaluator
  const handleEvaluateCustomPrompt = () => {
    if (!customPromptText.trim()) return;
    sound.playClick();
    setIsGenerating(true);

    setTimeout(() => {
      const lower = customPromptText.toLowerCase();

      // Heuristic pillar check
      const hasTask = /write|explain|summarize|create|compare|analyze|list|design|draft|solve|act as/i.test(lower);
      const hasDetails = lower.length > 40 || /words|steps|specifically|because|focusing|include|example|tone/i.test(lower);
      const hasAudience = /for|audience|students|beginner|expert|children|kids|class|doctor|teacher|cadet/i.test(lower);
      const hasFormat = /table|bullet|bullets|paragraphs|json|markdown|outline|poem|step by step|timeline/i.test(lower);

      const score = { task: hasTask, details: hasDetails, audience: hasAudience, format: hasFormat };
      setCustomScore(score);

      // Generate context-aware educational simulated response
      let output = '';
      if (hasTask && hasDetails) {
        output = `🤖 AI Model Response to "${customPromptText.slice(0, 35)}...":\n\n` +
          `• Key Takeaway: Precision parameters accepted. Since you specified structured details${hasAudience ? ' tailored for your target audience' : ''}, the output is focused, accurate, and free of fluff.\n` +
          `• Synthesized Insight: By defining clear constraints, you reduced AI hallucination probability by over 80%!\n\n` +
          `${hasFormat ? '[Structured formatting applied according to your instructions]' : '[Standard prose applied]'}`;
      } else {
        output = `🤖 Generic Vague AI Response:\n\n` +
          `Space and topics are very large! Without specific details or audience requirements, I can only give you a generic, rambling encyclopedia summary. Try injecting more Task & Audience constraints!`;
      }

      setCustomGeneratedOutput(output);
      setIsGenerating(false);

      if (hasTask && hasDetails && (hasAudience || hasFormat)) {
        sound.playSuccess();
        completeMission('mission_2', 100, 'prompt-master');
      } else {
        sound.playClick();
      }
    }, 600);
  };

  // Ethics selection
  const handleEthicsSelect = (choice: 'A' | 'B' | 'C') => {
    sound.playClick();
    setSelectedEthicsChoices((prev) => ({ ...prev, [currentScenario.id]: choice }));

    const option = currentScenario.options.find((o) => o.id === choice);
    if (option?.isBestChoice) {
      sound.playSuccess();
      // Check if all scenarios evaluated
      const updatedChoices = { ...selectedEthicsChoices, [currentScenario.id]: choice };
      const allScenariosDone = ETHICS_SCENARIOS.every((s) => updatedChoices[s.id] !== undefined);
      if (allScenariosDone) {
        completeMission('mission_3', 100, 'ethics-expert');
      }
    } else {
      sound.playError();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Mission Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase mb-1">
            ACADEMY TRAINING ARENA
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Missions 2 & 3: Skills & Ethics
          </h1>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('prompt');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'prompt'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>MISSION 2: FIX THE PROMPT</span>
            {isMission2Done && <span className="text-emerald-400">✓</span>}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('ethics');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ethics'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>MISSION 3: AI ETHICS</span>
            {isMission3Done && <span className="text-emerald-400">✓</span>}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MISSION 2 - AI SKILLS (FIX THE PROMPT) */}
      {/* ========================================================================= */}
      {activeTab === 'prompt' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Mission Intro Banner */}
          <div className="rounded-2xl border border-teal-500/30 bg-[#081224] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                  🎯 CHALLENGE: FIX THE PROMPT
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  How to Command AI Like a Pro
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Most people talk to AI with weak prompts like <span className="italic text-rose-300 font-semibold">“Write about space”</span> and get boring, generic answers. A Master Prompt includes the <strong>4 Core Pillars</strong>.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full">
                  🏆 +100 XP REWARD
                </span>
              </div>
            </div>
          </div>

          {/* Before & After Interactive Comparison */}
          <div className="rounded-2xl border border-slate-800 bg-[#091124] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                Deconstructing a Weak Prompt
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Click each Pillar to reveal how to transform it
              </div>
            </div>

            {/* Weak Prompt Banner */}
            <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20">
              <div className="text-[11px] font-mono font-bold text-rose-300 uppercase tracking-wider mb-1">
                ORIGINAL WEAK PROMPT (LEVEL 1)
              </div>
              <div className="text-xl font-bold text-white font-mono">
                “{stage.weakPrompt}”
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Too vague! The AI has no idea if you want a poem for a toddler, a doctoral dissertation, or a list of planets.
              </p>
            </div>

            {/* The 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1: Task */}
              <div
                onClick={() => togglePillar('task')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  revealedPillars.task
                    ? 'border-teal-500 bg-teal-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-teal-300 uppercase">
                    1. TASK
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.task ? '✓' : '+'}</span>
                </div>
                <div className="text-xs font-semibold text-white mb-1">What you want done</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.task ? stage.pillars.task : 'Click to inspect required action & role...'}
                </p>
              </div>

              {/* Pillar 2: Details */}
              <div
                onClick={() => togglePillar('details')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  revealedPillars.details
                    ? 'border-cyan-500 bg-cyan-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    2. DETAILS
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.details ? '✓' : '+'}</span>
                </div>
                <div className="text-xs font-semibold text-white mb-1">Topic, scope & limits</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.details ? stage.pillars.details : 'Click to inspect constraints & key elements...'}
                </p>
              </div>

              {/* Pillar 3: Audience */}
              <div
                onClick={() => togglePillar('audience')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  revealedPillars.audience
                    ? 'border-indigo-500 bg-indigo-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                    3. AUDIENCE
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.audience ? '✓' : '+'}</span>
                </div>
                <div className="text-xs font-semibold text-white mb-1">Who is it for?</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.audience ? stage.pillars.audience : 'Click to inspect reading level & tone...'}
                </p>
              </div>

              {/* Pillar 4: Format */}
              <div
                onClick={() => togglePillar('format')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  revealedPillars.format
                    ? 'border-amber-500 bg-amber-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                    4. FORMAT
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.format ? '✓' : '+'}</span>
                </div>
                <div className="text-xs font-semibold text-white mb-1">Structure & layout</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.format ? stage.pillars.format : 'Click to inspect table/bullet structure...'}
                </p>
              </div>
            </div>

            {/* The Master Prompt Reveal */}
            <div className="p-5 rounded-xl border border-emerald-500/50 bg-emerald-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  ⭐ THE MASTER ENGINEERED PROMPT (LEVEL 4)
                </span>
                <span className="text-xs text-emerald-400 font-mono">Precision: 100%</span>
              </div>
              <p className="text-sm font-mono text-emerald-100 bg-slate-950/60 p-4 rounded-lg border border-emerald-900/50 leading-relaxed">
                "{stage.improvedPrompt}"
              </p>
            </div>

            {/* Sample AI Output Preview */}
            <div className="rounded-xl border border-slate-800 bg-[#070b18] p-5">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Simulated AI Model Output for Master Prompt:
              </div>
              <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                {stage.sampleOutput}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCompletePromptStage}
                className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:opacity-90 transition-opacity text-xs font-mono uppercase tracking-wider flex items-center gap-2"
              >
                <span>CLAIM PROMPT MASTER XP (+100 XP)</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Prompt Sandbox: Craft Your Own! */}
          <div className="rounded-2xl border border-cyan-800/60 bg-[#091124] p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Wand2 className="w-4 h-4" /> CADET PROMPT LABORATORY
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Now Craft Your Own Prompt!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Type an improved prompt below. Our automated auditor evaluates your prompt against all 4 Pillars (Task, Details, Audience, Format) and simulates the AI’s output!
              </p>
            </div>

            {/* Input Box */}
            <div className="space-y-3">
              <textarea
                value={customPromptText}
                onChange={(e) => setCustomPromptText(e.target.value)}
                placeholder="Example: Act as a wildlife biologist. Explain photosynthesis to a 6th-grade class in a 3-step bulleted list with an everyday plant analogy..."
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 text-sm focus:border-cyan-500 focus:outline-none font-mono"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Tip: Include words like <code className="text-cyan-300 font-mono">Explain</code>, <code className="text-cyan-300 font-mono">for students</code>, <code className="text-cyan-300 font-mono">bullet points</code>.
                </div>
                <button
                  onClick={handleEvaluateCustomPrompt}
                  disabled={isGenerating || !customPromptText.trim()}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
                    !customPromptText.trim()
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Test & Grade Prompt
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Pillar Rubric */}
            {customScore && (
              <div className="p-4 rounded-xl border border-slate-800 bg-[#070b18] space-y-4 animate-fadeIn">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Pillar Audit Report:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${
                      customScore.task
                        ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                        : 'border-rose-500/60 bg-rose-950/20 text-rose-300'
                    }`}
                  >
                    {customScore.task ? '✓ Task Clear' : '✗ Needs Verb/Task'}
                  </div>
                  <div
                    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${
                      customScore.details
                        ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                        : 'border-rose-500/60 bg-rose-950/20 text-rose-300'
                    }`}
                  >
                    {customScore.details ? '✓ Detailed Scope' : '✗ Too Brief'}
                  </div>
                  <div
                    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${
                      customScore.audience
                        ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                        : 'border-rose-500/60 bg-rose-950/20 text-rose-300'
                    }`}
                  >
                    {customScore.audience ? '✓ Audience Set' : '✗ Missing Audience'}
                  </div>
                  <div
                    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${
                      customScore.format
                        ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                        : 'border-rose-500/60 bg-rose-950/20 text-rose-300'
                    }`}
                  >
                    {customScore.format ? '✓ Format Defined' : '✗ Missing Format'}
                  </div>
                </div>

                {customGeneratedOutput && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                      Live AI Output:
                    </span>
                    <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                      {customGeneratedOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MISSION 3 - AI ETHICS (WHAT WOULD YOU DO?) */}
      {/* ========================================================================= */}
      {activeTab === 'ethics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Mission Header */}
          <div className="rounded-2xl border border-indigo-500/30 bg-[#090f24] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  🚨 WHAT WOULD YOU DO? · AI ETHICS ARENA
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Responsible AI Decision Game
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  AI gives humans superpowers, but great power requires ethical discipline. Make your choices in realistic academic and personal dilemmas.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full">
                  🏆 +100 XP REWARD
                </span>
              </div>
            </div>
          </div>

          {/* Scenario Stepper Indicators */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {ETHICS_SCENARIOS.map((sc, idx) => {
              const answered = selectedEthicsChoices[sc.id] !== undefined;
              const isCurrent = idx === scenarioIndex;

              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    sound.playClick();
                    setScenarioIndex(idx);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-2 border ${
                    isCurrent
                      ? 'bg-indigo-500/30 text-indigo-200 border-indigo-400'
                      : answered
                      ? 'bg-slate-900 text-slate-300 border-emerald-500/40'
                      : 'bg-slate-900/60 text-slate-500 border-slate-800'
                  }`}
                >
                  <span>Case 0{idx + 1}</span>
                  {answered && <span className="text-emerald-400">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Current Scenario Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#080d1e] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                {currentScenario.title}
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-100 mt-2 leading-relaxed">
                "{currentScenario.scenario}"
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-4">
              {currentScenario.options.map((opt) => {
                const isSelected = selectedEthicsChoices[currentScenario.id] === opt.id;
                const hasSelectedAny = selectedEthicsChoices[currentScenario.id] !== undefined;

                let cardStyle = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-200';

                if (hasSelectedAny) {
                  if (opt.isBestChoice) {
                    cardStyle = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100';
                  } else if (isSelected && !opt.isBestChoice) {
                    cardStyle = 'border-rose-500/80 bg-rose-950/30 text-rose-100';
                  } else {
                    cardStyle = 'border-slate-800/60 bg-slate-950/40 text-slate-400 opacity-60';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleEthicsSelect(opt.id)}
                    className={`rounded-xl border p-5 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-bold text-slate-200 shrink-0">
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-relaxed">
                          {opt.text}
                        </div>

                        {/* Immediate Explanation on Choice */}
                        {hasSelectedAny && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-1">
                            <div className="font-bold">{opt.feedback}</div>
                            <div className="text-slate-300 italic">
                              Principle: {opt.guideline}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  sound.playClick();
                  setScenarioIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={scenarioIndex === 0}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-40"
              >
                ← Previous Case
              </button>

              {scenarioIndex < ETHICS_SCENARIOS.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setScenarioIndex((prev) => prev + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next Case</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    completeMission('mission_3', 100, 'ethics-expert');
                    setCurrentView('detective');
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Advance to AI Detective</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
