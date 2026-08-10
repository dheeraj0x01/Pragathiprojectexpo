'use client';

import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertTriangle, XCircle, Search, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TicketScanResult } from '@/services/checkin.service';

interface QRScannerProps {
  volunteerId: string;
}

export function QRScanner({ volunteerId }: QRScannerProps) {
  const [ticketInput, setTicketInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<TicketScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<TicketScanResult[]>([]);

  const handleScanVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ticketInput.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/verify-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketCode: ticketInput.trim(),
          volunteerId,
          gateLocation: 'Main Gate 1 (Innovate Ground)',
        }),
      });

      const json = await res.json();
      if (json.success) {
        const resultData: TicketScanResult = json.data;
        setScanResult(resultData);
        setScanHistory(prev => [resultData, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSimulateSampleScan = (sampleCode: string) => {
    setTicketInput(sampleCode);
    setTimeout(() => {
      handleScanVerify();
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Live Scanner Input Card */}
      <Card className="lg:col-span-2 p-6 space-y-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Volunteer Live Gate Ticket Scanner</CardTitle>
              <CardDescription>Scan digital pass QR codes or enter ticket alphanumeric code</CardDescription>
            </div>
            <div className="p-2.5 rounded-2xl bg-sru-blue/10 text-sru-blue border border-sru-blue/20">
              <QrCode className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </CardHeader>

        {/* Input Form */}
        <form onSubmit={handleScanVerify} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Scan QR or enter ticket code (e.g. SRU-PRG26-HACK-89A12)"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white uppercase placeholder:capitalize focus:outline-none focus:ring-2 focus:ring-sru-blue"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Quick Test Samples:</span>
              <button
                type="button"
                onClick={() => handleSimulateSampleScan('SRU-PRG26-HACK-89A12')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-sru-blue font-bold hover:underline"
              >
                Sample 1 (Valid)
              </button>
              <button
                type="button"
                onClick={() => handleSimulateSampleScan('INVALID-CODE-XYZ')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-red-500 font-bold hover:underline"
              >
                Sample 2 (Invalid)
              </button>
            </div>

            <Button type="submit" variant="primary" isLoading={isScanning} className="px-6">
              Verify Ticket Pass
            </Button>
          </div>
        </form>

        {/* Scan Result Feedback Card */}
        {scanResult && (
          <div className={`p-6 rounded-2xl border transition-all animate-fade-in ${
            scanResult.valid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              : scanResult.code === 'DUPLICATE'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200'
              : 'bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200'
          }`}>
            <div className="flex items-start gap-4">
              {scanResult.valid ? (
                <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : scanResult.code === 'DUPLICATE' ? (
                <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-lg">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-red-500 text-white shadow-lg">
                  <XCircle className="w-8 h-8" />
                </div>
              )}

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {scanResult.code}
                  </span>
                  <span className="text-[10px] font-mono opacity-80">
                    {scanResult.checkInRecord?.scannedAt ? new Date(scanResult.checkInRecord.scannedAt).toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
                <h4 className="text-base font-bold">
                  {scanResult.message}
                </h4>

                {scanResult.registration && (
                  <div className="mt-3 p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 text-xs space-y-1 border border-slate-200/50 dark:border-slate-800">
                    <div><strong>Participant:</strong> {scanResult.registration.user?.name} ({scanResult.registration.user?.email})</div>
                    <div><strong>Event:</strong> {scanResult.registration.event?.title}</div>
                    <div><strong>Team:</strong> {scanResult.registration.teamName || 'Individual Entry'}</div>
                    <div><strong>Gate Location:</strong> Main Gate 1 (Innovate Ground)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Live Gate Entry Activity Log */}
      <Card className="p-5 flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>Live Gate Entry Stream</CardTitle>
            <CardDescription>Real-time gate check-ins logged</CardDescription>
          </CardHeader>

          <div className="space-y-3">
            {scanHistory.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400">
                No tickets scanned yet in this session.
              </div>
            ) : (
              scanHistory.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs flex items-center justify-between border border-slate-200/60 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.registration?.user?.name || 'Scanned Ticket'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.registration?.ticketCode || 'Code Scan'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.valid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.valid ? 'PASSED' : 'REJECTED'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center font-medium">
          Gate Scanner Terminal #01 Active
        </div>
      </Card>
    </div>
  );
}
