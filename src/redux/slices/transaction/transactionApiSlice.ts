import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const transactionApiSlice = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseUrl,
  tagTypes: ['transaction'],
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: ({ per_page,page }) => `/admin/transactions?per_page=${per_page}&page=${page}`
    })
  })
})

export const {useGetAllTransactionQuery} = transactionApiSlice