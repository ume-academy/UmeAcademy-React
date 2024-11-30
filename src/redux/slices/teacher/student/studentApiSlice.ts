import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const studentApiSlice = createApi({
  reducerPath: 'studentApi',
  baseQuery: baseUrl,
  tagTypes: ['student'],
  endpoints: (builder) => ({
    getStudentsOfCourse: builder.query({
      query: ({ id, page }) => `/teacher/course/${id}/students?page=${page}`
    })
  })
})

export const { useGetStudentsOfCourseQuery } = studentApiSlice
