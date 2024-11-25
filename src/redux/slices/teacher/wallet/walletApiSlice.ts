import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const walletApiSlice = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseUrl,
  tagTypes: ['wallet'],
  endpoints: (builder) => ({
    walletBalance: builder.query({
      query: () => '/teacher/wallet-balance',
      transformResponse: (res: { data: number }) => res.data
    }),
    transactionHistory: builder.query({
      query: ({ per_page, page }) => `/teacher/wallet-transaction?per_page=${per_page}&page=${page}`
    })
  })
})
export const { useWalletBalanceQuery, useTransactionHistoryQuery } = walletApiSlice
