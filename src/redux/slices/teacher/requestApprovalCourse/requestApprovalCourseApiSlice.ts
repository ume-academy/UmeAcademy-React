import { customBaseQuery } from '@/Api';
import { createApi } from '@reduxjs/toolkit/query/react';


export const requestApprovalCourseApiSlice = createApi({
  reducerPath: 'requestApprovalCourseApi',
  baseQuery: customBaseQuery,
  tagTypes: ['requestApprovalCourse'],
  endpoints: (builder) => ({
    requestApprovalCourse: builder.mutation<any, number>({
      query: (id) => ({
        url: `/teacher/course/${id}/course-approval-request`,
        method: 'POST',
      })
    })    
  })
})

export const { useRequestApprovalCourseMutation } = requestApprovalCourseApiSlice