import { baseQueryWithReauth } from '@/api/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Task } from '@ttrak/types/task';

type CreateTaskRequest = Omit<Task, '_id'> & { employeeId: string };

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/task',
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: task => ({
        url: '/task',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    getTaskByEmployeeId: builder.query<Task[], string>({
      query: employeeId => `/task/employee/${employeeId}`,
      providesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskByEmployeeIdQuery,
} = taskApi;
