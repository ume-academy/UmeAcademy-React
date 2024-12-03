import { customBaseQuery } from "@/Api";
import { THistoryWallet } from "@/interfaces/THistoryWallet";
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
    }),

     //! GET HISTORIES WALLET BY USER ID 
     getHistoriesWalletByUserId: builder.query({
      query: (userId: any) => `/admin/student/${userId}/wallet-transactions`,
      providesTags: ["wallet"],
    }),

    //! GET HISTORIES WALLET BY TEACHER ID
    getHistoriesWalletByTeacherId: builder.query({
      query: (teacherId: string) => `/admin/teacher/${teacherId}/wallet-transactions`,
      providesTags: ["wallet"],
    }), 
  })
})
export const { 
  useWalletBalanceQuery, 
  useTransactionHistoryQuery, 
  useGetHistoriesWalletByTeacherIdQuery, 
  useGetHistoriesWalletByUserIdQuery 
} = walletApiSlice
