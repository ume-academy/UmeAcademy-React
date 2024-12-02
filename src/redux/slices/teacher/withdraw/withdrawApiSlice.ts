import { baseUrl } from '@/Api'
import { TInfoWithdraw } from '@/interfaces/TInfoWithdraw'
import { createApi } from '@reduxjs/toolkit/query/react'

export const withdrawApiSlice = createApi({
  reducerPath: 'withdrawApi',
  baseQuery: baseUrl,
  tagTypes: ['withdraw'],
  endpoints: (builder) => ({
    getAllBank: builder.query({
      query: () => '/banks',
      transformResponse: (res: { data: [] }) => res?.data
    }),
    getInfoWithdraw: builder.query({
      query: () => '/teacher/withdraw-method',
      transformResponse: (res: { data: TInfoWithdraw }) => res.data,
      providesTags: ['withdraw']
    }),
    addWithdraw: builder.mutation<TInfoWithdraw, any>({
      query: ({ info }) => ({
        url: '/teacher/withdraw-method',
        method: 'POST',
        body: info
      }),
      invalidatesTags: ['withdraw']
    }),
    editWithdraw: builder.mutation<TInfoWithdraw, any>({
      query: ({ info, id }) => ({
        url: `/teacher/withdraw-method/${id}`,
        method: 'PUT',
        body: info
      }),
      invalidatesTags: ['withdraw']
    }),

    //ADMIN
    getAllWithdrawRequest: builder.query({
      query: ({ page }) => `/admin/withdraw-request?page=${page}`,
      providesTags: ['withdraw']

    }),
    updateStatusWithdrawRequest: builder.mutation<TInfoWithdraw, any>({
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
  useUpdateStatusWithdrawRequestMutation
} = withdrawApiSlice
