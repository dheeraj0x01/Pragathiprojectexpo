'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, QrCode, Plus, Download, Sparkles, CheckCircle2, Clock, Users, 
  Layers, Trophy, AlertCircle, ArrowRight, ShieldCheck, Ticket, UserCheck, ExternalLink
} from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/Button';
import { CreateEventModal } from '@/components/events/CreateEventModal';
import { useAuth } from '@/lib/auth-context';
import { PRAGATHI_CONFIG } from '@/lib/config';

export default function OverviewDashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isParticipant = !user || user.role === 'PARTICIPANT';

  const fetchMetrics = () => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMetrics(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {isParticipant ? `Welcome, ${user?.name || 'Innovator'}!` : 'Executive Expo Dashboard'}
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sru-blue text-white uppercase">
              {user?.role || 'PARTICIPANT'}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {isParticipant 
              ? 'PRAGATHI 2K26 Participant Portal • SR University Warangal' 
              : 'Real-time telemetry, registrations, revenue velocity, and gate scanners.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/my-passes">
            <Button variant="outline" size="sm" className="gap-2">
              <Ticket className="w-4 h-4 text-sru-blue" />
              <span>Digital Ticket Pass</span>
            </Button>
          </Link>
          
          {!isParticipant && (
            <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Button>
          )}
        </div>
      </div>

      {/* PARTICIPANT LIFECYCLE TRACKER (SECTION 7 SPECIFICATION) */}
      {isParticipant && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sru-sky text-sru-blue flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Expo Participation Lifecycle Status
                </h3>
                <p className="text-xs text-slate-500">PRAGATHI 2K26 National Innovation Track</p>
              </div>
            </div>

            <Link href="/dashboard/profile" className="text-xs font-bold text-sru-blue hover:underline flex items-center gap-1">
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Stepper Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Step 1: Registration */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase">Step 1</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Registration</h4>
              <span className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-white">
                Completed ✓
              </span>
            </div>

            {/* Step 2: Team */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase">Step 2</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Team Setup</h4>
              <span className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-white">
                Created ✓
              </span>
            </div>

            {/* Step 3: Project Details */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase">Step 3</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Project Added</h4>
              <span className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-white">
                Added ✓
              </span>
            </div>

            {/* Step 4: Submission */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 uppercase">Step 4</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Submission</h4>
              <span className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-white">
                Pending Final Submission
              </span>
            </div>

            {/* Step 5: Jury Evaluation */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 5</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Jury Review</h4>
              <span className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                Pending Evaluation
              </span>
            </div>

          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Registered Event */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Registered Event</span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">HackPragathi 2026</h4>
              <p className="text-xs text-slate-500">24hr National Hackathon • Technical Domain</p>
            </div>

            {/* Team Info */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Team Name</span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">SRU Tech Innovators</h4>
              <p className="text-xs text-slate-500">Leader: {user?.name || 'Student'} • 4 Members</p>
            </div>

            {/* Project Abstract */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Submitted Prototype</span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Smart Water Quality IoT</h4>
              <p className="text-xs text-slate-500">Category: Smart Cities & Agritech</p>
            </div>

          </div>
        </div>
      )}

      {/* ADMIN METRICS VIEW */}
      {!isParticipant && (
        <>
          {isLoading ? (
            <div className="py-16 text-center text-xs text-slate-400">Loading telemetry data...</div>
          ) : metrics ? (
            <>
              <StatsCards data={metrics} />
              <AnalyticsCharts
                velocityData={metrics.registrationVelocity}
                categoryData={metrics.categoryDistribution}
              />
              <RecentActivity registrations={metrics.recentRegistrations || []} />
            </>
          ) : null}

          <CreateEventModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => fetchMetrics()}
          />
        </>
      )}
    </div>
  );
}
