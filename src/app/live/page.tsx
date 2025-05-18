'use client';

import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import PrivateLayout from '@/layouts/private';

import { fetchCurrentSession } from './api/mock-data';
import { AttendeesTable } from './components/attendees-table';
import { SessionInfo } from './components/session-info';
import { SessionStatsCards } from './components/session-stats';
import { Session } from './types';

export default function LiveSessionPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const data = await fetchCurrentSession();
        setSession(data);
      } catch (error) {
        console.error('Failed to fetch session data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  return (
    <PrivateLayout title="Live Session">
      <div className="container py-6">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-[100px] w-full" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full" />
              ))}
            </div>
            <Skeleton className="h-[500px] w-full" />
          </div>
        ) : session ? (
          <>
            <SessionInfo session={session} />
            <div className="mb-6">
              <SessionStatsCards stats={session.stats} />
            </div>
            <AttendeesTable data={session.attendees} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold">No Active Session</h2>
            <p className="text-muted-foreground">There are no active sessions at the moment.</p>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}
