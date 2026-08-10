'use client';

import React from 'react';
import { QRScanner } from '@/components/scanner/QRScanner';

export default function VolunteerScannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Volunteer Gate Scanner Terminal
          </h1>
          <p className="text-xs text-slate-500">
            Verify participant digital pass QR codes and prevent duplicate entrance scans in real time.
          </p>
        </div>
      </div>

      <QRScanner volunteerId="usr_vol_05" />
    </div>
  );
}
