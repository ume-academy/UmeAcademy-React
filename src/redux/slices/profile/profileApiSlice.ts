import { createApi } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/Api'
import { TProfile } from '@/interfaces/TUser'

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
      transformResponse: (res: { data: TProfile }) => res.data
    }),

    editProfile: builder.mutation<TProfile, { formData: FormData }>({
      query: (data) => ({
        url: `/profile`,
        method: 'POST',
        body: data.formData
      })
    })
  })
})

export const { useGetProfileQuery, useEditProfileMutation } = profileApiSlice
