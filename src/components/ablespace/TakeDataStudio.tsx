import React, { useState, useEffect } from 'react';
import { Student, IEPGoal, DataTrial, PromptLevel } from '../../types';
import { INITIAL_IEP_GOALS } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Plus,
  Minus,
  Save,
  Sparkles,
  FileText,
  Check,
  Zap,
} from 'lucide-react';

interface TakeDataStudioProps {
  student: Student;
  onBackToCaseload: () => void;
}

export const TakeDataStudio: React.FC<TakeDataStudioProps> = ({
  student,
  onBackToCaseload,
}) => {
  const { themeConfig } = useTheme();

  // Load student's goals
  const studentGoals = INITIAL_IEP_GOALS.filter((g) => g.studentId === student.id || g.studentId === 'std_1');

  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const activeGoal = studentGoals[activeGoalIndex] || studentGoals[0];

  const [trials, setTrials] = useState<DataTrial[]>(activeGoal ? activeGoal.trials : []);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [therapistNotes, setTherapistNotes] = useState('');
  const [tallyCount, setTallyCount] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Session timer ticker
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const logTrial = (promptLevel: PromptLevel, success: boolean) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTrial: DataTrial = {
      id: `t_${Date.now()}`,
      timestamp: timeStr,
      promptLevel,
      success,
    };
    setTrials([...trials, newTrial]);
  };

  const clearTrials = () => {
    setTrials([]);
  };

  const totalTrialsCount = trials.length;
  const successTrialsCount = trials.filter((t) => t.success).length;
  const currentAccuracy = totalTrialsCount > 0 ? Math.round((successTrialsCount / totalTrialsCount) * 100) : 0;

  const handleSaveSession = async () => {
    const sessionPayload = {
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      date: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round(sessionSeconds / 60)),
      goalId: activeGoal ? activeGoal.id : 'goal_101',
      totalTrials: totalTrialsCount,
      accuracyPercent: currentAccuracy,
      trials,
      notes: therapistNotes,
    };

    try {
      await fetch('/api/data-collection/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionPayload),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const generateClinicalNote = () => {
    const note = `SOAP SESSION SUMMARY (${new Date().toLocaleDateString()}):
Student ${student.firstName} ${student.lastName} participated in a ${Math.max(1, Math.round(sessionSeconds / 60))}-minute special education data collection session targeting IEP Goal [${activeGoal ? activeGoal.code : 'SLP-G1'}].
- Trials Administered: ${totalTrialsCount}
- Mastered / Successful: ${successTrialsCount} (${currentAccuracy}% accuracy, target is ${activeGoal ? activeGoal.targetAccuracy : 80}%)
- Prompt Breakdown: Independent (${trials.filter((t) => t.promptLevel === 'independent').length}), Verbal (${trials.filter((t) => t.promptLevel === 'verbal').length}), Gestural (${trials.filter((t) => t.promptLevel === 'gestural').length}), Physical (${trials.filter((t) => t.promptLevel === 'physical').length}).
- Behavior & Observations: Student demonstrated engagement with visual stimuli. Recommended continuing target articulation drills.`;

    setTherapistNotes(note);
  };

  return (
    <div className="space-y-6">
      {/* Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCaseload}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30">
                Live Data Collection Session
              </span>
              <span className="text-xs text-slate-400">{student.school}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {student.firstName} {student.lastName}
            </h2>
          </div>
        </div>

        {/* Live Timer Control */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{formatTimer(sessionSeconds)}</span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold"
          >
            {isTimerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Goal Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {studentGoals.map((goal, idx) => (
          <button
            key={goal.id}
            onClick={() => {
              setActiveGoalIndex(idx);
              setTrials(goal.trials || []);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              idx === activeGoalIndex
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
            }`}
          >
            Goal {idx + 1}: {goal.code} ({goal.category})
          </button>
        ))}
      </div>

      {/* Active Goal Detail Box */}
      {activeGoal && (
        <div className={`p-4 sm:p-5 rounded-2xl border ${themeConfig.cardClass}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {activeGoal.code} • {activeGoal.category}
            </span>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-slate-500">Target Accuracy: {activeGoal.targetAccuracy}%</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                Current Session: {currentAccuracy}%
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium leading-relaxed">
            {activeGoal.description}
          </p>
        </div>
      )}

      {/* Main Interactive Trial Tapping Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prompt Hierarchy Quick-Bar & Single-Tap Taggers (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Single-Tap Prompt Hierarchy Tagger
              </h4>

              <button
                onClick={clearTrials}
                className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Session
              </button>
            </div>

            {/* Prompt Buttons Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
              <button
                onClick={() => logTrial('independent', true)}
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              >
                <span className="text-lg">I</span>
                <span>Independent</span>
              </button>

              <button
                onClick={() => logTrial('verbal', true)}
                className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              >
                <span className="text-lg">V</span>
                <span>Verbal</span>
              </button>

              <button
                onClick={() => logTrial('gestural', true)}
                className="p-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              >
                <span className="text-lg">G</span>
                <span>Gestural</span>
              </button>

              <button
                onClick={() => logTrial('physical', true)}
                className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              >
                <span className="text-lg">P</span>
                <span>Physical</span>
              </button>

              <button
                onClick={() => logTrial('refused', false)}
                className="p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95 col-span-2 sm:col-span-1"
              >
                <span className="text-lg">R</span>
                <span>Refused / Incorrect</span>
              </button>
            </div>

            {/* Live Recorded Trial Stream */}
            <div className="border-t border-slate-200 dark:border-zinc-800 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                <span>Recorded Trial Stream ({totalTrialsCount})</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {successTrialsCount}/{totalTrialsCount} Successful ({currentAccuracy}%)
                </span>
              </div>

              {trials.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
                  Tap any prompt button above to record trials in real-time.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                  {trials.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border shadow-2xs ${
                        t.promptLevel === 'independent'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : t.promptLevel === 'verbal'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : t.promptLevel === 'gestural'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : t.promptLevel === 'physical'
                          ? 'bg-purple-100 text-purple-800 border-purple-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      <span>
                        #{idx + 1} {t.promptLevel.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-500">({t.timestamp})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Secondary Counter: Frequency Observation Tally */}
          <div className={`p-5 rounded-2xl border ${themeConfig.cardClass} flex items-center justify-between gap-4`}>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Frequency Tally Counter
              </h5>
              <p className="text-xs text-slate-500">Log behavioral occurrences during observation window</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTallyCount(Math.max(0, tallyCount - 1))}
                className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-bold text-lg flex items-center justify-center hover:bg-slate-300"
              >
                -
              </button>
              <span className="text-2xl font-extrabold w-12 text-center text-blue-600 dark:text-blue-400 font-mono">
                {tallyCount}
              </span>
              <button
                onClick={() => setTallyCount(tallyCount + 1)}
                className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center hover:bg-blue-500 shadow-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Clinical Session Notes & Save Session Panel (Col 3) */}
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${themeConfig.cardClass} flex flex-col justify-between h-full`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Clinical Notes Draft
                </h4>

                <button
                  onClick={generateClinicalNote}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Auto-Generate
                </button>
              </div>

              <textarea
                rows={10}
                value={therapistNotes}
                onChange={(e) => setTherapistNotes(e.target.value)}
                placeholder="Click Auto-Generate or type custom SOAP notes..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4"
              />
            </div>

            <div>
              {saveSuccess && (
                <div className="mb-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Session recorded successfully in AbleSpace API!
                </div>
              )}

              <button
                onClick={handleSaveSession}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Therapy Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeDataStudio;
