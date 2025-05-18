'use client';

import { format } from 'date-fns';
import { CalendarClock, Clock, MapPin } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { Session } from '../types';

interface SessionInfoProps {
  session: Session;
}

export function SessionInfo({ session }: SessionInfoProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{session.name}</h1>
            <p className="text-muted-foreground">{session.courseCode}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 md:mt-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              <span>{format(new Date(session.date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {session.startTime} - {session.endTime}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{session.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
