import React from 'react';
import { Task } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  CheckSquare,
  Activity,
} from 'lucide-react';
import { isOverdue } from '../../lib/utils';

interface AnalyticsViewProps {
  tasks: Task[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks }) => {
  const { themeConfig } = useTheme();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const review = tasks.filter((t) => t.status === 'review').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;

  const overdue = tasks.filter((t) => isOverdue(t.dueDate) && t.status !== 'completed').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Priority breakdown
  const urgent = tasks.filter((t) => t.priority === 'urgent').length;
  const high = tasks.filter((t) => t.priority === 'high').length;
  const medium = tasks.filter((t) => t.priority === 'medium').length;
  const low = tasks.filter((t) => t.priority === 'low').length;

  // Assignee workload
  const assigneeMap: Record<string, { name: string; avatar: string; total: number; done: number }> = {};
  tasks.forEach((t) => {
    const key = t.assignee.id;
    if (!assigneeMap[key]) {
      assigneeMap[key] = {
        name: t.assignee.name,
        avatar: t.assignee.avatar,
        total: 0,
        done: 0,
      };
    }
    assigneeMap[key].total += 1;
    if (t.status === 'completed') assigneeMap[key].done += 1;
  });

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border ${themeConfig.cardClass} flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100">{total}</div>
            <div className="text-[11px] text-slate-500">{completed} completed ({completionRate}%)</div>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${themeConfig.cardClass} flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completion Rate</div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{completionRate}%</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">On track</div>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${themeConfig.cardClass} flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Progress</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100">{inProgress + review}</div>
            <div className="text-[11px] text-slate-500">{review} pending review</div>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${themeConfig.cardClass} flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overdue Alerts</div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{overdue}</div>
            <div className="text-[11px] text-rose-500 font-medium">Requires immediate action</div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Status Breakdown & Priority Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
          <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            Task Status Distribution
          </h4>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                <span>Completed</span>
                <span>{completed} / {total} ({total > 0 ? Math.round((completed/total)*100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${total > 0 ? (completed/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                <span>Under Review</span>
                <span>{review} / {total} ({total > 0 ? Math.round((review/total)*100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${total > 0 ? (review/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                <span>In Progress</span>
                <span>{inProgress} / {total} ({total > 0 ? Math.round((inProgress/total)*100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${total > 0 ? (inProgress/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                <span>To Do</span>
                <span>{todo} / {total} ({total > 0 ? Math.round((todo/total)*100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400" style={{ width: `${total > 0 ? (todo/total)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
          <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            Priority Breakdown
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Urgent Priority</div>
              <div className="text-xl font-bold text-rose-700 dark:text-rose-300">{urgent}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">High Priority</div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{high}</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Medium Priority</div>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{medium}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20">
              <div className="text-xs text-slate-600 dark:text-zinc-400 font-semibold">Low Priority</div>
              <div className="text-xl font-bold text-slate-700 dark:text-zinc-300">{low}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignee Workload List */}
      <div className={`p-5 rounded-2xl border ${themeConfig.cardClass}`}>
        <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-violet-500" />
          Assignee Workload & Progress
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(assigneeMap).map((a) => {
            const pct = a.total > 0 ? Math.round((a.done / a.total) * 100) : 0;
            return (
              <div
                key={a.name}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 flex items-center gap-3"
              >
                <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-slate-900 dark:text-zinc-100 truncate">{a.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    {a.done}/{a.total} completed ({pct}%)
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
