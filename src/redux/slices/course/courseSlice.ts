import { baseUrl } from '@/Api'
import { TCourse } from '@/interfaces/TCourse'
import { createApi } from '@reduxjs/toolkit/query/react'

export const courseSlice = createApi({
  reducerPath: 'courseDetailApi',
  baseQuery: baseUrl,
  tagTypes: ['CourseDetail'],
  endpoints: (builder) => ({
    //! GET INFO COURSE BY ID
    getInfoCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/information`,
      providesTags: ['CourseDetail'],
      transformResponse: (res: { data: TCourse }) => res.data
    }),

    // ! GET CONTENT COURSE BY ID
    getContentCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/content`
    }),

    // ! GET REVIEWS COURSE BY ID
    getReviewsCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/reviews`,
      providesTags: ['CourseDetail']
    }),

    // ! GET OVERVIEW COURSE BY ID
    getOverviewCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/overview`,
      providesTags: ['CourseDetail']
    }),

    // ! Get purchased courses
    getPurchasedCourses: builder.query({
      query: ({per_page, page}) => `/purchased-courses?per_page=${per_page}&page=${page}`,
      
    })
  })
})

export const {
  useGetInfoCourseByIdQuery,
  useGetContentCourseByIdQuery,
  useGetReviewsCourseByIdQuery,
  useGetOverviewCourseByIdQuery,
  useGetPurchasedCoursesQuery
} = courseSlice
