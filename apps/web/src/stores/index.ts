import { configureStore } from '@reduxjs/toolkit';
import dragReducer from '@/modules/app/drag-drop/stores/slice/drag-slice';
import sidebarReducer from '@/modules/app/sidebar/stores/slice/sidebar-slice';
import taskReducer from '@/modules/task/stores/slice/task-slice';
import employeeReducer from '@/modules/employee/stores/slice/employee-slice';

export const store = configureStore({
  reducer: {
    drag: dragReducer,
    task: taskReducer,
    sidebar: sidebarReducer,
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
