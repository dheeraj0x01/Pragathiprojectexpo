'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface AnalyticsChartsProps {
  velocityData: Array<{ date: string; count: number }>;
  categoryData: Array<{ category: string; count: number }>;
}

export function AnalyticsCharts({ velocityData, categoryData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Registration Velocity Area Chart */}
      <Card className="lg:col-span-2 p-5">
        <CardHeader>
          <CardTitle>Registration Velocity (Daily)</CardTitle>
          <CardDescription>Real-time ticket issue curve for SRU Pragathi 2026</CardDescription>
        </CardHeader>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15549A" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#15549A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }} />
              <Area type="monotone" dataKey="count" stroke="#15549A" strokeWidth={3} fillOpacity={1} fill="url(#colorRegistrations)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Breakdown Bar Chart */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Registrations by event category</CardDescription>
        </CardHeader>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }} />
              <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
