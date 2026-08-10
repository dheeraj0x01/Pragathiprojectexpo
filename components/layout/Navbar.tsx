'use client';

import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Command, ExternalLink } from 'lucide-react';
import { User } from '@/types';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';

interface NavbarProps {
  currentUser: User;
  onRoleChange: (newUser: User) => void;
}

export function Navbar({ currentUser, onRoleChange }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-6 flex items-center justify-between">
      {/* Search Everywhere & Command Palette */}
      <div className="flex items-center gap-3 w-72 md:w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events, passes, registrations... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sru-blue"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-bold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-3">
        {/* Public Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-sru-blue dark:text-blue-400 hover:underline px-3 py-1.5 rounded-lg bg-sru-blue/5 dark:bg-blue-900/20"
        >
          <span>Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Live Multi-Role Switcher */}
        <RoleSwitcher currentUser={currentUser} onRoleChange={onRoleChange} />

        {/* Dark/Light Mode Switcher */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sru-blue animate-pulse" />
        </button>
      </div>
    </header>
  );
}
