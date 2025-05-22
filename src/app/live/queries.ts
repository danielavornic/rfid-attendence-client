import { reduxAPI } from '@/lib/store/api/root';

import { Attendee, Session, SessionStats } from './types';

export const liveSessionApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSession: builder.query<Session[], void>({
      query() {
        return {
          url: `/sessions/current/1`,
          method: 'GET',
        };
      },
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
  useGetCurrentSessionQuery,
  useGetSessionByIdQuery,
  useUpdateAttendanceStatusMutation,
  useGetSessionStatsQuery,
} = liveSessionApi;
