import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'slate';
}

export function Badge({ className, children, variant = 'primary', ...props }: BadgeProps) {
  const variants = {
    primary: "bg-sru-blue/10 text-sru-blue border-sru-blue/20 dark:bg-blue-900/30 dark:text-blue-300",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    info: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
