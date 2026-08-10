'use client';

import React, { useState, useEffect } from 'react';
import { Ticket, Search, Download, CheckCircle2, QrCode } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Registration } from '@/types';
import { formatDate } from '@/lib/utils';

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQrPass, setSelectedQrPass] = useState<Registration | null>(null);

  useEffect(() => {
    fetch('/api/registrations')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRegistrations(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.ticketCode.toLowerCase().includes(q) ||
      (r.user?.name || '').toLowerCase().includes(q) ||
      (r.event?.title || '').toLowerCase().includes(q) ||
      (r.paymentTxnId || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Registrations & Pass Tickets
          </h1>
          <p className="text-xs text-slate-500">
            Manage participant ticket passes, view Payment Gateway transaction IDs, and inspect QR entry codes.
          </p>
        </div>
      </div>

      <Card className="p-5 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ticket code, participant name, event, txn ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sru-blue"
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading registrations...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-3">Ticket Code</th>
                  <th className="pb-3 px-3">Participant</th>
                  <th className="pb-3 px-3">Event</th>
                  <th className="pb-3 px-3">Payment Txn ID</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">QR Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-sru-blue dark:text-blue-400">
                      {reg.ticketCode}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{reg.user?.name || 'Participant'}</div>
                      <div className="text-[10px] text-slate-400">{reg.user?.email}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                      {reg.event?.title}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-500">
                      {reg.paymentTxnId || 'N/A'}
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant={reg.status === 'CHECKED_IN' ? 'purple' : 'success'}>
                        {reg.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedQrPass(reg)}
                        className="p-1.5 rounded-lg bg-sru-blue/10 text-sru-blue hover:bg-sru-blue/20 transition-colors"
                        title="View QR Ticket Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* View QR Pass Modal */}
      {selectedQrPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-sm text-center space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">QR Gate Pass</h3>
            <p className="text-xs text-slate-500">{selectedQrPass.event?.title}</p>

            {selectedQrPass.qrCodeUrl && (
              <div className="w-48 h-48 bg-white p-2 rounded-2xl mx-auto shadow-md border border-slate-200">
                <img src={selectedQrPass.qrCodeUrl} alt="QR Pass" className="w-full h-full object-contain" />
              </div>
            )}

            <div className="font-mono font-bold text-sru-blue dark:text-blue-400 text-sm bg-sru-blue/10 py-1 rounded-xl">
              {selectedQrPass.ticketCode}
            </div>

            <button
              onClick={() => setSelectedQrPass(null)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
