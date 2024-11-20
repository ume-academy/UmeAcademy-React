
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseUrl = fetchBaseQuery({
    baseUrl: 'https://umeacademy.me/api/v1',
    prepareHeaders(headers) {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
})