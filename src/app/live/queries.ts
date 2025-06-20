import { reduxAPI } from '@/lib/store/api/root';

import { Attendee, Session, SessionStats } from './types';

export const liveSessionApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSessions: builder.query<Session[], { profId: number }>({
      query: ({ profId }) => ({
        url: `/sessions/current/${profId}`,
        method: 'GET',
      }),
      providesTags: ['LIVE_SESSION'],
    }),
    getSessionById: builder.query<Session, number>({
      query: (id) => ({
        url: `/sessions/${id}`,
        method: 'GET',
      }),
      providesTags: ['SESSION'],
    }),
    getSessionStats: builder.query<SessionStats, number>({
      query: (id) => ({
        url: `/attendances/session/${id}/stats`,
        method: 'GET',
      }),
      providesTags: ['SESSION_STATS'],
    }),
    updateAttendanceStatus: builder.mutation<Attendee, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/attendances/${id}`,
        method: 'PUT',
        body: { status, time: new Date().toISOString() },
      }),
      invalidatesTags: ['SESSION', 'LIVE_SESSION', 'SESSION_STATS'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCurrentSessionsQuery,
  useGetSessionByIdQuery,
  useUpdateAttendanceStatusMutation,
  useGetSessionStatsQuery,
} = liveSessionApi;
