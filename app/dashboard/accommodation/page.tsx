'use client';

import React from 'react';
import { ComingSoonBadge } from '@/components/shared/ComingSoonBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Building2 } from 'lucide-react';

export default function AccommodationPage() {
  /**
   * TODO for SRU College Dev Team:
   * 1. Connect hostel room allocation database.
   * 2. Track outstation student stay dates & mess tokens.
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Hostel & Accommodation Management
          </h1>
          <p className="text-xs text-slate-500">Room allocations & outstation hospitality</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      <ComingSoonBadge
        title="Hostel Room & Hospitality Allocation"
        description="Streamline room bookings, hostel warden check-ins, and mess meal tokens for participants traveling from other universities."
        moduleName="Accommodation Portal"
      />

      <Card className="p-5 opacity-75">
        <CardHeader>
          <CardTitle>Hostel Allocation Matrix Shell</CardTitle>
          <CardDescription>SRU Boys & Girls Hostel Block occupancy tracker</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <span className="font-bold block">Hostel Block A (Boys)</span>
            <span className="text-slate-500 block">45 Rooms Allocated / 60 Available</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <span className="font-bold block">Hostel Block C (Girls)</span>
            <span className="text-slate-500 block">30 Rooms Allocated / 50 Available</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
