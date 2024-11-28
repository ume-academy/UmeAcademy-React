import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from "@/Api";
import { TUser } from '@/interfaces/TUser'

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<TUser, void>({
      query: () => ({
        url: '/auth/me',
        method: 'POST'
      }),
      providesTags: ['Profile'],
      transformResponse: (res: { data: TUser }) => res.data
    })
  })
})

export const { useGetProfileQuery } = profileApiSlice
