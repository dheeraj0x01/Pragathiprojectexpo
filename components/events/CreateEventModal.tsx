'use client';

import React, { useState } from 'react';
import { X, Calendar, MapPin, Layers, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCategory, EventStatus } from '@/types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEvent: any) => void;
}

export function CreateEventModal({ isOpen, onClose, onSuccess }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'TECHNICAL' as EventCategory,
    status: 'REGISTRATION_OPEN' as EventStatus,
    description: '',
    venue: 'SRU Campus Auditorium',
    eventDate: new Date(Date.now() + 86400000 * 5).toISOString().substring(0, 16),
    maxParticipants: 100,
    registrationFee: 0,
    minTeamSize: 1,
    maxTeamSize: 4,
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.data);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Pragathi Event</h2>
            <p className="text-xs text-slate-500">Add technical, cultural, sports or workshop events</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Event Title</label>
            <input
              type="text"
              required
              placeholder="e.g. SRU RoboWars 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              >
                <option value="TECHNICAL">TECHNICAL</option>
                <option value="CULTURAL">CULTURAL</option>
                <option value="SPORTS">SPORTS</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="EXPO">EXPO</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Registration Fee (₹)</label>
              <input
                type="number"
                value={formData.registrationFee}
                onChange={(e) => setFormData({ ...formData, registrationFee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe event rules, guidelines, eligibility..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Event Date & Time</label>
              <input
                type="datetime-local"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Min Team Size</label>
              <input
                type="number"
                min={1}
                value={formData.minTeamSize}
                onChange={(e) => setFormData({ ...formData, minTeamSize: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Max Team Size</label>
              <input
                type="number"
                min={1}
                value={formData.maxTeamSize}
                onChange={(e) => setFormData({ ...formData, maxTeamSize: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sru-blue"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Save & Publish Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
