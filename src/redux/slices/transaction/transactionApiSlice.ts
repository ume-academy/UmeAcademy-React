import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const transactionApiSlice = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseUrl,
  tagTypes: ['transaction'],
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: ({ per_page, status, page }) => `/admin/transactions?per_page=${per_page}&status=${status}&page=${page}`
    })
  })
})

export const { useGetAllTransactionQuery } = transactionApiSlice
