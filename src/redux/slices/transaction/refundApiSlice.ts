import { baseUrl } from '@/Api';
import { TRefund } from '@/interfaces/TRefund';
import { createApi } from '@reduxjs/toolkit/query/react';

export const refundApiSlice = createApi({
  reducerPath: 'refundApi',
  baseQuery: baseUrl,
  tagTypes: ['refund'],
  endpoints: (builder) => ({
    getAllRefundRequest: builder.query({
      query: ({per_page, page }) => `/admin/refund-request?per_page=${per_page}&page${page}`,
      providesTags: ['refund']
    }),

    updateStatusRefundRequest: builder.mutation<TRefund, { transactionCode: string; status: number}>({
      query: (body) => ({
        url: `/admin/refund/${body.transactionCode}/review`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['refund']
    }),

    //! CREATE REFUND REQUEST
    createRefundRequest: builder.mutation({
      query: (dataForm) => ({
        url: `/refund/${dataForm.transactionCode}`,
        method: 'POST',
        body: dataForm
      }),
      invalidatesTags: ['refund']
    })
  })
})

export const { 
  useGetAllRefundRequestQuery, 
  useUpdateStatusRefundRequestMutation,
  useCreateRefundRequestMutation
} = refundApiSlice
