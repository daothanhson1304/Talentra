import { baseQueryWithReauth } from '@/api/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Task } from '@talentra/types/task';
import { setTasks } from '../slice/task-slice';

type CreateTaskRequest = Omit<Task, '_id'> & { employeeId: string };

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Task'],
  endpoints: builder => ({
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
      onQueryStarted: async (employeeId, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        dispatch(setTasks({ [employeeId]: data }));
      },
    }),
    updateTasks: builder.mutation<Task[], Task[]>({
      query: tasks => ({
        url: '/task',
        method: 'PUT',
        body: tasks,
      }),
    }),
    getTaskByEmployeeIdAndMonth: builder.query<
      {
        tasks: Task[];
        statistics: {
          totalTasks: number;
          completedTasks: number;
          pendingTasks: number;
          inProgressTasks: number;
          cancelledTasks: number;
          completionRate: string;
        };
      },
      { employeeId: string; month: string; year: string }
    >({
      query: ({ employeeId, month, year }) =>
        `/task/employee/${employeeId}/monthly?month=${month}&year=${year}`,
      providesTags: ['Task'],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskByEmployeeIdQuery,
  useUpdateTasksMutation,
  useGetTaskByEmployeeIdAndMonthQuery,
} = taskApi;
