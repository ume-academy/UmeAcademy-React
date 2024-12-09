import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const walletHistoryApiSlice = createApi({
  reducerPath: "walletHistoryApi",
  baseQuery: baseUrl,
  tagTypes: ["WalletHistory"],
  endpoints: (builder) => ({

    //! LẤY SỐ DƯ TRONG VÍ
    getWalletBalance: builder.query({
      query: () => "/wallet-balance",
      providesTags: ["WalletHistory"],
    }),

    //! GET WALLET HISTORIES 
    getWalletHistories: builder.query({
      query: () => `/wallet-transaction`,
      providesTags: ["WalletHistory"],
    })
  }),
})

export const { useGetWalletBalanceQuery, useGetWalletHistoriesQuery } = walletHistoryApiSlice;