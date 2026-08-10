'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Ticket, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SRULogoHeader } from '@/components/shared/SRULogoHeader';

interface PublicNavbarProps {
  onRegisterClick?: () => void;
}

export function PublicNavbar({ onRegisterClick }: PublicNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Categories', href: '#categories' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Venue', href: '#venue' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & College Title */}
        <SRULogoHeader />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sru-blue dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/my-passes"
            className="flex items-center gap-2 text-xs font-bold text-sru-blue hover:text-sru-darkBlue px-3.5 py-2 rounded-xl bg-sru-sky dark:bg-slate-800 border border-sru-blue/20 hover:border-sru-blue/40 transition-all"
          >
            <Ticket className="w-4 h-4 text-sru-blue" />
            <span>My Pass Wallet</span>
          </Link>

          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 text-xs font-bold text-white px-5 py-2.5 rounded-xl sru-gradient-bg shadow-md hover:shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Register Now</span>
          </button>
        </div>

        {/* Mobile Menu Trigger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onRegisterClick}
            className="sm:hidden text-xs font-bold text-white px-3 py-1.5 rounded-lg sru-gradient-bg shadow-sm"
          >
            Register
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-sru-sky dark:hover:bg-slate-800 hover:text-sru-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <Link
              href="/my-passes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-xs font-bold text-sru-blue px-4 py-2.5 rounded-xl bg-sru-sky dark:bg-slate-800 border border-sru-blue/20"
            >
              <Ticket className="w-4 h-4" />
              <span>My Pass Wallet</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onRegisterClick) onRegisterClick();
              }}
              className="flex items-center justify-center gap-2 text-xs font-bold text-white px-5 py-3 rounded-xl sru-gradient-bg shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register Project Team</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
