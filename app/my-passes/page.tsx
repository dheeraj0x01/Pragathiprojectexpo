'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ticket, ArrowLeft, Download, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SRULogoHeader } from '@/components/shared/SRULogoHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Registration } from '@/types';
import { formatDate } from '@/lib/utils';

export default function MyPassesWalletPage() {
  const [passes, setPasses] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/registrations')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPasses(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <SRULogoHeader />
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Events</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sru-blue/10 text-sru-blue text-xs font-bold uppercase">
            <Ticket className="w-3.5 h-3.5" />
            <span>Digital Gate Wallet</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            My SRU Pragathi Digital Tickets & Entry Passes
          </h1>
          <p className="text-xs text-slate-500">
            Show these QR pass cards at gate entry scanner terminals for instant validation.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-xs text-slate-400">Loading digital passes...</div>
        ) : passes.length === 0 ? (
          <Card className="text-center py-16 space-y-4">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold">No Entry Passes Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">You have not registered for any events yet. Register now from the events catalog.</p>
            <Link href="/">
              <Button variant="primary" size="sm">Browse Events</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passes.map((pass) => (
              <Card key={pass.id} className="relative overflow-hidden p-6 border-2 border-sru-blue/20 bg-white dark:bg-slate-900 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sru-blue text-white flex items-center justify-center font-black text-xs">
                      sru
                    </div>
                    <span className="font-extrabold text-xs tracking-tight">PRAGATHI 2026 PASS</span>
                  </div>
                  <Badge variant="success">CONFIRMED</Badge>
                </div>

                {/* Event details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {pass.event?.title || 'Registered Event'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {pass.event?.venue} • {pass.event?.eventDate ? formatDate(pass.event.eventDate) : ''}
                  </p>
                </div>

                {/* QR Code Section */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-4 border border-slate-200/80 dark:border-slate-700">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Ticket Code</span>
                    <span className="block font-mono font-black text-base text-sru-blue dark:text-blue-400">
                      {pass.ticketCode}
                    </span>
                    <span className="block text-[11px] text-slate-500 font-semibold">
                      Holder: {pass.user?.name}
                    </span>
                  </div>

                  {pass.qrCodeUrl && (
                    <div className="w-24 h-24 bg-white p-1 rounded-xl shadow-md border border-slate-200">
                      <img src={pass.qrCodeUrl} alt="Ticket QR Code" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Txn Ref: <code className="font-mono font-bold text-slate-700 dark:text-slate-300">{pass.paymentTxnId}</code></span>
                  <button onClick={() => window.print()} className="font-bold text-sru-blue hover:underline flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Pass</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
