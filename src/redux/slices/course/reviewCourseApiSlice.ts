import { customBaseQuery } from '@/Api'
import { TReviewCourse } from '@/interfaces/TReviewCourse'
import { createApi } from '@reduxjs/toolkit/query/react'

export const reviewCourseApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviewsCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/reviews`,
      providesTags: ['Review']
    }),

    getOverviewCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/overview`,
      providesTags: ['Review']
    }),
    sendReviewCourse: builder.mutation<TReviewCourse, { id: number; content: string; rating: number }>({
      query: (data) => ({
        url: `/course/${data.id}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags:['Review']
    })
  })
})
export const { useGetOverviewCourseByIdQuery, useGetReviewsCourseByIdQuery, useSendReviewCourseMutation } = reviewCourseApiSlice
