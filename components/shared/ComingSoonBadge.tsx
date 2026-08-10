import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  moduleName: string;
}

export function ComingSoonBadge({ title, description, moduleName }: ComingSoonProps) {
  return (
    <div className="w-full rounded-2xl border border-dashed border-amber-300 dark:border-amber-900/50 bg-amber-500/5 dark:bg-amber-500/10 p-8 text-center my-6">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
        <Clock className="w-3.5 h-3.5" />
        <span>Coming Soon • {moduleName}</span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
        {description}
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-mono">
        <span>⚡ Database schema & API routes ready for integration</span>
      </div>
    </div>
  );
}
