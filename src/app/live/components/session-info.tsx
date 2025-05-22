'use client';

import { addHours, format } from 'date-fns';
import { CalendarClock, Clock, MapPin, Radio } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { Session } from '../types';

interface SessionInfoProps {
  session: Session;
}

export function SessionInfo({ session }: SessionInfoProps) {
  const startThreeHoursLater = addHours(new Date(session.start_time), 3);
  const endThreeHoursLater = addHours(new Date(session.end_time), 3);

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
                <Radio className="mr-1 h-3 w-3" /> Live
              </Badge>
              {/* <Badge variant="outline-primary">#{session.course.course_id}</Badge> */}
            </div>
            <h1 className="text-2xl font-bold text-foreground">{session.course.name}</h1>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 md:mt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <CalendarClock className="h-4 w-4 text-primary" />
              <span>{format(new Date(session.date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>
                {format(new Date(startThreeHoursLater), 'HH:mm')} -{' '}
                {format(new Date(endThreeHoursLater), 'HH:mm')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{session.room}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
