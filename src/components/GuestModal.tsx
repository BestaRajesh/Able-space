import React from 'react';
import { useUser } from '../context/UserContext';
import { INITIAL_USERS } from '../data/initialData';
import { X, Check, Shield, UserCheck, RefreshCw } from 'lucide-react';

interface GuestModalProps {
  onClose: () => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({ onClose }) => {
  const { currentUser, switchUser, loginAsGuest } = useUser();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
              Guest Auth & User Profiles
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Select a persona or log in instantly as a Guest
            </p>
          </div>
        </div>

        {/* Current Active Persona Badge */}
        <div className="p-3 mb-5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <div>
              <div className="font-semibold text-sm text-blue-950 dark:text-blue-100">
                {currentUser.name}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300">
                {currentUser.role} • {currentUser.email}
              </div>
            </div>
          </div>
          <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-blue-600 text-white">
            Active
          </span>
        </div>

        {/* Persona Options */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Available Workspace Profiles
          </div>
          {INITIAL_USERS.map((usr) => {
            const isSelected = currentUser.id === usr.id;
            return (
              <button
                key={usr.id}
                onClick={() => {
                  switchUser(usr.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={usr.avatar}
                    alt={usr.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm text-slate-800 dark:text-zinc-200">
                      {usr.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">
                      {usr.role}
                    </div>
                  </div>
                </div>
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    Switch
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Guest Action Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              loginAsGuest();
              onClose();
            }}
            className="flex-1 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>Instant Guest Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
