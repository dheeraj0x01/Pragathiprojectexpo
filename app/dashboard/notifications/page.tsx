'use client';

import React from 'react';
import { ComingSoonBadge } from '@/components/shared/ComingSoonBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, Send } from 'lucide-react';

export default function NotificationsPage() {
  /**
   * TODO for SRU College Dev Team:
   * 1. Connect Twilio / Fast2SMS API for SMS broadcasts to registered participants.
   * 2. Connect Resend / SendGrid for bulk email updates.
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Broadcast & Notification System
          </h1>
          <p className="text-xs text-slate-500">SMS, Email & In-App push announcements</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      <ComingSoonBadge
        title="Automated Broadcast & Alert Center"
        description="Send instant SMS schedule changes, venue updates, and winner announcements to registered participants."
        moduleName="Notification System"
      />

      <Card className="p-5 opacity-75">
        <CardHeader>
          <CardTitle>Broadcast Composer Shell</CardTitle>
          <CardDescription>SMS / Email bulk messaging interface</CardDescription>
        </CardHeader>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
          <div className="font-bold">Target Audience: All Registered Technical Hackathon Participants</div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border text-slate-600 dark:text-slate-400 font-mono">
            "Notice: HackPragathi 2026 round 1 submission deadline extended by 1 hour."
          </div>
        </div>
      </Card>
    </div>
  );
}
