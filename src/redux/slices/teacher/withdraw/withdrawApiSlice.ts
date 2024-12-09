import { baseUrl } from '@/Api'
import { TInfoWithdraw } from '@/interfaces/TInfoWithdraw'
import { createApi } from '@reduxjs/toolkit/query/react'

export const withdrawApiSlice = createApi({
  reducerPath: 'withdrawApi',
  baseQuery: baseUrl,
  tagTypes: ['withdraw'],
  endpoints: (builder) => ({
    getWithdrawHistories: builder.query({
      query: ({ page }) => `/teacher/withdraw-histories?page=${page}`
    }),
    getAllBank: builder.query({
      query: () => '/banks',
      transformResponse: (res: { data: [] }) => res?.data
    }),
    getInfoWithdraw: builder.query({
      query: () => '/teacher/withdraw-method',
      transformResponse: (res: { data: TInfoWithdraw }) => res.data,
      providesTags: ['withdraw']
    }),
    addWithdraw: builder.mutation<TInfoWithdraw, TInfoWithdraw>({
      query: (info) => ({
        url: '/teacher/withdraw-method',
        method: 'POST',
        body: info
      }),
      invalidatesTags: ['withdraw']
    }),
    editWithdraw: builder.mutation<TInfoWithdraw, { info: TInfoWithdraw; id: number }>({
      query: ({ info, id }) => ({
        url: `/teacher/withdraw-method/${id}`,
        method: 'PUT',
        body: info
      }),
      invalidatesTags: ['withdraw']
    }),

    //ADMIN
    getAllWithdrawRequest: builder.query({
      query: ({ per_page, page }) => `/admin/withdraw-request??per_page=${per_page}&page=${page}`,
      providesTags: ['withdraw']
    }),
    updateStatusWithdrawRequest: builder.mutation<TInfoWithdraw, { id: number; status: number }>({
      query: ({ id, status }) => ({
        url: `/admin/withdraw-request/${id}`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['withdraw']
    })
  })
})

export const {
  useGetAllBankQuery,
  useGetInfoWithdrawQuery,
  useAddWithdrawMutation,
  useEditWithdrawMutation,
  useGetAllWithdrawRequestQuery,
  useUpdateStatusWithdrawRequestMutation,
  useGetWithdrawHistoriesQuery
} = withdrawApiSlice
