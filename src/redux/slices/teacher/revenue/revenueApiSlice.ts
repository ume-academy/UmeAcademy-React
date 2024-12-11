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
    
    filterRevenue: builder.mutation<any, { start_date: string; end_date: string }>({
      query: ({ start_date, end_date }) => {
        if (!start_date && end_date) {
          return {
            url: `/teacher/revenue`,
            method: 'POST'
          }
        }
        const params: Record<string, string> = {}
        if (start_date) {
          params.start_date = start_date
        }
        if (end_date) {
          params.end_date = end_date
        }
        return {
          url: `/teacher/revenue`,
          method: 'POST',
          body: params
        }
      }
    })
  })
})

export const { useGetStatisticQuery, useFilterRevenueMutation } = revenueApiSlice
