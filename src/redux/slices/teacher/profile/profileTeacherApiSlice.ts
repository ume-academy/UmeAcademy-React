import { baseUrl } from '@/Api'
import { TProfileTeacher } from '@/interfaces/TUser'
import { createApi } from '@reduxjs/toolkit/query/react'

export const profileTeacherApiSlice = createApi({
  reducerPath: 'profileTeacherApi',
  baseQuery: baseUrl,
  tagTypes: ['profileTeacher'],
  endpoints: (builder) => ({
    getInfoProfile: builder.query({
      query: () => `/teacher/profile`,
      providesTags: ['profileTeacher'],
      transformResponse: (res: { data: TProfileTeacher }) => res.data
    }),

    teacherInfoCourse: builder.query({
      query: ({ id }) => `/teacher/${id}`
    }),

    updateProfile: builder.mutation<TProfileTeacher, TProfileTeacher>({
      query: (body) => ({
        url: `/teacher/profile`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['profileTeacher']
    })
  })
})

export const { useGetInfoProfileQuery, useTeacherInfoCourseQuery, useUpdateProfileMutation } = profileTeacherApiSlice
