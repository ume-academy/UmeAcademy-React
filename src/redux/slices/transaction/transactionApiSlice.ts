import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const transactionApiSlice = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseUrl,
  tagTypes: ['transaction'],
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: ({ page }) => `/admin/transactions?page=${page}`
    })
  })
})

export const {useGetAllTransactionQuery} = transactionApiSlice