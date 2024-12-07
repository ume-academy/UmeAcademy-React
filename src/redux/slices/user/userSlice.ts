import { customBaseQuery } from "@/Api";
import { TTeacher } from "@/interfaces/TTeacher";
import { TUser } from "@/interfaces/TUser";
import { createApi } from "@reduxjs/toolkit/query/react";

let initialPage = 1;

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //! GET ALL
    getUsers: builder.query<any, any>({
      query: (page = initialPage) => `/admin/users?page=${page}`,
      providesTags: ["User"],
      // transformResponse: (res: { data: TUser }) => res.data
    }),

    //! GET ONE USER IS STUDENT
    getAStudentById: builder.query<TUser, any>({
      query: (studentId) => `/admin/user/${studentId}`,
      providesTags: ["User"],
      transformResponse: (res: { data: TUser }) => res.data
    }),

    //! GET ONE USER IS STUDENT
    getATeacherById: builder.query<TTeacher, any>({
      query: (teacherId) => `/teacher/${teacherId}`,
      providesTags: ["User"],
      transformResponse: (res: { data: TTeacher }) => res.data
    }),

    //! LOCK USER BY ID
    lockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/user/${userId}/lock`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    //! UNLOCK USER BY ID
    unLockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/user/${userId}/unlock`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    //! GET ALL USERS SYSTEM 
    getAllUsersSystem: builder.query({
      query: () => `/admin/user-system`,
      providesTags: ["User"],
    }), 

    //! CREATE USER SYSTEM
    createUserSystem: builder.mutation({
      query: (dataForm) => ({
        url: `/admin/user-system`,
        method: "POST",
        body: dataForm,
      }),
      invalidatesTags: ["User"],
    }),

    //! UPDATE ROLE FOR USER SYSTEM BY ID
    assignRoleUserById: builder.mutation({
      query: (dataForm) => ({
        url: `/admin/user-system/${dataForm.id}/roles`,
        method: 'POST',
        body: dataForm
      }),
      invalidatesTags: ['User']
    })
  })
});

export const { 
  useGetUsersQuery, 
  useGetAStudentByIdQuery, 
  useGetATeacherByIdQuery, 
  useLockUserMutation, 
  useUnLockUserMutation, 
  useGetAllUsersSystemQuery,
  useCreateUserSystemMutation,
  useAssignRoleUserByIdMutation
} = userSlice;