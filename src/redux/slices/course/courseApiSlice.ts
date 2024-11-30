import { customBaseQuery } from '@/Api'
import { TCourse } from '@/interfaces/TCourse'
import { TCourseDetail } from '@/interfaces/TCourseDetail'
import { createApi } from '@reduxjs/toolkit/query/react'

export const courseApiSlice = createApi({
  reducerPath: 'courseApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    //! GET INFO COURSE BY ID
    getInfoCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/information`,
      providesTags: ['Course'],
      transformResponse: (res: { data: TCourse }) => res.data
    }),

    // ! GET CONTENT COURSE BY ID
    getContentCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/content`
    }),

    // ! GET REVIEWS COURSE BY ID
    getReviewsCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/reviews`,
      providesTags: ['Course']
    }),

    // ! GET OVERVIEW COURSE BY ID
    getOverviewCourseById: builder.query({
      query: (courseId) => `/course/${courseId}/overview`,
      providesTags: ['Course']
    }),

    // ! Get purchased courses
    getPurchasedCourses: builder.query({
      query: ({ per_page, page }) => `/purchased-courses?per_page=${per_page}&page=${page}`
    }),

    // GET ALL
    getAllCourseAdmin: builder.query({
      query: ({ per_page, page }) => `/admin/courses?per_page=${per_page}&page=${page}`,
      // transformResponse: (res: { data: TCourse }) => res.data
      providesTags: ['Course']
    }),

    //Admin
    //Phê duyệt
    approvalCourse: builder.mutation<number, any>({
      query: ({ id, status }) => ({
        url: `/admin/course/${id}/approval`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: ['Course']
    }),
    getCourseAdminById: builder.query({
      query: (id) => `/admin/course/${id}`,
      transformResponse: (res: { data: TCourseDetail }) => res.data
    }),

    //Teacher
    getAllCourseOfTeacher: builder.query({
      query: ({ per_page, page }) => `teacher/courses?per_page=${per_page}&page=${page}`
    })
  })
})

export const {
  useGetInfoCourseByIdQuery,
  useGetContentCourseByIdQuery,
  useGetReviewsCourseByIdQuery,
  useGetOverviewCourseByIdQuery,
  useGetPurchasedCoursesQuery,
  useGetAllCourseAdminQuery,
  useApprovalCourseMutation,
  useGetCourseAdminByIdQuery,
  useGetAllCourseOfTeacherQuery
} = courseApiSlice
