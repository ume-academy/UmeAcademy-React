import { customBaseQuery } from '@/Api'
import { TChart, TRevenue } from '@/interfaces/TRevenue'
import { createApi } from '@reduxjs/toolkit/query/react'

export const revenueApiSlice = createApi({
  reducerPath: 'revenueApi',
  baseQuery: customBaseQuery,
  tagTypes: ['revenue'],
  endpoints: (builder) => ({
    getStatistic: builder.query({
      query: () => '/teacher/statistic',
      transformResponse: (res: { data: TRevenue }) => res.data
    }),

    filterRevenue: builder.query({
      query: ({ start_date, end_date }) => `/teacher/revenue?start_date=${start_date}&end_date=${end_date}`
    })
  })
})

export const { useGetStatisticQuery, useFilterRevenueQuery } = revenueApiSlice
