'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, CalendarDays } from 'lucide-react';
import { EventCard } from '@/components/events/EventCard';
import { CreateEventModal } from '@/components/events/CreateEventModal';
import { Button } from '@/components/ui/Button';
import { EventItem } from '@/types';

export default function EventManagementPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = () => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchesCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Fest Event Management
          </h1>
          <p className="text-xs text-slate-500">
            Create, update, toggle registration status, and manage event schedules across SRU Pragathi 2026.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sru-blue"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['ALL', 'TECHNICAL', 'CULTURAL', 'SPORTS', 'WORKSHOP', 'EXPO'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sru-blue text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading events directory...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          No events found matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} isDashboard={true} />
          ))}
        </div>
      )}

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => fetchEvents()}
      />
    </div>
  );
}
