import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryUrl =
  process.env.NEXT_PUBLIC_API_URL || 'https://presence-checker.onrender.com/api';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: (headers) => {
    // TODO: add auth token here
    return headers;
  },
});
