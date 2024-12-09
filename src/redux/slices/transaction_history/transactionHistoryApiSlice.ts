import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const transactionHistoryApiSlice = createApi({
  reducerPath: "transactionHistoryApi",
  baseQuery: baseUrl,
  tagTypes: ["TransactionHistory"],
  endpoints: (builder) => ({
    getTransactionHistories: builder.query({
      query: (page: string | number) => `/transaction-history?page=${page}`,
      providesTags: ["TransactionHistory"],
    })
  })
});

export const { useGetTransactionHistoriesQuery } = transactionHistoryApiSlice;