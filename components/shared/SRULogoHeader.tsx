import React from 'react';
import Link from 'next/link';

export function SRULogoHeader() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Official SRU Logo Card with SRU Colors */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-sru-blue text-white shadow-md transition-transform group-hover:scale-105 overflow-hidden">
        <span className="font-extrabold text-xl tracking-tighter lowercase">sru</span>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-black text-base text-slate-900 dark:text-white tracking-tight group-hover:text-sru-blue transition-colors">
            SR UNIVERSITY
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sru-blue text-white uppercase tracking-wider">
            EXPO 2K26
          </span>
        </div>
        <span className="text-xs font-semibold text-sru-blue dark:text-blue-400">
          PRAGATHI 2K26 • Warangal
        </span>
      </div>
    </Link>
  );
}

export function PragathiBanner() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden sru-gradient-bg p-8 text-white shadow-2xl mb-10 border border-white/10">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wider uppercase border border-white/20">
            <span>✨ SR University National Level Project Expo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            PRAGATHI 2K26
          </h1>
          <p className="text-lg sm:text-xl font-medium text-blue-100 italic">
            "Where Innovation Meets Impact"
          </p>
          <p className="text-sm text-blue-100/90 font-normal leading-relaxed">
            The premier platform for student innovators, researchers, and tech pioneers to present engineering solutions, prototype models, and compete for national recognition & seed grants.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center lg:text-right">
            <span className="block text-xs text-blue-200 uppercase font-semibold">Expo Dates</span>
            <span className="text-base font-bold text-white">March 27 - 28, 2026</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center lg:text-right">
            <span className="block text-xs text-blue-200 uppercase font-semibold">Location</span>
            <span className="text-base font-bold text-white">SR University, Warangal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
