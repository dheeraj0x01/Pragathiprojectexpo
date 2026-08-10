'use client';

import React from 'react';
import { ComingSoonBadge } from '@/components/shared/ComingSoonBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

export default function SponsorsPage() {
  /**
   * TODO for SRU College Dev Team:
   * 1. Connect tiered sponsor logos (Title, Platinum, Gold, Tech Partners).
   * 2. Manage stall allocations inside campus expo arena.
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Sponsor & Industry Showcase
          </h1>
          <p className="text-xs text-slate-500">Tiered partner management & stall distribution</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      <ComingSoonBadge
        title="Tiered Sponsor Showcase Portal"
        description="Manage title sponsors, technical partners, branding banners, and stall booth allocations across the university ground."
        moduleName="Sponsors Portal"
      />

      <Card className="p-5 opacity-75">
        <CardHeader>
          <CardTitle>Sponsor Tier Matrix Shell</CardTitle>
          <CardDescription>Sample partner tier arrangement</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-700 font-bold border border-purple-500/20">
            Title Sponsor (Platinum)
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-700 font-bold border border-blue-500/20">
            Technology Partners (Gold)
          </div>
        </div>
      </Card>
    </div>
  );
}
