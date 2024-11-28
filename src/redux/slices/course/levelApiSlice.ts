import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const levelApiSlice = createApi({
  reducerPath: 'levelApi',
  baseQuery: baseUrl,
  tagTypes: ['level'],
  endpoints: (builder) => ({
    getAlllevel: builder.query({
      query: () => `/levels`
    })
  })
})

export const { useGetAlllevelQuery } = levelApiSlice
