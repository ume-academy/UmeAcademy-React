import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const commissionRateApiSlice = createApi({
  reducerPath: "commissionRateApi",
  baseQuery: baseUrl,
  tagTypes: ["CommissionRate"],
  endpoints: (builder) => ({
    
    //! GET ONE
    getCommissionRate: builder.query({
      query: (commissionRateId: any) => `/admin/fee/${commissionRateId}`,
      providesTags: ["CommissionRate"], 
    }),

    //! UPDATE
    updateCommissionRate: builder.mutation({
      query: (body) => ({
        url: `/admin/fee/${body.feeId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["CommissionRate"]
    })
  })
})

export const { useGetCommissionRateQuery, useUpdateCommissionRateMutation } = commissionRateApiSlice;