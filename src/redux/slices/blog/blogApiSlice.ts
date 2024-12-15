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
    }),

    getAllArticleAdmin: builder.query({
      query: ({ per_page, page }) => `/admin/articles?per_page=${per_page}&page=${page}`,
      providesTags: ['blog']
    }),

    getArticleById: builder.query({
      query: ({ id }) => `/admin/articles/${id}`,
      providesTags: ['blog']
    }),

    createArticle: builder.mutation<void, {formData: FormData}>({
      query: (data) => ({
        url: '/admin/articles',
        method: 'POST',
        body: data.formData,
      }),
      invalidatesTags: ['blog']
    }),

    uploadImageInTextEditor: builder.mutation<{url: string}, {upload: FormData}>({
      query: (data) => ({
        url: '/upload-image',
        method: 'POST',
        body: data.upload,
      }),
    }),

    updateArticle: builder.mutation<void, {id: number, formData: FormData}>({
      query: (data) => {
        return {
          url: `/admin/articles/${data.id}`,
          method: 'POST',
          body: data.formData,
        };
      },
      invalidatesTags: ['blog']
    }),

    removeArticle: builder.mutation<void, Number>({
      query: (id) => ({
        url: `/admin/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['blog']
    })
  })
})

export const { 
  useGetAllArticlePublishedQuery, 
  useGetArticlePublishedQuery, 
  useCreateArticleMutation, 
  useUploadImageInTextEditorMutation,
  useUpdateArticleMutation,
  useGetArticleByIdQuery,
  useGetAllArticleAdminQuery,
  useRemoveArticleMutation
  
 } = blogApiSlice
