'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Ticket, 
  QrCode, 
  Award, 
  FileCheck, 
  Building2, 
  Sparkles, 
  Bell, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Role, User } from '@/types';
import { hasPermission } from '@/lib/auth';

interface SidebarProps {
  currentUser: User;
}

export function Sidebar({ currentUser }: SidebarProps) {
  const pathname = usePathname();

  const primaryNavItems = [
    {
      name: 'Overview Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      role: 'VOLUNTEER' as Role,
      badge: null,
    },
    {
      name: 'Event Management',
      href: '/dashboard/events',
      icon: CalendarDays,
      role: 'COORDINATOR' as Role,
      badge: 'P1',
    },
    {
      name: 'Registrations & Tickets',
      href: '/dashboard/registrations',
      icon: Ticket,
      role: 'COORDINATOR' as Role,
      badge: 'P1',
    },
    {
      name: 'Volunteer Gate Scanner',
      href: '/dashboard/scanner',
      icon: QrCode,
      role: 'VOLUNTEER' as Role,
      badge: 'Live',
    },
  ];

  const secondaryPlaceholderItems = [
    {
      name: 'Judge Portal & Scoring',
      href: '/dashboard/judge',
      icon: Award,
      role: 'JUDGE' as Role,
      comingSoon: true,
    },
    {
      name: 'Certificate Generator',
      href: '/dashboard/certificates',
      icon: FileCheck,
      role: 'ADMIN' as Role,
      comingSoon: true,
    },
    {
      name: 'Hostel Accommodation',
      href: '/dashboard/accommodation',
      icon: Building2,
      role: 'ADMIN' as Role,
      comingSoon: true,
    },
    {
      name: 'Sponsors Showcase',
      href: '/dashboard/sponsors',
      icon: Sparkles,
      role: 'ADMIN' as Role,
      comingSoon: true,
    },
    {
      name: 'Broadcast System',
      href: '/dashboard/notifications',
      icon: Bell,
      role: 'ADMIN' as Role,
      comingSoon: true,
    },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 z-30">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-2 py-1">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-sru-blue text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-md group-hover:scale-105 transition-transform">
              sru
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">PRAGATHI '26</span>
              <span className="text-[10px] font-bold text-sru-blue dark:text-blue-400">SR UNIVERSITY</span>
            </div>
          </Link>
        </div>

        {/* Primary Priority-1 Navigation */}
        <div className="space-y-1">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Core Modules
          </span>
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            const isAllowed = hasPermission(currentUser.role, item.role);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-sru-blue text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60",
                  !isAllowed && "opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-sru-blue dark:text-blue-400")} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                    isActive ? "bg-white/20 text-white" : "bg-sru-blue/10 text-sru-blue dark:bg-blue-900/40 dark:text-blue-300"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Secondary Low-Priority Modules */}
        <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Upcoming Modules
          </span>
          {secondaryPlaceholderItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-amber-500/10 text-amber-900 dark:text-amber-300 font-semibold border border-amber-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 uppercase">
                  Soon
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Card */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sru-blue/10 text-sru-blue flex items-center justify-center font-extrabold text-sm border border-sru-blue/20">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {currentUser.name}
            </span>
            <span className="text-[10px] font-medium text-slate-500 truncate">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
