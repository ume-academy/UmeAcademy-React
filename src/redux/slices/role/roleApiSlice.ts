import { baseUrl } from '@/Api'
import { TRole } from '@/interfaces/TRole'
import { createApi } from '@reduxjs/toolkit/query/react'

export const roleApiSlice = createApi({
  reducerPath: 'roleApi',
  baseQuery: baseUrl,
  tagTypes: ['role'],
  endpoints: (builder) => ({
    getAllRole: builder.query({
      query: () => `/admin/roles`,
      providesTags: ['role']
    }),

    addRole: builder.mutation<TRole, { name: string }>({
      query: ({ name }) => ({
        url: `/admin/roles`,
        method: 'POST',
        body: name
      }),
      invalidatesTags: ['role']
    }),

    editRole: builder.mutation<TRole, { name: string; id: number }>({
      query: ({ name, id }) => ({
        url: `/admin/roles/${id}`,
        method: 'PUT',
        body: name
      }),
      invalidatesTags: ['role']
    }),

    getRoleById: builder.query({
      query: (id) => `/admin/roles/${id}`
    }),

    removeRole: builder.mutation<TRole, number>({
      query: (id) => ({
        url: `/admin/roles/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['role']
    }),

    getAllPermisson: builder.query({
      query: () => `/admin/permissions`,
      providesTags: ['role']
    }),

    getRolePermissonById: builder.query({
      query: (id) => `/admin/roles/${id}/permissions`,
      providesTags: ['role']
    }),

    addPermissionToRole: builder.mutation<TRole, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/admin/roles/${id}/permissions`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['role']
    })
  })
})

export const {
  useGetAllRoleQuery,
  useRemoveRoleMutation,
  useAddRoleMutation,
  useEditRoleMutation,
  useGetRoleByIdQuery,
  useGetAllPermissonQuery,
  useGetRolePermissonByIdQuery,
  useAddPermissionToRoleMutation
} = roleApiSlice
