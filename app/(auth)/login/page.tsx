'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SRULogoHeader } from '@/components/shared/SRULogoHeader';
import { useAuth } from '@/lib/auth-context';
import { Role } from '@/types';
import { Lock, Mail, ArrowRight, Sparkles, UserCheck, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [activeRole, setActiveRole] = useState<Role>('PARTICIPANT');
  const [email, setEmail] = useState('priya.part@gmail.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const success = await login(email, activeRole);
      if (success) {
        if (activeRole === 'JUDGE') {
          router.push('/dashboard/judge');
        } else if (activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') {
          router.push('/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setErrorMsg('Invalid login credentials. Please check your email and password.');
      }
    } catch (err) {
      setErrorMsg('An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <SRULogoHeader />
        <Link href="/">
          <Button variant="outline" size="sm">
            Back to Public Portal
          </Button>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Title & Tagline */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sru-sky dark:bg-slate-800 text-sru-blue text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRAGATHI 2K26 Portal</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Account Sign In
          </h1>
          <p className="text-xs text-slate-500">Access your expo dashboard, project status, or jury evaluation desk</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveRole('PARTICIPANT');
              setEmail('priya.part@gmail.com');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeRole === 'PARTICIPANT'
                ? 'bg-white dark:bg-slate-900 text-sru-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Participant
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('JUDGE');
              setEmail('vikram.judge@techpartner.io');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeRole === 'JUDGE'
                ? 'bg-white dark:bg-slate-900 text-sru-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Jury Member
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('SUPER_ADMIN');
              setEmail('convener.pragathi@sru.edu.in');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeRole === 'SUPER_ADMIN' || activeRole === 'ADMIN'
                ? 'bg-white dark:bg-slate-900 text-sru-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Admin Desk
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@sru.edu.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <a href="#" className="text-[11px] font-bold text-sru-blue hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full justify-center py-3 gap-2">
            <span>Sign In as {activeRole.replace('_', ' ')}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          <span>Don't have a participant account? </span>
          <Link href="/register" className="font-bold text-sru-blue hover:underline">
            Register Here
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-400">
        © {new Date().getFullYear()} SR University, Warangal. PRAGATHI 2K26 Platform.
      </div>
    </div>
  );
}
