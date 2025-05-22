'use client';

import { Loader2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import PrivateLayout from '@/layouts/private';

import { AttendeesTable } from './components/attendees-table';
import { SessionInfo } from './components/session-info';
import { useGetSessionByIdQuery } from './queries';

export default function LiveSessionPage() {
  // const { data: session, isLoading } = useGetCurrentSessionQuery();
  const { data: session, isLoading: isLoading } = useGetSessionByIdQuery(6);

  // const [session, setSession] = useState<Session | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadSession = async () => {
  //     try {
  //       const data = await fetchCurrentSession();
  //       setSession(data);
  //     } catch (error) {
  //       console.error('Failed to fetch session data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadSession();
  // }, []);

  return (
    <PrivateLayout title="Live Session">
      <div className="container px-6 py-6">
        {isLoading ? (
          <div className="space-y-10">
            <Skeleton className="h-[130px] w-full" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-[250px]" />
              <Skeleton className="h-[450px] w-full rounded-md" />
            </div>
          </div>
        ) : session ? (
          <div className="space-y-8">
            <SessionInfo session={session} />
            {/* <SessionStatsCards stats={session.stats} /> */}
            <AttendeesTable data={session.attendances} />
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
