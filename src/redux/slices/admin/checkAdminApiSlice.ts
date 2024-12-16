import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const checkAdminApiSlice = createApi({
  reducerPath: 'checkAdminApi',
  baseQuery: baseUrl,
  tagTypes: ['CheckAdmin'],
  endpoints: (builder) => ({
    checkAdmin: builder.query({
      query: () => ({
        url: '/admin/check',
        method: 'POST'
      }),
      providesTags: ['CheckAdmin']
    })
  })
})

export const { useCheckAdminQuery } = checkAdminApiSlice
