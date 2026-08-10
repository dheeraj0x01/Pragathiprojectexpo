'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DEFAULT_CURRENT_USER } from '@/lib/auth';
import { User } from '@/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_CURRENT_USER);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Sidebar Navigation */}
      <Sidebar currentUser={currentUser} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar currentUser={currentUser} onRoleChange={(newUser) => setCurrentUser(newUser)} />

        {/* Content View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
