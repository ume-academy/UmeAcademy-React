import { baseUrl } from '@/Api'
import { TRefund } from '@/interfaces/TRefund'
import { createApi } from '@reduxjs/toolkit/query/react'

export const refundApiSlice = createApi({
  reducerPath: 'refundApi',
  baseQuery: baseUrl,
  tagTypes: ['refund'],
  endpoints: (builder) => ({
    getAllRefundRequest: builder.query({
      query: ({ page }) => `/admin/refund-request?page${page}`,
      providesTags: ['refund']
    }),
    updateStatusRefundRequest: builder.mutation<TRefund, { id: number; status: number }>({
      query: ({ id, status }) => ({
        url: `/admin/refund-request/${id}`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['refund']
    })
  })
})

export const { useGetAllRefundRequestQuery, useUpdateStatusRefundRequestMutation } = refundApiSlice
