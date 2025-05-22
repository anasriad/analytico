import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
})
export const apiSlice = createApi({
    baseQuery: BaseQuery,
    endpoints: () => ({})
})