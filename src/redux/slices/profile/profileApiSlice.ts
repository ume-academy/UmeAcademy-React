import { createApi } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/Api'
import { TUser } from '@/interfaces/TUser'

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseUrl,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<TUser, void>({
      query: () => ({
        url: '/auth/me',
        method: 'POST'
      }),
      providesTags: ['Profile'],
      transformResponse: (res: { data: TUser }) => res.data
    }),
    editProfile: builder.mutation<TUser, any>({
      query: (formData) => ({
        url: `/profile`,
        method: 'PUT',
        body:formData,
      })
    })
  })
})

export const { useGetProfileQuery, useEditProfileMutation } = profileApiSlice
