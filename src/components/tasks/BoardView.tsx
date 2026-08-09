import React from 'react';
import { Task, TaskStatus, Priority } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Paperclip,
  Plus,
  MoreVertical,
  ArrowRight,
  AlertCircle,
  CheckSquare,
} from 'lucide-react';
import { formatDate, isOverdue, isDueToday } from '../../lib/utils';

interface BoardViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onOpenNewTaskModalWithStatus?: (status: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; label: string; color: string; badgeBg: string }[] = [
  { id: 'todo', label: 'To Do', color: 'border-slate-300 dark:border-zinc-700', badgeBg: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300' },
  { id: 'in_progress', label: 'In Progress', color: 'border-blue-500/50', badgeBg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' },
  { id: 'review', label: 'Under Review', color: 'border-amber-500/50', badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' },
  { id: 'completed', label: 'Completed', color: 'border-emerald-500/50', badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' },
];

const PRIORITY_BADGES: Record<Priority, { label: string; bg: string; text: string }> = {
  urgent: { label: 'Urgent', bg: 'bg-rose-500/10 border-rose-500/30', text: 'text-rose-600 dark:text-rose-400 font-bold' },
  high: { label: 'High', bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-600 dark:text-amber-400 font-semibold' },
  medium: { label: 'Medium', bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-600 dark:text-blue-400' },
  low: { label: 'Low', bg: 'bg-slate-500/10 border-slate-500/30', text: 'text-slate-600 dark:text-zinc-400' },
};

export const BoardView: React.FC<BoardViewProps> = ({
  tasks,
  onSelectTask,
  onUpdateTaskStatus,
  onOpenNewTaskModalWithStatus,
}) => {
  const { themeConfig } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.id);

        return (
          <div
            key={col.id}
            className={`rounded-2xl p-3 border ${themeConfig.cardClass} flex flex-col min-h-[520px] transition-all`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                  {col.label}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${col.badgeBg}`}>
                  {columnTasks.length}
                </span>
              </div>

              {onOpenNewTaskModalWithStatus && (
                <button
                  onClick={() => onOpenNewTaskModalWithStatus(col.id)}
                  title={`Add task to ${col.label}`}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Task Cards Stack */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {columnTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl text-center p-4">
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mb-2">No tasks in {col.label}</p>
                  {onOpenNewTaskModalWithStatus && (
                    <button
                      onClick={() => onOpenNewTaskModalWithStatus(col.id)}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add first task
                    </button>
                  )}
                </div>
              ) : (
                columnTasks.map((task) => {
                  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
                  const totalSubtasks = task.subtasks.length;
                  const subtaskPct = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
                  const overdue = isOverdue(task.dueDate) && task.status !== 'completed';
                  const dueToday = isDueToday(task.dueDate) && task.status !== 'completed';
                  const priorityMeta = PRIORITY_BADGES[task.priority];

                  return (
                    <div
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      className="group p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Priority Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] border ${priorityMeta.bg} ${priorityMeta.text}`}
                        >
                          {priorityMeta.label}
                        </span>
                      </div>

                      {/* Task Title */}
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-zinc-100 leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h4>

                      {/* Task Description Snippet */}
                      {task.description && (
                        <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mb-3">
                          {task.description}
                        </p>
                      )}

                      {/* Subtask Progress Bar */}
                      {totalSubtasks > 0 && (
                        <div className="mb-3 space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="w-3 h-3 text-blue-500" />
                              Subtasks
                            </span>
                            <span className="font-mono text-[10px]">
                              {completedSubtasks}/{totalSubtasks} ({subtaskPct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${subtaskPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Card Footer Meta */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/60 text-[11px]">
                        {/* Due Date Indicator */}
                        <div
                          className={`flex items-center gap-1 font-medium ${
                            overdue
                              ? 'text-rose-600 dark:text-rose-400 font-bold'
                              : dueToday
                              ? 'text-amber-600 dark:text-amber-400 font-bold'
                              : 'text-slate-500 dark:text-zinc-400'
                          }`}
                        >
                          {overdue ? (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>{formatDate(task.dueDate)}</span>
                        </div>

                        {/* Assignee & Attachment/Comment Icons */}
                        <div className="flex items-center gap-2">
                          {task.comments.length > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-400 text-[10px]">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments.length}
                            </span>
                          )}

                          {task.attachments.length > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-400 text-[10px]">
                              <Paperclip className="w-3 h-3" />
                              {task.attachments.length}
                            </span>
                          )}

                          {/* Assignee Avatar */}
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            title={task.assignee.name}
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-700"
                          />
                        </div>
                      </div>

                      {/* Quick Status Shift Button on Hover */}
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white dark:bg-zinc-900 p-0.5 rounded-lg border border-slate-200 dark:border-zinc-700 shadow-xs">
                        {col.id !== 'completed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus: Record<TaskStatus, TaskStatus> = {
                                todo: 'in_progress',
                                in_progress: 'review',
                                review: 'completed',
                                completed: 'completed',
                              };
                              onUpdateTaskStatus(task.id, nextStatus[task.id]);
                            }}
                            title="Move to Next Stage"
                            className="p-1 text-slate-600 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardView;
