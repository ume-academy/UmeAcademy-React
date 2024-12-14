import { baseUrl } from '@/Api'
import { TBlog } from '@/interfaces/TBlog'
import { createApi } from '@reduxjs/toolkit/query/react'

export const blogApiSlice = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseUrl,
  tagTypes: ['blog'],
  endpoints: (builder) => ({
    getAllArticlePublished: builder.query({
      query: ({ per_page, page }) => `/articles?per_page=${per_page}&page=${page}`
    }),
    getArticlePublished: builder.query({
      query: ({ id }) => `/articles/${id} `,
      transformResponse: (res: { data: TBlog }) => res.data
    })
  })
})

export const { useGetAllArticlePublishedQuery, useGetArticlePublishedQuery } = blogApiSlice
