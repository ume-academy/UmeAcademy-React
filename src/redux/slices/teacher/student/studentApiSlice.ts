import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const studentApiSlice = createApi({
  reducerPath: 'studentApi',
  baseQuery: baseUrl,
  tagTypes: ['student'],
  endpoints: (builder) => ({
    getStudentsOfCourse: builder.query({
      query: ({ id, per_page, page }) => `/teacher/course/${id}/students?per_page=${per_page}&page=${page}`
    })
  })
})

export const {useGetStudentsOfCourseQuery} = studentApiSlice