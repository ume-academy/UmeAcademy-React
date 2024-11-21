import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = fetchBaseQuery({
  baseUrl: 'https://umeacademy.me/api/v1',
  prepareHeaders: (headers) => {

    const token = localStorage.getItem('accessToken');
    console.log('Token:', token);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  }
});
