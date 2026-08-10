import React from 'react';
import Link from 'next/link';
import { PRAGATHI_CONFIG } from '@/lib/config';
import { MapPin, Mail, Phone, ExternalLink, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & University Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sru-blue text-white flex items-center justify-center font-extrabold text-xl">
                sru
              </div>
              <div>
                <h3 className="font-black text-lg text-white tracking-tight">SR UNIVERSITY</h3>
                <p className="text-xs text-blue-400 font-semibold">PRAGATHI 2K26 PROJECT EXPO</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {PRAGATHI_CONFIG.tagline} — SR University's flagship national innovation championship bringing together top student developers, engineering talent, and industry leaders.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://sru.edu.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>sru.edu.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Expo Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About PRAGATHI 2K26</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Innovation Categories</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Event Timeline & Schedule</a></li>
              <li><a href="#venue" className="hover:text-white transition-colors">Venue & Location Guide</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Helpdesk & Contact</a></li>
            </ul>
          </div>

          {/* Major Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Expo Tracks</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>AI, ML & Software Systems</li>
              <li>Robotics & Autonomous IoT</li>
              <li>Clean Tech & Renewable Mobility</li>
              <li>Biotech & Digital Healthcare</li>
              <li>Smart Cities & Precision Agritech</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Venue & Contact</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sru-blue shrink-0 mt-0.5" />
                <span>{PRAGATHI_CONFIG.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sru-blue shrink-0" />
                <a href={`mailto:${PRAGATHI_CONFIG.supportEmail}`} className="hover:text-white transition-colors">
                  {PRAGATHI_CONFIG.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sru-blue shrink-0" />
                <span>{PRAGATHI_CONFIG.helplinePhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SR University, Warangal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by SR University Innovation Exchange (SRiX)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
