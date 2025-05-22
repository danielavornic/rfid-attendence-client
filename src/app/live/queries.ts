import { reduxAPI } from '@/lib/store/api/root';

import { Attendee, Session } from './types';

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
    updateAttendanceStatus: builder.mutation<Attendee, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/attendances/${id}`,
        method: 'PUT',
        body: { status, time: new Date().toISOString() },
      }),
      invalidatesTags: ['SESSION', 'LIVE_SESSION'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCurrentSessionQuery,
  useGetSessionByIdQuery,
  useUpdateAttendanceStatusMutation,
} = liveSessionApi;
