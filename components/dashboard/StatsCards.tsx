import React from 'react';
import { Ticket, IndianRupee, CalendarDays, UserCheck, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface StatsCardsProps {
  data: {
    totalRegistrations: number;
    totalRevenue: number;
    activeEvents: number;
    totalCheckIns: number;
  };
}

export function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Registrations',
      value: data.totalRegistrations.toLocaleString('en-IN'),
      trend: '+18.4% this week',
      icon: Ticket,
      color: 'text-sru-blue bg-sru-blue/10 border-sru-blue/20',
    },
    {
      title: 'Revenue Collected',
      value: formatCurrency(data.totalRevenue),
      trend: 'Mock Payment Gateway Active',
      icon: IndianRupee,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Active Fest Events',
      value: data.activeEvents,
      trend: '5 Categories Published',
      icon: CalendarDays,
      color: 'text-sky-600 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Live Gate Check-ins',
      value: data.totalCheckIns,
      trend: 'QR Scanner Active',
      icon: UserCheck,
      color: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((item, idx) => (
        <Card key={idx} className="relative overflow-hidden p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {item.title}
            </span>
            <div className={`p-2.5 rounded-xl border ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {item.value}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>{item.trend}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
