'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SRULogoHeader } from '@/components/shared/SRULogoHeader';
import { useAuth } from '@/lib/auth-context';
import { Mail, User, Phone, Building, IdCard, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'SR University',
    department: 'Computer Science & Engineering',
    rollNo: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await register(formData);
      if (res) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between p-4 sm:p-6">
      
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <SRULogoHeader />
        <Link href="/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      </div>

      <div className="max-w-xl w-full mx-auto my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Create Participant Account
          </h1>
          <p className="text-xs text-slate-500">PRAGATHI 2K26 • SR University Project Expo Platform</p>
        </div>

        {isSuccess ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Created!</h3>
            <p className="text-xs text-slate-500">Redirecting to your Participant Dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="K. Dheeraj Reddi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@sru.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98490 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">College / University *</label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Roll / Student ID Number</label>
                <input
                  type="text"
                  placeholder="2203A51000"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Create Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full justify-center py-3 gap-2">
              <span>Create Account & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-sru-blue hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        © {new Date().getFullYear()} SR University, Warangal. PRAGATHI 2K26 Platform.
      </div>
    </div>
  );
}
