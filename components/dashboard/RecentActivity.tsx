import React from 'react';
import { Ticket, UserCheck, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Registration } from '@/types';
import { formatDate } from '@/lib/utils';

interface RecentActivityProps {
  registrations: Registration[];
}

export function RecentActivity({ registrations }: RecentActivityProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Registration Feed</CardTitle>
            <CardDescription>Live incoming ticket pass issues</CardDescription>
          </div>
          <Badge variant="info">Live Stream</Badge>
        </div>
      </CardHeader>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {registrations.map((reg) => (
          <div key={reg.id} className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sru-blue/10 text-sru-blue flex items-center justify-center font-bold text-xs border border-sru-blue/20">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {reg.user?.name || 'Participant'}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {reg.event?.title || 'Registered Event'} • {reg.teamName ? `Team: ${reg.teamName}` : 'Individual'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono font-bold text-sru-blue dark:text-blue-400 bg-sru-blue/5 px-2 py-0.5 rounded">
                {reg.ticketCode}
              </span>
              <span className="text-[10px] text-slate-400">
                {formatDate(reg.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
