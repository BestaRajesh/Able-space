import React from 'react';
import { Priority, TaskStatus, ViewMode } from '../../types';
import {
  Search,
  Filter,
  Kanban,
  List,
  Calendar as CalendarIcon,
  BarChart2,
  Plus,
  X,
  Tag,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPriority: Priority | 'all';
  setSelectedPriority: (p: Priority | 'all') => void;
  selectedTag: string | 'all';
  setSelectedTag: (t: string | 'all') => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  allTags: string[];
  onOpenNewTaskModal: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  selectedTag,
  setSelectedTag,
  viewMode,
  setViewMode,
  allTags,
  onOpenNewTaskModal,
}) => {
  const { themeConfig } = useTheme();

  return (
    <div className="space-y-3 mb-6">
      {/* Top Control Bar: View Switcher & Search & New Task Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, descriptions, or tags..."
            className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Primary Create Button */}
        <div className="flex items-center justify-between md:justify-end gap-2">
          {/* View Mode Tabs */}
          <div className="flex items-center p-1 bg-slate-200/60 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <button
              onClick={() => setViewMode('board')}
              title="Board View"
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'board'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span className="hidden sm:inline">Board</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              title="Calendar View"
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>

            <button
              onClick={() => setViewMode('analytics')}
              title="Analytics View"
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'analytics'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline">Analytics</span>
            </button>
          </div>

          <button
            onClick={onOpenNewTaskModal}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95 ${themeConfig.primaryClass}`}
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Priority Pills & Category Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-400 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Priority:</span>
          </div>

          <button
            onClick={() => setSelectedPriority('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPriority === 'all'
                ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setSelectedPriority('urgent')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPriority === 'urgent'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40'
            }`}
          >
            Urgent
          </button>

          <button
            onClick={() => setSelectedPriority('high')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPriority === 'high'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40'
            }`}
          >
            High
          </button>

          <button
            onClick={() => setSelectedPriority('medium')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPriority === 'medium'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            Medium
          </button>

          <button
            onClick={() => setSelectedPriority('low')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPriority === 'low'
                ? 'bg-slate-600 text-white font-bold'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200'
            }`}
          >
            Low
          </button>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
              selectedTag === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
            }`}
          >
            All Tags
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(selectedTag === t ? 'all' : t)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                selectedTag === t
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
