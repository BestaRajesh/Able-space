import React, { useState } from 'react';
import { Task, TaskStatus, Priority } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import {
  CheckSquare,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { formatDate, isOverdue, isDueToday } from '../../lib/utils';

interface ListViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onBulkAction: (action: 'complete' | 'delete' | 'priority', ids: string[], priority?: Priority) => void;
}

const STATUS_LABELS: Record<TaskStatus, { label: string; badge: string }> = {
  todo: { label: 'To Do', badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300' },
  in_progress: { label: 'In Progress', badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' },
  review: { label: 'Under Review', badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' },
  completed: { label: 'Completed', badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' },
};

const PRIORITY_LABELS: Record<Priority, { label: string; text: string }> = {
  urgent: { label: 'Urgent', text: 'text-rose-600 dark:text-rose-400 font-bold' },
  high: { label: 'High', text: 'text-amber-600 dark:text-amber-400 font-semibold' },
  medium: { label: 'Medium', text: 'text-blue-600 dark:text-blue-400' },
  low: { label: 'Low', text: 'text-slate-500 dark:text-zinc-400' },
};

export const ListView: React.FC<ListViewProps> = ({
  tasks,
  onSelectTask,
  onUpdateTaskStatus,
  onDeleteTask,
  onBulkAction,
}) => {
  const { themeConfig } = useTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<'dueDate' | 'priority' | 'title'>('dueDate');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const toggleSelectAll = () => {
    if (selectedIds.length === tasks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tasks.map((t) => t.id));
    }
  };

  const toggleSelectTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortField === 'dueDate') {
      return sortAsc
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    if (sortField === 'title') {
      return sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className={`rounded-2xl border ${themeConfig.cardClass} overflow-hidden shadow-xs`}>
      {/* Bulk Action Bar (Visible when items selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <CheckSquare className="w-4 h-4" />
            <span>{selectedIds.length} tasks selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onBulkAction('complete', selectedIds);
                setSelectedIds([]);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Done</span>
            </button>

            <button
              onClick={() => {
                onBulkAction('delete', selectedIds);
                setSelectedIds([]);
              }}
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/70 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 font-medium">
            <tr>
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={tasks.length > 0 && selectedIds.length === tasks.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="p-3.5">
                <button
                  onClick={() => {
                    setSortField('title');
                    setSortAsc(!sortAsc);
                  }}
                  className="flex items-center gap-1 font-semibold hover:text-slate-900 dark:hover:text-white"
                >
                  Task Title <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="p-3.5 w-32">Status</th>
              <th className="p-3.5 w-28">Priority</th>
              <th className="p-3.5 w-36">
                <button
                  onClick={() => {
                    setSortField('dueDate');
                    setSortAsc(!sortAsc);
                  }}
                  className="flex items-center gap-1 font-semibold hover:text-slate-900 dark:hover:text-white"
                >
                  Due Date <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="p-3.5 w-36">Assignee</th>
              <th className="p-3.5 w-12 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
            {sortedTasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400 dark:text-zinc-500 text-xs">
                  No matching tasks found. Try adjusting your search or filters.
                </td>
              </tr>
            ) : (
              sortedTasks.map((task) => {
                const isSelected = selectedIds.includes(task.id);
                const overdue = isOverdue(task.dueDate) && task.status !== 'completed';
                const dueToday = isDueToday(task.dueDate) && task.status !== 'completed';
                const statusMeta = STATUS_LABELS[task.status];
                const priorityMeta = PRIORITY_LABELS[task.priority];

                return (
                  <tr
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className={`group transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/40 cursor-pointer ${
                      isSelected ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="p-3.5 text-center" onClick={(e) => toggleSelectTask(task.id, e)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-slate-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Title + Tags */}
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900 dark:text-zinc-100 text-xs sm:text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {task.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 ${statusMeta.badge}`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Under Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>

                    {/* Priority */}
                    <td className="p-3.5 font-medium">
                      <span className={`text-xs ${priorityMeta.text}`}>{priorityMeta.label}</span>
                    </td>

                    {/* Due Date */}
                    <td className="p-3.5">
                      <div
                        className={`flex items-center gap-1.5 text-xs font-medium ${
                          overdue
                            ? 'text-rose-600 dark:text-rose-400 font-bold'
                            : dueToday
                            ? 'text-amber-600 dark:text-amber-400 font-bold'
                            : 'text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        {overdue ? (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span>{formatDate(task.dueDate)}</span>
                      </div>
                    </td>

                    {/* Assignee */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs text-slate-700 dark:text-zinc-300 truncate max-w-[100px]">
                          {task.assignee.name}
                        </span>
                      </div>
                    </td>

                    {/* Row Delete Action */}
                    <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        title="Delete Task"
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
