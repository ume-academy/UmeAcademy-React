import { customBaseQuery } from "@/Api";
import { createApi } from '@reduxjs/toolkit/query/react'

export const walletApiSlice = createApi({
  reducerPath: 'walletApi',
  baseQuery: customBaseQuery,
  tagTypes: ['wallet'],
  endpoints: (builder) => ({
    walletBalance: builder.query({
      query: () => '/teacher/wallet-balance',
      transformResponse: (res: { data: number }) => res.data
    }),
    transactionHistory: builder.query({
      query: ({ page }) => `/teacher/wallet-transaction?page=${page}`
    })
  })
})
export const { useWalletBalanceQuery, useTransactionHistoryQuery } = walletApiSlice
