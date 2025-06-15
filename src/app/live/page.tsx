'use client';

import { isEmpty } from 'lodash';
import { Loader2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import PrivateLayout from '@/layouts/private';

import { AttendeesTable } from './components/attendees-table';
import { SessionInfo } from './components/session-info';
import { SessionStatsCards } from './components/session-stats';
import { useAttendanceWebSocket } from './hooks/use-attendance-websocket';
import { useGetCurrentSessionsQuery } from './queries';

const PROF_ID = 1;

export default function LiveSessionPage() {
  const { data: sessions, isLoading } = useGetCurrentSessionsQuery({ profId: PROF_ID });

  useAttendanceWebSocket();

  return (
    <PrivateLayout title="Live Session">
      <div className="px-6 py-6">
        {isLoading ? (
          <div className="space-y-10">
            <Skeleton className="h-[130px] w-full" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-[250px]" />
              <Skeleton className="h-[450px] w-full rounded-md" />
            </div>
          </div>
        ) : !isEmpty(sessions) && sessions?.[0] ? (
          <div className="space-y-8">
            <SessionInfo session={sessions[0]} />
            <SessionStatsCards stats={sessions[0].attendance_stats} />
            <AttendeesTable data={sessions[0].attendances} />
          </div>
        ) : (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg py-12">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-bold">No Active Session</h2>
              <p className="max-w-md text-muted-foreground">
                There are no active sessions at the moment. Please check back later or start a new
                session.
              </p>
            </div>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}
