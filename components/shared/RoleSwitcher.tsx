import React from 'react';
import { UserCheck, Shield } from 'lucide-react';
import { Role, User } from '@/types';
import { MOCK_USERS, getRoleBadgeColor } from '@/lib/auth';

interface RoleSwitcherProps {
  currentUser: User;
  onRoleChange: (newUser: User) => void;
}

export function RoleSwitcher({ currentUser, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs">
      <div className="flex items-center gap-1.5 px-2 text-slate-500 dark:text-slate-400 font-semibold">
        <Shield className="w-3.5 h-3.5 text-sru-blue" />
        <span className="hidden sm:inline">Active Role:</span>
      </div>

      <select
        value={currentUser.id}
        onChange={(e) => {
          const selected = MOCK_USERS.find(u => u.id === e.target.value);
          if (selected) onRoleChange(selected);
        }}
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-sru-blue cursor-pointer"
      >
        {MOCK_USERS.map((usr) => (
          <option key={usr.id} value={usr.id}>
            {usr.role} - {usr.name} ({usr.college})
          </option>
        ))}
      </select>
    </div>
  );
}
