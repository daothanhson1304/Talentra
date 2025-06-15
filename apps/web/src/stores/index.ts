import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '@/modules/app/sidebar/stores/slice/sidebar-slice';
import taskReducer from '@/modules/task/stores/slice/task-slice';
import employeeReducer from '@/modules/employee/stores/slice/employee-slice';
import calendarReducer from '@/modules/calendar/stores/slice/calendar-slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    sidebar: sidebarReducer,
    employee: employeeReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
