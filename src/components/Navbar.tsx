import React, { useState } from 'react';
import { useTheme, THEME_CONFIGS } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { AppTab } from '../types';
import {
  CheckSquare,
  Sparkles,
  BookOpen,
  Palette,
  User,
  Plus,
  Moon,
  Sun,
  LayoutGrid,
  ChevronDown,
  Activity,
} from 'lucide-react';
import GuestModal from './GuestModal';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenNewTaskModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewTaskModal,
}) => {
  const { theme, setTheme, themeConfig } = useTheme();
  const { currentUser, isGuest } = useUser();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${themeConfig.borderClass}`}
        style={{
          backgroundColor:
            theme === 'cyber_teal'
              ? 'rgba(11, 19, 41, 0.92)'
              : theme === 'nordic_frost'
              ? 'rgba(255, 255, 255, 0.88)'
              : theme === 'warm_parchment'
              ? 'rgba(250, 246, 240, 0.92)'
              : theme === 'obsidian_luxe'
              ? 'rgba(18, 20, 29, 0.92)'
              : theme === 'immersive'
              ? 'rgba(15, 23, 42, 0.85)'
              : theme === 'dark'
              ? 'rgba(9, 9, 11, 0.9)'
              : theme === 'emerald'
              ? 'rgba(6, 78, 59, 0.95)'
              : theme === 'purple'
              ? 'rgba(15, 23, 42, 0.95)'
              : theme === 'slate'
              ? 'rgba(23, 23, 23, 0.95)'
              : 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Main Title */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-md transition-all"
                style={{ backgroundColor: themeConfig.accentColor }}
              >
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`font-bold text-lg tracking-tight leading-none ${themeConfig.textClass}`}>
                    TaskFlow <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300 border border-teal-500/20">Studio</span>
                  </h1>
                </div>
                <p className="text-xs opacity-70 hidden sm:block">
                  Task Management & AbleSpace Caseload Evaluation
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center p-1 bg-slate-100 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700/50">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'tasks'
                    ? `${themeConfig.primaryClass} shadow-xs`
                    : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-700/50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Task Board</span>
              </button>

              <button
                onClick={() => setActiveTab('ablespace')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'ablespace'
                    ? `${themeConfig.primaryClass} shadow-xs`
                    : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-700/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>AbleSpace Caseload</span>
              </button>

              <button
                onClick={() => setActiveTab('submission_docs')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'submission_docs'
                    ? `${themeConfig.primaryClass} shadow-xs`
                    : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-700/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">README & Docs</span>
                <span className="md:hidden">Docs</span>
              </button>
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Add Task Button */}
              {activeTab === 'tasks' && (
                <button
                  onClick={onOpenNewTaskModal}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-transform active:scale-95 ${themeConfig.primaryClass}`}
                >
                  <Plus className="w-4 h-4" />
                  <span>New Task</span>
                </button>
              )}

              {/* Theme Picker Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  title="Switch Theme"
                  className="p-2 rounded-lg border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Palette className="w-4 h-4 text-blue-500" />
                  <span className="hidden lg:inline capitalize">{theme}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl py-2 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Theme
                    </div>
                    {Object.values(THEME_CONFIGS).map((conf) => (
                      <button
                        key={conf.id}
                        onClick={() => {
                          setTheme(conf.id);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                          theme === conf.id ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border border-slate-300 dark:border-zinc-600"
                            style={{ backgroundColor: conf.accentColor }}
                          />
                          <span>{conf.name}</span>
                        </div>
                        {theme === conf.id && <span className="text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guest / User Profile Badge */}
              <button
                onClick={() => setShowGuestModal(true)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors text-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-500/30"
                />
                <div className="text-left hidden md:block">
                  <div className="font-semibold text-xs leading-none text-slate-800 dark:text-zinc-200">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">
                    {isGuest ? 'Guest Evaluator' : currentUser.role}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Guest Modal */}
      {showGuestModal && (
        <GuestModal onClose={() => setShowGuestModal(false)} />
      )}
    </>
  );
};

export default Navbar;
