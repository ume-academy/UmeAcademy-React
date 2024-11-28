import { customBaseQuery } from "@/Api";
import { TPaymentMethob } from '@/interfaces/TPaymentMethob'
import { createApi } from '@reduxjs/toolkit/query/react'

export const paymentMethodApiSlice = createApi({
  reducerPath: 'paymentMethodApi',
  baseQuery: customBaseQuery,
  tagTypes: ['paymentMethod'],
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => '/payment-methods',
      providesTags: ['paymentMethod'],
      // transformResponse:(res:{data: TPaymentMethob})=> res.data
    }),

    getPaymentMethodDetail: builder.query({
      query: (id) => `/admin/payment-methods/${id}`,
      transformResponse: (res: { data: TPaymentMethob }) => res.data
    }),

    addPaymentMethod: builder.mutation({
      query: (body) => ({
        url: '/admin/payment-methods',
        method: 'POST',
        body
      }),
      invalidatesTags: ['paymentMethod']
    }),

    editPaymentMethod: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/payment-methods/${id}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['paymentMethod']
    }),

    removePaymentMethod: builder.mutation({
      query: (id) => ({
        url: `/admin/payment-methods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['paymentMethod']
    })
  })
})
export const {
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useEditPaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useGetPaymentMethodDetailQuery
} = paymentMethodApiSlice
