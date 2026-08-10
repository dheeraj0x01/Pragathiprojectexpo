import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Users, IndianRupee, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EventItem } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface EventCardProps {
  event: EventItem;
  onRegisterClick?: (event: EventItem) => void;
  onManageClick?: (event: EventItem) => void;
  isDashboard?: boolean;
}

export function EventCard({ event, onRegisterClick, onManageClick, isDashboard = false }: EventCardProps) {
  const getCategoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case 'TECHNICAL': return 'primary';
      case 'CULTURAL': return 'purple';
      case 'SPORTS': return 'warning';
      case 'WORKSHOP': return 'info';
      default: return 'slate';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'REGISTRATION_OPEN': return 'success';
      case 'PUBLISHED': return 'info';
      case 'COMPLETED': return 'slate';
      default: return 'warning';
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden p-0 group border border-slate-200/80 dark:border-slate-800 hover:border-sru-blue/40 transition-all duration-300">
      {/* Banner Image */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-950">
        <img
          src={event.bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getCategoryBadgeVariant(event.category)}>
            {event.category}
          </Badge>
          <Badge variant={getStatusBadgeVariant(event.status)}>
            {event.status.replace(/_/g, ' ')}
          </Badge>
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-sru-blue dark:text-blue-400">
          {event.registrationFee > 0 ? formatCurrency(event.registrationFee) : 'FREE ENTRY'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-sru-blue transition-colors">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-sru-blue" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-sru-blue" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-sru-blue" />
            <span>Team Size: {event.minTeamSize === 1 && event.maxTeamSize === 1 ? 'Solo / Individual' : `${event.minTeamSize}-${event.maxTeamSize} Members`}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isDashboard ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => onManageClick && onManageClick(event)}
            >
              <span>Manage Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => onRegisterClick && onRegisterClick(event)}
              disabled={event.status !== 'REGISTRATION_OPEN'}
            >
              <span>{event.status === 'REGISTRATION_OPEN' ? 'Register Now' : 'Registration Closed'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
