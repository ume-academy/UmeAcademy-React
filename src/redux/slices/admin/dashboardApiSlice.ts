import { baseUrl } from '@/Api'
import { TStatistic } from '@/interfaces/TStatistic'
import { createApi } from '@reduxjs/toolkit/query/react'

export const dashboardApiSlice = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseUrl,
  tagTypes: ['dashboard'],
  endpoints: (builder) => ({
    statisticsAll: builder.query({
      query: () => ({
        url: '/admin/statistics '
      }),
      transformResponse: (res: { data: TStatistic }) => res.data,
      providesTags: ['dashboard']
    }),
    revenueStatistic: builder.query({
      query: ({ year }) => ({
        url: `/admin/statistics/revenue?year=${year}`
      }),
      providesTags: ['dashboard']
    }),
    topTeacher: builder.query({
      query: () => ({
        url: '/admin/statistics/top-teachers'
      }),
      providesTags: ['dashboard']
    }),
    topCourse: builder.query({
      query: () => ({
        url: '/admin/statistics/top-courses'
      }),
      providesTags: ['dashboard']
    })
  })
})

export const { useStatisticsAllQuery, useTopTeacherQuery, useTopCourseQuery, useRevenueStatisticQuery } =
  dashboardApiSlice
