import { baseQueryWithReauth } from '@/api/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Employee,
  EmployeeFilter,
  EmployeePagination,
} from '@talentra/types/employee';

type CreateEmployeeRequest = Omit<Employee, '_id' | 'createdAt'>;

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
    getPaginatedEmployees: builder.query<
      {
        employees: Employee[];
        pagination: EmployeePagination;
        filter: EmployeeFilter;
      },
      { limit: number; page: number; search: string }
    >({
      query: ({ limit, page, search }) => ({
        url: `/employee/paginated?limit=${limit}&page=${page}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['Employee'],
    }),
    getEmployeeById: builder.query<Employee, string>({
      query: id => `/employee/${id}`,
      providesTags: ['Employee'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useGetPaginatedEmployeesQuery,
  useGetEmployeeByIdQuery,
} = employeeApi;
