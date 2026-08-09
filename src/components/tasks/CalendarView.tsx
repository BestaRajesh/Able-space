import React, { useState } from 'react';
import { Task, Priority } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, ChevronRight, Plus, Clock, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface CalendarViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTaskModalWithDate?: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTaskModalWithDate,
}) => {
  const { themeConfig } = useTheme();
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Map tasks by 'YYYY-MM-DD'
  const tasksByDate: Record<string, Task[]> = {};
  tasks.forEach((t) => {
    if (t.dueDate) {
      if (!tasksByDate[t.dueDate]) tasksByDate[t.dueDate] = [];
      tasksByDate[t.dueDate].push(t);
    }
  });

  const dayCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    dayCells.push(d);
  }

  const formatDayKey = (dayNum: number) => {
    const m = String(month + 1).padStart(2, '0');
    const day = String(dayNum).padStart(2, '0');
    return `${year}-${m}-${day}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className={`rounded-2xl border ${themeConfig.cardClass} p-4 sm:p-6 shadow-xs`}>
      {/* Calendar Header Control */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-zinc-800">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <span>{monthName}</span>
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonthDate(new Date())}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
          >
            Today
          </button>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={prevMonth}
              className="p-1 rounded text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {dayCells.map((day, idx) => {
          if (day === null) {
            return (
              <div
                key={`empty-${idx}`}
                className="min-h-[90px] sm:min-h-[110px] rounded-xl bg-slate-50/40 dark:bg-zinc-900/40 border border-transparent"
              />
            );
          }

          const dateKey = formatDayKey(day);
          const dayTasks = tasksByDate[dateKey] || [];
          const isToday = dateKey === todayStr;

          return (
            <div
              key={dateKey}
              className={`min-h-[90px] sm:min-h-[110px] p-2 rounded-xl border flex flex-col justify-between transition-all group relative ${
                isToday
                  ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                  : 'border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900'
              }`}
            >
              {/* Day Number Header */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  {day}
                </span>

                {onOpenNewTaskModalWithDate && (
                  <button
                    onClick={() => onOpenNewTaskModalWithDate(dateKey)}
                    title={`Add task on ${dateKey}`}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Scheduled Tasks list */}
              <div className="space-y-1 flex-1 overflow-y-auto max-h-[70px] pr-0.5">
                {dayTasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTask(t)}
                    className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-semibold truncate block transition-transform active:scale-95 ${
                      t.status === 'completed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 line-through'
                        : t.priority === 'urgent'
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
