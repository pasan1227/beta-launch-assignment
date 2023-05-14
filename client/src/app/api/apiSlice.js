import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/v1/api`,
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
