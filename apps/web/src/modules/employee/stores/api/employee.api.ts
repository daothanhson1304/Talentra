import { baseQueryWithReauth } from '@/api/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Employee } from '@talentra/types/employee';

type CreateEmployeeRequest = Omit<Employee, '_id'>;

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employee'],
  endpoints: builder => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => '/employee',
      providesTags: ['Employee'],
    }),
    createEmployee: builder.mutation<Employee, CreateEmployeeRequest>({
      query: employee => ({
        url: '/employee',
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const { useGetEmployeesQuery, useCreateEmployeeMutation } = employeeApi;
