import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, ThemeConfig } from '../types';

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  cyber_teal: {
    id: 'cyber_teal',
    name: 'Cyber Teal & Neon',
    bgClass: 'bg-[#030712] text-teal-100',
    cardClass: 'bg-[#0b1329] border-teal-900/60 shadow-xl shadow-teal-950/50 hover:border-teal-500/40 transition-all',
    textClass: 'text-teal-100',
    accentColor: '#14b8a6',
    primaryClass: 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(20,184,166,0.4)]',
    borderClass: 'border-teal-900/60',
  },
  nordic_frost: {
    id: 'nordic_frost',
    name: 'Nordic Light Frost',
    bgClass: 'bg-slate-50 text-slate-800',
    cardClass: 'bg-white/90 backdrop-blur-md border-slate-200/80 shadow-xs hover:border-cyan-400/50 transition-all',
    textClass: 'text-slate-800',
    accentColor: '#06b6d4',
    primaryClass: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs',
    borderClass: 'border-slate-200',
  },
  warm_parchment: {
    id: 'warm_parchment',
    name: 'Warm Parchment',
    bgClass: 'bg-[#faf6f0] text-stone-900',
    cardClass: 'bg-[#fffdfa] border-stone-200/90 shadow-2xs hover:border-amber-700/30 transition-all',
    textClass: 'text-stone-900',
    accentColor: '#d97706',
    primaryClass: 'bg-stone-900 hover:bg-stone-800 text-amber-50 shadow-xs',
    borderClass: 'border-stone-200',
  },
  obsidian_luxe: {
    id: 'obsidian_luxe',
    name: 'Obsidian Gold',
    bgClass: 'bg-[#090a0f] text-amber-100',
    cardClass: 'bg-[#12141d] border-amber-900/40 shadow-xl shadow-black hover:border-amber-500/30 transition-all',
    textClass: 'text-amber-100',
    accentColor: '#f59e0b',
    primaryClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]',
    borderClass: 'border-amber-900/40',
  },
  immersive: {
    id: 'immersive',
    name: 'Immersive Dark',
    bgClass: 'bg-[#020617] text-slate-200',
    cardClass: 'bg-[#0F172A] border-slate-800 shadow-xl shadow-black/40 hover:border-slate-700 transition-colors',
    textClass: 'text-slate-200',
    accentColor: '#3b82f6',
    primaryClass: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.35)]',
    borderClass: 'border-slate-800',
  },
  light: {
    id: 'light',
    name: 'Clean Light',
    bgClass: 'bg-slate-50 text-slate-900',
    cardClass: 'bg-white border-slate-200 shadow-xs',
    textClass: 'text-slate-900',
    accentColor: '#3b82f6',
    primaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    borderClass: 'border-slate-200',
  },
  dark: {
    id: 'dark',
    name: 'Dark Executive',
    bgClass: 'bg-zinc-950 text-zinc-100',
    cardClass: 'bg-zinc-900 border-zinc-800 shadow-md',
    textClass: 'text-zinc-100',
    accentColor: '#8b5cf6',
    primaryClass: 'bg-violet-600 hover:bg-violet-500 text-white',
    borderClass: 'border-zinc-800',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Focus',
    bgClass: 'bg-emerald-950 text-emerald-50',
    cardClass: 'bg-emerald-900/80 border-emerald-800 shadow-sm',
    textClass: 'text-emerald-50',
    accentColor: '#10b981',
    primaryClass: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    borderClass: 'border-emerald-800',
  },
  purple: {
    id: 'purple',
    name: 'Purple Spark',
    bgClass: 'bg-slate-950 text-purple-100',
    cardClass: 'bg-slate-900/90 border-purple-900/50 shadow-md',
    textClass: 'text-purple-100',
    accentColor: '#d946ef',
    primaryClass: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white',
    borderClass: 'border-purple-900/50',
  },
  slate: {
    id: 'slate',
    name: 'Minimal Slate',
    bgClass: 'bg-neutral-900 text-neutral-100',
    cardClass: 'bg-neutral-800 border-neutral-700 shadow-xs',
    textClass: 'text-neutral-100',
    accentColor: '#0ea5e9',
    primaryClass: 'bg-sky-600 hover:bg-sky-500 text-white',
    borderClass: 'border-neutral-700',
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as ThemeMode) in THEME_CONFIGS ? (saved as ThemeMode) : 'cyber_teal';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('app_theme', mode);
  };

  useEffect(() => {
    const root = document.documentElement;
    const isDark = ['cyber_teal', 'obsidian_luxe', 'immersive', 'dark', 'purple', 'emerald', 'slate'].includes(theme);
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const themeConfig = THEME_CONFIGS[theme];

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
      <div className={`min-h-screen transition-colors duration-200 ${themeConfig.bgClass}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
