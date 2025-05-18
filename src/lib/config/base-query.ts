// export const baseQueryUrl =
//   process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryUrl = '';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: (headers) => {
    // TODO: add auth token here
    return headers;
  },
});
