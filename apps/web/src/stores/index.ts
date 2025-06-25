import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '@/modules/app/sidebar/stores/slice/sidebar-slice';
import taskReducer from '@/modules/task/stores/slice/task-slice';
import employeeReducer from '@/modules/employee/stores/slice/employee-slice';
import calendarReducer from '@/modules/calendar/stores/slice/calendar-slice';
import dragDropReducer from '@/modules/app/drag-drop/stores/slice';
import { employeeApi } from '@/modules/employee/stores/api/employee.api';
import { taskApi } from '@/modules/task/stores/api/task.api';
export const store = configureStore({
  reducer: {
    task: taskReducer,
    sidebar: sidebarReducer,
    employee: employeeReducer,
    calendar: calendarReducer,
    dragDrop: dragDropReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(employeeApi.middleware)
      .concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
