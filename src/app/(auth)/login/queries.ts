import { reduxAPI } from '@/lib/store/api/root';

import { LoginRequest, LoginResponse } from './types';

export const authApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query(body) {
        return {
          url: `/api/auth/login`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AUTH'],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authApi;
