'use client';

import React from 'react';
import { ComingSoonBadge } from '@/components/shared/ComingSoonBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Star } from 'lucide-react';

export default function JudgePortalPage() {
  /**
   * TODO for SRU College Dev Team:
   * 1. Connect rubric criteria fields (Innovation, Presentation, Technical Feasibility).
   * 2. Implement real-time leaderboard web socket stream for live main stage display.
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Judge Portal & Live Scoring Arena
          </h1>
          <p className="text-xs text-slate-500">Criteria-based evaluation sheet & dynamic leaderboard</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      <ComingSoonBadge
        title="Rubric Evaluation & Live Leaderboards"
        description="This module will allow invited judges to evaluate hackathon presentations, cultural performances, and project expos with customizable scoring rubrics."
        moduleName="Judge Scoring System"
      />

      <Card className="p-5 opacity-75">
        <CardHeader>
          <CardTitle>Sample Evaluation Rubric Shell</CardTitle>
          <CardDescription>Preview component structure for college dev team</CardDescription>
        </CardHeader>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <span className="font-bold">Team 102 - Algorithmic Titans</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>9.4 / 10</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <span className="font-bold">Team 108 - IronClad Botics</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>8.8 / 10</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
