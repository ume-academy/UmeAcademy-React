import { createApi } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/Api'
import { TUser } from '@/interfaces/TUser'

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseUrl,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'POST'
      }),
      providesTags: ['Profile'],
      transformResponse: (res: { data: TUser }) => res.data
    }),
    editProfile: builder.mutation<TUser, TUser>({
      query: (formData) => ({
        url: `/profile`,
        method: 'PUT',
        body: formData
      })
    })
  })
})

export const { useGetProfileQuery, useEditProfileMutation } = profileApiSlice
