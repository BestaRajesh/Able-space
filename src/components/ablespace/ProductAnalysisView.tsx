import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PRODUCT_IMPROVEMENTS } from '../../data/initialData';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Layout,
  Layers,
  ArrowRight,
  TrendingUp,
  Sliders,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

export const ProductAnalysisView: React.FC = () => {
  const { themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<'workflow' | 'friction' | 'redesign' | 'matrix'>('workflow');

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-blue-800/50">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 uppercase tracking-wider">
            Part 2 – Product Understanding
          </span>
          <span className="text-xs text-blue-200">AbleSpace Caseload & Take Data Workflow Analysis</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          AbleSpace "Take Data" Product Case Study & UX Evaluation
        </h2>
        <p className="text-xs sm:text-sm text-blue-200 max-w-3xl mt-1 leading-relaxed">
          Comprehensive analysis of special education therapy workflows, clinical data collection pain points, and concrete UX/UI redesign recommendations for AbleSpace.
        </p>

        {/* Evaluation Nav Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-blue-800/60">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'workflow'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-blue-900/60 text-blue-200 hover:bg-blue-800/60'
            }`}
          >
            1. Workflow Breakdown
          </button>

          <button
            onClick={() => setActiveTab('friction')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'friction'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-blue-900/60 text-blue-200 hover:bg-blue-800/60'
            }`}
          >
            2. UX Friction Points
          </button>

          <button
            onClick={() => setActiveTab('redesign')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'redesign'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-blue-900/60 text-blue-200 hover:bg-blue-800/60'
            }`}
          >
            3. Before vs. After UX Redesign
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matrix'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-blue-900/60 text-blue-200 hover:bg-blue-800/60'
            }`}
          >
            4. Impact vs Effort Matrix
          </button>
        </div>
      </div>

      {/* Tab 1: Workflow Breakdown */}
      {activeTab === 'workflow' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border ${themeConfig.cardClass}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Understand the AbleSpace "Take Data" Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
              AbleSpace is built specifically for Special Education Professionals (Speech-Language Pathologists, Occupational Therapists, Physical Therapists, and Special Ed Teachers). The <strong>Caseload Tab</strong> serves as the operational command center where therapists manage student IEP timelines, collaborator assignments, and live data collection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-2">
                  1
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 mb-1">Caseload Selection</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Therapists open their Caseload table, view upcoming IEP/Eval due dates, and locate the student scheduled for session.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-2">
                  2
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 mb-1">Launch Take Data</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Clicking "Take Data" opens the session view with active goals, trial counters, and prompt level selectors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-2">
                  3
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 mb-1">Live Prompt Tapping</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Therapist records whether each trial was Independent (I), Verbal (V), Gestural (G), or Physical (P).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-2">
                  4
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 mb-1">SOAP Note & Sync</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Accuracy percentages are automatically calculated and converted into clinical progress notes saved to the student record.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: UX Friction Points */}
      {activeTab === 'friction' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
              <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Friction #1: High Cognitive Load During Live Session
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">
                In a live therapy setting with a child, the therapist cannot look away from the student to click complex dropdown menus. Standard interfaces require 3-4 clicks per trial entry, causing data entry lag.
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-[11px] text-rose-800 dark:text-rose-300 font-medium">
                Solution: Tactile 1-Tap sticky prompt bar with large touch targets.
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
              <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Friction #2: Group Therapy Data Fragmentation
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">
                Speech therapists frequently run group sessions with 3-4 students at once. Switching tabs repeatedly disrupts session flow and causes forgotten trials.
              </p>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                Solution: Split-Screen Group Take Data layout with simultaneous student rows.
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
              <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Friction #3: School Wi-Fi Network Dead Zones
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">
                School therapy rooms are often located in basements or far wings with poor Wi-Fi. Lack of offline support leads to infinite loading screens and lost trial data.
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-[11px] text-rose-800 dark:text-rose-300 font-medium">
                Solution: Offline-First IndexedDB trial queue with optimistic UI state.
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Friction #4: Manual Progress Report Synthesis
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">
                Therapists spend 4-5 hours weekly translating trial percentages into quarterly IEP narrative progress summaries manually.
              </p>
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                Solution: AI Clinical Progress Draft assistant converting trials to IEP reports.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Before vs After Redesign Demonstrator */}
      {activeTab === 'redesign' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className={`p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/20`}>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
                  Before (Original UX)
                </span>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Multiple Clicks & Static Table</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Requires clicking through nested goal dropdowns during live therapy.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> No real-time session duration timer visible.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Prompt levels hidden inside sub-menus.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Manual copy/paste required for SOAP clinical notes.
                </li>
              </ul>
            </div>

            {/* After */}
            <div className={`p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/20`}>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider">
                  After (Redesigned AbleSpace Studio)
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">1-Tap Tactile & Auto-Generating</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Tactile 1-Tap Prompt Bar (Independent, Verbal, Gestural, Physical).
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Live Session Duration Stopwatch with auto-pause.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> One-click AI SOAP Clinical Note generator.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Integrated NestJS API persistence with optimistic feedback.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Impact vs Effort Matrix */}
      {activeTab === 'matrix' && (
        <div className={`p-6 rounded-2xl border ${themeConfig.cardClass} animate-in fade-in duration-200`}>
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            Product Feature Evaluation Matrix
          </h3>

          <div className="space-y-3">
            {PRODUCT_IMPROVEMENTS.map((imp) => (
              <div
                key={imp.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-zinc-100">{imp.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {imp.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{imp.proposedSolution}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Impact</div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{imp.impactScore}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Effort</div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{imp.effortScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAnalysisView;
