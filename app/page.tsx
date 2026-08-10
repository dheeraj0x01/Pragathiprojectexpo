'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Calendar, MapPin, Users, Ticket, ArrowRight, ShieldCheck, CheckCircle2, 
  Cpu, Bot, Zap, HeartPulse, Building2, Lightbulb, Trophy, Network, Rocket, 
  Phone, Mail, Globe, Clock, ChevronRight
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';
import { RegistrationModal } from '@/components/registration/RegistrationModal';
import { PRAGATHI_CONFIG } from '@/lib/config';
import { EventItem } from '@/types';
import { DEFAULT_CURRENT_USER } from '@/lib/auth';
import { Button } from '@/components/ui/Button';

export default function PublicLandingPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);
  const [registeredSuccessTicket, setRegisteredSuccessTicket] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredEvents = selectedCategory === 'ALL'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-sru-blue" />;
      case 'Bot': return <Bot className="w-6 h-6 text-sru-blue" />;
      case 'Zap': return <Zap className="w-6 h-6 text-sru-blue" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-sru-blue" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-sru-blue" />;
      default: return <Lightbulb className="w-6 h-6 text-sru-blue" />;
    }
  };

  const openGeneralRegistration = () => {
    const defaultExpoEvent = events.find(e => e.category === 'EXPO') || events[0] || null;
    setRegisteringEvent(defaultExpoEvent);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col scroll-smooth">
      
      {/* 1. Public Navbar */}
      <PublicNavbar onRegisterClick={openGeneralRegistration} />

      {/* 2. Hero Section */}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden sru-gradient-bg text-white">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SR University National Innovation Championship</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-md">
              PRAGATHI 2K26
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-blue-100 italic">
              "{PRAGATHI_CONFIG.tagline}"
            </p>

            <p className="text-sm sm:text-base text-blue-100/90 font-normal leading-relaxed max-w-3xl">
              Join over 1,500 student developers, researchers, and innovators at SR University's premier project exhibition. Present hardware prototypes, software solutions, AI models, and compete for ₹5,00,000+ in prize rewards & startup seed funding.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={openGeneralRegistration}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-sru-blue font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register Now</span>
              </button>

              <a
                href="#categories"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 font-bold text-sm text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Expo Tracks</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Event Summary Strip */}
            <div className="pt-10 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-[11px] text-blue-200 uppercase font-semibold">Date</span>
                <span className="text-sm font-bold">{PRAGATHI_CONFIG.eventDates}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-[11px] text-blue-200 uppercase font-semibold">Venue</span>
                <span className="text-sm font-bold">SR University, Warangal</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-[11px] text-blue-200 uppercase font-semibold">Prize Pool</span>
                <span className="text-sm font-bold">₹5,00,000 Cash</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-[11px] text-blue-200 uppercase font-semibold">Organized By</span>
                <span className="text-sm font-bold">SRiX Incubator</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 w-full">

        {/* Ticket Success Alert if Generated */}
        {registeredSuccessTicket && (
          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <span className="font-extrabold text-base">Registration Successfully Processed!</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your Digital Ticket Pass Code: <strong className="font-mono text-sru-blue">{registeredSuccessTicket.ticketCode}</strong>
                </p>
              </div>
            </div>
            <Link href="/my-passes">
              <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-700 dark:text-emerald-300">
                Open Pass Wallet
              </Button>
            </Link>
          </div>
        )}

        {/* 4. About Section */}
        <section id="about" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sru-sky text-sru-blue text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>About The Expo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Transforming Student Projects into Real-World Impact
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              PRAGATHI 2K26 is the annual flagship innovation and project exhibition organized by SR University, Warangal. It serves as a national nexus for aspiring engineers, researchers, and inventors to demonstrate technology-driven prototypes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <Lightbulb className="w-6 h-6 text-sru-blue" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Prototype Incubation</h4>
                <p className="text-xs text-slate-500">Selected projects get direct incubation support from SR Innovation Exchange (SRiX).</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <Trophy className="w-6 h-6 text-sru-blue" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">National Recognition</h4>
                <p className="text-xs text-slate-500">Evaluated by senior academic faculty, industry scientists, and venture capital judges.</p>
              </div>
            </div>
          </div>

          {/* Key Stats Counter Grid */}
          <div className="grid grid-cols-2 gap-4">
            {PRAGATHI_CONFIG.stats.map((stat, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2 hover:border-sru-blue/40 transition-all">
                <span className="block text-3xl sm:text-4xl font-black text-sru-blue dark:text-blue-400">{stat.value}</span>
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Innovation Categories Showcase */}
        <section id="categories" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sru-sky text-sru-blue text-xs font-bold uppercase tracking-wider">
              <span>Expo Tracks</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Project Categories & Specializations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Submit your project under one of our five core technological domains:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRAGATHI_CONFIG.categories.map((cat) => (
              <div key={cat.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md hover:border-sru-blue/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sru-sky dark:bg-slate-800">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sru-blue/10 text-sru-blue uppercase">
                    {cat.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{cat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{cat.description}</p>
                </div>
                <button
                  onClick={openGeneralRegistration}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sru-blue hover:underline"
                >
                  <span>Register in this Track</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Why PRAGATHI */}
        <section className="p-8 sm:p-12 rounded-3xl bg-sru-sky dark:bg-slate-900/60 border border-sru-blue/20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Participate in PRAGATHI 2K26?
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Four key reasons why SR University Project Expo is the ultimate innovation platform</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Rocket className="w-6 h-6 text-sru-blue" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Innovation First</h4>
              <p className="text-xs text-slate-500">Showcase high-impact research, functional hardware prototypes, and code repositories.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Network className="w-6 h-6 text-sru-blue" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Collaboration</h4>
              <p className="text-xs text-slate-500">Connect with peer student developers across South India and network with mentors.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Trophy className="w-6 h-6 text-sru-blue" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Recognition</h4>
              <p className="text-xs text-slate-500">Earn official SR University certificates, trophies, and cash prize grants.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Building2 className="w-6 h-6 text-sru-blue" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real-World Impact</h4>
              <p className="text-xs text-slate-500">Pitch directly to SRiX technology incubators and potential industry investors.</p>
            </div>
          </div>
        </section>

        {/* 7. Schedule & Timeline */}
        <section id="schedule" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Expo Agenda & Timeline</h2>
            <p className="text-xs text-slate-500">March 27 – 28, 2026 • SR University Campus</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PRAGATHI_CONFIG.schedule.map((dayItem, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-extrabold text-base text-sru-blue">{dayItem.day}</h3>
                </div>
                <div className="space-y-3">
                  {dayItem.events.map((evt, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <Clock className="w-4 h-4 text-sru-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-slate-900 dark:text-white">{evt.title}</span>
                        <span className="block text-[11px] text-slate-500">{evt.time} • {evt.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Venue & Location Section */}
        <section id="venue" className="scroll-mt-24 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sru-sky text-sru-blue text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>Expo Venue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              SR University Campus, Warangal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {PRAGATHI_CONFIG.fullAddress}. Located on the Hyderabad-Warangal Highway with modern exhibition pavilions, air-conditioned auditoriums, high-speed Wi-Fi, and dedicated project booth arenas.
            </p>
            <div className="space-y-2 text-xs text-slate-500 pt-2">
              <p>📍 <strong>Nearest Railway Station:</strong> Kazipet Junction (12 km) / Warangal Station (16 km)</p>
              <p>✈️ <strong>Nearest Airport:</strong> Rajiv Gandhi International Airport, Hyderabad (155 km)</p>
            </div>
          </div>

          <div className="h-64 sm:h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center text-center p-6 border border-slate-300 dark:border-slate-700">
            <MapPin className="w-10 h-10 text-sru-blue mb-2 animate-bounce" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">SR University Main Campus</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">Ananthasagar, Hasanparthy, Warangal, Telangana - 506371</p>
            <a
              href="https://maps.google.com/?q=SR+University+Warangal"
              target="_blank"
              rel="noreferrer"
              className="mt-4 px-4 py-2 rounded-xl bg-sru-blue text-white font-bold text-xs hover:bg-sru-darkBlue transition-colors flex items-center gap-1.5"
            >
              <span>Open in Google Maps</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 9. Contact & Support Section */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Helpdesk & Event Coordinators</h2>
            <p className="text-xs text-slate-500">Have questions about registration, booth setup, or guidelines?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRAGATHI_CONFIG.coordinators.map((c, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-sru-sky text-sru-blue flex items-center justify-center font-bold">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{c.name}</h4>
                  <span className="block text-xs font-semibold text-sru-blue">{c.role}</span>
                  <span className="block text-xs text-slate-500">{c.department}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <Phone className="w-3.5 h-3.5 text-sru-blue" />
                  <span>{c.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Final Call to Action */}
        <section className="rounded-3xl sru-gradient-bg p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black">
            Have an idea that can make a difference?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Register your project team today for PRAGATHI 2K26 and showcase your innovation to thousands of attendees, jury experts, and investors.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={openGeneralRegistration}
              className="px-8 py-4 rounded-2xl bg-white text-sru-blue font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register Your Project Team</span>
            </button>
          </div>
        </section>

      </main>

      {/* 11. Public Footer */}
      <Footer />

      {/* 12. Multi-Step Registration & Payment Modal */}
      <RegistrationModal
        isOpen={!!registeringEvent}
        event={registeringEvent}
        currentUser={DEFAULT_CURRENT_USER}
        onClose={() => setRegisteringEvent(null)}
        onSuccess={(reg) => setRegisteredSuccessTicket(reg)}
      />

    </div>
  );
}
