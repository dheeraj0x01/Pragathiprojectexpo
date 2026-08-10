'use client';

import React from 'react';
import { ComingSoonBadge } from '@/components/shared/ComingSoonBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileCheck, Download } from 'lucide-react';

export default function CertificatePage() {
  /**
   * TODO for SRU College Dev Team:
   * 1. Connect PDF generation library (pdf-lib or html2canvas/jspdf).
   * 2. Add custom SR University seal and Convener digital signature overlay.
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Automated Certificate Generator
          </h1>
          <p className="text-xs text-slate-500">Issue participation & merit certificates</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      <ComingSoonBadge
        title="PDF Certificate Generation Pipeline"
        description="Automate the distribution of verified participation certificates to attendees upon event completion."
        moduleName="Certificates Engine"
      />

      <Card className="p-5 opacity-75">
        <CardHeader>
          <CardTitle>Certificate Issuer Template Preview</CardTitle>
          <CardDescription>SR University official certificate layout preview</CardDescription>
        </CardHeader>
        <div className="p-8 rounded-2xl border-2 border-dashed border-sru-blue/30 bg-sru-blue/5 text-center space-y-3">
          <FileCheck className="w-10 h-10 text-sru-blue mx-auto" />
          <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Certificate of Participation</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Awarded to [Participant Name] for participating in SRU Pragathi 2026</p>
        </div>
      </Card>
    </div>
  );
}
