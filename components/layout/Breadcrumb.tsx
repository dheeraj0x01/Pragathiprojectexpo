'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-sru-blue transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Dashboard</span>
      </Link>

      {segments.map((seg, idx) => {
        if (seg === 'dashboard' && idx === 0) return null;
        const href = `/${segments.slice(0, idx + 1).join('/')}`;
        const isLast = idx === segments.length - 1;
        const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={href}>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
            {isLast ? (
              <span className="font-bold text-slate-900 dark:text-white capitalize">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-sru-blue transition-colors capitalize">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
