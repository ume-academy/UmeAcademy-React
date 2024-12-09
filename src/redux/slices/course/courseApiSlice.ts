import { customBaseQuery } from '@/Api'
import { TCourse, TEditCourse } from '@/interfaces/TCourse'
import { TCourseDetail } from '@/interfaces/TCourseDetail'
import { TPaymentDetails } from '@/interfaces/TPayment'
import { createApi } from '@reduxjs/toolkit/query/react'
import { get } from 'http'

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

    //! GET ALL COURSES FOR ADMIN
    getAllCourseAdmin: builder.query({
      query: ({ page }) => `/admin/courses?page=${page}`,
      // transformResponse: (res: { data: TCourse }) => res.data
      providesTags: ['Course']
    }),

    //! GET ALL FAVORITE COURSES FOR PER ACCOUNT
    getAllFavoriteCourses: builder.query({
      query: () => `/course/wishlist`,
      providesTags: ["Course"],
    }),

    //! ADD COURSE TO FAVORITE
    addCourseToFavorite: builder.mutation({
      query: (courseId) => ({
        url: `/course/${courseId}/add-wishlist`,
        method: "POST",
        body: courseId,
      }),
      invalidatesTags: ["Course"],
    }),

    //! REMOVE COURSE IN FAVORITE
    removeCourseInFavorite: builder.mutation({
      query: (courseId) => ({
        url: `/course/${courseId}/remove-wishlist`,
        method: "POST",
        body: courseId,
      }),
      invalidatesTags: ["Course"],
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

    // ! GET ALL PURCHASED COURSES BY USER ID
    getAllPurchasedCoursesByUserId: builder.query({
      query: (userId) => `/admin/student/${userId}/purchased-courses`,
      providesTags: ['Course']
    }),

    // ! GET ALL COURSES BY TEACHER ID
    getAllPurchasedCoursesByTeacherId: builder.query({
      query: (teacherId) => `/admin/teacher/${teacherId}/courses`,
      providesTags: ['Course']
    }),

    //Teacher
    getAllCourseOfTeacher: builder.query({
      query: ({ per_page, page }) => `teacher/courses?per_page=${per_page}&page=${page}`,
      providesTags: ['Course']
    }),

    // CREATE COURSE OF TEACHER
    createCourseOfTeacher: builder.mutation<string, { formData: FormData }>({
      query: (data) => ({
        url: '/teacher/courses',
        method: 'POST',
        body: data.formData
      }),
      invalidatesTags: ['Course']
    }),

    // GET COURSE BY ID OF TEACHER
    getCourseByIdOfTeacher: builder.query({
      query: (id) => `/teacher/course/${id}`,
      transformResponse: (res: { data: TCourseDetail }) => res.data,
      providesTags: ['Course']
    }),

    // UPDATE COURSE OF TEACHER
    updateCourseOfteacher: builder.mutation<string, { updateData: FormData }>({
      query: (data) => ({
        url: `/teacher/course/${data.updateData.get('id')}`,
        method: 'POST',
        body: data.updateData
      }),
      invalidatesTags: ['Course']
    }),

    checkOut: builder.mutation<TPaymentDetails,{voucher_id: number;origin_price: number;course_id: number;payment_method_id: number}>({
      query: (body) => ({
        url: '/checkout',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Course']
      // transformResponse: (res: { data: TPaymentDetails }) => res,
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
  useGetAllCourseOfTeacherQuery,
  useCreateCourseOfTeacherMutation,
  useGetAllPurchasedCoursesByUserIdQuery,
  useGetAllPurchasedCoursesByTeacherIdQuery,
  useGetCourseByIdOfTeacherQuery,
  useUpdateCourseOfteacherMutation,
  useCheckOutMutation,
  useGetAllFavoriteCoursesQuery,
  useAddCourseToFavoriteMutation,
  useRemoveCourseInFavoriteMutation
} = courseApiSlice
